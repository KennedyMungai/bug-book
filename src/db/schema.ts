import { relations } from 'drizzle-orm'
import { pgTable, text, timestamp, varchar } from 'drizzle-orm/pg-core'

export const userTable = pgTable('users', {
	id: text('id').primaryKey(),
	username: varchar('username', { length: 255 }).unique().notNull(),
	displayName: varchar('displayName', { length: 255 }).notNull(),
	email: varchar('email', { length: 255 }).unique().notNull(),
	passwordHash: varchar('passwordHash', { length: 512 }),
	googleId: varchar('googleId', { length: 255 }).unique(),
	avatarUrl: varchar('avatar_url', { length: 512 }),
	bio: text('bio'),
	createdAt: timestamp('created_at', {
		withTimezone: true,
		mode: 'date'
	})
		.defaultNow()
		.notNull(),
	updatedAt: timestamp('updated_at', {
		withTimezone: true,
		mode: 'date'
	}).$onUpdate(() => new Date())
})

export const userTableRelations = relations(userTable, ({ many }) => ({
	sessions: many(sessionTable)
}))

export const sessionTable = pgTable('sessions', {
	id: text('id').primaryKey(),
	userId: text('user_id')
		.notNull()
		.references(() => userTable.id, { onDelete: 'cascade' }),
	expiresAt: timestamp('expires_at', {
		withTimezone: true,
		mode: 'date'
	}).notNull()
})

export const sessionRelations = relations(sessionTable, ({ one }) => ({
	user: one(userTable, {
		fields: [sessionTable.userId],
		references: [userTable.id]
	})
}))
