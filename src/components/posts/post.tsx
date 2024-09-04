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
		<article className='space-y-3 rounded-2xl bg-card p-5 shadow-sm'>
			<div className='flex flex-wrap gap-3'>
				<Link href={`/users/${post.user?.username}`}>
					<UserAvatar avatarUrl={post.user?.avatarUrl} />
				</Link>
				<div>
					<Link
						href={`/users/${post.user?.username}`}
						className='block font-medium hover:underline'
					>
						{post.user?.displayName}
					</Link>
					<Link
						href={`/posts/${post.id}`}
						className='block text-sm text-muted-foreground hover:underline'
					>
						{formatRelativeDate(post.createdAt)}
					</Link>
				</div>
			</div>
			<div className='whitespace-pre-line break-words'>
				{post.content}
			</div>
		</article>
	)
}

export default Post
