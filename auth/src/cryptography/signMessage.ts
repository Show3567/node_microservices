import fs from "fs";
import { encryptWithPublicKey } from "./encrypt";
import { hashMessage } from "./hashMessage";

const myData = {
	firstname: "David",
	lastname: "Dong",
	ssn: "XXX-XXX-XXXX",
};

const privateKey = fs.readFileSync(
	__dirname + "/id_rsa_priv.pem",
	"utf-8"
);
const publicKey = fs.readFileSync(
	__dirname + "/id_rsa_pub.pem",
	"utf-8"
);

const signedMessage = encryptWithPublicKey(
	publicKey,
	hashMessage(myData, "sha256")
);

export const packageOfDataToSend = {
	algorithm: "sha256",
	originalData: myData,
	signedAndEncryptedData: signedMessage,
};
