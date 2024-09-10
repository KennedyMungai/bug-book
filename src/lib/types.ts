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

export interface FollowerInfo {
	followers: number
	isFollowedByUser: boolean
}

export interface UserData {
	username: string;
	id: string;
	displayName: string;
	avatarUrl: string | null;
	bio: string | null;
	createdAt: Date;
	posts: {
		id: string;
		content: string;
		createdAt: Date;
	}[];
	followers: {
		followerId: string;
	}[];
} 