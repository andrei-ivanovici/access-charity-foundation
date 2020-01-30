import React from "react";
import {TagAccessLogo} from "@tag/tag-components-react-v2";
import {Container, Dropdown, Menu} from "semantic-ui-react";
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
                <Menu.Item as={Link} active to="/">
                    Home
                </Menu.Item>
                <Menu.Item as={Link} to="/about">About</Menu.Item>
                <Dropdown item text='Get Involved'>
                    <Dropdown.Menu>
                        <Dropdown.Header>Events</Dropdown.Header>
                        <Dropdown.Item as={Link} to="/lottery">Lottery</Dropdown.Item>
                        <Dropdown.Item>Charity sale</Dropdown.Item>
                        <Dropdown.Item>Activities</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
                <Menu.Item as='a'>Configuration</Menu.Item>
                <Menu.Item as='a'>SignIn</Menu.Item>
                <Menu.Item as='a'>Register</Menu.Item>
            </Container>
        </Menu>
    );
};