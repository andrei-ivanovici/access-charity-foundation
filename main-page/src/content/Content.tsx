import React from "react"
import "./Content.css"
import {Card, Container, Segment} from "semantic-ui-react";
import {Banner} from "../banner/Banner";


export const Content: React.FC = () => {
    return(

        <Segment  vertical>
            <Banner />
            <Container textAlign='center'>
            <Card.Group>
            <Card
                image='./lottery.jpg'
                header='Lottery'
                meta='Charity'
                description='If you wanna be the best, win and help others in the same time join our lottery event.'
            />

            <Card
                image='./lottery.jpg'
                header='Charity sales'
                description='If you wanna be the best, win and help others in the same time join our lottery event.'
            />
            </Card.Group>
            </Container>
        </Segment>
    );
};