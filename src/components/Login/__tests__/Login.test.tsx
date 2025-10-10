import { render, screen, fireEvent } from '@testing-library/react'
import Login from '../Login'

describe('Login', () => {
  const mockOnChangeValue = jest.fn()
  const mockOnToggleLogin = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should render username and password fields', () => {
    render(
      <Login
        onChangeValue={mockOnChangeValue}
        onToggleLogin={mockOnToggleLogin}
      />,
    )

    expect(screen.getByLabelText(/username/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument()
  })

  it('should render signup link', () => {
    render(
      <Login
        onChangeValue={mockOnChangeValue}
        onToggleLogin={mockOnToggleLogin}
      />,
    )

    expect(screen.getByText(/don't have an account yet/i)).toBeInTheDocument()
    expect(screen.getByText(/signup/i)).toBeInTheDocument()
  })

  it('should call onChangeValue when username is changed', () => {
    render(
      <Login
        onChangeValue={mockOnChangeValue}
        onToggleLogin={mockOnToggleLogin}
      />,
    )

    const usernameInput = screen.getByLabelText(/username/i)
    fireEvent.change(usernameInput, { target: { value: 'testuser' } })

    expect(mockOnChangeValue).toHaveBeenCalledWith('username', 'testuser')
  })

  it('should call onChangeValue when password is changed', () => {
    render(
      <Login
        onChangeValue={mockOnChangeValue}
        onToggleLogin={mockOnToggleLogin}
      />,
    )

    const passwordInput = screen.getByLabelText(/password/i)
    fireEvent.change(passwordInput, { target: { value: 'password123' } })

    expect(mockOnChangeValue).toHaveBeenCalledWith('password', 'password123')
  })

  it('should trim whitespace from username input', () => {
    render(
      <Login
        onChangeValue={mockOnChangeValue}
        onToggleLogin={mockOnToggleLogin}
      />,
    )

    const usernameInput = screen.getByLabelText(/username/i)
    fireEvent.change(usernameInput, { target: { value: '  testuser  ' } })

    expect(mockOnChangeValue).toHaveBeenCalledWith('username', 'testuser')
  })

  it('should trim whitespace from password input', () => {
    render(
      <Login
        onChangeValue={mockOnChangeValue}
        onToggleLogin={mockOnToggleLogin}
      />,
    )

    const passwordInput = screen.getByLabelText(/password/i)
    fireEvent.change(passwordInput, { target: { value: '  password123  ' } })

    expect(mockOnChangeValue).toHaveBeenCalledWith('password', 'password123')
  })

  it('should call onToggleLogin when signup link is clicked', () => {
    render(
      <Login
        onChangeValue={mockOnChangeValue}
        onToggleLogin={mockOnToggleLogin}
      />,
    )

    const signupLink = screen.getByText(/signup/i)
    fireEvent.click(signupLink)

    expect(mockOnToggleLogin).toHaveBeenCalledTimes(1)
  })

  it('should have correct maxLength for username', () => {
    render(
      <Login
        onChangeValue={mockOnChangeValue}
        onToggleLogin={mockOnToggleLogin}
      />,
    )

    const usernameInput = screen.getByLabelText(/username/i)
    expect(usernameInput).toHaveAttribute('maxLength', '20')
  })

  it('should have correct maxLength for password', () => {
    render(
      <Login
        onChangeValue={mockOnChangeValue}
        onToggleLogin={mockOnToggleLogin}
      />,
    )

    const passwordInput = screen.getByLabelText(/password/i)
    expect(passwordInput).toHaveAttribute('maxLength', '20')
  })

  it('should have password input type for password field', () => {
    render(
      <Login
        onChangeValue={mockOnChangeValue}
        onToggleLogin={mockOnToggleLogin}
      />,
    )

    const passwordInput = screen.getByLabelText(/password/i)
    expect(passwordInput).toHaveAttribute('type', 'password')
  })
})
