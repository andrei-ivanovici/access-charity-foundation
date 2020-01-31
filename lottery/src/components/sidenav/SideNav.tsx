import React from "react";
import style from "./SideNav.module.scss"
import clsx from "clsx";
import {TagIcon} from "@tag/tag-components-react-v2";

const {root, navItem: navItemClass} = style;

export interface SideNavItem {
    id: string;
    icon: string;
    action: () => void;
    isActive?: boolean
}


export interface SideNavProps {
    items: SideNavItem[]
    className?: string
}


export function SideNav({items, className}: SideNavProps) {
    const clazz = `${root} ${className}`;
    return <div className={clazz}>
        {
            items.map((item, idx) => {
                const itemClass = clsx(navItemClass, {selected: item.isActive});
                return <div key={idx} className={itemClass} onClick={item.action}>
                    <TagIcon icon={item.icon} accent={"porcelain"}/>
                </div>
            })
        }
    </div>
}
