import os from "node:os";

const getInternalAddress = () => {
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

export const internalAddress = getInternalAddress();
