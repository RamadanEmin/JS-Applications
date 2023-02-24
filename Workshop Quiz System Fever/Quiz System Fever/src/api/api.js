import { getUserData } from '../util.js';

const hostname = 'https://parseapi.back4app.com';

async function request(url, options) {
    try {
        const res = await fetch(hostname + url, options);

        if (res.ok == false) {
            const error = await res.json();
            throw {
                message: error.error,
                code: error.code
            };
        }

        return res.json();
        
    } catch (err) {
        alert(err.message);
        throw err;
    }
}

function cretaeOption(method = 'get', data) {
    const options = {
        method,
        headers: {
            'X-Parse-Application-Id': 'Qf3zuL2AoQeDf9IH4ixnaQdrDtguMG571rCHpaCq',
            'X-Parse-REST-API-Key': 'HRWqYdJ5C1CPWQJokLNRzuC0BzkEOFQirfAYV00R',
        }
    };

    if(data != undefined) {
        options.headers['Content-Type'] = 'application/json';
        options.body = JSON.stringify(data);
    }

    const user = getUserData();
    if (user) {
        options.headers['X-Parse-Session-Token'] = user.token;
    }

    return options;
}

export async function get(url) {
    return request(url, cretaeOption());
}

export async function post(url, data) {
    return request(url, cretaeOption('post', data));
}

export async function put(url, data) {
    return request(url, cretaeOption('put', data));
}

export async function del(url) {
    return request(url, cretaeOption('delete'));
}