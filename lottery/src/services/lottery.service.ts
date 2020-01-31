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
    public async submitLottery(lottery: ILotteryInfo): Promise<void> {
        const appConfig: Config = getAppConfig();
        const url = `${appConfig.apiUrl}/LotteryEventApi`;

        return axios.post(url, {
            ...lottery
        });

    }
}

export const lotteryService = new LotteryService();
