import { Column, Entity, ObjectIdColumn } from "typeorm";
import { UserRole } from "../interfaces/user-role.enum";

import { ObjectId } from "mongoose";

@Entity("user")
export class User {
	//   @PrimaryGeneratedColumn() // using uuid;
	@ObjectIdColumn() // for mongodb;
	_id: ObjectId;

	@Column()
	username: string;

	@Column({ unique: true })
	email: string;

	@Column()
	password: string;

	@Column({
		type: "enum",
		enum: UserRole,
		default: UserRole.USER,
	})
	role: UserRole;
}
