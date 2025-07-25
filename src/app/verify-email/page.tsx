"use client";

import { useEffect, useState } from "react";
import { auth } from "@/lib/firebase";
import { sendEmailVerification, reload } from "firebase/auth";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function VerifyEmailPage() {
	const router = useRouter();
	const user = auth.currentUser;

	const [counter, setCounter] = useState(60);
	const [email, setEmail] = useState("");
	const [canResend, setCanResend] = useState(false);

	useEffect(() => {
		if (auth.currentUser?.email) {
			setEmail(auth.currentUser.email);
		}
	}, []);

	useEffect(() => {
		if (!canResend && counter > 0) {
			const timer = setTimeout(() => setCounter((prev) => prev - 1), 1000);
			return () => clearTimeout(timer);
		}

		if (counter === 0) {
			setCanResend(true);
		}
	}, [counter, canResend]);

	useEffect(() => {
		const checkVerified = setInterval(async () => {
			const currentUser = auth.currentUser;
			if (!currentUser) return;

			await reload(currentUser);
			if (currentUser.emailVerified) {
				toast.success("Email verified");
				clearInterval(checkVerified);
				router.push("/");
			}
		}, 5000);

		return () => clearInterval(checkVerified);
	}, []);

	const handleResend = async () => {
		if (!auth.currentUser) return;

		try {
			await sendEmailVerification(auth.currentUser);
			toast.success(
				"Verification email resent. Please check your inbox OR spam folder."
			);
			setCounter(60);
			setCanResend(false);
		} catch (err) {
			toast.error("Failed to resend verification email.");
		}
	};

	const handleLogout = async () => {
		await auth.signOut();
		router.push("/login");
	};

	return (
		<div className="max-w-md mx-auto mt-20 p-6 bg-white shadow rounded text-center space-y-4">
			<h2 className="text-2xl font-semibold">Verify Your Email</h2>
			<p>
				A verification link has been sent to <strong>{email}</strong>.{" "}
				<br />
				Please check your inbox or spam folder.
			</p>

			<button
				onClick={handleResend}
				disabled={!canResend}
				className={`w-full py-2 rounded ${
					canResend
						? "bg-blue-600 text-white hover:bg-blue-700"
						: "bg-gray-300 text-gray-600 cursor-not-allowed"
				}`}>
				{canResend ? "Resend Verification Email" : `Resend in ${counter}s`}
			</button>

			<div className="mt-6">
				<button
					onClick={handleLogout}
					className="text-sm text-gray-500 underline hover:text-red-600">
					Logout and try another email
				</button>
			</div>
		</div>
	);
}
