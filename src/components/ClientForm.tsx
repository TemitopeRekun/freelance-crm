"use client";

import { db } from "@/lib/firebase";
import { collection, addDoc, Timestamp } from "firebase/firestore";

import React, { useState } from "react";

interface ClientData {
	name: string;
	email: string;
	phone: string;
	notes: string;
}

const ClientForm: React.FC = () => {
	const [formData, setFormData] = useState<ClientData>({
		name: "",
		email: "",
		phone: "",
		notes: "",
	});

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		});
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		console.log("submitting form...", formData);

		try {
			console.log("trying to save client");
			const docRef = await addDoc(collection(db, "clients"), {
				...formData,
				createdAt: Timestamp.now(),
			});
			console.log("client saved with ID", docRef.id);

			setFormData({ name: "", email: "", phone: "", notes: "" });

			console.log("form cleared");
			alert("Client saved successfully.");
		} catch (error) {
			console.error("error saving client", error);
			alert("Failed to save client.");
		}
	};

	return (
		<form
			onSubmit={handleSubmit}
			className="space-y-6 p-6 bg-white rounded shadow-md max-w-md mx-auto">
			<h2 className="text-2xl sm:xl font-semibold mb-4">Add New Client</h2>

			<div>
				<label className="block font-medium mb-1">Name</label>
				<input
					type="text"
					name="name"
					value={formData.name}
					onChange={handleChange}
					className="w-full border border-gray-300 rounded px-3 py-2"
					required
				/>
			</div>

			<div>
				<label className="block font-medium mb-1">Email</label>
				<input
					type="text"
					name="email"
					value={formData.email}
					onChange={handleChange}
					className="w-full border border-gray-300 rounded px-3 py-2"
					required
				/>
			</div>

			<div>
				<label className="block font-medium mb-1">Phone</label>
				<input
					type="text"
					name="phone"
					value={formData.phone}
					onChange={handleChange}
					className="w-full border border-gray-300 rounded px-3 py-2"
					required
				/>
			</div>

			<div>
				<label className="block font-medium mb-1">Notes</label>
				<textarea
					name="notes"
					value={formData.notes}
					onChange={handleChange}
					className="w-full border border-gray-300 rounded px-3 py-2"
					rows={3}
				/>
			</div>

			<button
				type="submit"
				className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
				Save Client
			</button>
		</form>
	);
};

export default ClientForm;
