import PostEditor from '@/components/posts/editor/post-editor'
import Post from '@/components/posts/post'
import { db } from '@/db'
import { Posts } from '@/db/schema'
import { asc } from 'drizzle-orm'

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
		orderBy: [asc(Posts.id)]
	})

	return (
		<main className='w-full'>
			<div className='w-full'>
				<PostEditor />
				{posts.map((post) => (
					<Post key={post.id} post={post} />
				))}
			</div>
		</main>
	)
}

export default HomePage
