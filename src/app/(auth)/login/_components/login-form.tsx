'use client'

import LoadingButton from '@/components/loading-button'
import { PasswordInput } from '@/components/password-input'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { loginSchema, LoginValues } from '@/lib/validation'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState, useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { login } from "../actions";

const LoginForm = () => {
	const [error, setError] = useState('')

	const [isPending, startTransition] = useTransition()

	const form = useForm<LoginValues>({
		resolver: zodResolver(loginSchema),
		defaultValues: {
			username: '',
			password: ''
		}
	})

	const onSubmit = (values: LoginValues) => {
		setError('')

		startTransition(async () => {
			const { error } = await login(values)

			if (error) setError(error)
		})

		form.reset()
	}

	return (
		<Form {...form}>
			{error && <p className='text-destructive text-center'>{error}</p>}
			<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-3'>
				<FormField
					control={form.control}
					name='username'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Username</FormLabel>
							<FormControl>
								<Input {...field} placeholder='Username' />
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
									{...field}
									placeholder='••••••••'
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<LoadingButton loading={isPending} className='w-full pt-2'>
					Log In
				</LoadingButton>
			</form>
		</Form>
	)
}

export default LoginForm
