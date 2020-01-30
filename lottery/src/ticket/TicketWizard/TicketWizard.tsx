import React, { useState } from 'react';
import  { TagWizard, TagWizardStep, TagFormGroup, TagEditField, TagField, TagList, TagCard, TagAppHeader, TagStats } from "@tag/tag-components-react-v2";
import "./TicketWizard.css";

export function TicketWizard(){

    return (
        <div className="wizard">
          <TagWizard heading='Buy Ticket process' height="400px">
            <TagWizardStep name='step1' heading='Select tickets'>
                <div className="space"></div>
                <TagEditField label='How many tickets do you want to buy?' name='ticketsNumber'/>
                <div className="space"></div>
                <TagField label='Total amount:' value='1000' />
            </TagWizardStep>
            <TagWizardStep name='step2' heading='Select charity'>
                <div className="space"></div>
                <TagEditField  label='Select your favourite charity' editor="radio" options={[
                            {label: ''},
                            {label: 'Charity 1', value: 1},
                            {label: 'Charity 2', value: 2},
                            {label: 'Charity 3', value: 3}
                ]}/>
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
                        { label: 'Tickets selected', value: '3' },
                        { label: 'Charity', value: 'Charity 1' },
                        ]}
                    />
                </TagCard>
            </TagWizardStep>
            <TagWizardStep name='step4' heading='Complete' finishCaption="Finish">
                <TagField value='Thank you' />
            </TagWizardStep>
        </TagWizard>
      </div>
    )
}
//export default TicketWizard;