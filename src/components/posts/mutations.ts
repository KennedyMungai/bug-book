import { PostsPage } from '@/lib/types'
import {
	InfiniteData,
	QueryFilters,
	useMutation,
	useQueryClient
} from '@tanstack/react-query'
import { usePathname, useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { deletePost } from './actions'

export const useDeletePostMutation = () => {
	const queryClient = useQueryClient()

	const router = useRouter()

	const pathname = usePathname()

	const mutation = useMutation({
		mutationFn: deletePost,
		onSuccess: async (deletedPost) => {
			const queryFilter: QueryFilters = {
				queryKey: ['post-feed']
			}

			await queryClient.cancelQueries(queryFilter)

			queryClient.setQueriesData<InfiniteData<PostsPage, string | null>>(
				queryFilter,
				(oldData) => {
					if (!oldData) return { pages: [], pageParams: [] }

					return {
						pageParams: oldData?.pageParams,
						pages: oldData.pages.map((page) => ({
							nextCursor: page.nextCursor,
							posts: page.posts.filter(
								(p) => p.id !== deletedPost.id
							)
						}))
					}
				}
			)

			toast.success('Post deleted successfully')

			if (pathname === `/posts/${deletedPost.id}`)
				router.push(`/users/${deletedPost.user?.username}`)
		},
		onError: (error) => {
			console.error(error.message)

			toast.error('Failed to delete the message. Please try again')
		}
	})

	return mutation
}
