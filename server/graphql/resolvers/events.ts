import { EventModel } from "../../models/event";
import { transformEvent } from "../../utils/transforms";

export const Events = {
    events: async () => {
        try {
            const events = await EventModel.find();

            return events.map(event => transformEvent(event)).reverse();
        } catch (err) {
            throw err;
        }
    },
    saveEvent: async (args, req) => {
        const { id, title, start, end, description } = args.event;

        try {
            let savedEvent;

            if (id) {
                await EventModel.findOneAndUpdate({ _id: id }, { title, start, end, description });

            } else {
                const event = new EventModel({
                    title,
                    start,
                    end,
                    description
                });

                savedEvent = await event.save();
            }

            return { id: id || savedEvent._id };
        } catch (err) {
            throw err;
        }
    },
    deleteEvent: async (args, req) => {
        try {
            const event = await EventModel.findOne({ _id: args.id });
            if (!event) {
                throw new Error('Event could not be found!');
            }

            await EventModel.deleteOne({ _id: args.id });

            return true;
        } catch (err) {
            throw err;
        }
    }
};
