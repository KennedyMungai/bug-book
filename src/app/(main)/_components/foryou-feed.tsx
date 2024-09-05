'use client'

import Post from '@/components/posts/post'
import kyInstance from '@/lib/ky'
import { useQuery } from '@tanstack/react-query'
import { Loader2Icon } from 'lucide-react'

type Props = {}

const ForYouFeed = () => {
	const query = useQuery<
		{
			id: string
			content: string
			createdAt: Date
			user: {
				displayName: string
				username: string
				avatarUrl: string | null
			} | null
		}[]
	>({
		queryKey: ['post-feed', 'for-you'],
		queryFn: kyInstance.get('/api/posts/for-you').json<
			{
				id: string
				content: string
				createdAt: Date
				user: {
					displayName: string
					username: string
					avatarUrl: string | null
				} | null
			}[]
		>
	})

	if (query.isPending) {
		return <Loader2Icon className='size-5 animate-spin mx-auto' />
	}

	if (query.isError) {
		return (
			<p className='text-destructive text-center'>
				An error occurred while loading posts
			</p>
		)
	}

	return (
		<>
			{query.data.map((post) => (
				<Post key={post.id} post={post} />
			))}
		</>
	)
}

export default ForYouFeed
