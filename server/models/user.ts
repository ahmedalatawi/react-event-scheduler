import { Schema, model } from 'mongoose';
import { IUser } from '../interfaces/types';

const schema = new Schema<IUser>({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    createdEvents: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Event'
        }
    ]
});

export const UserModel = model<IUser>('User', schema);
