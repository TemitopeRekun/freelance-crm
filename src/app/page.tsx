"use client";

import Link from "next/link";

export default function Home() {
	return (
		<main className="p-6">
			<div>
				<h1 className="text-2xl font-bold mb-4">Dashboard</h1>
				<p>Welcome to your freelance CRM 👋</p>
				<p>Overview widgets coming soon...</p>
			</div>

			<Link href="/clients">
				<button className="bg-amber-500 text-white px-4 py-2 rounded hover:bg-blue-700">
					Go to Clients
				</button>
			</Link>
		</main>
	);
}
