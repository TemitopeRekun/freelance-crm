"use client";
import React, { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import { Client } from "@/types/client";
import ClientCard from "./ClientCard";
import ClientModal from "./ClientModal";

const ClientList: React.FC = () => {
	const [clients, setClients] = useState<Client[]>([]);
	const [selectedClient, setSelectedClient] = useState<Client | null>(null);
	const [isModalOpen, setIsModalOpen] = useState(false);

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
						/>
					))}
				</ul>
			)}

			<ClientModal
				isOpen={isModalOpen}
				onClose={closeModal}
				client={selectedClient}
			/>
		</div>
	);
};

export default ClientList;
