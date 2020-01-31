import {createBrowserHistory} from "history";

export const appHistory = createBrowserHistory();

export class NavigationService {
    public go(url: string) {
        appHistory.push(url)
    }

    public navigateToAdminDashboard() {
        this.go("/admin/settings")
    }

    public newLottery() {
        this.go("/new-lottery")
    }
}

export const navigationService = new NavigationService();
