export interface PostsPage {
	posts: PostData[]
	nextCursor: string | null | undefined
}

export interface PostData {
	id: string
	content: string
	createdAt: Date
	user: {
		displayName: string
		username: string
		avatarUrl: string | null
	} | null
}