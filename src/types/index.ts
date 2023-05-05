export interface IEvent {
  id?: string
  title: string
  start: string
  end: string
  url?: string
  isPrivate: boolean
  description: string
  createdBy?: string
  subtitle?: string
  createdAt?: string
  updatedAt?: string
}

export interface ISignupInput {
  username: string
  password: string
  confirmPassword: string
}

export interface IAuth {
  userId: string
  username: string
  token: string
  tokenExpiration?: number
}
