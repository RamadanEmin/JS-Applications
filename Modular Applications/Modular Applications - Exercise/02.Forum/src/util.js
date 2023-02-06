export function getUserData() {
    return JSON.parse(sessionStorage.getItem('userData'));
}

export function setUserData(data) {
    return sessionStorage.setItem('userData', JSON.stringify(data));
}

export function clearUserData() {
    sessionStorage.removeItem('userData');
}
export function parseQuerystring(string) {
    const params = string
        .split('&')
        .map(p => p.split('='))
        .reduce((a, [k, v]) => Object.assign(a, { [k]: v }), {});

    return params;
}

export function createSubmitHandler(callback, ...fieldNames) {
    return function (event) {
        event.preventDefault();
        const formData = new FormData(event.target);

        const result = {};

        for (const field of fieldNames) {
            result[field] = formData.get(field).trim();
        }

        callback(result, event);
    };
}