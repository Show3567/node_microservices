export interface JwtPayload {
	id?: string;
	username: string;
	email: string;
}
export type DoneFunction = (
	error: any,
	user?: Express.User | false,
	options?: { message: string }
) => void;
