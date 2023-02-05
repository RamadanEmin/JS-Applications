import * as api from './api.js';

const host = 'http://localhost:3030';
api.settings.host = host;

export const login = api.login;
export const register = api.register;
export const logout = api.logout;

// Implement application-specific requests

// Team Collection

export async function getTeams() {
    const teams = await api.get(host + '/data/teams');
    const members = await getMembers(teams.map(t => t._id));
    teams.forEach(t => t.memberCount = members.filter(m => m.teamId == t._id).length);
    return teams;
}

export async function getTeamById(id) {
    return await api.get(host + '/data/teams/' + id);
}

export async function createTeam(team) {
    const result = await api.post(host + '/data/teams', team);
    const request = await requestToJoin(result._id);
    await approveMembership(request);
    
    return result;
}

export async function editTeam(id, team) {
    return await api.put(host + '/data/teams/' + id, team);
}