import { api } from "../utils/requester";
// import { userUtil } from '../utility/userUtil.js';

const endPoints = {
    register: "/auth/register",
    login: "/auth/login",
    logout: "/auth/logout",
    profile: "/auth/profile",
};

async function register(data) {
    //const userData = await api.post(endPoints.register, data);
    return await api.post(endPoints.register, data);
    // userUtil.setUser(userData);
}

async function login(data) {
    //const userData = await api.post(endPoints.login, data);
    return await api.post(endPoints.login, data);
    // userUtil.setUser(userData);
}

async function logout() {
    return await api.post(endPoints.logout);
    //  userUtil.clearUserData();
}

async function profile() {
    const user = await api.get(endPoints.profile);

    return user;
    //  userUtil.clearUserData();
}

export const authService = {
    register,
    login,
    logout,
    profile,
};
