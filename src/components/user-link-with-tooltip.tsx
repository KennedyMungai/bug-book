"use client";

import kyInstance from "@/lib/ky";
import { useQuery } from "@tanstack/react-query";
import { HTTPError } from "ky";
import Link from "next/link";
import { PropsWithChildren } from "react";
import UserTooltip from "./user-tooltip";

interface UserLinkWithTooltipProps extends PropsWithChildren {
	username: string;
}

const UserLinkWithTooltip = ({
	username,
	children,
}: UserLinkWithTooltipProps) => {
	const { data } = useQuery({
		queryKey: ["user-data", { username }],
		queryFn: () =>
			kyInstance.get(`/api/users/username/${username}`).json<{
				username: string;
				id: string;
				displayName: string;
				avatarUrl: string | null;
			}>(),
		retry: (failureCount, error) => {
			if (error instanceof HTTPError && error.response.status === 404)
				return false;

			return failureCount < 3;
		},
		staleTime: Infinity,
	});

	if (!data)
		return (
			<Link
				href={`/users/${username}`}
				className="text-primary hover:underline"
			>
				{children}
			</Link>
		);

	return (
		// @ts-ignore
		<UserTooltip user={data}>
			<Link
				href={`/users/${username}`}
				className="text-primary hover:underline"
			>
				{children}
			</Link>
		</UserTooltip>
	);
};

export default UserLinkWithTooltip;
