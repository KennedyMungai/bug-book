export interface PostsPage {
	posts: {
		id: string
		content: string
		createdAt: Date
		user: {
			displayName: string
			username: string
			avatarUrl: string | null
		} | null
	}[]
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