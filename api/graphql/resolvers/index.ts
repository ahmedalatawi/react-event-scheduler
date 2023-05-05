import { Auth } from './auth'
import { Events } from './events'
import { Users } from './users'

export const rootValue = {
  ...Auth,
  ...Events,
  ...Users,
}
