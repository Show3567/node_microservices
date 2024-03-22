import axios from "axios";
import fs from "fs";
import path from "path";
import "../core/env.config";

const configList = ["JWT_SECRET"];
const configServer = process.env.CONFIG_SERVER;

const downloadFile = async (url: string, fileName: string) => {
	try {
		const response = await axios({
			method: "get",
			url: url,
			responseType: "stream", // Important for handling the download of binary files
		});

		const filepath = path.join(__dirname, "./", fileName);
		if (!fs.existsSync(path.dirname(filepath))) {
			console.log(filepath);
			fs.mkdirSync(path.dirname(filepath));
		}
		const writer = fs.createWriteStream(filepath);

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
export const getConfigData = () => {
	const rawData = fs.readFileSync(
		path.join(__dirname, "./", "config.json"),
		"utf8"
	);
	return JSON.parse(rawData);
};

// * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ get config;
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
const getKey = async (key: "priv" | "pub") => {
	const fileUrl = `${configServer}/api/v1/config?key=${key}`; // URL to your API endpoint
	// const savePath = path.join(__dirname, );
	await downloadFile(fileUrl, `id_rsa_${key}.pem`);
};

export const getConfigFromServer = async () => {
	await getConfig();
	await getKey("pub");
};
