import {User} from "../services/login.service";
import axios from "axios";
import {getAppConfig, Config} from "../app.config";

export interface Payment {
    id?: number;
    cardNumber: string;
    cardType: string
}

export interface ProfileData {
    user: User,
    payments: Payment[]
}

export class ProfileService {
    _config: Config;

    constructor() {
        this._config = getAppConfig();
    }

    async loadProfile(user: User) {
        const url = `${this._config.apiUrl}/profileapi/${user.id}`;
        const response = await axios.get(url);
        return response.data;
    }

    async savePayment(id: number, payment: Payment) {
        const url = `${this._config.apiUrl}/profileapi/${id}/payment`;
        await axios.post(url, payment);
    }

    async removePayment(id: number, payment: Payment) {
        const url = `${this._config.apiUrl}/profileapi/${id}/payment/${payment.id}`;
        await axios.delete(url);
    }

    async saveUser(user: User) {
        const url = `${this._config.apiUrl}/profileapi`;
        await axios.post(url, user);
    }
}
