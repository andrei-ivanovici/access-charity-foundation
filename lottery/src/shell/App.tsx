import React, {useEffect, useState} from 'react';
import style from "./App.module.scss";
import {SideNav, SideNavItem} from "../components/sidenav/SideNav";
import {navigationService} from "../services/navigation.service";
import {User} from "../services/login.service";
import {UserRoutes} from "./UserRoutes";
import {AdminRoutes} from "./AdminRoutes";
import {TopNav} from "../components/top-nav/TopNav";

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


const adminNavItems: SideNavItem[] = [
    {
        id: 'dashboard',
        icon: "Badge2",
        action: openAdminHome,
        isActive: true

    },
    {
        id: 'profile',
        icon: "User",
        action: openProfile
    }
];

function openHome() {
    navigationService.go("/user/dashboard")
}


function openAdminHome() {
    navigationService.go("/admin/settings")
}


function openProfile() {
    navigationService.go("/profile")
}

function useNavigation(user: User) {

    const [items, setItems] = useState<SideNavItem[]>([]);
    const [title, setTitle] = useState<string>();
    useEffect(() => {
        if (user.role == 'admin') {
            setTitle("Charity Foundation ADMIN");
            setItems(adminNavItems)
        } else {
            setTitle("Charity Foundation");
            setItems(navItems)
        }
    }, [user]);
    return {
        title,
        navItems: items
    }
}

export interface AppProps {
    user: User
}

export function App({user}: AppProps) {
    const {navItems} = useNavigation(user);
    return <div className={root}>
        <TopNav user={user} className={header}/>
        <SideNav items={navItems} className={nav}/>
        <div className={content}>
            {user.role === 'admin' ? <AdminRoutes user={user}/>
                : <UserRoutes user={user}/>}
        </div>
    </div>
}

