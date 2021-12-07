import { Schema, model } from 'mongoose';
import { IEvent } from '../interfaces/types';

const schema = new Schema<IEvent>({
    title: {
        type: String,
        required: true
    },
    start: {
        type: String,
        required: true
    },
    end: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    }
});

export const EventModel = model<IEvent>('Event', schema);
