import { GraphQLError } from 'graphql'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { constants } from '../../config/constants'
import { UserModel } from '../../models/user'
import { validatePassword } from '../../utils/validations'
import { LoginInput, UserInput } from '../../../src/generated/graphql'

const { JWT_SECRET } = constants

export const Auth = {
  signup: async ({
    userInput: { username, password, confirmPassword },
  }: {
    userInput: UserInput
  }) => {
    const userExist = await UserModel.findOne({ username })

    if (userExist) {
      throw new Error(
        'Username is already being used, please try a different username.',
      )
    }

    if (username.length < 3) {
      throw new Error('Username must be at least 3 characters.')
    }

    if (!validatePassword(password)) {
      throw new Error('Password does not meet password requirements.')
    }

    if (password !== confirmPassword) {
      throw new Error('Password and confirm password do not match.')
    }

    const hashedPassword = await bcrypt.hash(password, 12)

    const user = new UserModel({ username, password: hashedPassword })

    const savedUser = await user.save()

    const token = jwt.sign(
      { userId: savedUser._id, username: savedUser.username },
      JWT_SECRET,
      { expiresIn: '1h' },
    )

    return {
      userId: savedUser._id,
      token,
      tokenExpiration: 60,
      username: savedUser.username,
    }
  },
  login: async ({
    loginInput: { username, password },
  }: {
    loginInput: LoginInput
  }) => {
    const ERROR_MESSAGE = 'Username or password is incorrect'

    const user = await UserModel.findOne({ username })

    if (!user) {
      throw new GraphQLError(ERROR_MESSAGE)
    }

    const correctPassword = await bcrypt.compare(password, user.password)

    if (!correctPassword) {
      throw new GraphQLError(ERROR_MESSAGE)
    }

    const token = jwt.sign(
      { userId: user._id, username: user.username },
      JWT_SECRET,
      { expiresIn: '1h' },
    )

    return {
      userId: user._id,
      token,
      tokenExpiration: 60,
      username: user.username,
    }
  },
}
