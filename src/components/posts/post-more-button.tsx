import { Button } from '@/components/ui/button'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { PostData } from '@/lib/types'
import { MoreHorizontalIcon, Trash2Icon } from 'lucide-react'
import { useState } from 'react'
import DeletePostsDialog from './delete-posts-dialog'

type Props = {
	post: PostData
	className?: string
}

const PostMoreButton = ({ post, className }: Props) => {
	const [showDeleteDialog, setShowDeleteDialog] = useState(false)

	return (
		<>
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button size='icon' variant={'ghost'} className={className}>
						<MoreHorizontalIcon className='size-5 text-muted-foreground' />
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent>
					<DropdownMenuItem onClick={() => setShowDeleteDialog(true)}>
						<span className='flex items-center gap-3 text-destructive'>
							<Trash2Icon className='size-4' />
							Delete
						</span>
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
			<DeletePostsDialog
				post={post}
				open={showDeleteDialog}
				onClose={() => setShowDeleteDialog(false)}
			/>
		</>
	)
}

export default PostMoreButton
