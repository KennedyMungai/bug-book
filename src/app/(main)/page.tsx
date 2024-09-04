import PostEditor from '@/components/posts/editor/post-editor'
import Post from '@/components/posts/post'
import { db } from '@/db'
import { Posts } from '@/db/schema'
import { desc } from 'drizzle-orm'

const HomePage = async () => {
	const posts = await db.query.Posts.findMany({
		columns: {
			id: true,
			content: true,
			createdAt: true
		},
		with: {
			user: {
				columns: {
					username: true,
					displayName: true,
					avatarUrl: true
				}
			}
		},
		orderBy: [desc(Posts.id)]
	})

	return (
		<main className='w-full min-w-0'>
			<div className='w-full min-w-0 space-y-5'>
				<PostEditor />
				{posts.map((post) => (
					<Post key={post.id} post={post} />
				))}
			</div>
		</main>
	)
}

export default HomePage
