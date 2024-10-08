import { validateRequest } from '@/auth'
import { db } from '@/db'
import { Follows, userTable } from '@/db/schema'
import { FollowerInfo } from '@/lib/types'
import { and, eq } from 'drizzle-orm'
import { NextRequest, NextResponse } from 'next/server'

type RouteParams = { params: { userId: string } }

const handleError = (error: any) => {
	console.error(error.message)
	return NextResponse.json(
		{ error: 'Internal server error' },
		{ status: 500 }
	)
}

export const GET = async (req: NextRequest, { params: { userId } }: RouteParams) => {
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
		return handleError(error)
	}
}

export const POST = async (
	req: NextRequest,
	{ params: { userId } }: RouteParams
) => {
	try {
		const { user: loggedInUser } = await validateRequest()

    if (!loggedInUser) {
		return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
	}

	if (loggedInUser.id === userId) {
		return NextResponse.json(
			{ error: 'Cannot follow yourself' },
			{ status: 400 }
		)
	}

    const [followed] = await db
		.insert(Follows)
		.values({
			followerId: loggedInUser.id,
			followingId: userId
		})
		.onConflictDoNothing({
			target: [Follows.followerId, Follows.followingId]
		})
		.returning({
			followingId: Follows.followingId
		})

    if (!followed) {
		return NextResponse.json(
			{ message: 'Already following this user' },
			{ status: 200 }
		)
	}

	return NextResponse.json(
		{
			message: 'Successfully followed user',
			followingId: followed.followingId
		},
		{ status: 201 }
	)

	} catch (error: any) {
		return handleError(error)
	}
}

export const DELETE = async (
	req: NextRequest,
	{ params: { userId } }: RouteParams
) => {
	try {
		const { user: loggedInUser } = await validateRequest()

		if (!loggedInUser)
			return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

		const follow = await db.query.Follows.findFirst({
			columns: {
				followerId: true,
				followingId: true
			},
			where: and(
				eq(Follows.followerId, loggedInUser.id),
				eq(Follows.followingId, userId)
			)
		})

		if (!follow)
			return NextResponse.json(
				{ error: 'You are not following the user' },
				{ status: 404 }
			)

		const [deletedFollow] = await db
			.delete(Follows)
			.where(
				and(
					eq(Follows.followingId, userId),
					eq(Follows.followerId, loggedInUser.id)
				)
			)
			.returning({
				id: Follows.followingId
			})

		return NextResponse.json(deletedFollow)
	} catch (error: any) {
		return handleError(error)
	}
}