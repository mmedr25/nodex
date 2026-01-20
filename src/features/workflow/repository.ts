import { db } from "@/db";
import { workflows } from "@/db/schema/workflow";
import { and, desc, eq, ilike, sql } from "drizzle-orm";

// need to be owner to mod a workflow
export const workflowRepo = {
    insert: db
        .insert(workflows)
        .values({
            name: "test work flow",
            userId: sql.placeholder("userId")
        })
        .returning({ id: workflows.id, name: workflows.name })
        .prepare("workflows_create"),


    delete: db
        .delete(workflows)
        .where(and(
            eq(workflows.id, sql.placeholder("id")),
            eq(workflows.userId, sql.placeholder("userId"))
        ))
        .returning({ id: workflows.id })
        .prepare("workflows_delete"),


    findById: db
        .select()
        .from(workflows)
        .where(and(
            eq(workflows.id, sql.placeholder("id")),
            eq(workflows.userId, sql.placeholder("userId"))
        ))
        .prepare("workflows_findById"),


    findAll: db
        .select()
        .from(workflows)
        .where(
            and(
                eq(workflows.userId, sql.placeholder("userId")),
                ilike(workflows.name, sql.placeholder("search"))
            )
        )
        .orderBy(
            desc(workflows.updatedAt) // uuid7 is sortable by time. so the query is all find :-)
        )
        .limit(sql.placeholder("size"))
        .offset(sql.placeholder("offset"))
        .prepare("workflows_findAll"),
    
    count: db
    .$count(workflows)
    .getSQL()
    
}