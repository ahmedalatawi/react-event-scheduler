import { context } from '../auth'
import jwt from 'jsonwebtoken'
import type { Request } from 'express'

jest.mock('jsonwebtoken')

describe('Auth Middleware', () => {
  const mockJwtSecret = 'test_secret'

  beforeEach(() => {
    jest.clearAllMocks()
    process.env.JWT_SECRET = mockJwtSecret
  })

  afterEach(() => {
    delete process.env.JWT_SECRET
  })

  it('should set isAuthorized to false when no auth cookie', async () => {
    const mockReq = {
      cookies: {},
    } as unknown as Request

    const result = await context({ req: mockReq })

    expect(result.isAuthorized).toBe(false)
    expect(result.userId).toBeUndefined()
  })

  it('should set isAuthorized to false when auth cookie is empty string', async () => {
    const mockReq = {
      cookies: {
        auth: '',
      },
    } as unknown as Request

    const result = await context({ req: mockReq })

    expect(result.isAuthorized).toBe(false)
  })

  it('should verify JWT and set user data when token is valid', async () => {
    const mockAuth = {
      token: 'valid_token',
      userId: 'user123',
    }

    const mockReq = {
      cookies: {
        auth: JSON.stringify(mockAuth),
      },
    } as unknown as Request

    const mockDecodedToken = {
      userId: 'user123',
      username: 'testuser',
    }

    jest.mocked(jwt.verify).mockReturnValue(mockDecodedToken as never)

    const result = await context({ req: mockReq })

    expect(jwt.verify).toHaveBeenCalledWith('valid_token', mockJwtSecret)
    expect(result.isAuthorized).toBe(true)
    expect(result.userId).toBe('user123')
  })

  it('should set isAuthorized to false when JWT verification fails', async () => {
    const mockAuth = {
      token: 'invalid_token',
    }

    const mockReq = {
      cookies: {
        auth: JSON.stringify(mockAuth),
      },
    } as unknown as Request

    jest.mocked(jwt.verify).mockImplementation(() => {
      throw new Error('Invalid token')
    })

    const consoleErrorSpy = jest
      .spyOn(console, 'error')
      .mockImplementation(() => {})

    const result = await context({ req: mockReq })

    expect(result.isAuthorized).toBe(false)
    expect(result.userId).toBeUndefined()
    expect(consoleErrorSpy).toHaveBeenCalledWith(
      'Error verifying JWT:',
      expect.any(Error),
    )

    consoleErrorSpy.mockRestore()
  })

  it('should set isAuthorized to false when JWT_SECRET is not provided', async () => {
    delete process.env.JWT_SECRET

    const mockAuth = {
      token: 'valid_token',
    }

    const mockReq = {
      cookies: {
        auth: JSON.stringify(mockAuth),
      },
    } as unknown as Request

    const consoleErrorSpy = jest
      .spyOn(console, 'error')
      .mockImplementation(() => {})

    const result = await context({ req: mockReq })

    expect(result.isAuthorized).toBe(false)
    expect(consoleErrorSpy).toHaveBeenCalled()

    consoleErrorSpy.mockRestore()
  })

  it('should set isAuthorized to false when decoded token is null', async () => {
    const mockAuth = {
      token: 'valid_token',
    }

    const mockReq = {
      cookies: {
        auth: JSON.stringify(mockAuth),
      },
    } as unknown as Request

    jest.mocked(jwt.verify).mockReturnValue(null as never)

    const result = await context({ req: mockReq })

    expect(result.isAuthorized).toBe(false)
    expect(result.userId).toBeUndefined()
  })

  it('should handle malformed auth cookie JSON', async () => {
    const mockReq = {
      cookies: {
        auth: 'invalid-json',
      },
    } as unknown as Request

    await expect(context({ req: mockReq })).rejects.toThrow()
  })

  it('should extract userId from decoded JWT payload', async () => {
    const mockAuth = {
      token: 'valid_token',
    }

    const mockReq = {
      cookies: {
        auth: JSON.stringify(mockAuth),
      },
    } as unknown as Request

    const mockDecodedToken = {
      userId: 'user456',
      username: 'anotheruser',
      iat: 1234567890,
      exp: 1234567890,
    }

    jest.mocked(jwt.verify).mockReturnValue(mockDecodedToken as never)

    const result = await context({ req: mockReq })

    expect(result.userId).toBe('user456')
    expect(result.isAuthorized).toBe(true)
  })
})
