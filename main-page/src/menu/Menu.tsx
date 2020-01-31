import React from "react";
import {TagAccessLogo} from "@tag/tag-components-react-v2";
import {Button, Container, Dropdown, Menu} from "semantic-ui-react";
import {Link} from "react-router-dom";


export const MenuTop: React.FC = () => {

    return (
        <Menu
            fixed="top"
            size='large'
            color="black"
            borderless={true}
        >
            <TagAccessLogo style={{padding: 10}} name height='40px'/>
            <Container>
                <Menu.Item name="home" as={Link} to="/">
                    Home
                </Menu.Item>
                <Menu.Item name="about" as={Link} to="/about">About</Menu.Item>
                <Dropdown item text='Get Involved'>
                    <Dropdown.Menu>
                        <Dropdown.Header>Events</Dropdown.Header>
                        <Dropdown.Item as={Link} to="/lottery">Lottery</Dropdown.Item>
                        <Dropdown.Item>Charity sale</Dropdown.Item>
                        <Dropdown.Item>Activities</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
                <Menu.Item position='right'>
                    <Button as='a' >
                        Log in
                    </Button>
                    <Button color="green" as='a' style={{ marginLeft: '0.5em' }}>
                        Sign Up
                    </Button>
                    <Button color="red" as='a' style={{ marginLeft: '0.5em' }}>
                        Config
                    </Button>
                </Menu.Item>
            </Container>
        </Menu>
    );
};