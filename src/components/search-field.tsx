'use client'

import { useRouter } from 'next/navigation'
import { FormEvent } from 'react'
import { Input } from './ui/input'
import { SearchIcon } from 'lucide-react'

const SearchField = () => {
	const router = useRouter()

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()

		const form = e.currentTarget
		const q = (form.q as HTMLInputElement).value.trim()

		if (!q) return

		router.push(`/search?q=${encodeURIComponent(q)}`)
	}

	return (
		<form onSubmit={handleSubmit}>
			<div className='relative'>
				<Input name='q' placeholder='Search' className='pe-10' />
				<SearchIcon className='right-3 top-1/2 size-5 text-muted-foreground absolute transform -translate-y-1/2' />
			</div>
		</form>
	)
}

export default SearchField
