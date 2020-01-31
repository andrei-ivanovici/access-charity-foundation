import React, {useEffect, useState} from "react";
import {TagAppHeader, TagCard, TagList} from "@tag/tag-components-react-v2";
import {Config, getAppConfig} from "../../app.config";

interface Ticket {
    id: number,
    name: string,
    price: number,
    charityId: number;
}

interface Charity {
    id: number,
    name: string;
}

export const LotteryHistory: React.FC = () => {
    const [tickets, setTickets] = useState([] as Ticket[]);
    const [charity, setCharity] = useState([] as Charity[]);

    const appConfig: Config = getAppConfig();
    const urlOrders = `${appConfig.apiUrl}/api/Order`;
    const urlCharity = `${appConfig.apiUrl}/api/CharityEntities`;

    useEffect(()=>{
        (async() =>{
            const result = await fetch(urlOrders);
            //const orders = JSON.parse(await result.text()) as Ticket[];
            const resultCharity = await fetch(urlCharity);
            const charities = JSON.parse(await resultCharity.text()) as Charity[];
            //console.log(orders);
            console.log(charities);
            setCharity(charities);
           // setTickets(orders);
        })();
    }, []);


    const listData = tickets.map(ticket =>({
        name: `Ticket name: ${ticket.name}`,
        price: `Paid: ${ticket.price} $`,
        charityName: charity.find(cha => cha.id === ticket.id)?.name
    }));

    const pageSize = Math.round(listData.length / 5);
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