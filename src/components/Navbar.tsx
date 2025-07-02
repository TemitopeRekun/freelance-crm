"use client";
import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";
import React from "react";

const Navbar = () => {
	const { user, logout } = useAuth();

	return (
		<nav className="bg-white shadow-sm py-4 px-6 flex justify-between  items-center sticky top-0 z-50 ">
			<Link href="/" className="text-xl font-bold text-blue-600">
				Freelance CRM
			</Link>

			<div className="space-x-4 text-sm">
				<Link href="/">Dashboard</Link>
				<Link href="/clients">Clients</Link>

				{user ? (
					<>
						<span className="text-gray-600">Hi, {user.name}</span>
						<button className="text-red-500 hover:text-red-700 ml-2">
							Logout
						</button>
					</>
				) : (
					<>
						<Link href="/login">Login</Link>
						<Link href="/register">Register</Link>
					</>
				)}
			</div>
		</nav>
	);
};

export default Navbar;
