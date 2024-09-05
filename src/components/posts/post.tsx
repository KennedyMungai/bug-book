'use client'

import { useSession } from '@/app/(main)/_components/session-provider'
import UserAvatar from '@/components/user-avatar'
import { PostData } from '@/lib/types'
import { formatRelativeDate } from '@/lib/utils'
import Link from 'next/link'
import PostMoreButton from './post-more-button'

type Props = {
	post: PostData
}

const Post = ({ post }: Props) => {
	const { user } = useSession()

	return (
		<article className='rounded-2xl bg-card p-5 space-y-3 shadow-sm group/post'>
			<div className='flex justify-between gap-3'>
				<div className='flex flex-wrap gap-3'>
					<Link href={`/users/${post.user?.username}`}>
						<UserAvatar avatarUrl={post.user?.avatarUrl} />
					</Link>
					<div>
						<Link
							href={`/users/${post.user?.username}`}
							className='hover:underline block font-medium'
						>
							{post.user?.displayName}
						</Link>
						<Link
							href={`/posts/${post.id}`}
							className='text-muted-foreground hover:underline block text-sm'
						>
							{formatRelativeDate(post.createdAt)}
						</Link>
					</div>
				</div>
				{post.user?.username === user?.username && (
					<PostMoreButton
						post={post}
						className='opacity-0 transition-opacity group-hover/post:opacity-100'
					/>
				)}
			</div>
			<div className='break-words whitespace-pre-line'>
				{post.content}
			</div>
		</article>
	)
}

export default Post
