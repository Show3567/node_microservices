import axios from "axios";
import "../core/auth.config";
import { getConfigData } from "../config/getConfig";

export const initScheduler = () => {
	const getUrls = async (targetServer: string) => {
		const config = getConfigData();
		const discoveryUrl = `${config.DISCOVERY_SERVER}/api/v1/discovery/get/${targetServer}`;
		console.log(discoveryUrl);
		try {
			const result = await axios.get(discoveryUrl);
			console.log(result.data);
		} catch (error) {
			console.log(error);
		}
	};

	return { getUrls };
};
