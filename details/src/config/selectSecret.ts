import fs from "fs";
import path from "path";
import "../core/env.config";
import { getConfigData } from "./getConfig";

const fileExistsInFolder = (fileName: string) => {
	const filePath = path.join(__dirname, fileName);
	return fs.existsSync(filePath);
};

export const selectSecret = (keyName: "priv" | "pub") => {
	const config = getConfigData();
	const fileName = `id_rsa_${keyName}.pem`;
	const hasfile = fileExistsInFolder(fileName);
	const algorithm = hasfile ? "RS256" : "HS256";
	const secret = hasfile
		? fs.readFileSync(path.join(__dirname, fileName), "utf-8")
		: config.JWT_SECRET;

	return { algorithm, secret };
};
