import ClientForm from "@/components/ClientForm";
import React from "react";

const ClientsPage = () => {
	return (
		<main className="p-6">
			<h1 className="text-3xl font-bold mb-4">Clients</h1>
			<p className="text-gray-600 mb-5">
				This is where your list of clients will show
			</p>

			<ClientForm />
		</main>
	);
};

export default ClientsPage;
