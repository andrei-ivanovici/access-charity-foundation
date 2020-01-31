import React from "react"
import "./Footer.css"
import {Container, Segment, Grid, Header, List} from "semantic-ui-react";
import {TagAccessLogo} from "@tag/tag-components-react-v2";

export const Footer: React.FC = () => {
    return (
        <Segment inverted vertical style={{ margin: '5em 0em 0em', padding: '5em 0em' }}>
        <Container textAlign='center'>
            <Grid divided inverted stackable>
                <Grid.Column width={3}>
                    <Header inverted as='h4' content='Lets talk' />
                    <List link inverted>
                        <List.Item as='a'>Contact</List.Item>
                        <List.Item as='a'>About</List.Item>
                        <List.Item as='a'>Phone number:20120152100</List.Item>
                        <List.Item as='a'>Email: mail.mail</List.Item>
                    </List>
                </Grid.Column>
                <Grid.Column width={3}>
                    <TagAccessLogo style={{padding:10}} name height='60px' />
                </Grid.Column>
            </Grid>
        </Container>
    </Segment>
    );
};