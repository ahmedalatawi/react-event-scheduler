import { AuthenticationError } from "apollo-server-express";
import { EventModel } from "../../models/event";
import { UserModel } from "../../models/user";
import { transformEvents } from "../../utils/events";

export const Events = {
    events: async (args, { isAuthorized, userId }) => {
        try {
            const events = await EventModel.find({ isPrivate: false });
            let privateEvents = [];

            if (isAuthorized && userId) {
                privateEvents = await EventModel.find({ isPrivate: true, createdBy: userId });
            }

            return [...events, ...privateEvents].map(transformEvents);
        } catch (err) {
            throw err;
        }
    },
    saveEvent: async ({ event: { id, title, start, end, isPrivate, description } }, { isAuthorized, userId }) => {
        if (!isAuthorized) {
            throw new AuthenticationError('Unauthenticated');
        }

        const user = await UserModel.findById(userId);

        if (!user) {
            throw new AuthenticationError('Unauthenticated');
        }

        try {
            const event = await EventModel.findOne({ _id: id, createdBy: userId });

            if (!event) {
                throw new AuthenticationError('Event could not be found');
            }

            let savedEvent;

            if (id) {
                await EventModel.findOneAndUpdate({ _id: id, createdBy: userId }, { title, start, end, isPrivate, description });

            } else {
                const event = new EventModel({
                    title,
                    start,
                    end,
                    isPrivate,
                    description,
                    createdBy: userId
                });

                savedEvent = await event.save();
            }

            return { id: id || savedEvent._id };
        } catch (err) {
            throw err;
        }
    },
    deleteEvent: async ({ id }, { isAuthorized, userId }) => {
        if (!isAuthorized) {
            throw new AuthenticationError('Unauthenticated');
        }

        const user = await UserModel.findById(userId);

        if (!user) {
            throw new AuthenticationError('Unauthenticated');
        }

        try {
            const event = await EventModel.findOne({ _id: id, createdBy: userId });

            if (!event) {
                throw new Error('Event could not be found');
            }

            await EventModel.deleteOne({ _id: id, createdBy: userId });

            return true;
        } catch (err) {
            throw err;
        }
    }
};
