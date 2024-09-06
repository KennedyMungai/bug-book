import kyInstance from '@/lib/ky'
import { FollowerInfo } from '@/lib/types'
import { useQuery, UseQueryOptions } from '@tanstack/react-query'

export const useFollowerInfo = (
	userId: string,
	initialState: FollowerInfo,
	options?: Omit<UseQueryOptions<FollowerInfo, Error>, 'queryKey' | 'queryFn'>
) =>
	useQuery({
		queryKey: ['follower-info', { userId }],
		queryFn: async () => {
			try {
				const data = await kyInstance
					.get(`/api/users/${userId}/followers`)
					.json<FollowerInfo>()
				return data
			} catch (error) {
				throw new Error('Failed to fetch follower info')
			}
		},
		initialData: initialState,
		staleTime: Infinity,
		...options
	})
