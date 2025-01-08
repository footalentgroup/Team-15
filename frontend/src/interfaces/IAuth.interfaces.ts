export interface IAuth {
  refresh_token: string
  access_token: string
  user: IUser
}

export interface IUser {
  id: number
  username: string
  first_name: string
  last_name: string
  email: string
  role: string
}
