"use client";

import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";

export default function LoginPage() {
	const { login } = useAuth();
	const router = useRouter();

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		try {
			await login(email, password);
			router.push("/");
		} catch (error) {
			alert("Login failed");
		}
	};

	return (
		<form
			onSubmit={handleSubmit}
			className="max-w-sm mx-auto mt-10 space-y-4 bg-white p-6 rounded shadow">
			<h2 className="text-xl font-semibold">Login</h2>
			<input
				type="email"
				placeholder="email"
				value={email}
				onChange={(e) => setEmail(e.target.value)}
				className="w-full border px-3 py-2 rounded required"
			/>

			<input
				type="password"
				placeholder="password"
				value={password}
				onChange={(e) => setPassword(e.target.value)}
				className="w-full border px-3 py-2 rounded required"
			/>

			<button
				type="submit"
				className="bg-blue-600 text-white w-full py-2 rounded hover:bg-blue-700">
				Login
			</button>
		</form>
	);
}
