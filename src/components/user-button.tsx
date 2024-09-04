'use client'

import { logOut } from '@/app/(auth)/actions'
import { useSession } from '@/app/(main)/_components/session-provider'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuPortal,
	DropdownMenuSeparator,
	DropdownMenuSub,
	DropdownMenuSubTrigger,
	DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import UserAvatar from '@/components/user-avatar'
import { cn } from '@/lib/utils'
import { DropdownMenuSubContent } from '@radix-ui/react-dropdown-menu'
import {
	CheckIcon,
	LogOutIcon,
	MonitorIcon,
	MoonIcon,
	SunIcon,
	UserIcon
} from 'lucide-react'
import { useTheme } from 'next-themes'
import Link from 'next/link'

type Props = {
	className?: string
}

const UserButton = ({ className }: Props) => {
	const { user } = useSession()

	const { theme, setTheme } = useTheme()

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
				<DropdownMenuSub>
					<DropdownMenuSubTrigger>
						<MonitorIcon className='size-4 mr-2' />
						Profile
					</DropdownMenuSubTrigger>
					<DropdownMenuPortal>
						<DropdownMenuSubContent className='bg-card p-2 rounded-2xl m-2'>
							<DropdownMenuItem onClick={() => setTheme('light')}>
								<SunIcon className='mr-2 size-4' />
								Light
								{theme === 'light' && (
									<CheckIcon className='ms-2 size-4' />
								)}
							</DropdownMenuItem>
							<DropdownMenuItem onClick={() => setTheme('dark')}>
								<MoonIcon className='mr-2 size-4' />
								Dark
								{theme === 'dark' && (
									<CheckIcon className='ms-2 size-4' />
								)}
							</DropdownMenuItem>
							<DropdownMenuItem
								onClick={() => setTheme('system')}
							>
								<MonitorIcon className='mr-2 size-4' />
								System default
								{theme === 'system' && (
									<CheckIcon className='ms-2 size-4' />
								)}
							</DropdownMenuItem>
						</DropdownMenuSubContent>
					</DropdownMenuPortal>
				</DropdownMenuSub>
				<DropdownMenuItem onClick={() => logOut()}>
					<LogOutIcon className='size-4 mr-2' />
					Log Out
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}

export default UserButton
