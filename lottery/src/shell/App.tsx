import React, {useState} from 'react';
import {TagAvatar, TagTopNavbar} from "@tag/tag-components-react-v2";
import style from "./App.module.scss";
import {SideNav, SideNavItem} from "../components/sidenav/SideNav";
import {Redirect, Route, Switch} from "react-router";
import {navigationService} from "../services/navigation.service";
import {Dashboard} from "../dashboard/Dashboard";
import {Profile} from "../profile/Profile";
import {User} from "../services/login.service";
import {UserProfile} from "./user-profile/UserProfile";

const {root, nav, header, content, headerContent} = style;

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

export interface AppProps {
    user: User
}

export function App({user}: AppProps) {
    const {navItems} = useNavigation();
    return <div className={root}>
        <TagTopNavbar className={header}>
            <div className={headerContent}>
                {"Charity Foundation "}
                <UserProfile user={user}/>
            </div>
        </TagTopNavbar>
        <SideNav items={navItems} className={nav}/>
        <div className={content}>
            <Switch>
                <Route path={"/dashboard"}>
                    <Dashboard/>
                </Route>
                <Route path={"/profile"}>
                    <Profile user={user}/>
                </Route>
                <Route path={"/"}>
                    <Redirect to={"/profile"}/>
                </Route>
            </Switch>
        </div>
    </div>
}

