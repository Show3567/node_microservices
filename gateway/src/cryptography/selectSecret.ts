import fs from "fs";
import path from "path";
import "../core/env.config";

const fileExistsInFolder = (fileName: string) => {
	const filePath = path.join(__dirname, fileName);
	return fs.existsSync(filePath);
};

export const selectSecret = () => {
	const fileName = "id_rsa_pub.pem";
	if (fileExistsInFolder(fileName)) {
		return {
			algorithm: "RS256",
			secret: fs.readFileSync(
				path.join(__dirname, fileName),
				"utf-8"
			),
		};
	} else {
		return {
			algorithm: "HS256",
			secret: process.env.JWT_SECRET,
		};
	}
};
