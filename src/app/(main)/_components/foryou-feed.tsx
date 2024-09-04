'use client'

import Post from '@/components/posts/post'
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
		queryFn: async () => {
			const res = await fetch('/api/posts/for-you')

			if (!res.ok)
				throw new Error(`Failed to fetch posts - code ${res.status}`)

			return res.json()
		}
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
