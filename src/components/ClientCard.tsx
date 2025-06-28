"use client";

import { Client } from "@/types/client";
import { PencilIcon } from "@heroicons/react/24/solid";

interface ClientCardProps {
	client: Client;
	onEdit: (client: Client) => void;
}

import React from "react";

const ClientCard: React.FC<ClientCardProps> = ({ client, onEdit }) => {
	return (
		<li className="p-4 border rounded bg-white shadow-sm relative">
			<button
				onClick={() => onEdit(client)}
				className=" absolute top-2 right-2 text-blue-500 hover:text-blue-700"
				title="Edit Client">
				<PencilIcon className="w-5 h-5" />
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
