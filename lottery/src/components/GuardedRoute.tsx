import React from "react";

export interface GuardedRouteProps {
    canNavigate: () => boolean
    onSuccess: () => JSX.Element
    onFail: () => JSX.Element
}

export function GuardedRoute({canNavigate, onFail, onSuccess}: GuardedRouteProps) {

    if (canNavigate()) {
        return onSuccess();
    }
    return onFail();

}
