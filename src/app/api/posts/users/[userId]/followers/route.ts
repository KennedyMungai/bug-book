import { validateRequest } from '@/auth'
import { db } from '@/db'
import { Follows, userTable } from '@/db/schema'
import { FollowerInfo } from '@/lib/types'
import { eq } from 'drizzle-orm'
import { NextRequest, NextResponse } from 'next/server'

export const GET = async (
	req: NextRequest,
	{ params: { userId } }: { params: { userId: string } }
) => {
	try {
		const { user: loggedInUser } = await validateRequest()

		if (!loggedInUser)
			return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

		const user = await db.query.userTable.findFirst({
			columns: { username: true },
			with: {
				followers: {
					columns: {
						followerId: true
					}
				}
			},
			where: eq(userTable.id, userId)
		})

		if (!user) {
			return NextResponse.json(
				{ error: 'User not found' },
				{ status: 404 }
			)
		}

		const data: FollowerInfo = {
			followers: user.followers.length,
			isFollowedByUser: !!user.followers.length
		}

		return NextResponse.json(data)
	} catch (error: any) {
		console.error(error.message)

		return NextResponse.json(
			{ error: 'Internal server error' },
			{ status: 500 }
		)
	}
}

export const POST = async (
	req: NextRequest,
	{ params: { userId } }: { params: { userId: string } }
) => {
	try {
		const { user: loggedInUser } = await validateRequest()

		if (!loggedInUser)
			return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

		const followed = await db
			.insert(Follows)
			.values({
				followerId: loggedInUser.id,
				followingId: userId
			})
			.returning({
				id: Follows.followingId
			})

		return NextResponse.json(followed)
	} catch (error: any) {
		console.error(error.message)
		return NextResponse.json(
			{ error: 'Internal Server Error' },
			{ status: 500 }
		)
	}
}