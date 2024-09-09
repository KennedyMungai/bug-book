import { PostsPage } from '@/lib/types'
import {
	InfiniteData,
	QueryFilters,
	useMutation,
	useQueryClient
} from '@tanstack/react-query'
import { toast } from 'sonner'
import { submitPost } from '../actions'
import { useSession } from '@/app/(main)/_components/session-provider'

export const useSubmitPostMutation = () => {
	const queryClient = useQueryClient()

	const { user } = useSession()

	const mutation = useMutation({
		mutationFn: submitPost,
		onSuccess: async (newPost) => {
			const queryFilter = {
				queryKey: ['post-feed'],
				predicate: (query) =>
					query.queryKey.includes('for-you') ||
					(query.queryKey.includes('user-posts') &&
						query.queryKey.includes(user.id))
			} satisfies QueryFilters

			await queryClient.cancelQueries(queryFilter)

			queryClient.setQueriesData<InfiniteData<PostsPage, string | null>>(
				queryFilter,
				(oldData) => {
					if (!oldData) return { pages: [], pageParams: [] }

					const firstPage = oldData?.pages[0]

					return {
						pageParams: oldData?.pageParams,
						pages: [
							{
								posts: [newPost, ...(firstPage.posts ?? [])],
								nextCursor: firstPage?.nextCursor
							},
							...oldData?.pages.slice(1)
						]
					}
				}
			)

			queryClient.invalidateQueries({
				queryKey: queryFilter.queryKey,
				predicate: (query) =>
					queryFilter.predicate(query) && !query.state.data
			})

			toast.success('Post created successfully')
		},
		onError: () => {
			toast.error('Failed to create post')
		}
	})

	return mutation
}
