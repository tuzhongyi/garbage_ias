export interface IStorage<T> {
  key: string
  get(): T
  save(v: T): void
  clear(): void
}
