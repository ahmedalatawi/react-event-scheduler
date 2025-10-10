import { validatePassword } from '../validations'

describe('Validations', () => {
  describe('validatePassword', () => {
    it('should return true for valid password', () => {
      expect(validatePassword('Password1!')).toBe(true)
    })

    it('should return false when password is too short', () => {
      expect(validatePassword('Pass1!')).toBe(false)
    })

    it('should return false when password has no uppercase letter', () => {
      expect(validatePassword('password1!')).toBe(false)
    })

    it('should return false when password has no lowercase letter', () => {
      expect(validatePassword('PASSWORD1!')).toBe(false)
    })

    it('should return false when password has no number', () => {
      expect(validatePassword('Password!')).toBe(false)
    })

    it('should return false when password has no special character', () => {
      expect(validatePassword('Password1')).toBe(false)
    })

    it('should accept various special characters', () => {
      expect(validatePassword('Password1!')).toBe(true)
      expect(validatePassword('Password1@')).toBe(true)
      expect(validatePassword('Password1#')).toBe(true)
      expect(validatePassword('Password1$')).toBe(true)
      expect(validatePassword('Password1%')).toBe(true)
      expect(validatePassword('Password1^')).toBe(true)
      expect(validatePassword('Password1&')).toBe(true)
      expect(validatePassword('Password1*')).toBe(true)
    })

    it('should accept password exactly 6 characters long', () => {
      expect(validatePassword('Pass1!')).toBe(false)
      expect(validatePassword('Pass12!')).toBe(true)
    })

    it('should accept password with multiple uppercase letters', () => {
      expect(validatePassword('PASSWORD1!')).toBe(false)
      expect(validatePassword('PaSsWoRd1!')).toBe(true)
    })

    it('should accept password with multiple numbers', () => {
      expect(validatePassword('Password123!')).toBe(true)
    })

    it('should accept password with multiple special characters', () => {
      expect(validatePassword('Password1!@#')).toBe(true)
    })

    it('should return false for empty string', () => {
      expect(validatePassword('')).toBe(false)
    })

    it('should return false for only special characters', () => {
      expect(validatePassword('!@#$%^&*')).toBe(false)
    })

    it('should return false for only numbers', () => {
      expect(validatePassword('12345678')).toBe(false)
    })

    it('should return false for only letters', () => {
      expect(validatePassword('Password')).toBe(false)
    })

    it('should accept long valid password', () => {
      expect(
        validatePassword('VeryLongPassword123!WithManyCharacters'),
      ).toBe(true)
    })
  })
})
