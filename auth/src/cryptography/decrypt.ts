import crypto from "node:crypto";

// * ~~~~~~~ PrivateKey ~~~~~~~;
export const decryptWithPrivateKey = (
	privateKey: crypto.RsaPrivateKey | crypto.KeyLike,
	encryptedMessage: NodeJS.ArrayBufferView
) => {
	return crypto.privateDecrypt(privateKey, encryptedMessage);
};
// * ~~~~~~~ PublicKey ~~~~~~~;
export const decryptWithPublicKey = (
	publicKey:
		| crypto.RsaPrivateKey
		| crypto.KeyLike
		| crypto.RsaPublicKey,
	encryptedMessage: NodeJS.ArrayBufferView
) => {
	return crypto.publicDecrypt(publicKey, encryptedMessage);
};
