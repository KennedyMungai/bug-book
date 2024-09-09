import { Button } from '@/components/ui/button'
import Link from 'next/link'

const NotFoundPage = () => {
	return (
		<div className='h-full flex items-center justify-center flex-col gap-y-4'>
			<p className='text-2xl uppercase'>404 | Page Not Found</p>
			<Button
				className='bg-transparent'
				size={'lg'}
				variant={'outline'}
				asChild
			>
				<Link href='/'>Go Back</Link>
			</Button>
		</div>
	)
}

export default NotFoundPage
