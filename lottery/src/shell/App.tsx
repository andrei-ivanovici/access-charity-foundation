import React, {useState} from 'react';
import {TagTopNavbar} from "@tag/tag-components-react-v2";
import style from "./App.module.scss";
import {SideNav, SideNavItem} from "../components/sidenav/SideNav";
import {Redirect, Route, Switch} from "react-router";
import {navigationService} from "../services/navigation.service";
import {Dashboard} from "../dashboard/Dashboard";
import {Profile} from "../profile/Profile";

const {root, nav, header, content} = style;

const navItems: SideNavItem[] = [
    {
        id: 'dashboard',
        icon: "Home",
        action: openHome,
        isActive: true

    },
    {
        id: 'profile',
        icon: "User",
        action: openProfile
    }
];

function openHome() {
    navigationService.go("/dashboard")
}

function openProfile() {
    navigationService.go("/profile")
}

function useNavigation() {
    const [items,] = useState(navItems);
    return {
        navItems: items
    }
}

export function App() {
    const {navItems} = useNavigation();
    return <div className={root}>
        <TagTopNavbar name={"Charity Foundation "} className={header}/>
        <SideNav items={navItems} className={nav}/>
        <div className={content}>
            <Switch>
                <Route path={"/dashboard"}>
                    <Dashboard/>
                </Route>
                <Route path={"/profile"}>
                    <Profile/>
                </Route>
                <Route path={"/"}>
                    <Redirect to={"/dashboard"}/>
                </Route>
            </Switch>
        </div>
    </div>
}

