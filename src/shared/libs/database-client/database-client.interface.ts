export interface IDatabaseClientEntity {
  connect(uri: string): Promise<void>;
  disconnect(): Promise<void>;
}
