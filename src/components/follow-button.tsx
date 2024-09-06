import { Button } from '@/components/ui/button'
import { useFollowerInfo } from '@/hooks/useFollowerInfo'
import kyInstance from '@/lib/ky'
import { FollowerInfo } from '@/lib/types'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

type Props = {
	userId: string
	initialState: FollowerInfo
}

const FollowButton = ({ initialState, userId }: Props) => {
	const { data } = useFollowerInfo(userId, initialState)

	const queryClient = useQueryClient()

	const { mutate } = useMutation({
		mutationFn: () =>
			data.isFollowedByUser
				? kyInstance.delete(`/api/user/${userId}/followers`)
				: kyInstance.post(`/api/user/${userId}/followers`),
		onSuccess: () => {
			toast.success(
				`${
					data.isFollowedByUser
						? 'Successfully Unfollowed'
						: 'Successfully Followed'
				}!`
			)
		}
	})

	return (
		<Button
			variant={data.isFollowedByUser ? 'secondary' : 'default'}
			onClick={() => mutate()}
		>
			{data.isFollowedByUser ? 'Unfollow' : 'Follow'}
		</Button>
	)
}

export default FollowButton
