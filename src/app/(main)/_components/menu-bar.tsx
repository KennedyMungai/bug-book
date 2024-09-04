import { Button } from '@/components/ui/button'
import { BellIcon, HomeIcon } from 'lucide-react'
import Link from 'next/link'

type Props = {
	className?: string
}

const MenuBar = ({ className }: Props) => {
	return (
		<div className={className}>
			<Button
				variant={'ghost'}
				className='flex items-center justify-start gap-3'
				title='Home'
				asChild
			>
				<Link href='/'>
					<HomeIcon />
					<span className='hidden lg:inline'>Home</span>
				</Link>
			</Button>
			<Button
				variant={'ghost'}
				className='flex items-center justify-start gap-3'
				title='notifications'
				asChild
			>
				<Link href='/'>
					<BellIcon />
					<span className='hidden lg:inline'>Notifications</span>
				</Link>
			</Button>
			<Button
				variant={'ghost'}
				className='flex items-center justify-start gap-3'
				title='Home'
				asChild
			>
				<Link href='/'>
					<HomeIcon />
					<span className='hidden lg:inline'>Home</span>
				</Link>
			</Button>
			<Button
				variant={'ghost'}
				className='flex items-center justify-start gap-3'
				title='Home'
				asChild
			>
				<Link href='/'>
					<HomeIcon />
					<span className='hidden lg:inline'>Home</span>
				</Link>
			</Button>
		</div>
	)
}

export default MenuBar
