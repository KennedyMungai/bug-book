'use client'

import PostsLoadingSkeleton from '@/app/(main)/_components/posts-loading-skeleton'
import InfiniteScrollContainer from '@/components/infinite-scroll-container'
import Post from '@/components/posts/post'
import kyInstance from '@/lib/ky'
import { PostsPage } from '@/lib/types'
import { useInfiniteQuery } from '@tanstack/react-query'

type Props = {
	userId: string
}

const UserPostsFeed = ({ userId }: Props) => {
	const {
		data,
		fetchNextPage,
		hasNextPage,
		isFetching,
		isFetchingNextPage,
		status
	} = useInfiniteQuery({
		queryKey: ['post-feed', 'user-posts', { userId }],
		queryFn: ({ pageParam }) =>
			kyInstance
				.get(
					`/api/users/${userId}/posts`,
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
		return <PostsLoadingSkeleton />
	}

	if (status === 'success' && posts.length === 0 && !hasNextPage) {
		return (
			<div className='text-center text-muted-foreground'>
				No posts found
			</div>
		)
	}

	if (status === 'error') {
		return <PostsLoadingSkeleton />
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
			{isFetchingNextPage && <PostsLoadingSkeleton />}
		</InfiniteScrollContainer>
	)
}

export default UserPostsFeed
