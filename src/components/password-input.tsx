import { Input, InputProps } from '@/components/ui/input'
import { cn } from '@/lib/utils'
import { EyeIcon, EyeOffIcon } from 'lucide-react'
import { forwardRef, useState } from 'react'

const PasswordInput = forwardRef<HTMLInputElement, InputProps>(
	({ className, type, ...props }, ref) => {
		const [showPassword, setShowPassword] = useState(false)

		return (
			<div className='relative'>
				<Input
					type={showPassword ? 'text' : 'password'}
					className={cn('pe-10', className)}
					ref={ref}
					{...props}
				/>
				<button
					type='button'
					onClick={() => setShowPassword(!showPassword)}
					title={showPassword ? 'Hide password' : 'Show password'}
					className='right-3 top-1/2 text-muted-foreground absolute transform -translate-y-1/2'
				>
					{showPassword ? (
						<EyeOffIcon className='size-5' />
					) : (
						<EyeIcon className='size-5' />
					)}
				</button>
			</div>
		)
	}
)

PasswordInput.displayName = 'PasswordInput'

export { PasswordInput }
