'use client'

import { Button } from '@/components/ui/button'
import { useFollowerInfo } from '@/hooks/useFollowerInfo'
import kyInstance from '@/lib/ky'
import { FollowerInfo } from '@/lib/types'
import { QueryKey, useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

type Props = {
	userId: string
	initialState: FollowerInfo
}

const FollowButton = ({ initialState, userId }: Props) => {
	const { data } = useFollowerInfo(userId, initialState)

	const queryClient = useQueryClient()

	const queryKey: QueryKey = ['follower-info', { userId }]

	const { mutate } = useMutation({
		mutationFn: () =>
			data?.isFollowedByUser
				? kyInstance.delete(`/api/user/${userId}/followers`)
				: kyInstance.post(`/api/user/${userId}/followers`),
		onMutate: async () => {
			await queryClient.cancelQueries({ queryKey })

			const previousState =
				queryClient.getQueryData<FollowerInfo>(queryKey)

			queryClient.setQueryData<FollowerInfo>(queryKey, () => ({
				followers:
					(previousState?.followers ?? 0) +
					(previousState?.isFollowedByUser ? -1 : 1),
				isFollowedByUser: !previousState?.isFollowedByUser
			}))

			return { previousState }
		},
		onSuccess: () => {
			toast.success(
				`${
					data?.isFollowedByUser
						? 'Successfully Unfollowed'
						: 'Successfully Followed'
				}!`
			)
		},
		onError: (error, variables, context) => {
			queryClient.setQueryData(queryKey, context?.previousState)
			toast.error('Failed to follow. Please try again')
			console.error(error.message)
		}
	})

	return (
		<Button
			variant={data?.isFollowedByUser ? 'secondary' : 'default'}
			onClick={() => mutate()}
		>
			{data?.isFollowedByUser ? 'Unfollow' : 'Follow'}
		</Button>
	)
}

export default FollowButton
