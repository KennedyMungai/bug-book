'use client'

import { logOut } from '@/app/(auth)/actions'
import { useSession } from '@/app/(main)/_components/session-provider'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import UserAvatar from '@/components/user-avatar'
import { cn } from '@/lib/utils'
import { LogOutIcon, UserIcon } from 'lucide-react'
import Link from 'next/link'

type Props = {
	className?: string
}

const UserButton = ({ className }: Props) => {
	const { user } = useSession()

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<button className={cn('flex-none rounded-full', className)}>
					<UserAvatar avatarUrl={user.avatarUrl} size={40} />
				</button>
			</DropdownMenuTrigger>
			<DropdownMenuContent>
				<DropdownMenuLabel>
					Logged in as @{user.username}
				</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuItem asChild>
					<Link href={`/user/${user.username}`}>
						<UserIcon className='size-4 mr-2' /> Profile
					</Link>
				</DropdownMenuItem>
				<DropdownMenuSeparator />
				<DropdownMenuItem onClick={() => logOut()}>
					<LogOutIcon className='size-4 mr-2' />
					Log Out
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}

export default UserButton
