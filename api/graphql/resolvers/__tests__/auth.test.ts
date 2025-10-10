import { Auth } from '../auth'
import { UserModel } from '../../../models/user'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { GraphQLError } from 'graphql'

jest.mock('../../../models/user')
jest.mock('bcryptjs')
jest.mock('jsonwebtoken')

describe('Auth Resolvers', () => {
  const mockUserId = 'user123'
  const mockUsername = 'testuser'
  const mockPassword = 'Password1!'
  const mockHashedPassword = 'hashed_password'
  const mockToken = 'mock_jwt_token'

  beforeEach(() => {
    jest.clearAllMocks()
    process.env.JWT_SECRET = 'test_secret'
  })

  describe('signup', () => {
    it('should create a new user and return auth data', async () => {
      const userInput = {
        username: mockUsername,
        password: mockPassword,
        confirmPassword: mockPassword,
      }

      jest.mocked(UserModel.findOne).mockResolvedValue(null)
      jest.mocked(bcrypt.hash).mockResolvedValue(mockHashedPassword as never)
      jest.mocked(jwt.sign).mockReturnValue(mockToken as never)

      const mockSavedUser = {
        _id: mockUserId,
        username: mockUsername,
        password: mockHashedPassword,
        save: jest.fn().mockResolvedValue(true),
      }

      jest.mocked(UserModel).mockImplementation(
        () => mockSavedUser as never,
      )

      const result = await Auth.signup({ userInput })

      expect(UserModel.findOne).toHaveBeenCalledWith({
        username: mockUsername,
      })
      expect(bcrypt.hash).toHaveBeenCalledWith(mockPassword, 12)
      expect(jwt.sign).toHaveBeenCalledWith(
        { userId: mockUserId, username: mockUsername },
        'test_secret',
        { expiresIn: '1h' },
      )
      expect(result).toEqual({
        userId: mockUserId,
        token: mockToken,
        tokenExpiration: 60,
        username: mockUsername,
      })
    })

    it('should throw error when username already exists', async () => {
      const userInput = {
        username: mockUsername,
        password: mockPassword,
        confirmPassword: mockPassword,
      }

      jest.mocked(UserModel.findOne).mockResolvedValue({
        username: mockUsername,
      } as never)

      await expect(Auth.signup({ userInput })).rejects.toThrow(
        'Username is already being used, please try a different username.',
      )
    })

    it('should throw error when username is too short', async () => {
      const userInput = {
        username: 'ab',
        password: mockPassword,
        confirmPassword: mockPassword,
      }

      jest.mocked(UserModel.findOne).mockResolvedValue(null)

      await expect(Auth.signup({ userInput })).rejects.toThrow(
        'Username must be at least 3 characters.',
      )
    })

    it('should throw error when password does not meet requirements', async () => {
      const userInput = {
        username: mockUsername,
        password: 'weak',
        confirmPassword: 'weak',
      }

      jest.mocked(UserModel.findOne).mockResolvedValue(null)

      await expect(Auth.signup({ userInput })).rejects.toThrow(
        'Password does not meet password requirements.',
      )
    })

    it('should throw error when passwords do not match', async () => {
      const userInput = {
        username: mockUsername,
        password: mockPassword,
        confirmPassword: 'DifferentPassword1!',
      }

      jest.mocked(UserModel.findOne).mockResolvedValue(null)

      await expect(Auth.signup({ userInput })).rejects.toThrow(
        'Password and confirm password do not match.',
      )
    })

    it('should throw error when JWT_SECRET is not provided', async () => {
      delete process.env.JWT_SECRET

      const userInput = {
        username: mockUsername,
        password: mockPassword,
        confirmPassword: mockPassword,
      }

      jest.mocked(UserModel.findOne).mockResolvedValue(null)
      jest.mocked(bcrypt.hash).mockResolvedValue(mockHashedPassword as never)

      const mockSavedUser = {
        _id: mockUserId,
        username: mockUsername,
        password: mockHashedPassword,
        save: jest.fn().mockResolvedValue(true),
      }

      jest.mocked(UserModel).mockImplementation(
        () => mockSavedUser as never,
      )

      await expect(Auth.signup({ userInput })).rejects.toThrow(
        'getJwtToken: JWT_SECRET is not provided!',
      )
    })
  })

  describe('login', () => {
    it('should authenticate user and return auth data', async () => {
      const loginInput = {
        username: mockUsername,
        password: mockPassword,
      }

      const mockUser = {
        _id: mockUserId,
        username: mockUsername,
        password: mockHashedPassword,
      }

      jest.mocked(UserModel.findOne).mockResolvedValue(mockUser as never)
      jest.mocked(bcrypt.compare).mockResolvedValue(true as never)
      jest.mocked(jwt.sign).mockReturnValue(mockToken as never)

      const result = await Auth.login({ loginInput })

      expect(UserModel.findOne).toHaveBeenCalledWith({
        username: mockUsername,
      })
      expect(bcrypt.compare).toHaveBeenCalledWith(
        mockPassword,
        mockHashedPassword,
      )
      expect(jwt.sign).toHaveBeenCalledWith(
        { userId: mockUserId, username: mockUsername },
        'test_secret',
        { expiresIn: '1h' },
      )
      expect(result).toEqual({
        userId: mockUserId,
        token: mockToken,
        tokenExpiration: 60,
        username: mockUsername,
      })
    })

    it('should throw error when user does not exist', async () => {
      const loginInput = {
        username: 'nonexistent',
        password: mockPassword,
      }

      jest.mocked(UserModel.findOne).mockResolvedValue(null)

      await expect(Auth.login({ loginInput })).rejects.toThrow(
        GraphQLError,
      )
      await expect(Auth.login({ loginInput })).rejects.toThrow(
        'Username or password is incorrect',
      )
    })

    it('should throw error when password is incorrect', async () => {
      const loginInput = {
        username: mockUsername,
        password: 'wrongpassword',
      }

      const mockUser = {
        _id: mockUserId,
        username: mockUsername,
        password: mockHashedPassword,
      }

      jest.mocked(UserModel.findOne).mockResolvedValue(mockUser as never)
      jest.mocked(bcrypt.compare).mockResolvedValue(false as never)

      await expect(Auth.login({ loginInput })).rejects.toThrow(
        GraphQLError,
      )
      await expect(Auth.login({ loginInput })).rejects.toThrow(
        'Username or password is incorrect',
      )
    })
  })
})
