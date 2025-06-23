"use client";

import Link from "next/link";

export default function Home() {
	return (
		<main className="p-6">
			<h1 className="text-4xl font-bold mb-4">Welcome to Frelance CRM</h1>
			<p className=" mb-6 text-gray-600">
				Manage your clients and invoices with ease
			</p>

			<Link href="/clients">
				<button className="bg-amber-500 text-white px-4 py-2 rounded hover:bg-blue-700">
					Go to Clients
				</button>
			</Link>
		</main>
	);
}
