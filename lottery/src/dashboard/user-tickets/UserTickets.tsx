import React, {Component, useEffect, useMemo, useState} from "react";
import {ITagEditFieldOption, TagAppHeader, TagCard, TagStats} from "@tag/tag-components-react-v2";
import "./Dashboard.css"
import {Config, getAppConfig} from "../../app.config";

interface MyTicket {
    id: number;
    name:string;
    price:number;
    charityId:number;
}
export const UserTickets = () => {

    const [tickets, setTickets] = useState([] as MyTicket[]);
    const [myTicket, setMyTicket] = useState({} as MyTicket);
    const appConfig: Config = getAppConfig();
    const url = `${appConfig.apiUrl}/api/Order`;

    useEffect(()=> {
        (async () => {
            const result = await fetch(url);
            const orders = JSON.parse(await result.text()) as any[];
            setTickets(orders);
            const ticket:MyTicket=orders.slice(-1).pop();
            console.log(orders);
            setMyTicket(ticket);
        })()
    }, []);

// console.log(myTicket);
    return(
        <div>

        <TagCard className="tickets"
                 accent='shiraz'
                 background-image="./saveTheChildren.jpg"
                 style={{minWidth: "430px"}}>
            <div >
                <img className="children-image" src="./saveTheChildren.jpg" alt="children"/>;
            </div>
                <TagAppHeader
                    icon='Numbered'
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
                    subHeading= {myTicket.name}
                    labelField='label'
                    valueField='value'
                    data={[
                        { label: 'Number of the Ticket', value: myTicket.id },
                        { label: 'Number of Tickets', value: tickets.length },
                    ]}
                />
        </TagCard>
    </div>
    );
}