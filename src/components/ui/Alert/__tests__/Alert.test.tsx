import { render, screen, fireEvent } from '@testing-library/react'
import Alert from '../Alert'

describe('Alert', () => {
  const mockOnClose = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should render alert with message', () => {
    render(<Alert msg='Test message' type='success' />)
    expect(screen.getByText('Test message')).toBeInTheDocument()
  })

  it('should render success alert', () => {
    render(<Alert msg='Success' type='success' />)
    const alert = screen.getByRole('alert')
    expect(alert).toHaveClass('alert-success')
  })

  it('should render danger alert', () => {
    render(<Alert msg='Error' type='danger' />)
    const alert = screen.getByRole('alert')
    expect(alert).toHaveClass('alert-danger')
  })

  it('should render warning alert', () => {
    render(<Alert msg='Warning' type='warning' />)
    const alert = screen.getByRole('alert')
    expect(alert).toHaveClass('alert-warning')
  })

  it('should render info alert', () => {
    render(<Alert msg='Info' type='info' />)
    const alert = screen.getByRole('alert')
    expect(alert).toHaveClass('alert-info')
  })

  it('should render dismissible alert by default', () => {
    render(<Alert msg='Test' type='success' onClose={mockOnClose} />)
    const closeButton = screen.getByRole('button')
    expect(closeButton).toBeInTheDocument()
  })

  it('should render non-dismissible alert when specified', () => {
    render(
      <Alert
        msg='Test'
        type='success'
        dismissible={false}
        onClose={mockOnClose}
      />,
    )
    const closeButton = screen.queryByRole('button')
    expect(closeButton).not.toBeInTheDocument()
  })

  it('should call onClose when close button is clicked', () => {
    render(<Alert msg='Test' type='success' onClose={mockOnClose} />)
    const closeButton = screen.getByRole('button')
    fireEvent.click(closeButton)
    expect(mockOnClose).toHaveBeenCalledTimes(1)
  })

  it('should render custom button', () => {
    const customButton = <button>Custom Action</button>
    render(<Alert msg='Test' type='warning' btn={customButton} />)
    expect(screen.getByText('Custom Action')).toBeInTheDocument()
  })

  it('should render both message and custom button', () => {
    const customButton = <button>Action</button>
    render(<Alert msg='Test message' type='info' btn={customButton} />)
    expect(screen.getByText('Test message')).toBeInTheDocument()
    expect(screen.getByText('Action')).toBeInTheDocument()
  })
})
