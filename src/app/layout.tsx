import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import QueryProvider from '@/providers/query-provider'
import { Toaster } from '@/components/ui/sonner'
import { ThemeProvider } from 'next-themes'

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: {
		template: '%s | Bug Book',
		default: 'Bug Book'
	},
	description: 'A simple bare bones social media app'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
		<html lang='en'>
			<body className={inter.className}>
				<QueryProvider>
					<ThemeProvider
						attribute='class'
						enableSystem
						defaultTheme='system'
						disableTransitionOnChange
					>
						<Toaster />
						{children}
					</ThemeProvider>
				</QueryProvider>
			</body>
		</html>
  )
}
