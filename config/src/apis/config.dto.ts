import { IsArray, IsString } from "class-validator";

export class ConfigDto {
	@IsArray()
	@IsString({ each: true })
	readonly data: string[];
}
