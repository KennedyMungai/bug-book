import { useMutation, useQueryClient } from '@tanstack/react-query'
import { submitPost } from '../actions'
import { toast } from 'sonner'

export const useSubmitPostMutation = () => {
	const queryClient = useQueryClient()

	const mutation = useMutation({
		mutationFn: submitPost,
		onSuccess: () => {
			toast.success('Post created successfully')
		},
		onError: () => {
			toast.error('Failed to create post')
		}
	})

	return mutation
}
