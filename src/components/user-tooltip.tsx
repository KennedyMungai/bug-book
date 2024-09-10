"use client";

import { useSession } from "@/app/(main)/_components/session-provider";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import { FollowerInfo } from "@/lib/types";
import Link from "next/link";
import { PropsWithChildren } from "react";
import FollowButton from "./follow-button";
import FollowerCount from "./follower-count";
import Linkify from "./linkify";
import UserAvatar from "./user-avatar";

interface UserTooltipProps extends PropsWithChildren {
	user: {
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
	};
}

const UserTooltip = ({ user, children }: UserTooltipProps) => {
	const { user: loggedInUser } = useSession();

	const followerState: FollowerInfo = {
		followers: user.followers?.length ?? 0,
		isFollowedByUser: user.followers?.some(
			(follower) => follower.followerId === loggedInUser?.id,
		),
	};

	return (
		<TooltipProvider>
			<Tooltip>
				<TooltipTrigger asChild>{children}</TooltipTrigger>
				<TooltipContent>
					<div className="flex max-w-80 flex-col gap-3 break-words px-1 py-2.5 md:min-w-52">
						<div className="flex items-center justify-between gap-2">
							<Link href={`/users/${user.username}`}>
								<UserAvatar size={70} avatarUrl={user.avatarUrl} />
							</Link>
							{loggedInUser.id !== user.id && (
								<FollowButton userId={user.id} initialState={followerState} />
							)}
						</div>
						<div>
							<Link href={`/users/${user.username}`}>
								<div className="text-lg font-semibold hover:underline">
									{user.displayName}
								</div>
								<div className="text-muted-foreground">@{user.username}</div>
							</Link>
						</div>
						{user.bio && (
							<Linkify>
								<div className="line-clamp-4 whitespace-pre-line">
									{user.bio}
								</div>
							</Linkify>
						)}
						<FollowerCount userId={user.id} initialState={followerState} />
					</div>
				</TooltipContent>
			</Tooltip>
		</TooltipProvider>
	);
};

export default UserTooltip;
