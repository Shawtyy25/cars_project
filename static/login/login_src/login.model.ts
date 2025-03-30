export interface User {
    name: string,
    password: string,
}

export interface UserRes {
    id: number,
    name: string,
    email: string,
    password: string,
}

export function credentialChecker(user: UserRes[]): boolean{
    return !!user.length;
}