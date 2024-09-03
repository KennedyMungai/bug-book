import { validateRequest } from '@/auth'
import { redirect } from 'next/navigation'
import { ReactNode } from 'react'

type Props = {
	children: ReactNode
}

const MainLayout = async ({ children }: Props) => {
	const { session, user } = await validateRequest()

	if (!user) redirect('/login')

	return <div className='h-full'>{children}</div>
}

export default MainLayout
