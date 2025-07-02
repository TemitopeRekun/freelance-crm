"use client";
import React, { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import {
	collection,
	query,
	orderBy,
	onSnapshot,
	doc,
	deleteDoc,
} from "firebase/firestore";
import { Client } from "@/types/client";
import ConfirmModal from "./ConfirmModal";
import ClientCard from "./ClientCard";
import ClientModal from "./ClientModal";
import toast from "react-hot-toast";

const ClientList: React.FC = () => {
	const [clients, setClients] = useState<Client[]>([]);
	const [selectedClient, setSelectedClient] = useState<Client | null>(null);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [clientToDelete, setClientToDelete] = useState<Client | null>(null);
	const [isConfirmOpen, setIsConfirmOpen] = useState(false);

	useEffect(() => {
		const q = query(collection(db, "clients"), orderBy("createdAt", "desc"));

		const unsubscribe = onSnapshot(q, (querySnapshot) => {
			const data = querySnapshot.docs.map((doc) => ({
				id: doc.id,
				...doc.data(),
			})) as Client[];
			setClients(data);
		});

		return () => unsubscribe();
	}, []);

	const handleEdit = (client: Client) => {
		setSelectedClient(client);
		setIsModalOpen(true);
	};

	const closeModal = () => {
		setSelectedClient(null);
		setIsModalOpen(false);
	};

	const handleDelete = async (client: Client) => {
		try {
			await deleteDoc(doc(db, "clients", client.id));
			toast.success("client deleted");
		} catch (error) {
			console.error("Error deleting client:", error);
			toast.error("Failed to delete client");
		}
	};

	const openDeleteModal = (client: Client) => {
		setClientToDelete(client);
		setIsConfirmOpen(true);
	};

	return (
		<div className="mt-10">
			<h2 className="text-xl font-semibold mb-4">Saved Clients</h2>

			{clients.length === 0 ? (
				<p className="text-gray-500">No clients yet.</p>
			) : (
				<ul className="space-y-4">
					{clients.map((client) => (
						<ClientCard
							key={client.id}
							client={client}
							onEdit={handleEdit}
							onDelete={openDeleteModal}
						/>
					))}
				</ul>
			)}

			<ClientModal
				isOpen={isModalOpen}
				onClose={closeModal}
				client={selectedClient}
			/>

			<ConfirmModal
				isOpen={isConfirmOpen}
				onClose={() => setIsConfirmOpen(false)}
				onConfirm={() => {
					if (clientToDelete) handleDelete(clientToDelete);
				}}
				message={`Are you sure you want to delete ${clientToDelete?.name}?`}
			/>
		</div>
	);
};

export default ClientList;
