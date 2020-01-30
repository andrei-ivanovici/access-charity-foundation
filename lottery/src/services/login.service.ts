export interface User {
    name: string
    email: string;
    avatar?: string;
}

type  Listener = (u: User) => void

export class LoginService {
    public user?: User;
    private _listeners: Listener[] = [];

    public async login(username: string, passwor: string): Promise<void> {
        this.user = {
            email: username,

        } as any;
        this._listeners.forEach(l => this.user && l(this.user))
    }

    public observeUserChange(observer: Listener) {
        this._listeners.push(observer);
    }
}

export const loginService = new LoginService();
