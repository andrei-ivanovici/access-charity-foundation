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
    ITagEditFieldOption
} from "@tag/tag-components-react-v2";
import "./TicketWizard.css";
import {Config, getAppConfig} from "../../app.config";
import axios from "axios";
import {User} from "../../services/login.service";
import {navigationService} from "../../services/navigation.service";

export interface TicketWizardProps {
    user: User;
}

export function TicketWizard({user}: TicketWizardProps) {
    const [ticketNumber, setTicketNumber] = useState(0);
    const [charityList, setCharityList] = useState([] as any[]);
    const [selectedCharity, setSelectedCharity] = useState();
    const appConfig: Config = getAppConfig();
    const url = `${appConfig.apiUrl}/api/CharityEntities`;

    useEffect(() => {
        (async () => {
            const result = await fetch(url);
            const charities = JSON.parse(await result.text()) as any[];
            const charityOptions = charities.map(c => {
                let charity = {} as ITagEditFieldOption;
                charity.label = c.name;
                charity.value = c.id;

                return charity
            });
            setCharityList(charities)
        })()


    }, []);
    return (
        <div className="wizard">
            <TagWizard heading='Buy Ticket process' height="400px">
                <TagWizardStep name='step1' heading='Select tickets'>
                    <div className="space"></div>
                    <TagEditField label='How many tickets do you want to buy?'
                                  editor='number'
                                  name='ticketsNumber'
                                  value={ticketNumber}
                                  onValueChange={(e) => setTicketNumber(e.detail.value)}/>
                    <div className="space"></div>
                    <TagField label='Total amount:' value={ticketNumber * 10}/>
                </TagWizardStep>
                <TagWizardStep name='step2' heading='Select charity'>
                    <div className="space"></div>
                    <TagEditField
                        label='Select your favourite charity'
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
                               onFinishClick={e => submitOrder(ticketNumber, charityList.find(charity => charity.id == selectedCharity), user)}>
                    <TagField value='Thank you'/>
                </TagWizardStep>
            </TagWizard>
        </div>
    )
}

async function submitOrder(ticketNumber: any, charity: any, user: User) {
    const appConfig: Config = getAppConfig();
    const url = `${appConfig.apiUrl}/api/order`;

    const response = await axios.post(url, {
        ticketNumber: Number(ticketNumber),
        charityId: charity.id,
        userId: user.id
    });

    console.log(response)
    navigationService.go('/user/dashboard')

}

//export default TicketWizard;
