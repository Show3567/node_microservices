import axios from "axios";
import path from "path";
import fs from "fs";
import "../core/auth.config";
import { getConfigData } from "../config/getConfig";

function updateConfigFile(key: string, val: string) {
	const filePath = path.join(__dirname, "../config", "config.json");

	fs.readFile(filePath, "utf8", (err, data) => {
		if (err) {
			console.error("Error reading the file:", err);
			return;
		}
		const json = JSON.parse(data);
		json[key] = val;
		const updatedJson = JSON.stringify(json, null, 2);

		fs.writeFile(filePath, updatedJson, "utf8", (err) => {
			if (err) {
				console.error("Error writing to the file:", err);
				return;
			}
			console.log("File successfully updated.");
		});
	});
}

export const initScheduler = () => {
	const getUrls = async (targetServer: string) => {
		const config = getConfigData();
		const discoveryUrl = `${config.DISCOVERY_SERVER}/api/v1/discovery/get/${targetServer}`;
		console.log(discoveryUrl);
		try {
			const result = await axios.get(discoveryUrl);
			const endpoint = result.data[targetServer]["endpoints"][0];
			// todo: add or edit key in config.json
			updateConfigFile(
				`${targetServer.toUpperCase()}_SERVER`,
				endpoint
			);
		} catch (error) {
			console.log(error);
		}
	};

	return { getUrls };
};
