import { GraphQLError } from 'graphql'
import { UserModel } from '../../models/user'
import { IAuthParams } from '../../interfaces/types'
import { UserInputFull } from '../../../src/generated/graphql'

export const Users = {
  getUser: async (
    { id }: { id: string },
    { isAuthorized, userId }: IAuthParams,
  ) => {
    if (!isAuthorized) {
      throw new GraphQLError('Unauthenticated')
    }

    const user = await UserModel.findById(userId)

    if (!user) {
      throw new GraphQLError('Unauthenticated')
    }

    if (id !== userId) {
      throw new GraphQLError('Profile not found')
    }

    // const full = await UserModel.findOne({ _id: id }).populate('address');

    return user
  },
  saveUser: async (
    {
      user: { _id, username, firstName, lastName, email, phoneNumber, bio },
    }: { user: UserInputFull },
    { isAuthorized, userId }: IAuthParams,
  ) => {
    if (!isAuthorized) {
      throw new GraphQLError('Unauthenticated')
    }

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
  },
}
