import { AuthenticationError } from 'apollo-server-express';
import { EventModel } from '../../models/event';
import { UserModel } from '../../models/user';

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
        .skip(pageNumber > 0 ? (pageNumber - 1) * pageSize : 0);
      const totalCount = await EventModel.countDocuments({
        ...regexFilter,
        ...statusFilter,
      });

      return { totalCount, events };
    } catch (err) {
      throw err;
    }
  },
  saveEvent: async (
    { event: { id, title, start, end, isPrivate, description } },
    { isAuthorized, userId }
  ) => {
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
