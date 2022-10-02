export enum HealthKind {
    Healthy = "healthy",
    Unhealthy = "unhealthy",
    Custom = "custom"
}

export const isHealthKind = (value: unknown): value is HealthKind => {
    if (typeof value !== "string") {
        return false;
    }

    return Object.values(HealthKind).includes(value as HealthKind);
};

export interface SerializedHealthy {
    health: "healthy";
}

export interface SerializedUnhealthy {
    health: "unhealthy";
    message: string;
}

export interface SerializedCustom {
    health: "custom";
    message: string;
}

export type SerializedHealth = SerializedCustom | SerializedHealthy | SerializedUnhealthy;

abstract class Healthy {
    public abstract kind: HealthKind.Healthy;

    public abstract toString(): string;

    public abstract serialize(): SerializedHealthy;
}

abstract class Unhealthy {
    public abstract kind: HealthKind.Unhealthy;

    public abstract reason: string;

    public abstract toString(): string;

    public abstract serialize(): SerializedUnhealthy;
}

abstract class Custom {
    public message = "";

    public abstract kind: HealthKind.Custom;

    public abstract toString(): string;

    public abstract serialize(): SerializedCustom;
}

export type HealthType = Custom | Healthy | Unhealthy;

const Health = {
    Custom(message?: string): HealthType {
        return {
            kind: HealthKind.Custom,
            message: message || "",
            serialize: () => ({ health: "custom", message: message ?? "" }),
            toString: () => message || "custom"
        };
    },

    Healthy(): HealthType {
        return {
            kind: HealthKind.Healthy,
            serialize: () => ({ health: "healthy" }),
            toString: () => "healthy"
        };
    },

    Unhealthy(reason?: string): HealthType {
        return {
            kind: HealthKind.Unhealthy,
            reason: reason ?? "",
            serialize: () => ({ health: "unhealthy", message: reason ?? "" }),
            toString: () => "unhealthy"
        };
    },

    from(health: string, message?: string) {
        switch (health) {
            case "healthy":
                return Health.Healthy();

            case "unhealthy":
                return Health.Unhealthy(message ?? "");

            default:
                return Health.Custom(message ?? health);
        }
    },

    localize(health: HealthType): string {
        switch (health.kind) {
            case HealthKind.Healthy:
                return "良好";

            case HealthKind.Unhealthy:
                return "不良";

            case HealthKind.Custom:
                return health.message || "カスタム";
        }
    }
};

export default Health;
