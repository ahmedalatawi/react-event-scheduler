import { render, screen, act } from '@testing-library/react'
import Timer from '../Timer'

jest.useFakeTimers()

describe('Timer', () => {
  const mockOnTimeout = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should render with initial seconds', () => {
    render(<Timer seconds={180} onTimeout={mockOnTimeout} />)
    expect(
      screen.getByText(/your login session will expire in 180 second\(s\)/i),
    ).toBeInTheDocument()
  })

  it('should count down every second', () => {
    render(<Timer seconds={5} onTimeout={mockOnTimeout} />)

    expect(
      screen.getByText(/your login session will expire in 5 second\(s\)/i),
    ).toBeInTheDocument()

    act(() => {
      jest.advanceTimersByTime(1000)
    })

    expect(
      screen.getByText(/your login session will expire in 4 second\(s\)/i),
    ).toBeInTheDocument()

    act(() => {
      jest.advanceTimersByTime(1000)
    })

    expect(
      screen.getByText(/your login session will expire in 3 second\(s\)/i),
    ).toBeInTheDocument()
  })

  it('should call onTimeout when timer reaches zero', () => {
    render(<Timer seconds={2} onTimeout={mockOnTimeout} />)

    expect(mockOnTimeout).not.toHaveBeenCalled()

    act(() => {
      jest.advanceTimersByTime(2000)
    })

    expect(mockOnTimeout).toHaveBeenCalledTimes(1)
  })

  it('should stop counting after timeout', () => {
    render(<Timer seconds={1} onTimeout={mockOnTimeout} />)

    act(() => {
      jest.advanceTimersByTime(1000)
    })

    expect(mockOnTimeout).toHaveBeenCalledTimes(1)

    act(() => {
      jest.advanceTimersByTime(2000)
    })

    expect(mockOnTimeout).toHaveBeenCalledTimes(1)
  })

  it('should cleanup interval on unmount', () => {
    const clearIntervalSpy = jest.spyOn(global, 'clearInterval')
    const { unmount } = render(<Timer seconds={10} onTimeout={mockOnTimeout} />)

    unmount()

    expect(clearIntervalSpy).toHaveBeenCalled()
    clearIntervalSpy.mockRestore()
  })

  it('should handle zero initial seconds', () => {
    render(<Timer seconds={0} onTimeout={mockOnTimeout} />)

    expect(
      screen.getByText(/your login session will expire in 0 second\(s\)/i),
    ).toBeInTheDocument()

    expect(mockOnTimeout).toHaveBeenCalledTimes(1)
  })
})
