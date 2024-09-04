type Props = {
	post: {
		id: string
		content: string
		createdAt: Date
		user: {
			displayName: string
			username: string
			avatarUrl: string | null
		}
	}
}

const Post = ({ post }: Props) => {
	return <article>{post.content}</article>
}

export default Post
