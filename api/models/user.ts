import { Schema, model } from 'mongoose'
import { IUser } from '../interfaces/types'

const schema = new Schema<IUser>(
  {
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
      required: false,
    },
    lastName: {
      type: String,
      required: false,
    },
    email: {
      type: String,
      required: false,
    },
    phoneNumber: {
      type: String,
      required: false,
    },
    bio: {
      type: String,
      required: false,
    },
    createdEvents: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Event',
      },
    ],
  },
  { timestamps: true },
)

export const UserModel = model<IUser>('User', schema)
