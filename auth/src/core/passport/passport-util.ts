import * as bcrypt from "bcrypt";

export const validPassword = async (
	pwd_user: string,
	pwd_hash: string
) => {
	return (await bcrypt.compare(pwd_user, pwd_hash)) as boolean;
};

export const genPassword = async (password: string) => {
	const salt = await bcrypt.genSalt(10);
	const pwd_hash = await bcrypt.hash(password, salt);

	return { salt, hash: pwd_hash };
};
