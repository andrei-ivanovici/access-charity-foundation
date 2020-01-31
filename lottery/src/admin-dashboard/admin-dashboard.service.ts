import {getAppConfig} from "../app.config";
import axios from "axios";

export interface DrawUser {
    id: number;
    name: string;
}

export interface DrawTicket {
    id: number;
    name: string;
}

export interface DrawCharity {
    id: string;
    name: String;
}

export interface DrawResult {
    user: DrawUser;
    ticket: DrawTicket;
    charity: DrawCharity;
    totalParticipants: number;
}

export class AdminDashboardService {

    _url: string;

    constructor() {
        this._url = getAppConfig().apiUrl;
    }

    public async draw(): Promise<DrawResult> {
        const url = `${this._url}/LotteryEventApi/draw`;
        const result = await axios.get(url)
        return result.data;
    }

    public async getLastDrawAsync(): Promise<DrawResult> {
        const url = `${this._url}/LotteryEventApi/lastDraw`;
        const result = await axios.get(url)
        return result.data;
    }

   async latestLotteryInfo() {
        const url = `${this._url}/LotteryEventApi/latestLottery`;
        const result = await axios.get(url)
        return result.data;
    }
}

export const adminDashboardService = new AdminDashboardService();
