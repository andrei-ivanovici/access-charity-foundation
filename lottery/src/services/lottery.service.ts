import axios from "axios";
import { getAppConfig, Config } from "../app.config";

export interface ICharity {
    id: string;
    name: string;
}

export interface ILotteryInfo {
    charities: ICharity[];
    name: string;
    price: number;
    drawDate: Date;
}

export class LotteryService {
    private _baseUrl = getAppConfig().apiUrl;

    public async submitLottery(lottery: ILotteryInfo): Promise<void> {
        const url = `${this._baseUrl}/LotteryEventApi`;

        return axios.post(url, {
            ...lottery
        });
    }

    public async getCharities(): Promise<{ data: ICharity[] }> {
        return axios.get(`${this._baseUrl}/api/CharityEntities`);
    }
}

export const lotteryService = new LotteryService();
