import crypto from "node:crypto";

export const hashMessage = (
	message: { [key: string]: any } | string,
	algorithm: string
) => {
	const hash = crypto.createHash(algorithm);
	hash.update(JSON.stringify(message));
	return hash.digest("hex");
};
