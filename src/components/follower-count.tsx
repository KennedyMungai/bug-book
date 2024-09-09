'use client'

import { useFollowerInfo } from '@/hooks/useFollowerInfo'
import { FollowerInfo } from '@/lib/types'
import { formatNumber } from '@/lib/utils'

type Props = {
	userId: string
	initialState: FollowerInfo
}

const FollowerCount = ({ initialState, userId }: Props) => {
	const { data } = useFollowerInfo(userId, initialState)

	return (
		<span>
			Followers:{' '}
			<span className='font-semibold'>
				{formatNumber(data?.followers ?? 0)}
			</span>
		</span>
	)
}

export default FollowerCount
