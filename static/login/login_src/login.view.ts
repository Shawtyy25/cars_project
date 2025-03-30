import {loginManager, regManager} from "./login.controller.js";
import {User} from "./login.model";

export function setPasswordState(): void {
    const show = document.querySelector('#show') as HTMLElement;
    const hide = document.querySelector('#hide') as HTMLElement;
    const password = document.querySelector('#password-input') as HTMLInputElement;

    show?.addEventListener('click', (): void => {
        password.type = 'text';
        hide?.classList.toggle('hidden');
        show?.classList.add('hidden');
        show?.classList.remove('active');
    });


    hide?.addEventListener('click', (): void => {
        password.type = 'password';
        hide?.classList.toggle('hidden');
        show?.classList.add('active');
        show?.classList.remove('hidden');
    });

}

export function loginClickManager(): void {
    const loginBtn = document.querySelector('#login-button') as HTMLButtonElement;
    loginBtn?.addEventListener('click', loginManager);
}

export function checkCredentials(): boolean {
    const username = document.querySelector('#username-input') as HTMLInputElement;
    const password = document.querySelector('#password-input') as HTMLInputElement;

    return !!(username.value && password.value);
}

export function getCredentials(): User {
    const username = document.querySelector('#username-input') as HTMLInputElement;
    const password = document.querySelector('#password-input') as HTMLInputElement;

    return {
        name: username.value.trim(),
        password: password.value.trim(),
    }
}

export function cna(): void {
    const create = document.querySelector('.reg_option a') as HTMLAnchorElement;
    create?.addEventListener('click', regManager);
}