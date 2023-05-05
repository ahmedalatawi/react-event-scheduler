import { GraphQLError } from 'graphql'
import { UserModel } from '../../models/user'

export const Users = {
  getUser: async ({ id }, { isAuthorized, userId }) => {
    if (!isAuthorized) {
      throw new GraphQLError('Unauthenticated')
    }

    try {
      const user = await UserModel.findById(userId)

      if (!user) {
        throw new GraphQLError('Unauthenticated')
      }

      if (id !== userId) {
        throw new GraphQLError('Profile not found')
      }

      // const full = await UserModel.findOne({ _id: id }).populate('address');

      return user
    } catch (err) {
      throw err
    }
  },
  saveUser: async (
    { user: { _id, username, firstName, lastName, email, phoneNumber, bio } },
    { isAuthorized, userId },
  ) => {
    if (!isAuthorized) {
      throw new GraphQLError('Unauthenticated')
    }

    try {
      const user = await UserModel.findById(userId)

      if (!user) {
        throw new GraphQLError('Unauthenticated')
      }

      if (_id !== userId) {
        throw new GraphQLError('Unauthenticated')
      }

      if (!username) {
        throw new Error('Username is required')
      }

      const userByUsername = await UserModel.findOne({ username })

      if (userByUsername && userByUsername._id.toString() !== _id) {
        throw new Error(
          `"${username}" is already being used, please try a different username.`,
        )
      }

      const updatedUser = await UserModel.findOneAndUpdate(
        { _id },
        { username, firstName, lastName, email, phoneNumber, bio },
        { new: true },
      )

      return updatedUser
    } catch (err) {
      throw err
    }
  },
}
