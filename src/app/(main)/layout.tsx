import { validateRequest } from "@/auth";
import "@uploadthing/react/styles.css";
import { redirect } from "next/navigation";
import { ReactNode } from "react";
import MenuBar from "./_components/menu-bar";
import NavBar from "./_components/navbar";
import SessionProvider from "./_components/session-provider";

type Props = {
	children: ReactNode;
};

const MainLayout = async ({ children }: Props) => {
	const session = await validateRequest();

	if (!session.user) redirect("/login");

	return (
		<SessionProvider value={session}>
			<div className="flex flex-col h-full">
				<NavBar />
				<div className="max-w-7xl p-5 mx-auto flex w-full grow gap-5">
					<MenuBar className="sticky top-[5.25rem] h-fit hidden sm:block flex-none space-y-3 rounded-2xl bg-card px-3 py-5 lg:px-5 shadow-sm xl:w-80" />
					{children}
				</div>
				<MenuBar className="sticky bottom-0 flex w-full justify-center gap-5 bg-card p-3 sm:hidden" />
			</div>
		</SessionProvider>
	);
};

export default MainLayout;
