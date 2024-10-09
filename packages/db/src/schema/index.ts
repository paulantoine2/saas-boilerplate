import * as userSchema from "./user.js";

export * from "./user.js";

export const schema = {
  ...userSchema,
};

export type DbSchema = typeof schema;
