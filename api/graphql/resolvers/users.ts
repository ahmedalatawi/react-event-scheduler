import { AuthenticationError } from 'apollo-server-express';
import { UserModel } from '../../models/user';

export const Users = {
  getUser: async ({ id }, { isAuthorized, userId }) => {
    if (!isAuthorized) {
      throw new AuthenticationError('Unauthenticated');
    }

    try {
      const user = await UserModel.findById(userId);

      if (!user) {
        throw new AuthenticationError('Unauthenticated');
      }

      if (id !== userId) {
        throw new AuthenticationError('Profile not found');
      }

      // const full = await UserModel.findOne({ _id: id }).populate('address');

      return user;
    } catch (err) {
      throw err;
    }
  },
  saveUser: async (
    { user: { _id, username, firstName, lastName, email, phoneNumber, bio } },
    { isAuthorized, userId }
  ) => {
    if (!isAuthorized) {
      throw new AuthenticationError('Unauthenticated');
    }

    try {
      const user = await UserModel.findById(userId);

      if (!user) {
        throw new AuthenticationError('Unauthenticated');
      }

      if (_id !== userId) {
        throw new AuthenticationError('Unauthenticated');
      }

      if (!username) {
        throw new Error('Username is required');
      }

      const userByUsername = await UserModel.findOne({ username });

      if (userByUsername && userByUsername._id.toString() !== _id) {
        throw new Error(
          `"${username}" is already being used, please try a different username.`
        );
      }

      const updatedUser = await UserModel.findOneAndUpdate(
        { _id },
        { username, firstName, lastName, email, phoneNumber, bio },
        { new: true }
      );

      return updatedUser;
    } catch (err) {
      throw err;
    }
  },
};
