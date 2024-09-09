import Image from 'next/image'

type Props = {}

const LoadingPage = () => {
	return (
		<div className='h-full flex items-center justify-center'>
			<Image
				src='/loader.svg'
				width={250}
				height={250}
				alt='Loading...'
				className='rounded-full animate-pulse'
			/>
		</div>
	)
}

export default LoadingPage
