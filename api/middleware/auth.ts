import jwt, { JwtPayload } from 'jsonwebtoken'
import { constants } from '../config/constants'
import { Request } from 'express'
import { IAuthParams } from '../interfaces/types'

const { JWT_SECRET } = constants

export const context = async ({ req }: { req: Request }) => {
  const auth = req.cookies['auth'] ? JSON.parse(req.cookies['auth']) : ''
  const customReq = req as Request & IAuthParams

  if (!auth) {
    customReq.isAuthorized = false
    return customReq
  }

  let decodedToken

  try {
    decodedToken = jwt.verify(auth.token, JWT_SECRET)
  } catch (err) {
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
