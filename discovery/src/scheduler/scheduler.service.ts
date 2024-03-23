import Redis from "ioredis";
import axios from "axios";
import { ServiceInstanceDB } from "../apis/dto/setServer.dto";

export const initScheduler = (redisClient: Redis) => {
	const serverList = ["details"];

	const check = async (url: string) => {
		console.log("abcde: ", `${url}/api/v1/check-healthy`);
		try {
			const result = await axios.get(`${url}/api/v1/check-healthy`);
			console.log("~~~~~~~data~~~~~~~~~~: ", result.data);
			return true;
		} catch (error: any) {
			if (error.code === "ECONNABORTED") {
				console.error("Request timed out:", error.message);
			} else {
				console.log(url);
				console.error("Error fetching data:", error.message);
			}
			return false;
		}
	};

	const checkServices = () => {
		serverList.forEach(async (key) => {
			const cachedData = await redisClient.get(key);
			if (cachedData) {
				const data: ServiceInstanceDB = JSON.parse(cachedData);

				const checkAllUrl = await Promise.all(
					data.endpoints.map((url) => {
						return check(url);
					})
				);
				const collection = data.endpoints.filter(
					(_, i) => checkAllUrl[i]
				);
				if (collection.length !== data.endpoints.length) {
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
					console.log("set successful!");
				}
			}
		});
	};

	return { checkServices };
};

// todo:
