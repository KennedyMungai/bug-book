'use client'

import InfiniteScrollContainer from '@/components/infinite-scroll-container'
import Post from '@/components/posts/post'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import kyInstance from '@/lib/ky'
import { PostsPage } from '@/lib/types'
import { useInfiniteQuery } from '@tanstack/react-query'
import { Loader2Icon } from 'lucide-react'

const ForYouFeed = () => {
	const {
		data,
		fetchNextPage,
		hasNextPage,
		isFetching,
		isFetchingNextPage,
		status
	} = useInfiniteQuery({
		queryKey: ['post-feed', 'for-you'],
		queryFn: ({ pageParam }) =>
			kyInstance
				.get(
					'/api/posts/for-you',
					pageParam
						? {
								searchParams: { cursor: pageParam }
						  }
						: {}
				)
				.json<PostsPage>(),
		initialPageParam: null as string | null,
		getNextPageParam: (lastPage) => lastPage.nextCursor
	})

	const posts = data?.pages.flatMap((page) => page.posts) ?? []

	if (status === 'pending') {
		return <Loader2Icon className='size-5 animate-spin mx-auto' />
	}

	if (status === 'error') {
		return (
			<p className='text-destructive text-center'>
				An error occurred while loading posts
			</p>
		)
	}

	return (
		<InfiniteScrollContainer
			className='space-y-5'
			onBottomReached={() =>
				hasNextPage && !isFetching && fetchNextPage()
			}
		>
			{posts.map((post) => (
				<Post key={post.id} post={post} />
			))}
			{isFetchingNextPage && (
				<div className='space-y-5'>
					<Skeleton className='rounded-2xl bg-card p-5 space-y-3 shadow-sm' />
					<Skeleton className='rounded-2xl bg-card p-5 space-y-3 shadow-sm' />
					<Skeleton className='rounded-2xl bg-card p-5 space-y-3 shadow-sm' />
					<Skeleton className='rounded-2xl bg-card p-5 space-y-3 shadow-sm' />
					<Skeleton className='rounded-2xl bg-card p-5 space-y-3 shadow-sm' />
					<Skeleton className='rounded-2xl bg-card p-5 space-y-3 shadow-sm' />
					<Skeleton className='rounded-2xl bg-card p-5 space-y-3 shadow-sm' />
					<Skeleton className='rounded-2xl bg-card p-5 space-y-3 shadow-sm' />
					<Skeleton className='rounded-2xl bg-card p-5 space-y-3 shadow-sm' />
					<Skeleton className='rounded-2xl bg-card p-5 space-y-3 shadow-sm' />
					<Skeleton className='rounded-2xl bg-card p-5 space-y-3 shadow-sm' />
				</div>
			)}
		</InfiniteScrollContainer>
	)
}

export default ForYouFeed
