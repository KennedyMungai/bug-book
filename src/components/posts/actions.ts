'use server'

import { validateRequest } from '@/auth'
import { db } from '@/db'
import { Posts } from '@/db/schema'
import { and, eq } from 'drizzle-orm'

export const deletePost = async (id: string) => {
	const { user } = await validateRequest()

	if (!user) throw new Error('Unauthorized')

	const post = await db.query.Posts.findFirst({
		columns: {
			id: true,
			content: true,
			createdAt: true
		},
		with: {
			user: {
				columns: {
					username: true,
					displayName: true,
					avatarUrl: true
				}
			}
		},
		where: and(eq(Posts.id, id), eq(Posts.userId, user.id))
	})

	if (!post) throw new Error('Post not found')

	await db.delete(Posts).where(eq(Posts.id, id)).returning({
		id: Posts.id
	})

	return post
}
