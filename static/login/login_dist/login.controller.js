import { checkCredentials, getCredentials, loginClickManager, setPasswordState } from "./login.view.js";
import { credentialChecker } from "./login.model.js";
export function init() {
    setPasswordState();
    loginClickManager();
}
export function loginManager() {
    if (checkCredentials()) {
        const user = fetchUser(getCredentials());
        credentialChecker(user);
    }
    else {
        console.error('Please fill all the gaps');
    }
}
async function fetchUser(user) {
    try {
        const response = await fetch('/login/user_check', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
        });
        if (!response.ok)
            throw new Error(`Status: ${response.status}`);
        //todo ------>
        const users = await response.json();
        return users ? users : [];
    }
    catch (error) {
        console.error('Error sending data to server:', error);
        throw error;
    }
}
