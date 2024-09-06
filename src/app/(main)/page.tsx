import PostEditor from '@/components/posts/editor/post-editor'
import TrendsSidebar from '@/components/trends-sidebar'
import FollowingFeed from './_components/following-feed'
import ForYouFeed from './_components/foryou-feed'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

const HomePage = () => {
	return (
		<main className='flex w-full min-w-0 gap-5'>
			<div className='w-full min-w-0 space-y-5'>
				<PostEditor />
				<Tabs defaultValue='for-you'>
					<TabsList>
						<TabsTrigger value='for-you'>For You</TabsTrigger>
						<TabsTrigger value='following'>Following</TabsTrigger>
					</TabsList>
					<TabsContent value='for-you'>
						<ForYouFeed />
					</TabsContent>
					<TabsContent value='following'>
						<FollowingFeed />
					</TabsContent>
				</Tabs>
			</div>
			<TrendsSidebar />
		</main>
	)
}

export default HomePage
