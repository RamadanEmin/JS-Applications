import * as api from './api.js';

const endpoints = {
  all: '/data/catalog',
  my: (id) => `/data/catalog?where=_ownerId%3D%22${id}%22`
};

export async function getAll() {
  return api.get(endpoints.all);
}

export async function getMyFurnitures(userId) {
  return api.get(endpoints.my(userId));
}