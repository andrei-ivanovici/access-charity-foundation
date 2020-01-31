import React, {useEffect, useState} from 'react';
import {
    TagWizard,
    TagWizardStep,
    TagFormGroup,
    TagEditField,
    TagField,
    TagList,
    TagCard,
    TagAppHeader,
    TagStats,
    ITagEditFieldOption,
    TagAlert,
    TagToggle
} from "@tag/tag-components-react-v2";
import "./TicketWizard.css";
import {Config, getAppConfig} from "../../app.config";
import axios from "axios";
import {User} from "../../services/login.service";
import {navigationService} from "../../services/navigation.service";

interface CharityInfo {
    id: number;
    name: string;
};

interface LotteryInfo {
    id: number;
    name: string;
    charities: CharityInfo[];
    price: number;

}

export interface TicketWizardProps {
    user: User;
}

export function TicketWizard({user}: TicketWizardProps) {
    const [ticketNumber, setTicketNumber] = useState(0);
    const [charityList, setCharityList] = useState<CharityInfo[]>([] as any[]);
    const [selectedCharity, setSelectedCharity] = useState();
    const [lotteryInfo, setLotteryInfo] = useState<LotteryInfo>();
    const appConfig: Config = getAppConfig();
    const url = `${appConfig.apiUrl}/LotteryEventApi/latest`;

    useEffect(() => {
        (async () => {
            const result = await fetch(url);
            const lotteryInfo = JSON.parse(await result.text()) as LotteryInfo;
            setLotteryInfo(lotteryInfo);
            setCharityList(lotteryInfo.charities)
        })()


    }, []);
    if (!lotteryInfo) {
        return null;
    }
    return (
        <div className="wizard">
            <TagWizard heading='Buy Tickets' height="400px" style={{minWidth: "300px", maxWidth:"600px", width:"40%"}}>
                <TagWizardStep name='step1' heading='Select tickets'>
                    <div className="space"></div>
                    <TagField 
                        label='Current Lottery:' 
                        value={lotteryInfo.name} 
                        labelStyle={{fontSize: "16px"}}
                        valueStyle={{fontSize: "16px", "fontWeight": "bold"}}
                        />
                    <div className="space2"></div>
                    <TagField 
                        label='Ticket price:' 
                        value={lotteryInfo.price} 
                        labelStyle={{fontSize: "16px"}}
                        valueStyle={{fontSize: "16px", "fontWeight": "bold"}}
                        />
                        <div className="space"></div>
                    <TagEditField label='How many tickets do you want to buy?'
                                  editor='number'
                                  name='ticketsNumber'
                                  labelStyle={{fontSize: "16px"}}
                                  value={ticketNumber}
                                  onValueChange={(e) => setTicketNumber(e.detail.value)}/>
                    <div className="space"></div>
                    <TagField label='Final price:' 
                            value={ticketNumber * lotteryInfo.price}
                            labelStyle={{fontSize: "16px"}}
                            valueStyle={{fontSize: "16px", "fontWeight": "bold"}}/>
                </TagWizardStep>
                <TagWizardStep name='step2' heading='Select charity'>
                    <div className="space3"></div>
                    <TagEditField
                        label='Select your favourite charity:'
                        editor="radio"
                        options={charityList.map(c => {
                            let charity = {} as ITagEditFieldOption;
                            charity.label = c.name;
                            charity.value = c.id;

                            return charity
                        })}
                        value={selectedCharity}
                        onValueChange={(e) => setSelectedCharity(e.detail.value)}
                    />
                </TagWizardStep>
                <TagWizardStep name='step3' heading='Review tickets details'>
                    <div className="space"></div>
                    <TagCard
                        accent='keppel'
                        background-image='access'
                        style={{minWidth: "430px"}}>
                        <TagAppHeader
                            icon='Basket'
                            heading='Tickets details'
                            heading-accent='white'
                        />
                        <TagStats
                            accent='white'
                            heading='Tickets selected'
                            labelField='label'
                            valueField='value'
                            data={[
                                {label: 'Tickets selected', value: ticketNumber},
                                {
                                    label: 'Charity',
                                    value: charityList.find(charity => charity.id == selectedCharity)?.name
                                },
                            ]}
                        />
                    </TagCard>
                </TagWizardStep>
                <TagWizardStep name='step4' heading='Complete' finishCaption="Finish"
                               onFinishClick={e => submitOrder(ticketNumber, charityList.find(charity => charity.id == selectedCharity), user, lotteryInfo)}>
                <div className="space3"></div>
                <TagCard
                        accent='keppel'
                        background-image='access'
                        style={{minWidth: "430px"}}>
                        <TagAppHeader
                            icon='Basket'
                            heading='Thank you'
                            heading-accent='white'
                        />
                    <TagField value={'You bought '+ ticketNumber + " ticket(s) for charity " + charityList.find(charity => charity.id == selectedCharity)?.name+ ". Thank you!"}  valueStyle={{fontSize: "18px", "fontWeight": "bold", padding:"40px 20px 20px 20px", color:"white"}}/>
                    </TagCard>
                </TagWizardStep>
            </TagWizard>
        </div>
    )
}

async function submitOrder(ticketNumber: any, charity: any, user: User, lottery: LotteryInfo) {
    const appConfig: Config = getAppConfig();
    const url = `${appConfig.apiUrl}/api/order`;

    const response = await axios.post(url, {
        lotteryId: lottery.id,
        ticketNumber: Number(ticketNumber),
        charityId: charity.id,
        userId: user.id
    });

    console.log(response);
    navigationService.go('/user/dashboard')

}

//export default TicketWizard;
