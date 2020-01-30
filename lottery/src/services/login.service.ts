export interface User {
    name: string
    email: string;
    avatar?: string;
}

export class LoginService {
    public user?: User;

    public async login(username: string, passwor: string): Promise<void> {

    }
}

export const loginService = new LoginService();
