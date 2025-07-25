"use client";

import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import toast from "react-hot-toast";
import { signInWithGoogle } from "@/hooks/useAuth";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { auth } from "@/lib/firebase";

export default function LoginPage() {
	const { login } = useAuth();
	const router = useRouter();
	const [demoLoading, setDemoLoading] = useState(false);
	const [loading, setLoading] = useState(false);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setError("");
		setLoading(true);

		try {
			const userCred = await login(email, password);
			const user = userCred.user;

			if (!user.emailVerified) {
				setError("Please verify your email before logging in");

				await auth.signOut();
				return;
			}
			toast.success("Logged in successfully!");
			router.push("/");
		} catch (err: any) {
			setError(err.message || "Login failed");
		} finally {
			setLoading(false);
		}
	};
	const handleDemoLogin = async () => {
		try {
			setError("");
			setDemoLoading(true);

			await login("demo@demo.com", "demopassword");
			toast.success("Logged in successfully!");
			router.push("/");
		} catch (err: any) {
			setError("Demo login failed");
		} finally {
			setDemoLoading(false);
		}
	};

	const handleGoogleLogin = async () => {
		try {
			setError("");
			await signInWithGoogle();
			router.push("/");
		} catch (err: any) {
			setError("Google login failed");
		}
	};

	return (
		<form
			onSubmit={handleSubmit}
			className="max-w-sm mx-auto mt-10 space-y-4 bg-white p-6 rounded shadow">
			<h2 className="text-xl font-bold mb-2">Login</h2>

			{error && <p className="text-sm text-red-600">{error}</p>}

			<input
				type="email"
				placeholder="email"
				value={email}
				onChange={(e) => setEmail(e.target.value)}
				className="w-full border px-3 py-2 rounded"
				required
			/>

			<input
				type="password"
				placeholder="password"
				required
				value={password}
				onChange={(e) => setPassword(e.target.value)}
				className="w-full border px-3 py-2 rounded"
			/>

			<button
				type="submit"
				disabled={loading}
				className={`w-full py-2 rounded text-white  ${
					loading
						? "bg-gray-400 cursor-not-allowed"
						: "bg-blue-600 hover:bg-blue-700"
				}`}>
				{loading ? "Logging in..." : "Login"}
			</button>

			<button
				type="button"
				onClick={handleDemoLogin}
				disabled={demoLoading}
				className={`w-full py-2 rounded text-white  ${
					demoLoading
						? "bg-gray-400 cursor-not-allowed"
						: "bg-gray-800 hover:bg-gray-300"
				}`}>
				{demoLoading ? "Logging in..." : "Login as Demo User"}
			</button>

			<div className="relative flex items-center py-2">
				<div className="flex-grow border-t border-gray-300"></div>
				<span className="mx-4 text-gray-500 text-sm">OR</span>
				<div className="flex-grow border-t border-gray-300"></div>
			</div>

			<button
				type="button"
				onClick={handleGoogleLogin}
				className="bg-white text-gray-800 flex items-center justify-center gap-2 w-full py-2 border rounded hover:bg-blue-800 hover:text-white ">
				<FcGoogle className="w-5 h-5" />
				Continue with Google
			</button>
		</form>
	);
}
