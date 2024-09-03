import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import SignupForm from './_components/signup-form'

export const metadata: Metadata = {
	title: 'Sign Up'
}

const SignUpPage = () => {
	return (
		<main className='flex items-center justify-center h-full p-5'>
			<div className='flex h-full max-h-[40rem] w-full max-w-[64rem] rounded-2xl overflow-hidden bg-card shadow-2xl'>
				<div className='md:w-1/2 w-full p-10 space-y-10 overflow-y-auto'>
					<div className='space-y-1 text-center'>
						<h1 className='text-3xl font-bold'>
							Sign up to BugBook
						</h1>
						<p className='text-muted-foreground'>
							A place where event{' '}
							<span className='italic'>you</span> can find a
							friend
						</p>
					</div>
					<div className='space-y-5'>
						<SignupForm />
						<Link
							href='/login'
							className='hover:underline block text-center'
						>
							Already have an account? Log in
						</Link>
					</div>
				</div>
				<Image
					src='/signup-image.jpg'
					alt=''
					width={500}
					height={500}
					className='md:block hidden object-cover w-1/2'
				/>
			</div>
		</main>
	)
}

export default SignUpPage
