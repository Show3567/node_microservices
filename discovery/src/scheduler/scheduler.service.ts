import Redis from "ioredis";
import axios from "axios";
import { ServiceInstanceDB } from "../apis/dto/setServer.dto";

export const initScheduler = (redisClient: Redis) => {
	const serverList = ["details"];

	const check = async (url: string) => {
		try {
			const result = await axios.get(`${url}/api/v1/check-healthy`, {
				timeout: 5000,
			});
			console.log(result.data);
			return true;
		} catch (error: any) {
			if (error.code === "ECONNABORTED") {
				console.error("Request timed out:", error.message);
			} else {
				console.error("Error fetching data:", error.message);
			}
			return false;
		}
	};

	const checkServices = () => {
		serverList.forEach(async (key) => {
			const cachedData = await redisClient.get(key);
			if (cachedData) {
				const data = JSON.parse(cachedData);
				let collection = [...data.endpoints];
				data.endpoints.forEach(async (url: string) => {
					const checkedRes = await check(url);
					if (!checkedRes) {
						collection = collection.filter((str) => str !== url);
					}
				});
				await redisClient.set(
					key,
					JSON.stringify({
						healthStatus: "healthy",
						endpoints: [...collection],
						ttl: data.ttl,
						timestamps: {
							...data.timestamps,
							updated: Date.now().toString(),
						},
					} as ServiceInstanceDB),
					"EX",
					data.ttl
				);
			}
		});
	};

	return { checkServices };
};

// todo:
