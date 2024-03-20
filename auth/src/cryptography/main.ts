import fs from "fs";
import { encryptWithPublicKey } from "./encrypt";
import { decryptWithPrivateKey } from "./decrypt";

// * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ encrypted;
const publicKey = fs.readFileSync(
	__dirname + "/id_rsa_pub.pem",
	"utf-8"
);
const encryptedMessage = encryptWithPublicKey(
	publicKey,
	"Super secret message"
);

console.log(encryptedMessage.toString());

// * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ decrypted;
const privateKey = fs.readFileSync(
	__dirname + "/id_rsa_priv.pem",
	"utf-8"
);
const decryptedMessage = decryptWithPrivateKey(
	privateKey,
	encryptedMessage
);

console.log(decryptedMessage.toString());
