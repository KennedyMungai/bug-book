import { validateRequest } from '@/auth'
import FollowButton from '@/components/follow-button'
import FollowerCount from '@/components/follower-count'
import TrendsSidebar from '@/components/trends-sidebar'
import { Button } from '@/components/ui/button'
import UserAvatar from '@/components/user-avatar'
import { db } from '@/db'
import { userTable } from '@/db/schema'
import { FollowerInfo } from '@/lib/types'
import { formatNumber } from '@/lib/utils'
import { formatDate } from 'date-fns'
import { eq } from 'drizzle-orm'
import { notFound } from 'next/navigation'
import { cache } from 'react'

type Props = {
	params: {
		username: string
	}
}

const getUser = cache(async (username: string) => {
	const user = await db.query.userTable.findFirst({
		columns: {
			id: true,
			username: true,
			displayName: true,
			avatarUrl: true,
			bio: true,
			createdAt: true
		},
		with: {
			followers: {
				columns: {
					followerId: true
				}
			},
			posts: {
				columns: {
					id: true,
					content: true,
					createdAt: true
				}
			}
		},
		where: eq(userTable.username, username)
	})

	if (!user) notFound()

	return user
})

export const generateMetadata = async ({ params: { username } }: Props) => {
	const { user: loggedInUser } = await validateRequest()

	if (!loggedInUser) return {}

	const user = await getUser(username)

	return {
		title: `${user.displayName} (@${user.username})`
	}
}

const UserProfilePage = async ({ params: { username } }: Props) => {
	const { user: loggedInUser } = await validateRequest()

	if (!loggedInUser)
		return <p className='text-destructive'>You&apos;re not logged in</p>

	const user = await getUser(username)

	return (
		<main className='flex w-full min-w-0 gap-5'>
			<div className='w-full min-w-0 space-y-5'>
				<UserProfile user={user} loggedInUserId={loggedInUser.id} />
			</div>
			<TrendsSidebar />
		</main>
	)
}

export default UserProfilePage

type UserProfileProps = {
	user: {
		id: string
		username: string
		displayName: string
		avatarUrl: string | null
		bio: string | null
		createdAt: Date
		posts: {
			id: string
			createdAt: Date
			content: string
		}[]
		followers: {
			followerId: string | null
		}[]
	}
	loggedInUserId: string
}

const UserProfile = async ({ user, loggedInUserId }: UserProfileProps) => {
	const followerInfo: FollowerInfo = {
		followers: user.followers.length,
		isFollowedByUser: user.followers.some(
			({ followerId }) => followerId === user.id
		)
	}

	return (
		<div className='h-fit rounded-2xl bg-card w-full p-5 space-y-5 shadow-sm'>
			<UserAvatar
				avatarUrl={user.avatarUrl}
				size={250}
				className='size-full max-h-60 max-w-60 mx-auto rounded-full'
			/>
			<div className='sm:flex-nowrap flex flex-wrap gap-3'>
				<div className='me-auto space-y-3'>
					<div className=''>
						<h1 className='text-3xl font-bold'>
							{user.displayName}
						</h1>
						<div className='text-muted-foreground'>
							@{user.username}
						</div>
						<div>
							Member since{' '}
							{formatDate(user.createdAt, 'MMM dd, yyyy')}
						</div>
						<div className='flex items-center gap-3'>
							<span>
								Posts:{' '}
								<span className='font-semibold'>
									{formatNumber(user.posts.length)}
								</span>
							</span>
							<FollowerCount
								userId={user.id}
								initialState={followerInfo}
							/>
						</div>
					</div>
				</div>
				{user.id === loggedInUserId ? (
					<Button>Edit Profile</Button>
				) : (
					<FollowButton
						userId={user.id}
						initialState={followerInfo}
					/>
				)}
			</div>
		</div>
	)
}
