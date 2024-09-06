import kyInstance from '@/lib/ky'
import { FollowerInfo } from '@/lib/types'
import { useQuery } from '@tanstack/react-query'

export const useFollowerInfo = (userId: string, initialState: FollowerInfo) =>
	useQuery({
		queryKey: ['follower-info', { userId }],
		queryFn: () =>
			kyInstance
				.get(`/api/users/${userId}/followers`)
				.json<FollowerInfo>(),
		initialData: initialState,
		staleTime: Infinity
	})
