'use server'

import { lucia } from '@/auth'
import { db } from '@/db'
import { userTable } from '@/db/schema'
import { signUpSchema, SignUpValues } from '@/lib/validation'
import { hash } from '@node-rs/argon2'
import { eq } from 'drizzle-orm'
import { generateIdFromEntropySize } from 'lucia'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export const signUp = async (
	credentials: SignUpValues
): Promise<{ error: string }> => {
	try {
		const { email, password, username } = signUpSchema.parse(credentials)

		const passwordHash = await hash(password, {
			memoryCost: 19456,
			timeCost: 2,
			outputLen: 32,
			parallelism: 1
		})

		const userId = generateIdFromEntropySize(10)

		const existingUsername = await db.query.userTable.findFirst({
			where: eq(userTable.username, username)
		})

		if (existingUsername) return { error: 'Username already taken' }

		const existingEmail = await db.query.userTable.findFirst({
			where: eq(userTable.email, email)
		})

		if (existingEmail) return { error: 'Email already taken' }

		await db.insert(userTable).values({
			id: userId,
			username,
			displayName: username,
			email,
			passwordHash
		})

		const session = await lucia.createSession(userId, {})
		const sessionCookie = lucia.createSessionCookie(session.id)

		cookies().set(
			sessionCookie.name,
			sessionCookie.value,
			sessionCookie.attributes
		)

		return redirect('/')
	} catch (error: any) {
		console.error(error.message)

		return {
			error: 'Something went wrong. Please try again'
		}
	}
}
