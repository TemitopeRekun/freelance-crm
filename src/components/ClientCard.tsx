"use client";

import { Client } from "@/types/client";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/solid";
import { doc, deleteDoc } from "firebase/firestore";
import toast from "react-hot-toast";
import { db } from "@/lib/firebase";

interface ClientCardProps {
	client: Client;
	onEdit: (client: Client) => void;
	onDelete: (client: Client) => void;
}

import React from "react";

const ClientCard: React.FC<ClientCardProps> = ({
	client,
	onEdit,
	onDelete,
}) => {
	return (
		<li className="p-4 border rounded border-gray-300 bg-white shadow-md relative hover:shadow-lg transition">
			<button
				onClick={() => onEdit(client)}
				className=" absolute top-2 right-2 text-blue-500 hover:text-blue-700 cursor-pointer"
				title="Edit Client">
				<PencilIcon className="w-5 h-5" />
			</button>
			<button
				onClick={() => onDelete(client)}
				className="absolute top-2 right-10 text-red-500 hover:text-red-700 cursor-pointer"
				title="Delete Client">
				<TrashIcon className="w-5 h-5" />
			</button>

			<p>
				<strong>Name:</strong> {client.name}
			</p>
			<p>
				<strong>Email:</strong> {client.email}
			</p>
			<p>
				<strong>Phone:</strong> {client.phone}
			</p>
			<p>
				<strong>Notes:</strong> {client.notes}
			</p>
		</li>
	);
};

export default ClientCard;
