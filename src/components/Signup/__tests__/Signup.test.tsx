import { render, screen, fireEvent } from '@testing-library/react'
import Signup from '../Signup'

describe('Signup', () => {
  const mockOnChangeValue = jest.fn()
  const mockOnToggleSignup = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should render all required fields', () => {
    render(
      <Signup
        onChangeValue={mockOnChangeValue}
        onToggleSignup={mockOnToggleSignup}
      />,
    )

    expect(screen.getByLabelText(/^username/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/^password$/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/confirm password/i)).toBeInTheDocument()
  })

  it('should render password help text', () => {
    render(
      <Signup
        onChangeValue={mockOnChangeValue}
        onToggleSignup={mockOnToggleSignup}
      />,
    )

    expect(
      screen.getByText(
        /must be at least 6 characters, including a symbol, upper and lower case letter and a number/i,
      ),
    ).toBeInTheDocument()
  })

  it('should render login link', () => {
    render(
      <Signup
        onChangeValue={mockOnChangeValue}
        onToggleSignup={mockOnToggleSignup}
      />,
    )

    expect(screen.getByText(/already have an account/i)).toBeInTheDocument()
    expect(screen.getByText(/login/i)).toBeInTheDocument()
  })

  it('should call onChangeValue when username is changed', () => {
    render(
      <Signup
        onChangeValue={mockOnChangeValue}
        onToggleSignup={mockOnToggleSignup}
      />,
    )

    const usernameInput = screen.getByLabelText(/^username/i)
    fireEvent.change(usernameInput, { target: { value: 'newuser' } })

    expect(mockOnChangeValue).toHaveBeenCalledWith('username', 'newuser')
  })

  it('should call onChangeValue when password is changed', () => {
    render(
      <Signup
        onChangeValue={mockOnChangeValue}
        onToggleSignup={mockOnToggleSignup}
      />,
    )

    const passwordInput = screen.getByLabelText(/^password$/i)
    fireEvent.change(passwordInput, { target: { value: 'Password1!' } })

    expect(mockOnChangeValue).toHaveBeenCalledWith('password', 'Password1!')
  })

  it('should call onChangeValue when confirm password is changed', () => {
    render(
      <Signup
        onChangeValue={mockOnChangeValue}
        onToggleSignup={mockOnToggleSignup}
      />,
    )

    const confirmPasswordInput = screen.getByLabelText(/confirm password/i)
    fireEvent.change(confirmPasswordInput, {
      target: { value: 'Password1!' },
    })

    expect(mockOnChangeValue).toHaveBeenCalledWith(
      'confirmPassword',
      'Password1!',
    )
  })

  it('should trim whitespace from all inputs', () => {
    render(
      <Signup
        onChangeValue={mockOnChangeValue}
        onToggleSignup={mockOnToggleSignup}
      />,
    )

    const usernameInput = screen.getByLabelText(/^username/i)
    fireEvent.change(usernameInput, { target: { value: '  newuser  ' } })

    expect(mockOnChangeValue).toHaveBeenCalledWith('username', 'newuser')
  })

  it('should call onToggleSignup when login link is clicked', () => {
    render(
      <Signup
        onChangeValue={mockOnChangeValue}
        onToggleSignup={mockOnToggleSignup}
      />,
    )

    const loginLink = screen.getByText(/login/i)
    fireEvent.click(loginLink)

    expect(mockOnToggleSignup).toHaveBeenCalledTimes(1)
  })

  it('should have correct maxLength for all fields', () => {
    render(
      <Signup
        onChangeValue={mockOnChangeValue}
        onToggleSignup={mockOnToggleSignup}
      />,
    )

    const usernameInput = screen.getByLabelText(/^username/i)
    const passwordInput = screen.getByLabelText(/^password$/i)
    const confirmPasswordInput = screen.getByLabelText(/confirm password/i)

    expect(usernameInput).toHaveAttribute('maxLength', '20')
    expect(passwordInput).toHaveAttribute('maxLength', '20')
    expect(confirmPasswordInput).toHaveAttribute('maxLength', '20')
  })

  it('should have password type for password fields', () => {
    render(
      <Signup
        onChangeValue={mockOnChangeValue}
        onToggleSignup={mockOnToggleSignup}
      />,
    )

    const passwordInput = screen.getByLabelText(/^password$/i)
    const confirmPasswordInput = screen.getByLabelText(/confirm password/i)

    expect(passwordInput).toHaveAttribute('type', 'password')
    expect(confirmPasswordInput).toHaveAttribute('type', 'password')
  })
})
