"use client";

import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { useState, useEffect } from "react";
import { Client } from "@/types/client";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import React from "react";
import toast from "react-hot-toast";

interface ClientModalProps {
	isOpen: boolean;
	onClose: () => void;
	client: Client | null;
}

const ClientModal: React.FC<ClientModalProps> = ({
	isOpen,
	onClose,
	client,
}) => {
	const [formData, setFormData] = useState<Client>({
		id: "",
		name: "",
		email: "",
		phone: "",
		notes: "",
		createdAt: null,
	});

	useEffect(() => {
		if (client) {
			setFormData(client);
		}
	}, [client]);

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		});
	};

	const handleUpdate = async () => {
		try {
			const clientRef = doc(db, "clients", formData.id);
			await updateDoc(clientRef, {
				name: formData.name,
				email: formData.email,
				phone: formData.phone,
				notes: formData.notes,
			});
			toast.success("Client updated ✅");
			onClose();
		} catch (error) {
			console.error("Update failed:", error);
			toast.error("Update Failed ❌");
		}
	};
	return (
		<Dialog open={isOpen} onClose={onClose}>
			<div className="fixed inset-0 z-40 bg-black/25" aria-hidden="true" />
			<div className="fixed inset-0 z-50 flex items-center justify-center p-4">
				<DialogPanel className="w-full max-w-md transform rounded bg-white p-6 shadow-xl transition duration-300 data-[state=closed]:opacity-0 ">
					<DialogTitle className="text-xl font-bold mb-4">
						{" "}
						Edit Client
					</DialogTitle>

					<div className="space-y-4">
						<input
							type="text"
							name="name"
							value={formData.name}
							onChange={handleChange}
							placeholder="Name"
							className="w-full border border-gray-300 rounded px-3 py-2"
						/>

						<input
							type="email"
							name="email"
							value={formData.email}
							onChange={handleChange}
							placeholder="Email"
							className="w-full border border-gray-300 rounded px-3 py-2"
						/>

						<input
							type="text"
							name="phone"
							value={formData.phone}
							onChange={handleChange}
							placeholder="Phone"
							className="w-full border border-gray-300 rounded px-3 py-2"
						/>

						<textarea
							name="notes"
							value={formData.notes}
							onChange={handleChange}
							placeholder="Notes"
							className="w-full border border-gray-300 rounded px-3 py-2"
							rows={3}
						/>
					</div>

					<div className="mt-6 flex justify-end space-x-2">
						<button
							onClick={onClose}
							className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 cursor-pointer">
							Cancel
						</button>
						<button
							onClick={handleUpdate}
							className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 cursor-pointer">
							Save Changes
						</button>
					</div>
				</DialogPanel>
			</div>
		</Dialog>
	);
};

export default ClientModal;
