"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { db } from "@/lib/firebase";
import { setDoc, doc, Timestamp } from "firebase/firestore";
import { signInWithGoogle, useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { sendEmailVerification } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { FcGoogle } from "react-icons/fc";

export default function RegisterPage() {
	const { register } = useAuth();
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirm, setConfirm] = useState("");
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");
	const [googleLoading, setGoogleLoading] = useState(false);
	const router = useRouter();

	const handleGoogleLogin = async () => {
		setGoogleLoading(true);

		try {
			setError("");
			await signInWithGoogle();
			toast.success("Logged in with Google!");
			router.push("/");
		} catch (err: any) {
			setError("Google sign-in failed");
		} finally {
			setGoogleLoading(false);
		}
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setError("");
		setLoading(true);

		if (!email || !password || !confirm) {
			setError("All fields are required.");
			setLoading(false);
			return;
		}

		if (password !== confirm) {
			setError("Passwords do not match.");
			setLoading(false);
			return;
		}

		try {
			await register(email, password);
			const user = auth.currentUser;

			if (user) {
				await setDoc(doc(db, "users", user.uid), {
					firstName,
					lastName,
					email,
					createdAt: Timestamp.now(),
				});
			}
			await sendEmailVerification(auth.currentUser!);
			await auth.signOut();

			toast.success(
				"Registered successfully. Check your email to verify your account."
			);
			router.push("/verify-email");
		} catch (err: any) {
			setError(err.message || "Registration failed");
		} finally {
			setLoading(false);
		}
	};

	return (
		<form
			onSubmit={handleSubmit}
			className="max-w-sm mx-auto mt-10 space-y-4 bg-white p-6 rounded shadow">
			<h2 className="text-xl font-semibold mb-2">Register</h2>

			{error && <p className="text-red-600 text-sm">{error}</p>}

			<input
				type="text"
				placeholder="First Name"
				className="w-full border px-3 py-2 rounded"
				value={firstName}
				onChange={(e) => setFirstName(e.target.value)}
				required
			/>

			<input
				type="text"
				placeholder="Last Name"
				className="w-full border px-3 py-2 rounded"
				value={lastName}
				onChange={(e) => setLastName(e.target.value)}
				required
			/>

			<input
				type="email"
				placeholder="Email"
				className="w-full border px-3 py-2 rounded"
				value={email}
				onChange={(e) => setEmail(e.target.value)}
				required
			/>

			<input
				type="password"
				placeholder="Password"
				className="w-full border px-3 py-2 rounded"
				value={password}
				onChange={(e) => setPassword(e.target.value)}
				required
			/>

			<input
				type="password"
				placeholder="Confirm Password"
				className="w-full border px-3 py-2 rounded"
				value={confirm}
				onChange={(e) => setConfirm(e.target.value)}
				required
			/>

			<button
				type="submit"
				disabled={loading}
				className={`w-full py-2 rounded text-white ${
					loading
						? "bg-gray-400 cursor-not-allowed"
						: "bg-blue-600 hover:bg-blue-700"
				}`}>
				{loading ? "Registering..." : "Register"}
			</button>

			<div className="relative flex items-center py-2">
				<div className="flex-grow border-t border-gray-300"></div>
				<span className="mx-4 text-gray-500 text-sm">OR</span>
				<div className="flex-grow border-t border-gray-300"></div>
			</div>

			<button
				onClick={handleGoogleLogin}
				type="button"
				disabled={googleLoading}
				className="bg-white text-gray-800 flex py-2 border rounded items-center justify-center gap-2 w-full hover:bg-blue-800 hover:text-white">
				<FcGoogle className="w-5 h-5" /> Sign up with Google
			</button>
		</form>
	);
}
