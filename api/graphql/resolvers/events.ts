import { GraphQLError } from 'graphql'
import { EventModel } from '../../models/event'
import { UserModel } from '../../models/user'
import { constants } from '../../config/constants'
import {
  EventInput,
  FilterInput,
  PaginationFilter,
} from '../../../src/generated/graphql'
import { IAuthParams } from '../../interfaces/types'

export const Events = {
  eventsData: async (
    {
      filterInput: {
        searchText = '',
        pageNumber = 0,
        pageSize = 0,
        expiredCheck,
        currentCheck,
        startDate,
        endDate,
      },
    }: { filterInput: FilterInput },
    { isAuthorized, userId }: IAuthParams,
  ) => {
    const filter =
      isAuthorized && userId
        ? { $or: [{ createdBy: userId }, { isPrivate: false }] }
        : { isPrivate: false }
    const regexFilter = {
      ...filter,
      title: { $regex: searchText, $options: 'six' },
    }

    const statusFilter = currentCheck
      ? { end: { $gte: new Date().toISOString() } }
      : expiredCheck
      ? { end: { $lt: new Date().toISOString() } }
      : {}

    const startDateFilter = startDate ? { start: { $gte: startDate } } : {}
    const endDateFilter = endDate ? { end: { $lt: endDate } } : {}

    pageSize = pageSize ?? 0
    pageNumber = pageNumber ?? 0

    const events = await EventModel.find({
      ...regexFilter,
      ...statusFilter,
      ...startDateFilter,
      ...endDateFilter,
    })
      .sort({ end: -1 })
      .limit(pageSize)
      .skip(pageNumber > 0 ? (pageNumber - 1) * pageSize : 0)
      .populate('createdBy')
    const totalCount = await EventModel.countDocuments({
      ...regexFilter,
      ...statusFilter,
    })

    return { totalCount, events }
  },
  getEvent: async ({ id }: { id: string }) => {
    const event = await EventModel.findOne({ _id: id }).populate('createdBy')

    if (!event) {
      throw new Error('Event could not be found')
    }

    return event
  },
  getUserEvents: async (
    {
      id,
      paginationFilter: { searchText = '', pageNumber = 0, pageSize = 0 },
    }: { id: string; paginationFilter: PaginationFilter },
    { isAuthorized, userId }: IAuthParams,
  ) => {
    if (!isAuthorized) {
      throw new GraphQLError('Unauthenticated')
    }

    if (!id || id !== userId) {
      throw new GraphQLError('Unauthenticated')
    }

    const filter = {
      createdBy: id,
      $or: [
        { title: { $regex: searchText, $options: 'six' } },
        { description: { $regex: searchText, $options: 'six' } },
      ],
    }

    pageSize = pageSize ?? 0
    pageNumber = pageNumber ?? 0

    const events = await EventModel.find(filter)
      .limit(pageSize)
      .skip(pageNumber > 0 ? (pageNumber - 1) * pageSize : 0)
      .populate('createdBy')
    const totalCount = await EventModel.countDocuments(filter)

    return { totalCount, events }
  },
  saveEvent: async (
    {
      event: { id, title, start, end, isPrivate, description },
    }: { event: EventInput },
    { isAuthorized, userId }: IAuthParams,
  ) => {
    const { URI } = constants

    if (!isAuthorized) {
      throw new GraphQLError('Unauthenticated')
    }

    const user = await UserModel.findById(userId)

    if (!user) {
      throw new GraphQLError('Unauthenticated')
    }

    let savedEvent

    if (id) {
      const event = await EventModel.findOne({ _id: id, createdBy: userId })

      if (!event) {
        throw new GraphQLError('Event could not be found')
      }

      savedEvent = await EventModel.findOneAndUpdate(
        { _id: id, createdBy: userId },
        { title, start, end, isPrivate, description },
        { new: true },
      ).populate('createdBy')
    } else {
      const event = new EventModel({
        title,
        start,
        end,
        isPrivate,
        description,
        createdBy: userId,
      })

      savedEvent = await event.save().then((e) => e.populate('createdBy'))
      savedEvent.url = `${URI}/sharedEvent/${savedEvent._id}`
      await savedEvent.save({ timestamps: false })
    }

    return savedEvent
  },
  deleteEvent: async (
    { id }: { id: string },
    { isAuthorized, userId }: IAuthParams,
  ) => {
    if (!isAuthorized) {
      throw new GraphQLError('Unauthenticated')
    }

    const user = await UserModel.findById(userId)

    if (!user) {
      throw new GraphQLError('Unauthenticated')
    }

    const event = await EventModel.findOne({ _id: id, createdBy: userId })

    if (!event) {
      throw new Error('Event could not be found')
    }

    await EventModel.deleteOne({ _id: id, createdBy: userId })

    return true
  },
}
