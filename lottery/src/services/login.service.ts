import axios from "axios";
import {Config, getAppConfig} from "../app.config";

export interface User {
    id?: number;
    address?: string;
    avatar?: string;
    name: string
    mail: string;
    role: string;
}

type  Listener = (u: User) => void

export class LoginService {
    public user?: User;
    private _listeners: Listener[] = [];

    public async login(username: string, password: string): Promise<void> {
        const appConfig: Config = getAppConfig();
        const url = `${appConfig.apiUrl}/authapi/login`;

        const request = await axios.post(url, {
            username,
            password
        });
        this.user = request.data;

        this._listeners.forEach(l => this.user && l(this.user));
        if (this.user) {
            sessionStorage.setItem("user", JSON.stringify(this.user));
        }
    }

    public async refresh() {
        const appConfig: Config = getAppConfig();
        const url = `${appConfig.apiUrl}/authapi/refresh/${this.user!.id}`;
        const result = await axios.get(url);
        this.user = result.data;
        this._listeners.forEach(l => this.user && l(this.user));
        if (this.user) {
            sessionStorage.setItem("user", JSON.stringify(this.user));
        }

    }

    public async register(newUser: User) {
        const appConfig: Config = getAppConfig();
        const url = `${appConfig.apiUrl}/authapi/register`;

        this.user = await axios.post(url, newUser);
    }

    public tryRestorePayload() {
        const payload = sessionStorage.getItem("user");
        this.user = payload && JSON.parse(payload);
        return this.user;
    }

    public observeUserChange(observer: Listener) {
        this._listeners.push(observer);
    }
}

export const loginService = new LoginService();
