import {
  PostgresDialect,
  Kysely,
  Migrator,
  FileMigrationProvider,
  NO_MIGRATIONS,
} from "kysely";
import path from "path";
import { Pool } from "pg";
import { Database } from "./src/db/types";
import { promises as fs } from "fs";
require("dotenv").config({ path: "./.env" });

async function migrateToLatest() {
  const dialect = new PostgresDialect({
    pool: new Pool({
      database: process.env.POSTGRES_DATABASE,
      host: process.env.POSTGRES_HOST,
      user: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      port: Number.isNaN(parseInt(process.env.POSTGRES_PORT as string))
        ? undefined
        : parseInt(process.env.POSTGRES_PORT as string),
      max: 10,
      ssl: process.env.NODE_ENV === "production" ? true : false,
    }),
  });
  const db = new Kysely<Database>({
    dialect,
  });

  if (process.env.RESET_DATABASE === "1") {
    await db.schema.dropSchema("public").cascade().ifExists().execute();
    db.schema.createSchema("public").execute();
  }
  const migrator = new Migrator({
    db: db.withSchema("public"),
    provider: new FileMigrationProvider({
      fs,
      path,
      migrationFolder: path.join(__dirname, "./migrations"),
    }),
  });

  const { error, results } = await migrator.migrateToLatest();

  results?.forEach((it) => {
    if (it.status === "Success") {
      console.log(`migration "${it.migrationName}" was executed successfully`);
    } else if (it.status === "Error") {
      console.error(`failed to execute migration "${it.migrationName}"`);
    }
  });

  if (error) {
    console.error("failed to migrate");
    console.error(error);
    process.exit(1);
  }

  await db.destroy();
}

migrateToLatest();
