import * as userTable from "./user.js";

export * from "./user.js";

export const schema = {
  ...userTable,
};

export type DbSchema = typeof schema;
