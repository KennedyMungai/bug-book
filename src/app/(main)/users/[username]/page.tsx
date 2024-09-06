type Props = {
	params: {
		username: string
	}
}

const UserProfilePage = ({ params: { username } }: Props) => {
	return <div>{username}</div>
}

export default UserProfilePage
