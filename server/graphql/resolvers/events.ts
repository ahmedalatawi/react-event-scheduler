import { AuthenticationError } from 'apollo-server-express';
import { EventModel } from '../../models/event';
import { UserModel } from '../../models/user';
import { constants } from '../../config/constants';

export const Events = {
  eventsData: async (
    {
      filterInput: {
        searchText = '',
        pageNumber = 0,
        pageSize = 0,
        expiredCheck,
        currentCheck,
      },
    },
    { isAuthorized, userId }
  ) => {
    const filter =
      isAuthorized && userId
        ? { $or: [{ createdBy: userId }, { isPrivate: false }] }
        : { isPrivate: false };
    const regexFilter = {
      ...filter,
      title: { $regex: searchText, $options: 'six' },
    };

    const statusFilter = currentCheck
      ? { end: { $gte: new Date().toISOString() } }
      : expiredCheck
      ? { end: { $lt: new Date().toISOString() } }
      : {};

    try {
      const events = await EventModel.find({ ...regexFilter, ...statusFilter })
        .sort({ end: -1 })
        .limit(pageSize)
        .skip(pageNumber > 0 ? (pageNumber - 1) * pageSize : 0)
        .populate('createdBy');
      const totalCount = await EventModel.countDocuments({
        ...regexFilter,
        ...statusFilter,
      });

      return { totalCount, events };
    } catch (err) {
      throw err;
    }
  },
  getEvent: async ({ id }) => {
    try {
      const event = await EventModel.findOne({ _id: id }).populate('createdBy');

      if (!event) {
        throw new Error('Event could not be found');
      }

      return event;
    } catch (err) {
      throw err;
    }
  },
  getUserEvents: async (
    { id, paginationFilter: { searchText = '', pageNumber = 0, pageSize = 0 } },
    { isAuthorized, userId }
  ) => {
    if (!isAuthorized) {
      throw new AuthenticationError('Unauthenticated');
    }

    if (!id || id !== userId) {
      throw new AuthenticationError('Unauthenticated');
    }

    const filter = {
      createdBy: id,
      $or: [
        { title: { $regex: searchText, $options: 'six' } },
        { description: { $regex: searchText, $options: 'six' } },
      ],
    };

    try {
      const events = await EventModel.find(filter)
        .limit(pageSize)
        .skip(pageNumber > 0 ? (pageNumber - 1) * pageSize : 0)
        .populate('createdBy');
      const totalCount = await EventModel.countDocuments(filter);

      return { totalCount, events };
    } catch (err) {
      throw err;
    }
  },
  saveEvent: async (
    { event: { id, title, start, end, isPrivate, description } },
    { isAuthorized, userId }
  ) => {
    const { URI } = constants;

    if (!isAuthorized) {
      throw new AuthenticationError('Unauthenticated');
    }

    const user = await UserModel.findById(userId);

    if (!user) {
      throw new AuthenticationError('Unauthenticated');
    }

    try {
      let savedEvent;

      if (id) {
        const event = await EventModel.findOne({ _id: id, createdBy: userId });

        if (!event) {
          throw new AuthenticationError('Event could not be found');
        }

        await EventModel.findOneAndUpdate(
          { _id: id, createdBy: userId },
          { title, start, end, isPrivate, description }
        );
      } else {
        const event = new EventModel({
          title,
          start,
          end,
          isPrivate,
          description,
          createdBy: userId,
        });

        savedEvent = await event.save();
        savedEvent.url = `${URI}/sharedEvent/${savedEvent._id}`;
        await savedEvent.save({ timestamps: false });
      }

      return { id: id || savedEvent._id };
    } catch (err) {
      throw err;
    }
  },
  deleteEvent: async ({ id }, { isAuthorized, userId }) => {
    if (!isAuthorized) {
      throw new AuthenticationError('Unauthenticated');
    }

    const user = await UserModel.findById(userId);

    if (!user) {
      throw new AuthenticationError('Unauthenticated');
    }

    try {
      const event = await EventModel.findOne({ _id: id, createdBy: userId });

      if (!event) {
        throw new Error('Event could not be found');
      }

      await EventModel.deleteOne({ _id: id, createdBy: userId });

      return true;
    } catch (err) {
      throw err;
    }
  },
};
