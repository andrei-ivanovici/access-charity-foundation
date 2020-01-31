import React, {useEffect, useState} from "react";
import {TagAppHeader, TagCard, TagStats} from "@tag/tag-components-react-v2";
import "./UserTickets.css"
import {Config, getAppConfig} from "../../app.config";

interface CharityInfo {
    id: number;
    name: string;
}

interface MyTicket {
    id: number;
    name:string;
    price:number;
    charityId:number;
    lotteryId:number;
    charities: CharityInfo[];
}
export const UserTickets = () => {

    const [tickets, setTickets] = useState<MyTicket>();
    const [charityList, setCharityList] = useState<CharityInfo[]>([] as any[]);
    // const [myTicket, setMyTicket] = useState({} as MyTicket);
    const appConfig: Config = getAppConfig();
    const url = `${appConfig.apiUrl}/api/Order`;

    useEffect(()=> {
        (async () => {
            const result = await fetch(url);
            const tickets = JSON.parse(await result.text())as MyTicket;
             console.log(tickets);
            setTickets(tickets);
            setCharityList(tickets.charities);
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
                    subHeading= {tickets?.name}
                    labelField='label'
                    valueField='value'
                    data={[
                        { label: 'Number of the Ticket', value: tickets?.name },
                        { label: 'Number of Tickets', value: tickets?.charities },
                    ]}
                />
        </TagCard>
    );
};