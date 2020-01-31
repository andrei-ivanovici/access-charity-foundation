import React, {useEffect, useState} from "react";
import {TagAppHeader, TagCard, TagList} from "@tag/tag-components-react-v2";
import {Config, getAppConfig} from "../../app.config";
import {User} from "../../services/login.service";

interface Ticket {
    id: number,
    charityId: number;
    lotteryId: number;
}

interface Charity {
    id: number,
    name: string;
}

interface LotteryInfo {
    id: number;
    name: string;
    charities: Charity[];
    price: number;

}
interface LotteryHistoryProps {
    currentUser: User
}
export const LotteryHistory: React.FC<LotteryHistoryProps> = ({currentUser}: LotteryHistoryProps) => {
    const [tickets, setTickets] = useState([] as Ticket[]);
    const [charity, setCharity] = useState([] as Charity[]);
    const [lotteryInfo, setLotteryInfo] = useState<LotteryInfo>();

    const appConfig: Config = getAppConfig();
    const urlOrders = `${appConfig.apiUrl}/api/Order/${currentUser.id}`;
    const urlLottery = `${appConfig.apiUrl}/LotteryEventApi/latest`;

    useEffect(()=>{
        (async() =>{
            const result = await fetch(urlLottery);
            const lotteryInfo = JSON.parse(await result.text()) as LotteryInfo;
            setLotteryInfo(lotteryInfo);
            //console.log(lotteryInfo);
            const resultOrders = await fetch(urlOrders);
            const orders = JSON.parse(await resultOrders.text()) as Ticket[];
            setTickets(orders);
            //console.log(orders);
        })();
    }, []);


    const ticketsLottery = tickets.filter(ticket =>(ticket.lotteryId === lotteryInfo?.id));
    console.log("data", ticketsLottery);
    const listData = ticketsLottery.map(ticket =>({
        name: `Lottery name: ${lotteryInfo?.name}`,
        price: `Paid: ${lotteryInfo?.price} $`,
        charityName: lotteryInfo?.charities.find(c => c.id === ticket.charityId)?.name
    }));



    const pageSize = 5;
    console.log(pageSize);
    const [page, setPage] = useState(1);

    const pageOfData = listData.slice(
        (page - 1) * pageSize,
        page * pageSize,
    );
    const recordCount = listData.length;
    const pageCount = Math.ceil(recordCount / pageSize);


    return (
        <TagCard
            accent='yellow'
            background-image='access'
            style={{minWidth: "430px", marginTop: "50px"}}>
            <TagAppHeader
                icon='History'
                heading='My lottery history'
                heading-accent='black'
            />
            <TagList
                primaryField='name'
                pill1Field='price'
                pill1FieldAccentField='priceAccent'
                pill2Field='charityName'
                data={pageOfData}
                page={page}
                pageSize={pageSize}
                pageCount={pageCount}
                onPageRequest={(e) => setPage(e.detail.page)}
                pagerAccent="access"
            />
        </TagCard>
    );
};