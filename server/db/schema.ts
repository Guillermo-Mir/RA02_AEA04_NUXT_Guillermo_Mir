import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

export const users = sqliteTable("users", {
  id: integer("id").primaryKey(),
  name: text("name"),
  email: text("email").notNull(),
  login: text("login"),
  password: text("password"),
});

export const pokemons = sqliteTable("pokemons", {
  id: integer("id").primaryKey(),
  name: text("name"),
  type: text("type"),
  generation: integer("generation"),
  userId: integer("userId").notNull().references(()=> users.id, { onDelete: "cascade"}),
});