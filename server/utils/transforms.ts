export const transformEvent = event => {
    return {
        ...event._doc,
        id: event.id
    };
};
