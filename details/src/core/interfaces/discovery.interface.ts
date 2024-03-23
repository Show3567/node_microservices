export interface ServiceRegistryDTO {
	key: string;
	service: ServiceInstance;
}

export interface ServiceInstance {
	endpoint: string;
	healthStatus: "healthy" | "unhealthy" | "unknown";
	ttl: number;
}
