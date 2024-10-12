import * as userSchema from "./user";

export * from "./user";

export const schema = {
  ...userSchema,
};

export type DbSchema = typeof schema;
