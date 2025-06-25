"use client";
import React, { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import { collection, getDocs, query, orderBy } from "firebase/firestore";

interface Client {
	id: string;
	name: string;
	email: string;
	phone: string;
	notes: string;
	createdAt?: any;
}

const ClientList: React.FC = () => {
	const [clients, setClients] = useState<Client[]>([]);

	useEffect(() => {
		const fetchClients = async () => {
			try {
				const q = query(
					collection(db, "clients"),
					orderBy("createdAt", "desc")
				);
				const querySnapshot = await getDocs(q);
				const data = querySnapshot.docs.map((doc) => ({
					id: doc.id,
					...doc.data(),
				})) as Client[];
				setClients(data);
			} catch (error) {
				console.error("Error fetching Clients:", error);
			}
		};

		fetchClients();
	}, []);

	return (
		<div className="mt-10">
			<h2 className="text-xl font-semibold mb-4">Saved Clients</h2>

			{clients.length === 0 ? (
				<p className="text-gray-500">No clients yet.</p>
			) : (
				<ul className="space-y-4">
					{clients.map((client) => (
						<li
							key={client.id}
							className="p-4 border rounded bg-white shadow-sm">
							<p>
								<strong>Name:</strong>
								{client.name}
							</p>
							<p>
								<strong>Email:</strong>
								{client.email}
							</p>
							<p>
								<strong>Phone:</strong>
								{client.phone}
							</p>
							<p>
								<strong>Notes:</strong>
								{client.notes}
							</p>
						</li>
					))}
				</ul>
			)}
		</div>
	);
};

export default ClientList;
