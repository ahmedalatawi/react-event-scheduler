import { AuthenticationError } from 'apollo-server-express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { constants } from '../../config/constants';
import { UserModel } from '../../models/user';
import { validatePassword } from '../../utils/validations';

const { JWT_SECRET } = constants;

export const Auth = {
  signup: async (
    { userInput: { username, password, confirmPassword } },
    { isAuthorized }
  ) => {
    try {
      const userExist = await UserModel.findOne({ username });

      if (userExist) {
        throw new Error(
          'Username is already being used, please try a different username.'
        );
      }

      if (username.length < 3) {
        throw new Error('Username must be at least 3 characters.');
      }

      if (!validatePassword(password)) {
        throw new Error("Password doesn't meet password requirements.");
      }

      if (password !== confirmPassword) {
        throw new Error("Password and confirm password don't match.");
      }

      const hashedPassword = await bcrypt.hash(password, 12);

      const user = new UserModel({ username, password: hashedPassword });

      const savedUser = await user.save();

      const token = jwt.sign(
        { userId: savedUser._id, username: savedUser.username },
        JWT_SECRET,
        { expiresIn: '1h' }
      );

      return {
        userId: savedUser._id,
        token,
        tokenExpiration: 60,
        username: savedUser.username,
      };
    } catch (err) {
      throw err;
    }
  },
  login: async ({ loginInput: { username, password } }, { isAuthorized }) => {
    const ERROR_MESSAGE = 'Username or password is incorrect';

    try {
      const user = await UserModel.findOne({ username });

      if (!user) {
        throw new AuthenticationError(ERROR_MESSAGE);
      }

      const correctPassword = await bcrypt.compare(password, user.password);

      if (!correctPassword) {
        throw new AuthenticationError(ERROR_MESSAGE);
      }

      const token = jwt.sign(
        { userId: user._id, username: user.username },
        JWT_SECRET,
        { expiresIn: '1h' }
      );

      return {
        userId: user._id,
        token,
        tokenExpiration: 60,
        username: user.username,
      };
    } catch (err) {
      throw err;
    }
  },
};
