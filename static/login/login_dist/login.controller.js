import { checkCredentials, cna, getCredentials, loginClickManager, setPasswordState } from "./login.view.js";
import { credentialChecker } from "./login.model.js";
export function init() {
    setPasswordState();
    loginClickManager();
    cna();
}
export async function loginManager() {
    if (checkCredentials()) {
        const user = await fetchUser(getCredentials());
        if (credentialChecker(user)) {
            redirectSite('/login/redirect');
        }
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
        const users = await response.json();
        return users;
    }
    catch (error) {
        console.error('Error sending data to server:', error);
        return [];
    }
}
export async function redirectSite(url) {
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (!response.ok)
            throw new Error(`Status: ${response.status}`);
        if (response.redirected) {
            window.location.href = response.url;
        }
        else {
            console.error('Error');
        }
    }
    catch (error) {
        console.error(`Error while redirecting to another page: ${error}`);
    }
}
export function regManager() {
    redirectSite('/login/to/registration');
}
