import React from 'react';
import  { TagWizard, TagWizardStep, TagFormGroup, TagEditField, TagField, TagList } from "@tag/tag-components-react-v2";
const TicketWizard: React.FC =()=>{
    return (
        <div>
            <TagWizard heading="Buy Ticket" activeStep="step1" accent='access'>
                <TagWizardStep name='step1' heading='Step 1' nextCaption="Step 2">
                    <TagFormGroup>
                        <TagEditField label='Number of tickets' name='ticketsNumber' />
                    </TagFormGroup>
                    <TagFormGroup>
                        <TagField label='Amount' value='1000' />
                    </TagFormGroup>
                </TagWizardStep>
                <TagWizardStep name='step2' heading='Step 2' finishCaption="Done">
                    <TagFormGroup>
                            <TagList primaryField='name' data={[ {
                                name: 'Charity 1'
                            },
                            {
                                name: 'Charity 2'
                            },
                            {
                                name: 'Charity 3'
                            }
                            ]}
                            multiCheck/>
                    </TagFormGroup>
                </TagWizardStep>
        </TagWizard>
      </div>
    )
}
export default TicketWizard;