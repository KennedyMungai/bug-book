import Image from 'next/image'
import avatarPlaceholder from '/public//avatar-placeholder.png'
import { cn } from '@/lib/utils'

type Props = {
	avatarUrl: string | null | undefined
	size?: number
	className?: string
}

const UserAvatar = ({ avatarUrl, className, size }: Props) => {
	return (
		<Image
			src={avatarUrl || avatarPlaceholder}
			alt='User Avatar'
			width={size ?? 48}
			height={size ?? 48}
			className={cn(
				'aspect-square h-fit flex-none rounded-full bg-secondary object-cover',
				className
			)}
		/>
	)
}

export default UserAvatar
