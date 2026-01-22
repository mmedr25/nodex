import { json, pgEnum, pgTable, text, timestamp, unique, uuid, varchar } from "drizzle-orm/pg-core";

import { users } from "./auth";
import { id } from "..";
import { relations } from "drizzle-orm";

export const workflows = pgTable("workflows", {
    id,
    userId: uuid().references(() => users.id, { onDelete: "cascade" }),
    name: varchar({ length: 256 }).notNull(),
    createdAt: timestamp().defaultNow().notNull(),
    updatedAt: timestamp()
        .defaultNow()
        .$onUpdate(() => /* @__PURE__ */ new Date())
        .notNull(),
})


export const nodeType = pgEnum('type', ['INITIAL']);
export const nodes = pgTable("nodes", {
    id,
    workflowId: uuid().references(() => workflows.id, { onDelete: "cascade" }),
    name: text().notNull(),
    type: nodeType().default("INITIAL").notNull(),
    position: json().notNull(),
    data: json().default({}),
    createdAt: timestamp().defaultNow().notNull(),
    updatedAt: timestamp()
        .defaultNow()
        .$onUpdate(() => /* @__PURE__ */ new Date())
        .notNull(),
})

export const connections = pgTable(
    "connections",
    {
        id,
        workflowId: uuid().references(() => workflows.id, { onDelete: "cascade" }),
        fromNodeId: uuid().references(() => nodes.id, { onDelete: "cascade" }),
        toNodeId: uuid().references(() => nodes.id, { onDelete: "cascade" }),
        createdAt: timestamp().defaultNow().notNull(),
        updatedAt: timestamp()
            .defaultNow()
            .$onUpdate(() => /* @__PURE__ */ new Date())
            .notNull(),
    },
    (t) => [
        unique('from_to_node_idx').on(t.fromNodeId, t.toNodeId),
    ]
)


// orm relations
export const workflowRelations = relations(workflows, ({ many }) => ({
    nodes: many(nodes),
    connections: many(connections),
}));

export const nodeRelations = relations(nodes, ({ many }) => ({
    outputConnections: many(connections, {
        relationName: 'fromNode',
    }),
    inputConnections: many(connections, {
        relationName: 'toNode',
    }),
}));

export const connectionRelations = relations(connections, ({ one }) => ({
  fromNode: one(nodes, {
    fields: [connections.fromNodeId],
    references: [nodes.id],
    relationName: 'fromNode',
  }),
  toNode: one(nodes, {
    fields: [connections.toNodeId],
    references: [nodes.id],
    relationName: 'toNode',
  }),
}));