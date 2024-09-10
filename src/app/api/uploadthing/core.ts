import { validateRequest } from "@/auth";
import { db } from "@/db";
import { userTable } from "@/db/schema";
import { eq } from "drizzle-orm";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";

const f = createUploadthing();

const auth = (req: Request) => ({ id: "fakeId" }); // Fake auth function

// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
	avatar: f({ image: { maxFileSize: "512KB" } })
		.middleware(async () => {
			const { user } = await validateRequest();

			if (!user) throw new UploadThingError("Unauthorized");

			return { user };
		})
		.onUploadComplete(async ({ file, metadata }) => {
			const newAvatarUrl = file.url.replace(
				"/f/",
				`/a/${process.env.NEXT_PUBLIC_UPLOADTHING_APP_ID}/`,
			);

			await db
				.update(userTable)
				.set({ avatarUrl: newAvatarUrl })
				.where(eq(userTable.id, metadata.user.id));

			return { avatarUrl: newAvatarUrl };
		}),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
