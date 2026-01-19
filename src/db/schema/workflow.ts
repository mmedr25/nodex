import { pgTable, timestamp, uuid, varchar } from "drizzle-orm/pg-core";

import { users } from "./auth";
import { id } from "..";

export const workflows = pgTable("workflows", {
    id,
    userId: uuid().references(() => users.id, {onDelete: "cascade"}),
    name: varchar({ length: 256 }).notNull(),
    createdAt: timestamp().defaultNow().notNull(),
    updatedAt: timestamp()
        .defaultNow()
        .$onUpdate(() => /* @__PURE__ */ new Date())
        .notNull(),
})