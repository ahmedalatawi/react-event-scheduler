import { Events } from '../events'
import { EventModel } from '../../../models/event'
import { UserModel } from '../../../models/user'
import { GraphQLError } from 'graphql'
import type { IAuthParams } from '../../../interfaces/types'

jest.mock('../../../models/event')
jest.mock('../../../models/user')

describe('Events Resolvers', () => {
  const mockUserId = 'user123'
  const mockEventId = 'event123'
  const mockAuthParams: IAuthParams = {
    isAuthorized: true,
    userId: mockUserId,
  }

  beforeEach(() => {
    jest.clearAllMocks()
    process.env.URI = 'http://localhost:3000'
  })

  describe('eventsData', () => {
    it('should return events for authenticated user', async () => {
      const filterInput = {
        searchText: '',
        pageNumber: 1,
        pageSize: 10,
      }

      const mockEvents = [
        { _id: 'event1', title: 'Event 1', isPrivate: false },
        { _id: 'event2', title: 'Event 2', isPrivate: false },
      ]

      const mockFind = {
        sort: jest.fn().mockReturnThis(),
        limit: jest.fn().mockReturnThis(),
        skip: jest.fn().mockReturnThis(),
        populate: jest.fn().mockResolvedValue(mockEvents),
      }

      jest.mocked(EventModel.find).mockReturnValue(mockFind as never)
      jest.mocked(EventModel.countDocuments).mockResolvedValue(2)

      const result = await Events.eventsData({ filterInput }, mockAuthParams)

      expect(result).toEqual({
        totalCount: 2,
        events: mockEvents,
      })
    })

    it('should filter by search text', async () => {
      const filterInput = {
        searchText: 'test',
        pageNumber: 0,
        pageSize: 0,
      }

      const mockFind = {
        sort: jest.fn().mockReturnThis(),
        limit: jest.fn().mockReturnThis(),
        skip: jest.fn().mockReturnThis(),
        populate: jest.fn().mockResolvedValue([]),
      }

      jest.mocked(EventModel.find).mockReturnValue(mockFind as never)
      jest.mocked(EventModel.countDocuments).mockResolvedValue(0)

      await Events.eventsData({ filterInput }, mockAuthParams)

      expect(EventModel.find).toHaveBeenCalledWith(
        expect.objectContaining({
          title: { $regex: 'test', $options: 'six' },
        }),
      )
    })

    it('should filter expired events', async () => {
      const filterInput = {
        searchText: '',
        pageNumber: 0,
        pageSize: 0,
        expiredCheck: true,
      }

      const mockFind = {
        sort: jest.fn().mockReturnThis(),
        limit: jest.fn().mockReturnThis(),
        skip: jest.fn().mockReturnThis(),
        populate: jest.fn().mockResolvedValue([]),
      }

      jest.mocked(EventModel.find).mockReturnValue(mockFind as never)
      jest.mocked(EventModel.countDocuments).mockResolvedValue(0)

      await Events.eventsData({ filterInput }, mockAuthParams)

      expect(EventModel.find).toHaveBeenCalledWith(
        expect.objectContaining({
          end: expect.objectContaining({ $lt: expect.any(String) }),
        }),
      )
    })

    it('should filter current events', async () => {
      const filterInput = {
        searchText: '',
        pageNumber: 0,
        pageSize: 0,
        currentCheck: true,
      }

      const mockFind = {
        sort: jest.fn().mockReturnThis(),
        limit: jest.fn().mockReturnThis(),
        skip: jest.fn().mockReturnThis(),
        populate: jest.fn().mockResolvedValue([]),
      }

      jest.mocked(EventModel.find).mockReturnValue(mockFind as never)
      jest.mocked(EventModel.countDocuments).mockResolvedValue(0)

      await Events.eventsData({ filterInput }, mockAuthParams)

      expect(EventModel.find).toHaveBeenCalledWith(
        expect.objectContaining({
          end: expect.objectContaining({ $gte: expect.any(String) }),
        }),
      )
    })

    it('should only return public events for unauthenticated users', async () => {
      const filterInput = {
        searchText: '',
        pageNumber: 0,
        pageSize: 0,
      }

      const unauthParams: IAuthParams = {
        isAuthorized: false,
        userId: undefined,
      }

      const mockFind = {
        sort: jest.fn().mockReturnThis(),
        limit: jest.fn().mockReturnThis(),
        skip: jest.fn().mockReturnThis(),
        populate: jest.fn().mockResolvedValue([]),
      }

      jest.mocked(EventModel.find).mockReturnValue(mockFind as never)
      jest.mocked(EventModel.countDocuments).mockResolvedValue(0)

      await Events.eventsData({ filterInput }, unauthParams)

      expect(EventModel.find).toHaveBeenCalledWith(
        expect.objectContaining({
          isPrivate: false,
        }),
      )
    })
  })

  describe('getEvent', () => {
    it('should return event by id', async () => {
      const mockEvent = {
        _id: mockEventId,
        title: 'Test Event',
        isPrivate: false,
      }

      const mockFindOne = {
        populate: jest.fn().mockResolvedValue(mockEvent),
      }

      jest.mocked(EventModel.findOne).mockReturnValue(mockFindOne as never)

      const result = await Events.getEvent({ id: mockEventId })

      expect(EventModel.findOne).toHaveBeenCalledWith({ _id: mockEventId })
      expect(result).toEqual(mockEvent)
    })

    it('should throw error when event not found', async () => {
      const mockFindOne = {
        populate: jest.fn().mockResolvedValue(null),
      }

      jest.mocked(EventModel.findOne).mockReturnValue(mockFindOne as never)

      await expect(Events.getEvent({ id: 'nonexistent' })).rejects.toThrow(
        'Event could not be found',
      )
    })
  })

  describe('saveEvent', () => {
    it('should create new event', async () => {
      const eventInput = {
        id: '',
        title: 'New Event',
        start: '2024-01-01T10:00:00',
        end: '2024-01-01T12:00:00',
        isPrivate: false,
        description: 'Test description',
      }

      jest.mocked(UserModel.findById).mockResolvedValue({
        _id: mockUserId,
      } as never)

      const mockSavedEvent = {
        _id: mockEventId,
        ...eventInput,
        createdBy: mockUserId,
        url: '',
        save: jest.fn().mockResolvedValue(true),
        populate: jest.fn().mockResolvedValue({
          _id: mockEventId,
          ...eventInput,
        }),
      }

      const mockEventInstance = {
        save: jest.fn().mockReturnValue({
          then: (
            callback: (e: typeof mockSavedEvent) => typeof mockSavedEvent,
          ) => Promise.resolve(callback(mockSavedEvent)),
        }),
      }

      jest
        .mocked(EventModel)
        .mockImplementation(() => mockEventInstance as never)

      const result = await Events.saveEvent(
        { event: eventInput },
        mockAuthParams,
      )

      expect(result).toBeDefined()
      expect(mockSavedEvent.save).toHaveBeenCalled()
    })

    it('should update existing event', async () => {
      const eventInput = {
        id: mockEventId,
        title: 'Updated Event',
        start: '2024-01-01T10:00:00',
        end: '2024-01-01T12:00:00',
        isPrivate: false,
        description: 'Updated description',
      }

      jest.mocked(UserModel.findById).mockResolvedValue({
        _id: mockUserId,
      } as never)

      jest.mocked(EventModel.findOne).mockResolvedValue({
        _id: mockEventId,
      } as never)

      const mockUpdatedEvent = {
        _id: mockEventId,
        ...eventInput,
      }

      const mockFindOneAndUpdate = {
        populate: jest.fn().mockResolvedValue(mockUpdatedEvent),
      }

      jest
        .mocked(EventModel.findOneAndUpdate)
        .mockReturnValue(mockFindOneAndUpdate as never)

      const result = await Events.saveEvent(
        { event: eventInput },
        mockAuthParams,
      )

      expect(EventModel.findOneAndUpdate).toHaveBeenCalledWith(
        { _id: mockEventId, createdBy: mockUserId },
        expect.objectContaining({
          title: 'Updated Event',
          isPrivate: false,
        }),
        { new: true },
      )
      expect(result).toEqual(mockUpdatedEvent)
    })

    it('should throw error when user is not authenticated', async () => {
      const eventInput = {
        id: '',
        title: 'New Event',
        start: '2024-01-01T10:00:00',
        end: '2024-01-01T12:00:00',
        isPrivate: false,
        description: 'Test',
      }

      const unauthParams: IAuthParams = {
        isAuthorized: false,
        userId: undefined,
      }

      await expect(
        Events.saveEvent({ event: eventInput }, unauthParams),
      ).rejects.toThrow(GraphQLError)
    })

    it('should throw error when event to update is not found', async () => {
      const eventInput = {
        id: 'nonexistent',
        title: 'Updated Event',
        start: '2024-01-01T10:00:00',
        end: '2024-01-01T12:00:00',
        isPrivate: false,
        description: 'Test',
      }

      jest.mocked(UserModel.findById).mockResolvedValue({
        _id: mockUserId,
      } as never)

      jest.mocked(EventModel.findOne).mockResolvedValue(null)

      await expect(
        Events.saveEvent({ event: eventInput }, mockAuthParams),
      ).rejects.toThrow(GraphQLError)
    })
  })

  describe('deleteEvent', () => {
    it('should delete event', async () => {
      jest.mocked(UserModel.findById).mockResolvedValue({
        _id: mockUserId,
      } as never)

      jest.mocked(EventModel.findOne).mockResolvedValue({
        _id: mockEventId,
      } as never)

      jest.mocked(EventModel.deleteOne).mockResolvedValue({
        deletedCount: 1,
      } as never)

      const result = await Events.deleteEvent(
        { id: mockEventId },
        mockAuthParams,
      )

      expect(EventModel.deleteOne).toHaveBeenCalledWith({
        _id: mockEventId,
        createdBy: mockUserId,
      })
      expect(result).toBe(true)
    })

    it('should throw error when user is not authenticated', async () => {
      const unauthParams: IAuthParams = {
        isAuthorized: false,
        userId: undefined,
      }

      await expect(
        Events.deleteEvent({ id: mockEventId }, unauthParams),
      ).rejects.toThrow(GraphQLError)
    })

    it('should throw error when event is not found', async () => {
      jest.mocked(UserModel.findById).mockResolvedValue({
        _id: mockUserId,
      } as never)

      jest.mocked(EventModel.findOne).mockResolvedValue(null)

      await expect(
        Events.deleteEvent({ id: 'nonexistent' }, mockAuthParams),
      ).rejects.toThrow('Event could not be found')
    })
  })
})
