import React, {useEffect, useState} from "react";
import {TagAppHeader, TagCard, TagStats} from "@tag/tag-components-react-v2";
import "./UserTickets.css"
import {Config, getAppConfig} from "../../app.config";
import {User} from "../../services/login.service";

interface CharityInfo {
    id: number;
    name: string;
}

interface MyTicket {
    id: number;
    charityId:number;
    lotteryId:number;
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
export const UserTickets:React.FC<UserTicketsProps> = ({currentUser}: UserTicketsProps) => {

    const [tickets, setTickets] = useState([] as MyTicket[]);
    const [charityList, setCharityList] = useState<CharityInfo[]>([] as any[]);
    // const [myTicket, setMyTicket] = useState({} as MyTicket);
    const appConfig: Config = getAppConfig();
    const url = `${appConfig.apiUrl}/api/Order/${currentUser.id}`;
    const urlLottery = `${appConfig.apiUrl}/LotteryEventApi/latest`;

    useEffect(()=> {
        (async () => {
            const result = await fetch(url);
            const tickets = JSON.parse(await result.text())as MyTicket[];
             console.log(tickets);
            setTickets(tickets);
            //setCharityList(tickets.charities);
            //const orders = JSON.parse(await result.text()) as any[];
            // setTickets(orders);
            // const ticket:MyTicket=orders.slice(-1).pop();
            // console.log(orders);
            // setMyTicket(ticket);
        })()
    }, []);

// console.log(myTicket);
    return(
        <TagCard className="tickets"
                 accent='shiraz'
                 style={{minWidth: "430px", marginTop: "400px"}}>
                <TagAppHeader
                    icon='Ticket'
                    heading='My Tickets'
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
                    heading='Save The Children'
                    // subHeading= {}
                    labelField='label'
                    valueField='value'
                    data={[
                        { label: 'Number of the Ticket', value: "" },
                        { label: 'Number of Tickets', value: "" },
                    ]}
                />
        </TagCard>
    );
};