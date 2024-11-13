import { User } from '../../data-core/models/user/user.model'

export interface UserManagerListTableEvent {
  select(datas: User[]): void
  modify: (id: string) => void
}
export interface UserManagerListEvent {
  create(): void
  delete(ids: string[]): void
}
