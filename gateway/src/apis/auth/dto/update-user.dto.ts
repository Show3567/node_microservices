// import { ApiProperty } from '@nestjs/swagger';
import {
	IsEmail,
	IsEnum,
	IsOptional,
	IsString,
	MaxLength,
	MinLength,
} from "class-validator";
import { UserRole } from "../../../core/interfaces/user-role.enum";

export class UpdateCredentialDto {
	// @ApiProperty({
	//   description: 'show username in the header or nav after user signin',
	// })
	@IsString()
	@MinLength(4)
	@MaxLength(10)
	@IsOptional()
	readonly username?: string;

	// @ApiProperty()
	@IsString()
	@IsOptional()
	// @MinLength(4)
	// @MaxLength(10)
	// @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
	//   message: 'password is too week!',
	// })
	readonly password?: string;

	// @ApiProperty()
	@IsString()
	@IsEmail()
	@IsOptional()
	readonly email?: string;

	// @ApiProperty()
	@IsOptional()
	@IsEnum(UserRole)
	@IsOptional()
	readonly role?: string;
}
