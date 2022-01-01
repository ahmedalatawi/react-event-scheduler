import { IEvent } from "../interfaces/types";

export const transformEvents = (event: IEvent) => {
    return {
        ...event['_doc'],
        id: event.id
    };
};
