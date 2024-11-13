export interface ILoginEventArgs {
  username: string
  password: string
}
export interface ILoginEvent {
  login: (args: ILoginEventArgs) => void
}
