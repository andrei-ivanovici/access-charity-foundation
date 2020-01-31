export interface Config {
    siteUrl: string;
}

const env = {
    prod: {
        siteUrl: "https://acc-lottery.netlify.com/"
    },
    dev: {
        siteUrl: "http://localhost:3000"
    }
};

export function getAppConfig(): Config {
    if (process.env.NODE_ENV === "development") {
        return env.dev;
    }
    return env.prod;
}
