'use client'

import { Button } from '@/components/ui/button'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { signUpSchema, SignUpValues } from '@/lib/validation'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState, useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { signUp } from '../actions'
import { PasswordInput } from '@/components/password-input'

const SignupForm = () => {
	const [error, setError] = useState('')

	const [isPending, startTransition] = useTransition()

	const form = useForm<SignUpValues>({
		resolver: zodResolver(signUpSchema),
		defaultValues: {
			username: '',
			email: '',
			password: ''
		}
	})

	const onSubmit = async (values: SignUpValues) => {
		setError('')

		startTransition(async () => {
			const { error } = await signUp(values)

			if (error) setError(error)
		})

		form.reset()
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-3'>
				{error && (
					<p className='text-destructive text-center'>{error}</p>
				)}
				<FormField
					control={form.control}
					name='username'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Username</FormLabel>
							<FormControl>
								<Input {...field} placeholder='e.g. john_doe' />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='email'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Email Address</FormLabel>
							<FormControl>
								<Input
									{...field}
									placeholder='e.g. john_doe@yahoo.com'
									type='email'
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='password'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Password</FormLabel>
							<FormControl>
								<PasswordInput
									placeholder='••••••••'
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Button type='submit' className='w-full pt-2'>
					Sign Up
				</Button>
			</form>
		</Form>
	)
}

export default SignupForm
