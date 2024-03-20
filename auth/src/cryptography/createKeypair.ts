import crypto from "crypto";
import { writeFileSync } from "fs";
import { join } from "path";

(function genKeyPair(): void {
	const keyPair: crypto.KeyPairSyncResult<any, any> =
		crypto.generateKeyPairSync("rsa", {
			modulusLength: 4096,
			publicKeyEncoding: {
				type: "spki", // Recommended to use 'spki' for public keys
				format: "pem",
			},
			privateKeyEncoding: {
				type: "pkcs8", // Recommended to use 'pkcs8' for private keys
				format: "pem",
			},
		});

	const dirName: string = __dirname; // Path where the files will be saved

	// Write the public key to a file
	writeFileSync(join(dirName, "id_rsa_pub.pem"), keyPair.publicKey);

	// Similarly, write the private key if needed
	writeFileSync(join(dirName, "id_rsa_priv.pem"), keyPair.privateKey);
})();
