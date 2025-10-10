import { dateToTitle, formatDateTime } from '../dateTransforms'
import { DateTime } from 'luxon'
import type { EventFull } from '@/generated/graphql'

describe('dateTransforms', () => {
  describe('dateToTitle', () => {
    it('should format event dates to title string', () => {
      const mockEvent = {
        id: '1',
        start: '2024-01-15T10:00:00',
        end: '2024-01-15T12:00:00',
        title: 'Test Event',
      } as EventFull

      const result = dateToTitle(mockEvent)

      expect(result).toContain('January 15, 2024')
      expect(result).toContain('10:00 AM')
      expect(result).toContain('12:00 PM')
      expect(result).toContain(' - ')
    })

    it('should handle dates spanning multiple days', () => {
      const mockEvent = {
        id: '1',
        start: '2024-01-15T10:00:00',
        end: '2024-01-16T12:00:00',
        title: 'Multi-day Event',
      } as EventFull

      const result = dateToTitle(mockEvent)

      expect(result).toContain('January 15, 2024')
      expect(result).toContain('January 16, 2024')
    })

    it('should handle ISO date strings with timezone', () => {
      const mockEvent = {
        id: '1',
        start: '2024-01-15T10:00:00Z',
        end: '2024-01-15T12:00:00Z',
        title: 'UTC Event',
      } as EventFull

      const result = dateToTitle(mockEvent)

      expect(result).toBeTruthy()
      expect(result).toContain(' - ')
    })
  })

  describe('formatDateTime', () => {
    it('should format milliseconds timestamp to readable date', () => {
      const timestamp = DateTime.fromISO('2024-01-15T10:30:00').toMillis()

      const result = formatDateTime(timestamp)

      expect(result).toContain('January 15, 2024')
      expect(result).toContain('10:30 AM')
    })

    it('should handle midnight timestamp', () => {
      const timestamp = DateTime.fromISO('2024-01-15T00:00:00').toMillis()

      const result = formatDateTime(timestamp)

      expect(result).toContain('January 15, 2024')
      expect(result).toContain('12:00 AM')
    })

    it('should handle end of day timestamp', () => {
      const timestamp = DateTime.fromISO('2024-01-15T23:59:59').toMillis()

      const result = formatDateTime(timestamp)

      expect(result).toContain('January 15, 2024')
      expect(result).toContain('11:59 PM')
    })

    it('should format epoch timestamp', () => {
      const timestamp = 0

      const result = formatDateTime(timestamp)

      expect(result).toBeTruthy()
    })
  })
})
