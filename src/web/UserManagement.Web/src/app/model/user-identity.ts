export interface User {
    userName: string;
    email: string;
}

export interface UserIdentity {
    user: User;
    token: string;
}