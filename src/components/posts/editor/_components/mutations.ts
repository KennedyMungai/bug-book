import { PostsPage } from '@/lib/types'
import {
	InfiniteData,
	QueryFilters,
	useMutation,
	useQueryClient
} from '@tanstack/react-query'
import { toast } from 'sonner'
import { submitPost } from '../actions'

export const useSubmitPostMutation = () => {
	const queryClient = useQueryClient()

	const mutation = useMutation({
		mutationFn: submitPost,
		onSuccess: async (newPost) => {
			const queryFilter: QueryFilters = {
				queryKey: ['post-feed', 'for-you']
			}

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
				predicate: (query) => !query.state.data
			})

			toast.success('Post created successfully')
		},
		onError: () => {
			toast.error('Failed to create post')
		}
	})

	return mutation
}
