import { IsString } from "class-validator";

export class SetServerDto {
	@IsString()
	readonly key: string;

	readonly address: {
		port: number;
		domain: string;
	};
}
