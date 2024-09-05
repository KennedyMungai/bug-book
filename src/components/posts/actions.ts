'use server'

import { validateRequest } from '@/auth'
import { db } from '@/db'
import { Posts } from '@/db/schema'
import { eq } from 'drizzle-orm'

export const deletePost = async (id: string) => {
	const { user } = await validateRequest()

	if (!user) throw new Error('Unauthorized')

	const post = await db.query.Posts.findFirst({
		columns: {
			id: true,
			userId: true
		},
		where: eq(Posts.id, id)
	})

	if (!post) throw new Error('Post not found')

	if (post.userId !== user.id) throw new Error('Unauthorized')

	await db.delete(Posts).where(eq(Posts.id, id)).returning({
		id: Posts.id
	})
}
