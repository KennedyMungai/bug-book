import { validateRequest } from '@/auth'
import { db } from '@/db'
import { Posts } from '@/db/schema'
import { desc } from 'drizzle-orm'
import { NextResponse } from 'next/server'

export const GET = async (req: Request) => {
	try {
		const { user } = await validateRequest()

		if (!user)
			return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

		const posts = await db.query.Posts.findMany({
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
			orderBy: [desc(Posts.createdAt)]
		})

		return NextResponse.json(posts)
	} catch (error: any) {
		console.error(error.message)
		return NextResponse.json(error.message, { status: 500 })
	}
}
