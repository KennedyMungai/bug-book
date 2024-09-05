'use client'

import { useSession } from '@/app/(main)/_components/session-provider'
import LoadingButton from '@/components/loading-button'
import UserAvatar from '@/components/user-avatar'
import Placeholder from '@tiptap/extension-placeholder'
import { EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { useSubmitPostMutation } from './_components/mutations'
import './styles.css'

const PostEditor = () => {
	const { user } = useSession()

	const mutation = useSubmitPostMutation()

	const editor = useEditor({
		extensions: [
			StarterKit.configure({ bold: false, italic: false }),
			Placeholder.configure({ placeholder: "What's on your mind?" })
		],
		immediatelyRender: false
	})

	const input =
		editor?.getText({
			blockSeparator: '\n'
		}) || ''

	const onSubmit = () => {
		mutation.mutate(input, {
			onSuccess: () => {
				editor?.commands.clearContent()
			}
		})
		editor?.commands.clearContent()
	}

	return (
		<div className='flex flex-col gap-5 rounded-2xl bg-card p-5 shadow-sm'>
			<div className='flex gap-5'>
				<UserAvatar
					avatarUrl={user.avatarUrl}
					className='hidden sm:inline'
				/>
				<EditorContent
					editor={editor}
					className='w-full max-h-[20rem] overflow-y-auto bg-background rounded-2xl px-5 py-3 border-none'
				/>
			</div>
			<div className='flex justify-end'>
				<LoadingButton
					onClick={onSubmit}
					disabled={!input.trim()}
					loading={mutation.isPending}
					className='min-w-20'
				>
					Post
				</LoadingButton>
			</div>
		</div>
	)
}

export default PostEditor
