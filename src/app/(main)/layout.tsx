import { validateRequest } from '@/auth'
import { redirect } from 'next/navigation'
import { ReactNode } from 'react'
import SessionProvider from './_components/session-provider'

type Props = {
	children: ReactNode
}

const MainLayout = async ({ children }: Props) => {
	const session = await validateRequest()

	if (!session.user) redirect('/login')

	return <SessionProvider value={session}>{children}</SessionProvider>
}

export default MainLayout
