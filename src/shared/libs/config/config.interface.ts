export interface IConfigEntity<U> {
  get<T extends keyof U>(key: T): U[T];
}
