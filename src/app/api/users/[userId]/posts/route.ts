import { validateRequest } from '@/auth'
import { db } from '@/db'
import { Posts } from '@/db/schema'
import { PostsPage } from '@/lib/types'
import { and, desc, eq, gt } from 'drizzle-orm'
import { NextRequest, NextResponse } from 'next/server'

type RouteParams = {
	params: { userId: string }
}

export const GET = async (
	req: NextRequest,
	{ params: { userId } }: RouteParams
) => {
	try {
		const cursor = req.nextUrl.searchParams.get('cursor') || undefined

		const pageSize = 10

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
			where: and(
				cursor ? gt(Posts.id, cursor) : undefined,
				eq(Posts.userId, user.id)
			),
			limit: pageSize + 1,
			orderBy: [desc(Posts.createdAt)]
		})

		const nextCursor =
			posts.length > pageSize ? posts[posts.length - 1].id : undefined

		const data: PostsPage = {
			posts: posts.slice(0, pageSize),
			nextCursor
		}

		return NextResponse.json(data)
	} catch (error: any) {
		console.error(error.message)
		return NextResponse.json(error.message, { status: 500 })
	}
}
