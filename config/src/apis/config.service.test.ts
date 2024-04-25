// import { getConfig, getKey } from "./config.service";
// import { fetchConfigFromGitHub } from "./getdata";

// jest.mock("fs");
// jest.mock("./getdata");

// describe("getConfig", () => {
// 	it("should return the filtered config data", async () => {
// 		const req = { body: { data: ["key1", "key2"] } };
// 		const res = {
// 			status: jest.fn().mockReturnThis(),
// 			json: jest.fn(),
// 		};

// 		fetchConfigFromGitHub.mockResolvedValueOnce(
// 			'{"key1": "value1", "key2": "value2", "key3": "value3"}'
// 		);

// 		await getConfig(req, res);

// 		expect(fetchConfigFromGitHub).toHaveBeenCalledWith("config.json");
// 		expect(res.status).toHaveBeenCalledWith(201);
// 		expect(res.json).toHaveBeenCalledWith({
// 			key1: "value1",
// 			key2: "value2",
// 		});
// 	});
// });

// describe("getKey", () => {
// 	it("should return the key file content", async () => {
// 		const req = { query: { key: "priv" } };
// 		const res = {
// 			send: jest.fn(),
// 		};

// 		fetchConfigFromGitHub.mockResolvedValueOnce(
// 			"private key content"
// 		);

// 		await getKey(req, res);

// 		expect(fetchConfigFromGitHub).toHaveBeenCalledWith(
// 			"id_rsa_priv.pem"
// 		);
// 		expect(res.send).toHaveBeenCalledWith("private key content");
// 	});
// });
