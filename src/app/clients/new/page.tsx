import ClientForm from "@/components/ClientForm";
import React from "react";

const page = () => {
	return (
		<div>
			<h1 className="text-2xl font-bold mb-4">Add New Client</h1>
			<ClientForm />
		</div>
	);
};

export default page;
