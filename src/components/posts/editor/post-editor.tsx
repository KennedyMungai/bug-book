'use client'

import { useSession } from '@/app/(main)/_components/session-provider'
import UserAvatar from '@/components/user-avatar'
import Placeholder from '@tiptap/extension-placeholder'
import { useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { submitPost } from './actions'

const PostEditor = () => {
	const { user } = useSession()

	const editor = useEditor({
		extensions: [
			StarterKit.configure({ bold: false, italic: false }),
			Placeholder.configure({ placeholder: "What's on your mind?" })
		]
	})

	const input =
		editor?.getText({
			blockSeparator: '\n'
		}) || ''

	const onSubmit = async () => {
		await submitPost(input)
		editor?.commands.clearContent()
	}

	return (
		<div className='flex flex-col gap-5 rounded-2xl bg-card p-5 shadow-sm'>
			<div className='flex gap-5'>
				<UserAvatar
					avatarUrl={user.avatarUrl}
					className='hidden sm:inline'
				/>
			</div>
		</div>
	)
}

export default PostEditor
