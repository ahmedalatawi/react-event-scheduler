import jwt, { type JwtPayload } from 'jsonwebtoken'
import type { Request } from 'express'
import type { IAuthParams } from '../interfaces/types'

export const context = async ({ req }: { req: Request }) => {
  const auth = req.cookies['auth'] ? JSON.parse(req.cookies['auth']) : ''
  const customReq = req as Request & IAuthParams

  if (!auth) {
    customReq.isAuthorized = false
    return customReq
  }

  let decodedToken

  try {
    if (!process.env.JWT_SECRET) throw new Error('JWT_SECRET is not provided!')

    decodedToken = jwt.verify(auth.token, process.env.JWT_SECRET)
  } catch (err) {
    console.error('Error verifying JWT:', err)
    customReq.isAuthorized = false
    return customReq
  }

  if (!decodedToken) {
    customReq.isAuthorized = false
    return customReq
  }

  customReq.isAuthorized = true
  customReq.userId = (decodedToken as JwtPayload).userId

  return customReq
}
