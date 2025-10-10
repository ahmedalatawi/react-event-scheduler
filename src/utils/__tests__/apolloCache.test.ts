import { removeEvent } from '../apolloCache'
import { ApolloCache } from '@apollo/client'

describe('apolloCache', () => {
  describe('removeEvent', () => {
    let mockCache: jest.Mocked<ApolloCache<unknown>>

    beforeEach(() => {
      mockCache = {
        identify: jest.fn(),
        evict: jest.fn(),
        gc: jest.fn(),
      } as unknown as jest.Mocked<ApolloCache<unknown>>
    })

    it('should identify event with correct typename', () => {
      const eventId = 'event123'

      removeEvent(mockCache, eventId)

      expect(mockCache.identify).toHaveBeenCalledWith({
        id: eventId,
        __typename: 'EventFull',
      })
    })

    it('should evict event from cache', () => {
      const eventId = 'event123'
      const normalizedId = 'EventFull:event123'
      mockCache.identify.mockReturnValue(normalizedId)

      removeEvent(mockCache, eventId)

      expect(mockCache.evict).toHaveBeenCalledWith({ id: normalizedId })
    })

    it('should run garbage collection after eviction', () => {
      const eventId = 'event123'

      removeEvent(mockCache, eventId)

      expect(mockCache.gc).toHaveBeenCalled()
    })

    it('should call methods in correct order', () => {
      const eventId = 'event123'
      const callOrder: string[] = []

      mockCache.identify.mockImplementation(() => {
        callOrder.push('identify')
        return 'EventFull:event123'
      })
      mockCache.evict.mockImplementation(() => {
        callOrder.push('evict')
        return true
      })
      mockCache.gc.mockImplementation(() => {
        callOrder.push('gc')
        return []
      })

      removeEvent(mockCache, eventId)

      expect(callOrder).toEqual(['identify', 'evict', 'gc'])
    })

    it('should handle undefined normalized id', () => {
      const eventId = 'event123'
      mockCache.identify.mockReturnValue(undefined)

      removeEvent(mockCache, eventId)

      expect(mockCache.evict).toHaveBeenCalledWith({ id: undefined })
      expect(mockCache.gc).toHaveBeenCalled()
    })
  })
})
