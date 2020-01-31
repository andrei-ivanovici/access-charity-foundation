import React from "react"
import "./Content.css"
import {Card, Container, Segment, Grid} from "semantic-ui-react";
import {Banner} from "../banner/Banner";


export const Content: React.FC = () => {
    return (
        <Segment vertical>
            <Banner/>
            <Container textAlign='center'>
                <Card.Group>
                    <Grid style ={{margin:"50px"}} centered={true} columns={3}>
                    <Grid.Column key={1}>
                    <Card
                        image='./lottery.jpg'
                        header='Lottery'
                        meta='Donate & Win!'
                        description='If you wanna be the best, win and help others in the same time join our lottery event.'
                    >
                    </Card>
                    </Grid.Column>
                    <Grid.Column key={2}>
                    <Card
                        image='./lottery.jpg'
                        header='Charity sales'
                        meta='Buy & help!'
                        description='If you wanna be the best, win and help others in the same time join our lottery event.'
                    />
                    </Grid.Column>
                    <Grid.Column key={3}>
                    <Card
                        image='./lottery.jpg'
                        header='Raffle'
                        meta='Participate & win!'
                        description='If you wanna be the best, win and help others in the same time join our lottery event.'
                    />
                    </Grid.Column>
                    </Grid>
                </Card.Group>
            </Container>
        </Segment>
    );
};