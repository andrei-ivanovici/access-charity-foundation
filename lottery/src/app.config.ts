export interface Config {
    apiUrl: string;
}

const env = {
    prod: {
        apiUrl: "https://localhost:5001"
    },
    dev: {
        apiUrl: "https://localhost:5001"
    }
};

export function getAppConfig(): Config {
    return env.dev;
}
