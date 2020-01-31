import React from "react";
import "./EventDetails.css"
import {Button, Container, Segment} from 'semantic-ui-react'
import {mainText} from './maintext';
import {howText} from './howtext';
import {getAppConfig} from "../app.config";

function openLottery() {
    window.open(getAppConfig().siteUrl,"__blank")
}

export const EventDetails = () => {

    return (
        <div className="event-detail">
            <Segment textAlign='center' color='red'>
                <Container className="title"> Lottery </Container>
                <img className="image-top" src={"./lottery.jpg"} alt="logo"/>
                <Container className="main-text">{mainText}</Container>
                <Container className="play-button">
                    <Button size='medium' color='red' onClick={openLottery}>Play now</Button>
                </Container>
                <Container className="how-to-title">How To Play</Container>
                <Container className="how-to-text">{howText}</Container>
            </Segment>
        </div>)
};
