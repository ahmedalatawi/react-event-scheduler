import jwt from 'jsonwebtoken';
import { constants } from '../config/constants';

const { JWT_SECRET } = constants;

export const context = ({ req, res }) => {
  const auth = req.cookies['auth'] ? JSON.parse(req.cookies['auth']) : '';

  if (!auth) {
    req.isAuthorized = false;
    return req;
  }

  let decodedToken;

  try {
    decodedToken = jwt.verify(auth.token, JWT_SECRET);
  } catch (err) {
    req.isAuthorized = false;
    return req;
  }

  if (!decodedToken) {
    req.isAuthorized = false;
    return req;
  }

  req.isAuthorized = true;
  req.userId = decodedToken.userId;

  return req;
};
