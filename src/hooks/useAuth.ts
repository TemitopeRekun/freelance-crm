"use client";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useEffect, useState } from "react";
import { auth } from "@/lib/firebase";
import {
	onAuthStateChanged,
	signOut,
	signInWithEmailAndPassword,
	createUserWithEmailAndPassword,
} from "firebase/auth";

export const signInWithGoogle = async () => {
	const provider = new GoogleAuthProvider();
	return await signInWithPopup(auth, provider);
};

export function useAuth() {
	const [user, setUser] = useState<any>(null);

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
			setUser(firebaseUser);
		});
		return () => unsubscribe();
	}, []);

	const logout = async () => {
		await signOut(auth);
	};

	const login = (email: string, password: string) =>
		signInWithEmailAndPassword(auth, email, password);

	const register = (email: string, password: string) =>
		createUserWithEmailAndPassword(auth, email, password);

	return { user, login, logout, register };
}
