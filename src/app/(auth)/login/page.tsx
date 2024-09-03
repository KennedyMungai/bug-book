import { Metadata } from 'next'
import LoginForm from './_components/login-form'
import Link from 'next/link'
import Image from 'next/image'

type Props = {}

export const metadata: Metadata = {
	title: 'Login'
}

const LoginPage = () => {
	return (
		<main className='flex items-center justify-center h-full p-5'>
			<div className='flex h-full w-full max-h-[40rem] max-w-[64rem] overflow-hidden rounded-2xl bg-card shadow-2xl'>
				<div className='md:w-1/2 w-full p-10 space-y-10 overflow-y-auto'>
					<div className='space-y-1 text-center'>
						<h1 className='text-3xl font-bold'>Login to BugBook</h1>
						<p className='text-muted-foreground'>
							A place where event{' '}
							<span className='italic'>you</span> can find a
							friend
						</p>
					</div>

					<div className='space-y-5'>
						<LoginForm />
						<Link
							href='/signup'
							className='hover:underline block text-center'
						>
							Don&apos;t have an account? Sign Up
						</Link>
					</div>
				</div>
				<Image
					src='/login-image.jpg'
					alt=''
					width={500}
					height={500}
					className='md:block hidden object-cover w-1/2'
				/>
			</div>
		</main>
	)
}

export default LoginPage
