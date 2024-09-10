import { validateRequest } from "@/auth";
import { db } from "@/db";
import { userTable } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

type Props = {
	params: {
		username: string;
	};
};

const handleError = (error: any) => {
	console.error(error.message);
	return NextResponse.json({ error: "Internal Server" }, { status: 500 });
};

export const GET = async (
	req: NextRequest,
	{ params: { username } }: Props,
) => {
	try {
		const { user: loggedInUser } = await validateRequest();

		if (!loggedInUser)
			return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

		const user = await db.query.userTable.findFirst({
			columns: {
				id: true,
				username: true,
				displayName: true,
				avatarUrl: true,
			},
			where: eq(userTable.username, loggedInUser.username),
		});

		if (!user)
			return NextResponse.json({ error: "User not found" }, { status: 404 });

		return NextResponse.json(user);
	} catch (error: any) {
		handleError(error);
	}
};
