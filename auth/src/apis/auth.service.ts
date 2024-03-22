import { RequestHandler } from "express";
import jwt, { Algorithm, JwtPayload, Secret } from "jsonwebtoken";
import { DataSource, ObjectId, Repository } from "typeorm";
import "../core/env.config";
import { User } from "../core/entities/user.entity";
import {
	genPassword,
	validPassword,
} from "../core/passport/passport-util";
import logger, { loggerErr, loggerInfo } from "../core/logger.config";
import { UserRole } from "../core/interfaces/user-role.enum";
import { selectSecret } from "../cryptography/selectSecret";

// * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ private function;
const createToken = function (user: User) {
	const payload: JwtPayload = {
		id: user._id.toString(),
		username: user.username,
		email: user.email,
	};
	const { secret, algorithm } = selectSecret("priv");
	const accessToken: string = jwt.sign(payload, secret as Secret, {
		expiresIn: "1d",
		algorithm: algorithm as Algorithm,
	});
	return `Bearer ${accessToken}`;
};

// * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ API;
const authService = (appDataSouse: DataSource) => {
	const userRepo = appDataSouse.getRepository(User);

	// & ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ signin;
	const signIn: RequestHandler = async (req, res) => {
		const { email, password } = req.body;
		const user = await userRepo.findOne({ where: { email } });

		if (user && (await validPassword(password, user.password))) {
			const accessToken: string = createToken(user);

			logger.info(
				loggerInfo("signin", 201, { accessToken, role: user.role })
			);
			res.status(201).json({ accessToken, role: user.role });
		} else {
			logger.error(
				loggerErr(
					"signin",
					401,
					"Please check your login credentials"
				)
			);
			res
				.status(401)
				.json({ errMsg: "Please check your login credentials" });
		}
	};

	// & ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ signup;
	const signUp: RequestHandler = async (req, res) => {
		const { username, password, email, role }: User = req.body;

		// 409: 'Conflict';
		if (!!(await userRepo.findOne({ where: { email } }))) {
			logger.error(
				loggerErr("signup", 409, "User Already Exist. Please Login")
			);
			res.status(409).send("User Already Exist. Please Login");
		}

		// create user;
		const user = userRepo.create({
			username,
			password: (await genPassword(password)).hash,
			email,
			role: UserRole[role] || UserRole.USER,
		});

		await userRepo.save(user);
		const userfromdb = await userRepo.findOne({
			where: { email },
		});
		const accessToken = userfromdb ? createToken(userfromdb) : "";

		logger.info(
			loggerInfo("signup", 201, { accessToken, role: user.role })
		);
		res.status(201).json({ accessToken, role: user.role });
	};

	// & ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ updateUser;
	const updateUser: RequestHandler = async (req, res) => {
		const { role } = req.body;

		await userRepo.update(
			{ email: (req.user as User)?.email },
			{
				role: UserRole[role as UserRole],
			}
		);

		const userFromDB = await userRepo.findOne({
			where: { email: (req.user as User)?.email },
		});
		if (userFromDB) {
			const accessToken: string = createToken(userFromDB);

			logger.info(
				loggerInfo("updateUser", 205, {
					accessToken,
					role: userFromDB.role,
				})
			);
			res.status(205).json({ accessToken, role: userFromDB.role });
		} else {
			logger.error(
				loggerErr("updateUser", 401, "cannot update the User info")
			);
			res.status(401).json(req.user);
		}
	};

	// & ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ deleteUserById;
	const deleteUserById: RequestHandler = async (req, res) => {
		const id = req.params.id;
		const userfromdb = await userRepo.findOne({
			where: { _id: new ObjectId(id) as any },
		});
		if (!userfromdb) {
			logger.error(
				loggerErr(
					"deleteUserById",
					404,
					`User which ID is "${id}" not found!`
				)
			);
			res.status(404).json({
				message: `User which ID is "${id}" not found!`,
			});
		} else if (userfromdb.role !== UserRole.ADMIN) {
			logger.error(
				loggerErr(
					"updateUser",
					401,
					`You don't have the permission to delete a user.`
				)
			);
			res.status(401).json({
				message: `You don't have the permission to delete a user.`,
			});
		}
		await userRepo.delete({ _id: new ObjectId(id) as any });
		logger.info(
			loggerInfo("updateUser", 201, { message: "success!" })
		);
		res.status(204);
	};

	// & ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ refreshToken;
	const refreshToken: RequestHandler = async (req, res) => {
		if (req.user && (req.user as User).email) {
			const user = await userRepo.findOne({
				where: { email: (req.user as User).email },
			});
			if (user) {
				const accessToken: string = createToken(user);

				logger.info(
					loggerInfo("refreshToken", 200, {
						accessToken,
						role: user.role,
					})
				);
				res.status(200).json({ accessToken, role: user.role });
			} else {
				logger.error(
					loggerErr("refreshToken", 404, "Cannot find the user!")
				);
				res.status(404).json({ message: "Cannot find the user!" });
			}
		}
	};

	// & ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ checkEmail;
	const checkEmail: RequestHandler = async function (req, res) {
		const { email } = req.body;
		const user = await userRepo.findOne({
			where: { email },
		});
		if (user) {
			logger.info(loggerInfo("checkEmail", 200, { hasUser: true }));
			res.status(200).send(true);
		} else {
			logger.info(loggerInfo("checkEmail", 200, { hasUser: false }));
			res.status(200).send(false);
		}
	};

	const getUsers: RequestHandler = async (req, res) => {
		const users = await userRepo.find();
		logger.info(loggerInfo("getUsers", 200, users));
		res.status(200).json(users);
	};

	return {
		signIn,
		signUp,
		updateUser,
		deleteUserById,
		refreshToken,
		checkEmail,
		getUsers,
	};
};

export default authService;
