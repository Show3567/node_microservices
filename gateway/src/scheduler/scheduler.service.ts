import axios from "axios";
import "../core/auth.config";

export const initScheduler = () => {
	const getUrls = (targetServer: string) => {
		const discoveryUrl = process.env.DISCOVERY_SERVER;
	};

	return { getUrls };
};
