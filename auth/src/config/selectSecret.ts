import fs from "fs";
import path from "path";
import "../core/env.config";
import { getConfigData } from "./getConfig";

const fileExistsInFolder = (keyName: string) => {
	const filePath = path.join(__dirname, `id_rsa_${keyName}.pem`);
	return fs.existsSync(filePath);
};

export const selectSecret = (keyName: "priv" | "pub") => {
	const config = getConfigData();
	const fileExist = fileExistsInFolder(keyName);

	const algorithm = fileExist ? "RS256" : "HS256";
	const secret = fileExist
		? fs.readFileSync(
				path.join(__dirname, `id_rsa_${keyName}.pem`),
				"utf-8"
		  )
		: config.JWT_SECRET;

	return { algorithm, secret };
};
