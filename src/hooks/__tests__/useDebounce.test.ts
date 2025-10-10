import { renderHook, waitFor } from '@testing-library/react'
import useDebounce from '../useDebounce'

jest.useFakeTimers()

describe('useDebounce', () => {
  it('should return initial value immediately', () => {
    const { result } = renderHook(() => useDebounce('initial'))
    expect(result.current).toBe('initial')
  })

  it('should debounce value changes', async () => {
    const { result, rerender } = renderHook(
      ({ value }) => useDebounce(value),
      { initialProps: { value: 'initial' } },
    )

    expect(result.current).toBe('initial')

    rerender({ value: 'updated' })
    expect(result.current).toBe('initial')

    jest.advanceTimersByTime(500)

    await waitFor(() => {
      expect(result.current).toBe('updated')
    })
  })

  it('should cancel previous timer on rapid changes', async () => {
    const { result, rerender } = renderHook(
      ({ value }) => useDebounce(value),
      { initialProps: { value: 'initial' } },
    )

    rerender({ value: 'first' })
    jest.advanceTimersByTime(300)
    expect(result.current).toBe('initial')

    rerender({ value: 'second' })
    jest.advanceTimersByTime(300)
    expect(result.current).toBe('initial')

    rerender({ value: 'final' })
    jest.advanceTimersByTime(500)

    await waitFor(() => {
      expect(result.current).toBe('final')
    })
  })

  it('should handle empty string', async () => {
    const { result, rerender } = renderHook(
      ({ value }) => useDebounce(value),
      { initialProps: { value: 'initial' } },
    )

    rerender({ value: '' })
    jest.advanceTimersByTime(500)

    await waitFor(() => {
      expect(result.current).toBe('')
    })
  })

  it('should cleanup timer on unmount', () => {
    const clearTimeoutSpy = jest.spyOn(global, 'clearTimeout')
    const { unmount } = renderHook(() => useDebounce('test'))

    unmount()

    expect(clearTimeoutSpy).toHaveBeenCalled()
    clearTimeoutSpy.mockRestore()
  })
})
