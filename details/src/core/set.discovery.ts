import axios from "axios";
import "../core/env.config";
import { getInternalAddress } from "./getCurrentAddress";

export const setAddOnDiscovery = async () => {
	const url = `${process.env.DISCOVERY_SERVER}/api/v1/discovery`;
	const obj = {
		key: "details",
		address: {
			port: process.env.PORT,
			domain: getInternalAddress(),
		},
	};
	const result = await axios.post(url, obj);
	console.log(result.data);
};
