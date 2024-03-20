import fs from "fs";
import path from "path";

const fileExistsInFolder = (fileName: string) => {
	const filePath = path.join(__dirname, fileName);
	return fs.existsSync(filePath);
};

export const selectSecret = () => {
	const fileName = "id_rsa_priv.pem";
	if (fileExistsInFolder(fileName)) {
		return {
			algorithm: "RS256",
			secret: fs.readFileSync(
				path.join(__dirname, "id_rsa_priv.pem"),
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
