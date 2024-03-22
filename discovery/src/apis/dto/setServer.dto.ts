import {
	IsString,
	IsUrl,
	IsIn,
	IsInt,
	Min,
	ValidateNested,
	IsISO8601,
	ArrayNotEmpty,
} from "class-validator";
import { Type } from "class-transformer";

class ServiceTimestamps {
	@IsISO8601()
	public created: string; // ISO date string

	@IsISO8601()
	public updated: string; // ISO date string
}

export class ServiceInstance {
	@IsUrl()
	public endpoint: string;

	@IsIn(["healthy", "unhealthy", "unknown"])
	public healthStatus: "healthy" | "unhealthy" | "unknown";

	@IsInt()
	@Min(0)
	public ttl: number;
}

export class ServiceInstanceDB {
	@ArrayNotEmpty()
	@IsUrl({}, { each: true })
	public endpoints: string[];

	@IsIn(["healthy", "unhealthy", "unknown"])
	public healthStatus: "healthy" | "unhealthy" | "unknown";

	@IsInt()
	@Min(0)
	public ttl: number;

	@ValidateNested()
	@Type(() => ServiceTimestamps)
	public timestamps: ServiceTimestamps;
}

export class ServiceRegistryDTO {
	@IsString()
	key: string;

	@Type(() => ServiceInstance)
	service: ServiceInstance;
}

ServiceInstanceDB;
