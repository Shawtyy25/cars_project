import {checkCredentials, getCredentials, loginClickManager, setPasswordState} from "./login.view.js";
import {credentialChecker, User, UserRes} from "./login.model.js";



export function init(): void {
    setPasswordState();
    loginClickManager();

}

export function loginManager(): void {
    if (checkCredentials()) {
        const user: object = fetchUser(getCredentials());
        credentialChecker(user);

    } else {
        console.error('Please fill all the gaps');
    }
}

async function fetchUser(user: User): Promise<UserRes[]> {
    try {
        const response = await fetch('/login/user_check', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
        });

        if (!response.ok) throw new Error(`Status: ${response.status}`);
        //todo ------>
        const users: UserRes[] | [] = await response.json();

        return users ? users : [];

    } catch (error) {
        console.error('Error sending data to server:', error);
        throw error;
    }
}


