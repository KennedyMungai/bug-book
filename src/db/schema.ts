import { relations } from 'drizzle-orm'
import { pgTable, text, timestamp, uuid, varchar } from 'drizzle-orm/pg-core'

export const userTable = pgTable('users', {
	id: text('id').primaryKey(),
	username: varchar('username', { length: 255 }).unique().notNull(),
	displayName: varchar('displayName', { length: 255 }).notNull(),
	email: varchar('email', { length: 255 }).unique().notNull(),
	passwordHash: varchar('passwordHash', { length: 512 }),
	googleId: varchar('googleId', { length: 255 }).unique(),
	avatarUrl: varchar('avatar_url', { length: 512 }),
	bio: text('bio'),
	createdAt: timestamp('created_at').defaultNow().notNull(),
	updatedAt: timestamp('updated_at').$onUpdate(() => new Date())
})

export const userTableRelations = relations(userTable, ({ many }) => ({
	sessions: many(sessionTable),
	posts: many(Posts)
}))

export const sessionTable = pgTable('sessions', {
	id: text('id').primaryKey(),
	userId: text('user_id')
		.notNull()
		.references(() => userTable.id, { onDelete: 'cascade' }),
	expiresAt: timestamp('expires_at').notNull()
})

export const sessionRelations = relations(sessionTable, ({ one }) => ({
	user: one(userTable, {
		fields: [sessionTable.userId],
		references: [userTable.id]
	})
}))

export const Posts = pgTable('posts', {
	id: uuid('id').defaultRandom().primaryKey(),
	content: text('content').notNull(),
	userId: text('user_id').references(() => userTable.id, {
		onDelete: 'cascade'
	}),
	createdAt: timestamp('created_at').defaultNow().notNull(),
	updatedAt: timestamp('updated_at').$onUpdate(() => new Date())
})

export const postRelations = relations(Posts, ({ one }) => ({
	user: one(userTable, {
		fields: [Posts.userId],
		references: [userTable.id]
	})
}))