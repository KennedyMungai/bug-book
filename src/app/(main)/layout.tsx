import { validateRequest } from '@/auth'
import { redirect } from 'next/navigation'
import { ReactNode } from 'react'
import SessionProvider from './_components/session-provider'
import NavBar from './_components/navbar'

type Props = {
	children: ReactNode
}

const MainLayout = async ({ children }: Props) => {
	const session = await validateRequest()

	if (!session.user) redirect('/login')

	return (
		<SessionProvider value={session}>
			<div className='flex flex-col h-full'>
				<NavBar />
				<div className='max-w-7xl p-5 mx-auto'>{children}</div>
			</div>
		</SessionProvider>
	)
}

export default MainLayout
