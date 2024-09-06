import PostEditor from '@/components/posts/editor/post-editor'
import TrendsSidebar from '@/components/trends-sidebar'
import FollowingFeed from './_components/following-feed'
import ForYouFeed from './_components/foryou-feed'

const HomePage = () => {
	return (
		<main className='flex w-full min-w-0 gap-5'>
			<div className='w-full min-w-0 space-y-5'>
				<PostEditor />
				<ForYouFeed />
				<FollowingFeed />
			</div>
			<TrendsSidebar />
		</main>
	)
}

export default HomePage
