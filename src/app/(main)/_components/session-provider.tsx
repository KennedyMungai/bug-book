'use client'

import { Session, User } from 'lucia'
import { createContext, PropsWithChildren } from 'react'

interface SessionContext {
	user: User
	session: Session
}

const SessionContext = createContext<SessionContext | null>(null)

const SessionProvider = ({
	children,
	value
}: PropsWithChildren<{ value: SessionContext }>) => {
	return (
		<SessionContext.Provider value={value}>
			{children}
		</SessionContext.Provider>
	)
}

export default SessionProvider
