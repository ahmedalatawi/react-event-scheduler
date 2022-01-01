import { Auth } from './auth';
import { Events } from './events';

export const rootValue = {
    ...Auth,
    ...Events
};
