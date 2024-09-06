import { validateRequest } from '@/auth'
import { db } from '@/db'
import { Follows, Posts } from '@/db/schema'
import { PostsPage } from '@/lib/types'
import { and, desc, eq, gt } from 'drizzle-orm'
import { NextRequest, NextResponse } from 'next/server'

const handleError = (error: any) => {
	console.error(error.message)
	return NextResponse.json(
		{ error: 'Internal server error' },
		{ status: 500 }
	)
}

export const GET = async (req: NextRequest) => {
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
					},
					with: {
						followers: {
							columns: {
								followerId: true
							}
						}
					}
				}
			},
			where: and(
				cursor ? gt(Posts.id, cursor) : undefined,
				eq(Follows.followerId, user.id)
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
	} catch (error: any) {
		return handleError(error)
	}
}
