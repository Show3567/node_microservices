import axios from "axios";
import os from "node:os";

export const getInternalAddress = () => {
	const interfaces = os.networkInterfaces();
	for (const iface of Object.values(interfaces)) {
		for (const alias of iface as any) {
			if (alias.family === "IPv4" && !alias.internal) {
				return alias.address;
			}
		}
	}
	return "localhost";
};

export const getPublicAddress = async () => {
	try {
		const response = await axios.get(
			"https://api.ipify.org?format=json"
		);
		return response.data.ip;
	} catch (error) {
		console.error("Error fetching public IP address:", error);
		return null;
	}
};
