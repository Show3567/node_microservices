import {
	IsEmail,
	IsEnum,
	IsOptional,
	IsString,
} from "class-validator";
import { UserRole } from "../../core/interfaces/user-role.enum";

export class RefreshTokenDto {
	@IsString()
	// @IsUUID()
	readonly id!: string;

	@IsString()
	readonly username!: string;

	@IsString()
	@IsEmail()
	readonly email!: string;

	@IsOptional()
	@IsEnum(UserRole)
	readonly role!: string;
}
