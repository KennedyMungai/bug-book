'use server'

import { validateRequest } from '@/auth'
import { db } from '@/db'
import { Posts } from '@/db/schema'
import { createPostsSchema } from '@/lib/validation'
import { eq } from 'drizzle-orm'

export const submitPost = async (input: string) => {
	const { user } = await validateRequest()

	if (!user) throw new Error('Unauthorized')

	const { content } = createPostsSchema.parse({ content: input })

	const [postId] = await db
		.insert(Posts)
		.values({ content, userId: user.id })
		.returning({
			id: Posts.id
		})

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
		where: eq(Posts.id, postId.id)
	})

	if (!post) throw new Error('Post not found')

	return post
}
