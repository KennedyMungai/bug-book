import { Button, ButtonProps } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { Loader2Icon } from 'lucide-react'

interface Props extends ButtonProps {
	loading: boolean
}

const LoadingButton = ({
	loading,
	disabled,
	className,
	children,
	...props
}: Props) => {
	return (
		<Button
			disabled={loading || disabled}
			className={cn('flex items-center gap-2', className)}
			{...props}
		>
			{loading && <Loader2Icon className='size-5 animate-spin' />}
			{children}
		</Button>
	)
}

export default LoadingButton
