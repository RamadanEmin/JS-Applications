import * as api from './api.js';

export const login = api.login;
export const register = api.register;
export const logout = api.logout;


const endpoints = {
  create: '/data/catalog',
  all: '/data/catalog',
  my: (id) => `/data/catalog?where=_ownerId%3D%22${id}%22`
};

export async function createFurniture(data) {
  return api.post(endpoints.create, data);
}

export async function getAll() {
  return api.get(endpoints.all);
}

export async function getMyFurnitures(userId) {
  return api.get(endpoints.my(userId));
}