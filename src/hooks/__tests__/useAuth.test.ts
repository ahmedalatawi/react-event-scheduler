import useAuth from '../useAuth'
import Cookies from 'js-cookie'
import type { IAuth } from '@/types'

jest.mock('js-cookie')

describe('useAuth', () => {
  const mockAuth: IAuth = {
    userId: 'user123',
    username: 'testuser',
    token: 'test-token',
    tokenExpiration: 60,
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('addAuth', () => {
    it('should set auth cookie with correct expiration', () => {
      const { addAuth } = useAuth()
      const mockSet = jest.mocked(Cookies.set)

      addAuth(mockAuth)

      expect(mockSet).toHaveBeenCalledWith(
        'auth',
        JSON.stringify(mockAuth),
        expect.objectContaining({
          expires: expect.any(Date),
        }),
      )
    })

    it('should calculate expiration date correctly', () => {
      const { addAuth } = useAuth()
      const mockSet = jest.mocked(Cookies.set)
      const startTime = new Date().getTime()

      addAuth(mockAuth)

      const expiresArg = mockSet.mock.calls[0][2]?.expires as Date
      const expiresTime = expiresArg.getTime()
      const expectedTime = startTime + mockAuth.tokenExpiration! * 60 * 1000

      expect(expiresTime).toBeGreaterThanOrEqual(expectedTime - 100)
      expect(expiresTime).toBeLessThanOrEqual(expectedTime + 100)
    })

    it('should handle auth without tokenExpiration', () => {
      const { addAuth } = useAuth()
      const mockSet = jest.mocked(Cookies.set)
      const authWithoutExpiration = { ...mockAuth, tokenExpiration: undefined }

      addAuth(authWithoutExpiration)

      expect(mockSet).toHaveBeenCalled()
    })
  })

  describe('getAuth', () => {
    it('should return parsed auth from cookie', () => {
      const mockGet = jest.mocked(Cookies.get)
      mockGet.mockReturnValue(JSON.stringify(mockAuth) as never)

      const { getAuth } = useAuth()
      const result = getAuth()

      expect(mockGet).toHaveBeenCalledWith('auth')
      expect(result).toEqual(mockAuth)
    })

    it('should return null when cookie does not exist', () => {
      const mockGet = jest.mocked(Cookies.get)
      mockGet.mockReturnValue(undefined as never)

      const { getAuth } = useAuth()
      const result = getAuth()

      expect(result).toBeNull()
    })

    it('should handle invalid JSON in cookie', () => {
      const mockGet = jest.mocked(Cookies.get)
      mockGet.mockReturnValue('invalid-json' as never)

      const { getAuth } = useAuth()

      expect(() => getAuth()).toThrow()
    })
  })

  describe('removeAuth', () => {
    it('should remove auth cookie', () => {
      const mockRemove = jest.mocked(Cookies.remove)

      const { removeAuth } = useAuth()
      removeAuth()

      expect(mockRemove).toHaveBeenCalledWith('auth')
    })
  })
})
