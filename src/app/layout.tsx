import type { Metadata } from "next";
import "../styles/globals.css";
import { Toaster } from "react-hot-toast";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
	title: "Freelance CRM",
	description: "Manage your freelance clients easily",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className="bg-gray-50 text-gray-900">
				<Navbar />
				<main className="max-w-4xl mx-auto px-4 py-6">{children}</main>
				<Toaster position="top-right" />
			</body>
		</html>
	);
}
