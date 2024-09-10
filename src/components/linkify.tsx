import Link from "next/link";
import { ReactNode } from "react";
import { LinkIt, LinkItUrl } from "react-linkify-it";

type Props = {
	children: ReactNode;
};

const Linkify = ({ children }: Props) => {
	return (
		<LinkifyUsername>
			<LinkifyHashtag>
				<LinkifyUrl>{children}</LinkifyUrl>
			</LinkifyHashtag>
		</LinkifyUsername>
	);
};

export default Linkify;

const LinkifyUrl = ({ children }: Props) => (
	<LinkItUrl className="text-primary hover:underline">{children}</LinkItUrl>
);

const LinkifyUsername = ({ children }: Props) => (
	<LinkIt
		regex={/(@[a-zA-Z0-9_-]+)/}
		component={(match, key) => {
			return (
				<Link
					href={`/users/${match.slice(1)}`}
					key={key}
					className="text-primary hover:underline"
				>
					{match}
				</Link>
			);
		}}
	>
		{children}
	</LinkIt>
);

const LinkifyHashtag = ({ children }: Props) => (
	<LinkIt
		regex={/(#[a-zA-Z0-9_]+)/}
		component={(match, key) => (
			<Link
				key={key}
				href={`/hashtag/${match.slice(1)}`}
				className="text-primary hover:underline"
			>
				{match}
			</Link>
		)}
	>
		{children}
	</LinkIt>
);
