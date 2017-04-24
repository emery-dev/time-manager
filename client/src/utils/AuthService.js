import decode from 'jwt-decode';
import {browserHistory} from 'react-router';
import Auth0Lock from 'auth0-lock';
const ID_TOKEN_KEY = 'id_token';

const lock = new Auth0Lock('s9PW7wrLDYCs_Oofrb4ym0Zr-Kbfxxom', 'emery-dev.auth0.com', {
    auth: {
        redirectUrl: `${window.location.origin}/`,
        responseType: 'token'
    }
});

lock.on('authenticated', authResult => {
    setIdToken(authResult.idToken);
    browserHistory.push('/today');
});

export function login(options) {
    lock.show(options);

    return {
        hide() {
            lock.hide();
        }
    }
}

export function logout() {
    clearIdToken();
    browserHistory.replace('/');
}

export function requireAuth(nextState, replace, callback) {
    if (!isLoggedIn()) {
        replace({pathname: '/'});
    }
    callback();
}

function setIdToken(idToken) {
    localStorage.setItem(ID_TOKEN_KEY, idToken);
}

export function getIdToken() {
    return localStorage.getItem(ID_TOKEN_KEY);
}

function clearIdToken() {
    localStorage.removeItem(ID_TOKEN_KEY);
}

export function isLoggedIn() {
    const idToken = getIdToken();
    return !!idToken && !isTokenExpired(idToken);
}

function getTokenExpirationDate(encodedToken) {
    const token = decode(encodedToken);
    if (!token.exp) {
        return null;
    }

    const date = new Date(0);
    date.setUTCSeconds(token.exp);

    return date;
}

function isTokenExpired(token) {
    const expirationDate = getTokenExpirationDate(token);
    return expirationDate < new Date();
}
