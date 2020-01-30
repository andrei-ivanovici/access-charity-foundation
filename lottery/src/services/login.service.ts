import axios from "axios";
import {Config, getAppConfig} from "../app.config";

export interface User {
    name: string
    email: string;
    avatar?: string;
}

type  Listener = (u: User) => void

export class LoginService {
    public user?: User;
    private _listeners: Listener[] = [];

    public async login(username: string, password: string): Promise<void> {
        const appConfig: Config = getAppConfig();
        const url = `${appConfig.apiUrl}/authapi/login`;

        this.user = await axios.post(url, {
            username,
            password
        });

        this._listeners.forEach(l => this.user && l(this.user))
    }

    public async register(newUser: User) {
        const appConfig: Config = getAppConfig();
        const url = `${appConfig.apiUrl}/authapi/register`;

        this.user = await axios.post(url, newUser);
    }

    public observeUserChange(observer: Listener) {
        this._listeners.push(observer);
    }
}

export const loginService = new LoginService();
