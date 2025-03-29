import { loginManager } from "./login.controller.js";
export function setPasswordState() {
    const show = document.querySelector('#show');
    const hide = document.querySelector('#hide');
    const password = document.querySelector('#password-input');
    show?.addEventListener('click', () => {
        password.type = 'text';
        hide?.classList.toggle('hidden');
        show?.classList.add('hidden');
        show?.classList.remove('active');
    });
    hide?.addEventListener('click', () => {
        password.type = 'password';
        hide?.classList.toggle('hidden');
        show?.classList.add('active');
        show?.classList.remove('hidden');
    });
}
export function loginClickManager() {
    const loginBtn = document.querySelector('#login-button');
    loginBtn?.addEventListener('click', loginManager);
}
export function checkCredentials() {
    const username = document.querySelector('#username-input');
    const password = document.querySelector('#password-input');
    return !!(username.value && password.value);
}
export function getCredentials() {
    const username = document.querySelector('#username-input');
    const password = document.querySelector('#password-input');
    return {
        name: username.value,
        password: password.value
    };
}
