import Link from 'next/link'
import UserAvatar from '@/components/user-avatar'
import { formatRelativeDate } from '@/lib/utils'

type Props = {
	post: {
		id: string
		content: string
		createdAt: Date
		user: {
			displayName: string
			username: string
			avatarUrl: string | null
		} | null
	}
}

const Post = ({ post }: Props) => {
	return (
		<article className='rounded-2xl bg-card p-5 space-y-3 shadow-sm'>
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
			<div className='break-words whitespace-pre-line'>
				{post.content}
			</div>
		</article>
	)
}

export default Post
