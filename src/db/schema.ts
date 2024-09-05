import { relations } from 'drizzle-orm'
import {
	AnyPgColumn,
	boolean,
	pgTable,
	primaryKey,
	text,
	timestamp,
	uuid,
	varchar
} from 'drizzle-orm/pg-core'

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
	posts: many(Posts),
	followers: many(Follows, { relationName: 'followers' }),
	following: many(Follows, { relationName: 'following' }),
	likes: many(Likes),
	comments: many(Comments),
	notifications: many(Notifications)
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

export const PostRelations = relations(Posts, ({ one, many }) => ({
	user: one(userTable, {
		fields: [Posts.userId],
		references: [userTable.id]
	}),
	notifications: many(Notifications)
}))

export const Follows = pgTable(
	'follows',
	{
		followerId: text('follower_id').references(() => userTable.id, {
			onDelete: 'cascade'
		}),
		followingId: text('following_id').references(() => userTable.id, {
			onDelete: 'cascade'
		}),
		followedAt: timestamp('followed_at').defaultNow().notNull()
	},
	(table) => {
		return {
			pk: primaryKey({
				name: 'user_follows',
				columns: [table.followerId, table.followingId]
			})
		}
	}
)

export const FollowRelations = relations(Follows, ({ one }) => ({
	follower: one(userTable, {
		relationName: 'followers',
		fields: [Follows.followerId],
		references: [userTable.id]
	}),
	following: one(userTable, {
		relationName: 'following',
		fields: [Follows.followingId],
		references: [userTable.id]
	})
}))

export const Likes = pgTable(
	'likes',
	{
		userId: text('user_id').references(() => userTable.id, {
			onDelete: 'cascade'
		}),
		postId: uuid('post_id').references(() => Posts.id, {
			onDelete: 'cascade'
		}),
		likedAt: timestamp('liked_at').defaultNow().notNull()
	},
	(table) => {
		return {
			pk: primaryKey({
				name: 'user_post_likes',
				columns: [table.userId, table.postId]
			})
		}
	}
)

export const LikeRelations = relations(Likes, ({ one }) => ({
	user: one(userTable, {
		fields: [Likes.userId],
		references: [userTable.id]
	}),
	post: one(Posts, {
		fields: [Likes.postId],
		references: [Posts.id]
	})
}))

export const Comments = pgTable('comments', {
	id: uuid('id').defaultRandom().primaryKey(),
	parentId: uuid('parent_id').references((): AnyPgColumn => Comments.id),
	content: text('content').notNull(),
	postId: uuid('post_id').references(() => Posts.id, {
		onDelete: 'cascade'
	}),
	userId: text('user_id').references(() => userTable.id, {
		onDelete: 'cascade'
	}),
	createdAt: timestamp('created_at').defaultNow().notNull(),
	updatedAt: timestamp('updated_at').$onUpdate(() => new Date())
})

export const CommentRelations = relations(Comments, ({ one, many }) => ({
	user: one(userTable, {
		fields: [Comments.userId],
		references: [userTable.id]
	}),
	post: one(Posts, {
		fields: [Comments.postId],
		references: [Posts.id]
	})
}))

export const Notifications = pgTable('notifications', {
	id: uuid('id').defaultRandom().primaryKey(),
	userId: text('user_id').references(() => userTable.id, {
		onDelete: 'cascade'
	}),
	type: varchar('type', { length: 255 }).notNull(),
	postId: uuid('post_id').references(() => Posts.id, {
		onDelete: 'cascade'
	}),
	isRead: boolean('is_read').default(false).notNull(),
	createdAt: timestamp('created_at').defaultNow().notNull(),
	updatedAt: timestamp('updated_at').$onUpdate(() => new Date())
})

export const NotificationRelations = relations(Notifications, ({ one }) => ({
	user: one(userTable, {
		fields: [Notifications.userId],
		references: [userTable.id]
	}),
	post: one(Posts, {
		fields: [Notifications.postId],
		references: [Posts.id]
	})
}))