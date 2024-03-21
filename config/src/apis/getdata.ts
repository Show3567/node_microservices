import { Octokit } from "@octokit/rest";
import path from "path";
import fs from "fs";
import "../core/env.config";

const octokit = new Octokit({ auth: process.env.GIT_TOKEN });

const fetchConfigFromGitHub = async (
	filePath: string
): Promise<any> => {
	const response = await octokit.repos.getContent({
		owner: "show3567",
		repo: "node-microservices-config",
		path: filePath,
	});
	if (
		"content" in response.data &&
		typeof response.data.content === "string"
	) {
		return Buffer.from(response.data.content, "base64").toString();
	}

	throw new Error(`${filePath} not found or is not a file`);
};

const createLocalFile = (fileName: string, content: string): void => {
	const filePath = path.join(__dirname, "../store", fileName);

	if (!fs.existsSync(path.dirname(filePath))) {
		console.log(filePath);
		fs.mkdirSync(path.dirname(filePath));
	}
	fs.writeFileSync(filePath, content, "utf8");
};

const getConfig = async (fileName: string) => {
	try {
		const config = await fetchConfigFromGitHub(`${fileName}.json`);
		createLocalFile(`./${fileName}.json`, config);
	} catch (error) {
		console.error(error);
	}
};

const getFile = async (fileName: string) => {
	try {
		const fileContent = await fetchConfigFromGitHub(fileName);
		createLocalFile(`./${fileName}`, fileContent);
	} catch (error) {
		console.error(error);
	}
};

(async () => {
	await getConfig("config");
	await getFile("id_rsa_priv.pem");
	await getFile("id_rsa_pub.pem");
})();
