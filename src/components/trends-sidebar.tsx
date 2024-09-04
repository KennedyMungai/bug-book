import { validateRequest } from '@/auth'
import { Skeleton } from '@/components/ui/skeleton'
import { db } from '@/db'
import { userTable } from '@/db/schema'
import { eq, not } from 'drizzle-orm'
import Link from 'next/link'
import { Suspense } from 'react'
import UserAvatar from '@/components/user-avatar'

type Props = {}

const TrendsSidebar = () => {
	return (
		<div className='sticky top-[5.25rem] hidden md:block lg:w-80 w-72 h-fit flex-none space-y-5'>
			<Suspense fallback={<WhoToFollowFallback />}>
				<WhoToFollow />
			</Suspense>
		</div>
	)
}

export default TrendsSidebar

const WhoToFollow = async () => {
	const { user } = await validateRequest()

	if (!user) return

	await new Promise((r) => setTimeout(r, 20000))

	const usersToFollow = await db.query.userTable.findMany({
		columns: {
			id: true,
			username: true,
			displayName: true,
			avatarUrl: true
		},
		where: not(eq(userTable.id, user.id)),
		limit: 5
	})

	return (
		<div className='rounded-2xl bg-card p-5 space-y-5 shadow-sm'>
			<div className='text-xl font-bold'>Who to follow</div>
			{usersToFollow.map((user) => (
				<div
					key={user.id}
					className='flex items-center justify-between gap-2'
				>
					<Link
						href={`/users/${user.username}`}
						className='flex items-center gap-3'
					>
						<UserAvatar avatarUrl={user.avatarUrl} />
						<div>
							<p className='line-clamp-1 hover:underline font-semibold break-all'>
								{user.displayName}
							</p>
							<p className='line-clamp-1 text-muted-foreground break-all'>
								@{user.username}
							</p>
						</div>
					</Link>
				</div>
			))}
		</div>
	)
}

const WhoToFollowFallback = () => {
	return (
		<div className='rounded-2xl bg-card p-5 space-y-5 shadow-sm'>
			<div className='text-xl font-bold'>Who to follow</div>
			<Skeleton className='rounded-2xl w-full h-8' />
			<Skeleton className='rounded-2xl w-full h-8' />
			<Skeleton className='rounded-2xl w-full h-8' />
			<Skeleton className='rounded-2xl w-full h-8' />
			<Skeleton className='rounded-2xl w-full h-8' />
		</div>
	)
}
