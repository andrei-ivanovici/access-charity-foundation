export interface Config {
    apiUrl: string;
}

const env = {
    prod: {
        apiUrl: "https://lottery-bk.azurewebsites.net"
    },
    dev: {
        apiUrl: "https://localhost:5001"
    }
};

export function getAppConfig(): Config {
    if (process.env.NODE_ENV === "development") {
        return env.dev;
    }
    return env.prod;
}
