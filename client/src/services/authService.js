import { api } from "../utils/requester";

const endPoints = {
    register: "/auth/register",
    login: "/auth/login",
    logout: "/auth/logout",
    profile: "/auth/profile",
};

async function register(data) {
    return await api.post(endPoints.register, data);
}

async function login(data) {
    return await api.post(endPoints.login, data);
}

async function logout() {
    return await api.post(endPoints.logout);
}

async function profile() {
    const user = await api.get(endPoints.profile);

    return user;
}

export const authService = {
    register,
    login,
    logout,
    profile,
};
