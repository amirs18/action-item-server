import { Kysely, sql } from "kysely";

// name: Name;
// location: Location;
// login: Login;
// dob: DobOrRegistered;
// registered: DobOrRegistered;
// id: Id;
// picture: Picture;
// email: string;
// phone: string;
// gender: string;
// cell: string;
// nat: string;

export async function up(db: Kysely<any>): Promise<void> {
  db.schema
    .createTable("user")
    .addColumn("name", "jsonb", (col) => col.notNull())
    .addColumn("location", "jsonb")
    .addColumn("login", "jsonb")
    .addColumn("dob", "jsonb")
    .addColumn("registered", "jsonb")
    .addColumn("id", "jsonb")
    .addColumn("picture", "jsonb")
    .addColumn("email", "varchar(100)", (col) => col.unique())
    .addColumn("phone", "varchar(100)")
    .addColumn("gender", "varchar(50)", (col) => col.notNull())
    .addColumn("cell", "varchar")
    .addColumn("nat", "varchar")
    .addColumn("created_at", "timestamp", (col) =>
      col.defaultTo(sql`now()`).notNull()
    )
    .execute();
}

export async function down(db: Kysely<any>): Promise<void> {
  // Migration code
}
