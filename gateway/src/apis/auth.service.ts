import { RequestHandler } from "express";
import "../core/env.config";
import axios from "axios";

const AuthServerPath = process.env.AUTH_SERVER;
// * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ API;
// & ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ signin;
export const signIn: RequestHandler = async (req, res) => {
	const result = await axios.post(
		`${AuthServerPath}/api/v1/auth/signin`,
		req.body
	);

	res.status(result.status).json(result.data);
};

// & ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ signup;
export const signUp: RequestHandler = async (req, res) => {
	const result = await axios.post(
		`${AuthServerPath}/api/v1/auth/signup`,
		req.body
	);
	res.status(result.status).json(result.data);
};

// & ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ updateUser;
export const updateUser: RequestHandler = async (req, res) => {
	const result = await axios.patch(
		`${AuthServerPath}/api/v1/auth/userupdate`,
		req.body,
		{ headers: { ...req.headers } }
	);
	res.status(result.status).json(result.data);
};

// & ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ deleteUserById;
export const deleteUserById: RequestHandler = async (req, res) => {
	const id = req.params.id;
	const result = await axios.delete(
		`${AuthServerPath}/api/v1/auth/users/${id}`,
		{ headers: { ...req.headers } }
	);
	res.status(result.status).json(result.data);
};

// & ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ refreshToken;
export const refreshToken: RequestHandler = async (req, res) => {
	const result = await axios.get(
		`${AuthServerPath}/api/v1/auth/refresh-token`,
		{ headers: { ...req.headers } }
	);
	res.status(result.status).json(result.data);
};

// & ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ checkEmail;
export const checkEmail: RequestHandler = async function (req, res) {
	const result = await axios.post(
		`${AuthServerPath}/api/v1/auth/check-email`,
		req.body
	);
	res.status(result.status).json(result.data);
};

export const getUsers: RequestHandler = async (req, res) => {
	const result = await axios.post(
		`${AuthServerPath}/api/v1/auth/users`,
		req.body,
		{ headers: { ...req.headers } }
	);
	res.status(result.status).json(result.data);
};
