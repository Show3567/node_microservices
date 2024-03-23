import axios from "axios";
import "../core/env.config";
import { getInternalAddress } from "./getCurrentAddress";
import { ServiceRegistryDTO } from "./interfaces/discovery.interface";

export const setAddOnDiscovery = async () => {
	const url = `${process.env.DISCOVERY_SERVER}/api/v1/discovery/set`;

	const obj: ServiceRegistryDTO = {
		key: "details",
		service: {
			endpoint: `http://localhost:${process.env.PORT}`,
			healthStatus: "healthy",
			ttl: 3600,
		},
	};
	const result = await axios.post(url, obj);
	console.log(result.data);
};
