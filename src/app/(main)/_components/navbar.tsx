import { ModeToggle } from '@/components/mode-toggle'
import SearchField from '@/components/search-field'
import UserButton from '@/components/user-button'
import Link from 'next/link'

type Props = {}

const NavBar = () => {
	return (
		<header className='bg-card sticky top-0 z-10 shadow-sm'>
			<div className='max-w-7xl flex flex-wrap items-center justify-center gap-5 px-5 py-3'>
				<Link href='/' className='text-primary text-2xl font-bold'>
					BugBook
				</Link>
				<SearchField />
				<UserButton className='sm:ms-auto' />
				<ModeToggle />
			</div>
		</header>
	)
}

export default NavBar
