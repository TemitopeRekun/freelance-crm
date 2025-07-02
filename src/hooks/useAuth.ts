"use client";
import { useEffect, useState } from "react";
import { auth } from "@/lib/firebase";
import {
	onAuthStateChanged,
	signOut,
	signInWithEmailAndPassword,
	createUserWithEmailAndPassword,
} from "firebase/auth";

export function useAuth() {
	const [user, setUser] = useState<any>(null);

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
			setUser(firebaseUser);
		});
		return () => unsubscribe();
	}, []);

	const logout = () => signOut(auth);

	const login = (email: string, password: string) =>
		signInWithEmailAndPassword(auth, email, password);

	const register = (email: string, password: string) =>
		createUserWithEmailAndPassword(auth, email, password);

	return { user, login, logout, register };
}
