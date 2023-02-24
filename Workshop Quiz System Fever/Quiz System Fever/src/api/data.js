import { getUserData } from '../util.js';

export function createPointer(className, objectId) {
    return {
        '__type': 'Pointer',
        className,
        objectId
    };
}

export function addOwner(object) {
    const user = getUserData();
    const result = Object.assign({}, object);
    result.owner = createPointer('_User', user.id);
    return result;
}
