import React, {useMemo, useEffect, useState} from "react";
import style from "./Profile.module.scss";
import {User} from "../services/login.service";
import {UserInfo} from "./user-info/UserInfo";
import {PaymentInfo} from "./payment-info/PaymentInfo";
import {ProfileService, ProfileData, Payment} from "./profile.service";

const {root} = style;

export interface ProfileProps {
    user: User;
}


function useData(user: User) {
    const [profile, setProfile] = useState<ProfileData>({} as any);
    const [loading, setIsLoading] = useState(true);
    const profileService = useMemo(() => new ProfileService(), []);

    const loadData = async () => {

        setIsLoading(true);
        const result = await profileService.loadProfile(user);
        setIsLoading(false);
        setProfile(result);
    };

    useEffect(() => {
        loadData();
    }, []);

    return {
        profile,
        loading,
        saveNewPayment: async (payment: Payment) => {
            await profileService.savePayment(profile.user.id!, payment);
            await loadData();
        },
        removePayment: async (payment: Payment) => {
            await profileService.removePayment(profile.user.id!, payment);
            await loadData();
        }
    };
}

export function Profile({user}: ProfileProps) {
    const {loading, profile: {user: userInfo, payments: paymentSources}, saveNewPayment, removePayment} = useData(user);
    return <div className={root}>
        {(userInfo && paymentSources) ? (
                <>
                    <UserInfo user={userInfo}/>
                    <PaymentInfo payments={paymentSources}
                                 onNewPayment={saveNewPayment}
                                 onRemovePayment={removePayment}/>
                </>)
            : <div>Loading ...</div>
        }
    </div>;
}
