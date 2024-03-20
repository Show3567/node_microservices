import fs from "fs";
import crypto from "node:crypto";
import { decryptWithPrivateKey } from "./decrypt";
import { packageOfDataToSend } from "./signMessage";
import { hashMessage } from "./hashMessage";

const hash = crypto.createHash(packageOfDataToSend.algorithm);

const privateKey = fs.readFileSync(
	__dirname + "/id_rsa_priv.pem",
	"utf-8"
);
const publicKey = fs.readFileSync(
	__dirname + "/id_rsa_pub.pem",
	"utf-8"
);

// * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ decrypt message;
const decryptedMessage = decryptWithPrivateKey(
	privateKey,
	packageOfDataToSend.signedAndEncryptedData
);
const decryptedMessageHex = decryptedMessage.toString();

// * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ hash Original message;
const hashOfOriginalHex = hashMessage(
	JSON.stringify(packageOfDataToSend.originalData),
	packageOfDataToSend.algorithm
);

// * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ compare OriginHex and decryptoHex;
if (hashOfOriginalHex === decryptedMessageHex) {
	console.log("success");
} else {
	console.log("No no no...");
}
