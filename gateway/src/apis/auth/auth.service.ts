import { RequestHandler, Request, Response } from "express";
import "../../core/env.config";
import axios from "axios";
import { getConfigData } from "../../config/getConfig";

// * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ API;
export const AuthService = () => {
	const AuthServerPath = getConfigData().AUTH_SERVER;

	// & ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ signin;
	const signIn: RequestHandler = async (req, res) => {
		const result = await axios.post(
			`${AuthServerPath}/api/v1/auth/signin`,
			req.body
		);

		res.status(result.status).json(result.data);
	};

	// & ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ signup;
	const signUp: RequestHandler = async (req, res) => {
		const result = await axios.post(
			`${AuthServerPath}/api/v1/auth/signup`,
			req.body
		);
		res.status(result.status).json(result.data);
	};

	// & ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ updateUser;
	const updateUser: RequestHandler = async (req, res) => {
		const result = await axios.patch(
			`${AuthServerPath}/api/v1/auth/userupdate`,
			req.body,
			{ headers: { ...req.headers } }
		);
		res.status(result.status).json(result.data);
	};

	// & ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ deleteUserById;
	const deleteUserById: RequestHandler = async (req, res) => {
		const id = req.params.id;
		const result = await axios.delete(
			`${AuthServerPath}/api/v1/auth/users/${id}`,
			{ headers: { ...req.headers } }
		);
		res.status(result.status).json(result.data);
	};

	// & ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ refreshToken;
	const refreshToken: RequestHandler = async (req, res) => {
		const result = await axios.get(
			`${AuthServerPath}/api/v1/auth/refresh-token`,
			{ headers: { ...req.headers } }
		);
		res.status(result.status).json(result.data);
	};

	// & ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ checkEmail;
	const checkEmail: RequestHandler = async function (req, res) {
		const result = await axios.post(
			`${AuthServerPath}/api/v1/auth/check-email`,
			req.body
		);
		res.status(result.status).json(result.data);
	};

	const getUsers: RequestHandler = async (req, res, next) => {
		const result = await axios.post(
			`${AuthServerPath}/api/v1/auth/users`,
			req.body,
			{ headers: { ...req.headers } }
		);
		res.status(result.status).json(result.data);
	};

	const issueResult = (result: any): RequestHandler => {
		return (req: Request, res: Response) => {
			res.status(result.status).json(result.data);
		};
	};

	return {
		signIn,
		signUp,
		updateUser,
		deleteUserById,
		refreshToken,
		getUsers,
		checkEmail,
		issueResult,
	};
};
