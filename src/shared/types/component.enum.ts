export const Component = {
  RestApplication: Symbol.for('RestApplication'),
  ILoggerEntity: Symbol.for('ILoggerEntity'),
  IConfigEntity: Symbol.for('IConfigEntity'),
  IDatabaseClientEntity: Symbol.for('IDatabaseClientEntity'),
  UserService: Symbol.for('UserService'),
  UserModel: Symbol.for('UserModel'),
  PropertyService: Symbol.for('PropertyService'),
  PropertyModel: Symbol.for('PropertyModel'),
} as const;
