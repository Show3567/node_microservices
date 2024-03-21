import axios from "axios";
import fs from "fs";
import path from "path";
import "../core/env.config";

const configList = ["JWT_SECRET", "MODB_URL"];
const configServer = process.env.CONFIG_SERVER;
console.log(`${configServer}/api/v1/config`);

const downloadFile = async (url: string, fileName: string) => {
	try {
		const response = await axios({
			method: "get",
			url: url,
			responseType: "stream", // Important for handling the download of binary files
		});

		const writer = fs.createWriteStream(
			path.join(__dirname, "./", `${fileName}.json`)
		);

		response.data.pipe(writer);

		return new Promise((resolve, reject) => {
			writer.on("finish", resolve);
			writer.on("error", reject);
		});
	} catch (error) {
		console.error("Error downloading the file:", error);
		throw error;
	}
};
const createLocalFile = (fileName: string, content: string): void => {
	const filePath = path.join(__dirname, "./", `${fileName}.json`);

	if (!fs.existsSync(path.dirname(filePath))) {
		console.log(filePath);
		fs.mkdirSync(path.dirname(filePath));
	}
	fs.writeFileSync(filePath, content, "utf8");
};

const getConfig = async () => {
	try {
		const result = await axios.post(`${configServer}/api/v1/config`, {
			data: configList,
		});
		createLocalFile("config", JSON.stringify(result.data));
	} catch (error) {
		console.error(error);
	}
};

(() => {
	getConfig();
})();
