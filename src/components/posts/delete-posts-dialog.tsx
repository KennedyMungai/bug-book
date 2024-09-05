import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle
} from '@/components/ui/dialog'
import { PostData } from '@/lib/types'
import { useDeletePostMutation } from './mutations'
import LoadingButton from '@/components/loading-button'
import { Button } from '../ui/button'

type Props = {
	post: PostData
	open: boolean
	onClose: () => void
}

const DeletePostsDialog = ({ onClose, open, post }: Props) => {
	const mutation = useDeletePostMutation()

	const handleOpenChange = (open: boolean) => {
		if (!open || !mutation.isPending) onClose
	}

	return (
		<Dialog open={open} onOpenChange={handleOpenChange}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Delete Post?</DialogTitle>
					<DialogDescription>
						Are you sure you want to delete this post? This action
						cannot be undone
					</DialogDescription>
				</DialogHeader>
				<DialogFooter>
					<Button
						variant={'outline'}
						onClick={onClose}
						disabled={mutation.isPending}
					>
						Cancel
					</Button>
					<LoadingButton
						loading={mutation.isPending}
						variant={'destructive'}
						onClick={() =>
							mutation.mutate(post.id, { onSuccess: onClose })
						}
					>
						Delete
					</LoadingButton>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	)
}

export default DeletePostsDialog
