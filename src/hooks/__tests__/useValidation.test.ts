import useValidation from '../useValidation'

describe('useValidation', () => {
  const [validate] = useValidation()

  describe('Signup validation', () => {
    it('should return error when fields are empty', () => {
      const result = validate('', '', '', 'Signup')
      expect(result).toBe('Please fill out required fields.')
    })

    it('should return error when username is too short', () => {
      const result = validate('ab', 'Password1!', 'Password1!', 'Signup')
      expect(result).toBe('Username must be at least 3 characters.')
    })

    it('should return error when password does not meet requirements', () => {
      const result = validate('validuser', 'weak', 'weak', 'Signup')
      expect(result).toBe(
        'Password must be at least 6 characters, symbol, upper and lower case letters and a number.',
      )
    })

    it('should return error when password is missing uppercase letter', () => {
      const result = validate('validuser', 'password1!', 'password1!', 'Signup')
      expect(result).toBe(
        'Password must be at least 6 characters, symbol, upper and lower case letters and a number.',
      )
    })

    it('should return error when password is missing lowercase letter', () => {
      const result = validate('validuser', 'PASSWORD1!', 'PASSWORD1!', 'Signup')
      expect(result).toBe(
        'Password must be at least 6 characters, symbol, upper and lower case letters and a number.',
      )
    })

    it('should return error when password is missing number', () => {
      const result = validate('validuser', 'Password!', 'Password!', 'Signup')
      expect(result).toBe(
        'Password must be at least 6 characters, symbol, upper and lower case letters and a number.',
      )
    })

    it('should return error when password is missing symbol', () => {
      const result = validate('validuser', 'Password1', 'Password1', 'Signup')
      expect(result).toBe(
        'Password must be at least 6 characters, symbol, upper and lower case letters and a number.',
      )
    })

    it('should return error when password is too short', () => {
      const result = validate('validuser', 'Pas1!', 'Pas1!', 'Signup')
      expect(result).toBe(
        'Password must be at least 6 characters, symbol, upper and lower case letters and a number.',
      )
    })

    it('should return error when passwords do not match', () => {
      const result = validate('validuser', 'Password1!', 'Password2!', 'Signup')
      expect(result).toBe('Password and confirmed password do not match.')
    })

    it('should return empty string when all validations pass', () => {
      const result = validate('validuser', 'Password1!', 'Password1!', 'Signup')
      expect(result).toBe('')
    })

    it('should validate with minimum valid password', () => {
      const result = validate('usr', 'Pass1!', 'Pass1!', 'Signup')
      expect(result).toBe('')
    })
  })

  describe('Login validation', () => {
    it('should return error when username is empty', () => {
      const result = validate('', 'password', '', 'Login')
      expect(result).toBe('Username and password are required.')
    })

    it('should return error when password is empty', () => {
      const result = validate('username', '', '', 'Login')
      expect(result).toBe('Username and password are required.')
    })

    it('should return error when both fields are empty', () => {
      const result = validate('', '', '', 'Login')
      expect(result).toBe('Username and password are required.')
    })

    it('should return empty string when both fields are provided', () => {
      const result = validate('username', 'password', '', 'Login')
      expect(result).toBe('')
    })

    it('should not validate password strength for login', () => {
      const result = validate('username', 'weak', '', 'Login')
      expect(result).toBe('')
    })
  })
})
