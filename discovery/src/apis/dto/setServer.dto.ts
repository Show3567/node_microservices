import "reflect-metadata";
import {
	ArrayNotEmpty,
	IsISO8601,
	IsIn,
	IsNumber,
	IsString,
	Min,
	ValidateNested,
} from "class-validator";
import { Type } from "class-transformer";

class ServiceTimestamps {
	@IsISO8601()
	public created: string; // ISO date string

	@IsISO8601()
	public updated: string; // ISO date string
}

export class ServiceInstance {
	@IsString()
	public endpoint: string;

	@IsIn(["healthy", "unhealthy", "unknown"])
	public healthStatus: "healthy" | "unhealthy" | "unknown";

	@IsNumber()
	@Min(0)
	public ttl: number;
}

export class ServiceInstanceDB {
	@ArrayNotEmpty()
	@IsString({ each: true })
	public endpoints: string[];

	@IsIn(["healthy", "unhealthy", "unknown"])
	public healthStatus: "healthy" | "unhealthy" | "unknown";

	@IsNumber()
	@Min(0)
	public ttl: number;

	@ValidateNested()
	@Type(() => ServiceTimestamps)
	public timestamps: ServiceTimestamps;
}

export class ServiceRegistryDTO {
	@IsString()
	key: string;

	@ValidateNested()
	@Type(() => ServiceInstance)
	service: ServiceInstance;
}
