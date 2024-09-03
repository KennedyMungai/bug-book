import { validateRequest } from '@/auth'
import { redirect } from 'next/navigation'
import { ReactNode } from 'react'

type Props = {
	children: ReactNode
}

const AuthLayout = async ({ children }: Props) => {
	const { user } = await validateRequest()

	if (user) redirect('/')

	return <div className='h-full'>{children}</div>
}

export default AuthLayout
