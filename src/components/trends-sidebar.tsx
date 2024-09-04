import { validateRequest } from '@/auth'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import UserAvatar from '@/components/user-avatar'
import { db } from '@/db'
import { Posts, userTable } from '@/db/schema'
import { formatNumber } from '@/lib/utils'
import { eq, not, sql } from 'drizzle-orm'
import { unstable_cache } from 'next/cache'
import Link from 'next/link'
import { Suspense } from 'react'

type Props = {}

const TrendsSidebar = () => {
	return (
		<div className='sticky top-[5.25rem] hidden md:block lg:w-80 w-72 h-fit flex-none space-y-5'>
			<Suspense fallback={<WhoToFollowFallback />}>
				<WhoToFollow />
				<TrendingTopics />
			</Suspense>
		</div>
	)
}

export default TrendsSidebar

const WhoToFollow = async () => {
	const { user } = await validateRequest()

	if (!user) return

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
						<UserAvatar
							avatarUrl={user.avatarUrl}
							className='flex-none'
						/>
						<div>
							<p className='line-clamp-1 hover:underline font-semibold break-all'>
								{user.displayName}
							</p>
							<p className='line-clamp-1 text-muted-foreground break-all'>
								@{user.username}
							</p>
						</div>
					</Link>
					<Button>Follow</Button>
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

const getTrendingTopics = unstable_cache(
	async () => {
		const queryResult = await db.execute(sql`
        SELECT LOWER(unnest(regexp_matches(${Posts.content}, '#[[:alnum:]_]+', 'g'))) AS hashtag, COUNT(*) AS count
        FROM ${Posts}
        GROUP BY (hashtag)
        ORDER BY count DESC, hashtag ASC
        LIMIT 5
    `)

		// Drizzle ORM typically returns an object with a 'rows' property
		const rows = Array.isArray(queryResult) ? queryResult : queryResult.rows

		if (!Array.isArray(rows)) {
			throw new Error('Unexpected query result structure')
		}

		return rows.map((row) => ({
			hashtag: row.hashtag as string,
			count: Number(row.count)
		}))
	},
	['trending_topics'],
	{
		revalidate: 3 * 60 * 60
	}
)

const TrendingTopics = async () => {
	const trendingTopics = await getTrendingTopics()

	return (
		<div className='rounded-2xl bg-card p-5 space-y-5 shadow-sm'>
			<div className='text-xl font-bold'>Trending Topics</div>
			{trendingTopics.map(({ hashtag, count }) => {
				const title = hashtag.split('#')[1]

				return (
					<Link
						key={title}
						href={`/hashtag/${title}`}
						className='block'
					>
						<p
							className='line-clamp-1 hover:underline font-semibold break-all'
							title={hashtag}
						>
							{hashtag}
						</p>
						<p className='text-muted-foreground text-sm'>
							{formatNumber(count)}{' '}
							{count === 1 ? 'post' : 'posts'}
						</p>
					</Link>
				)
			})}
		</div>
	)
}