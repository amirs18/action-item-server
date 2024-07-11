import { Database } from "../db/types"; // this is the Database interface we defined earlier
import { Pool } from "pg";
import { promises as fs } from "fs";
import path from "path";
import {
  FileMigrationProvider,
  Kysely,
  Migrator,
  PostgresDialect,
} from "kysely";
require("dotenv").config({ path: "./.env" });

const dialect = new PostgresDialect({
  pool: new Pool({
    database: process.env.POSTGRES_DATABASE,
    host: process.env.POSTGRES_HOST,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    port: Number.isNaN(parseInt(process.env.POSTGRES_PORT as string))
      ? undefined
      : parseInt(process.env.POSTGRES_PORT as string),
  }),
});

// Database interface is passed to Kysely's constructor, and from now on, Kysely
// knows your database structure.
// Dialect is passed to Kysely's constructor, and from now on, Kysely knows how
// to communicate with your database.
export const db = new Kysely<Database>({
  dialect,
});
