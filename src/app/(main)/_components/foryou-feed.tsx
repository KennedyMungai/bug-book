'use client'

import Post from '@/components/posts/post'
import { Button } from '@/components/ui/button'
import kyInstance from '@/lib/ky'
import { PostsPage } from '@/lib/types'
import { useInfiniteQuery } from '@tanstack/react-query'
import { Loader2Icon } from 'lucide-react'

type Props = {}

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
		<div className='space-y-5'>
			{posts.map((post) => (
				<Post key={post.id} post={post} />
			))}
			<Button
				onClick={() => fetchNextPage()}
				disabled={!hasNextPage || isFetchingNextPage}
			>
				Load More
			</Button>
		</div>
	)
}

export default ForYouFeed
