import React, {useEffect, useState} from "react";
import {TagAppHeader, TagCard, TagStats} from "@tag/tag-components-react-v2";
import {Config, getAppConfig} from "../../app.config";
import {User} from "../../services/login.service";

interface CharityInfo {
    id: number;
    name: string;
}

interface MyTicket {
    id: number;
    charityId: number;
    lotteryId: number;
}

interface LotteryInfo {
    id: number;
    name: string;
    charities: CharityInfo[];
    price: number;

}

interface UserTicketsProps {
    currentUser: User
}

export const UserTickets: React.FC<UserTicketsProps> = ({currentUser}: UserTicketsProps) => {

    const [tickets, setTickets] = useState([] as MyTicket[]);
    const [charityList, setCharityList] = useState<CharityInfo[]>([] as any[]);
    const [lotteryInfo, setLotteryInfo] = useState({} as LotteryInfo);
    const appConfig: Config = getAppConfig();
    const url = `${appConfig.apiUrl}/api/Order/${currentUser.id}`;
    const urlLottery = `${appConfig.apiUrl}/LotteryEventApi/latest`;

    useEffect(() => {
        (async () => {
            const result = await fetch(url);
            const tickets = JSON.parse(await result.text()) as MyTicket[];
            console.log(tickets);
            setTickets(tickets);
            const resultLottery = await fetch(urlLottery);
            const lotteryInfo = JSON.parse(await resultLottery.text()) as LotteryInfo;
            setLotteryInfo(lotteryInfo);
            setCharityList(lotteryInfo.charities);
        })()
    }, []);

    const ticketsLottery = tickets.filter(ticket => (ticket.lotteryId === lotteryInfo?.id));
    console.log(ticketsLottery);
    const myTicket = ticketsLottery.slice(-1).pop();
    console.log(myTicket);
    const charity = charityList.find(c => (c.id === myTicket?.charityId));
    return (
        <TagCard className="tickets"
                 accent='shiraz'
                 style={{minWidth: "430px", marginTop: "100px"}}>
            <TagAppHeader
                icon='Ticket'
                heading='Latest Ticket'
                heading-accent='white'
                menuItems={[
                    {
                        icon: 'Plus',
                        name: 'add',
                        text: 'add new',
                    },
                ]}
            />
            <TagStats
                accent='white'
                heading={`${charity?.name}`}
                subHeading={`Price: ${lotteryInfo.price}$`}
                labelField='label'
                valueField='value'
                data={[
                    {label: 'Name of the lottery', value: lotteryInfo.name},
                    {label: 'Number of the ticket', value: myTicket?.id},
                ]}
            />
        </TagCard>
    );
};
