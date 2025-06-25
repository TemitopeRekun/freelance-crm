// src/lib/firebase.ts
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
	apiKey: "AIzaSyB6rNF3DJkI0w7KsuBA-CVJ1Mm8jBxo96o",
	authDomain: "freelance-crm-8402e.firebaseapp.com",
	databaseURL: "https://freelance-crm-8402e-default-rtdb.firebaseio.com",
	projectId: "freelance-crm-8402e",
	storageBucket: "freelance-crm-8402e.firebasestorage.app",
	messagingSenderId: "872118140154",
	appId: "1:872118140154:web:a9eb600ad36ee4c1a45d43",
	measurementId: "G-MV7EKLXV0Q",
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
