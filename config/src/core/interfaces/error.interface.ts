export interface LogInfoOutput {
	method: string;
	status: number;
	res: { [key: string]: any };
}
export type Loginfo = (
	method: string,
	status: number,
	res?: { [key: string]: any }
) => LogInfoOutput;

export interface LogErrOutput {
	method: string;
	status: number;
	errMsg: string;
	err: any;
}
export type LogErr = (
	method: string,
	status: number,
	errMsg?: string,
	err?: any
) => LogErrOutput;
