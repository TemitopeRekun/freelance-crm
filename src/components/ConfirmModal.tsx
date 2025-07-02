"use client"
import React from "react";

import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";

interface ConfirmModalProps {
	isOpen: boolean;
	title?: string;
	message: string;
	onClose: () => void;
	onConfirm: () => void;
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({
	isOpen,
	onClose,
	onConfirm,
	title = "Confirm Action",
	message,
}) => {
	return (
		<Dialog open={isOpen} onClose={onClose}>
			<div
				className="fixed inset-0 bg-black/30 z-40 "
				aria-hidden="true"
			/>
			<div className="fixed inset-0 z-50 flex items-center justify-center p-4">
				<DialogPanel className="max-w-sm w-full bg-white rounded p-6 shadow-xl">
					<DialogTitle className="text-lg font-semibold mb-2">
						{title}
					</DialogTitle>
					<p className="text-gray-700 mb-6">{message}</p>

					<div className="flex justify-end gap-2">
						<button
							onClick={onClose}
							className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300">
							Cancel
						</button>
						<button
							onClick={() => {
								onConfirm();
								onClose();
							}}
							className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700">
							Delete
						</button>
					</div>
				</DialogPanel>
			</div>
		</Dialog>
	);
};

export default ConfirmModal;
