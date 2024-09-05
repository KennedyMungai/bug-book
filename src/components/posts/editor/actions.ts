'use server'

import { validateRequest } from '@/auth'
import { db } from '@/db'
import { Posts, userTable } from '@/db/schema'
import { createPostsSchema } from '@/lib/validation'

export const submitPost = async (input: string) => {
	const { session, user } = await validateRequest()

	if (!user) throw new Error('Unauthorized')

	const { content } = createPostsSchema.parse({ content: input })

	const post = await db
		.insert(Posts)
		.values({ content, userId: user.id })
		.returning({
			id: Posts.id,
			content: Posts.content,
			createdAt: Posts.createdAt,
			userDisplayName: userTable.displayName,
			userUsername: userTable.username,
			userAvatarUrl: userTable.avatarUrl
		})

	return post
}
