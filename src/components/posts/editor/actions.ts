'use server'

import { validateRequest } from '@/auth'
import { db } from '@/db'
import { Posts } from '@/db/schema'
import { createPostsSchema } from '@/lib/validation'

export const submitPost = async (input: string) => {
	const { session, user } = await validateRequest()

	if (!user) throw new Error('Unauthorized')

	const { content } = createPostsSchema.parse({ content: input })

	await db.insert(Posts).values({ content, userId: user.id })
}
