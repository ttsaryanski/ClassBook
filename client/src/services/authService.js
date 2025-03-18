import { api } from "../utils/requester";

const endPoints = {
    register: "/auth/register",
    login: "/auth/login",
    logout: "/auth/logout",
    profile: "/auth/profile",
    editProfile: "/auth",
};

async function register(data, signal) {
    return await api.post(endPoints.register, data, signal);
}

async function login(data, signal) {
    return await api.post(endPoints.login, data, signal);
}

async function logout(signal) {
    return await api.post(endPoints.logout, signal);
}

async function profile(signal) {
    const user = await api.get(endPoints.profile, signal);

    return user;
}

async function editUser(id, data, signal) {
    const editedUser = await api.put(
        endPoints.editProfile + `/${id}`,
        data,
        signal
    );

    return editedUser;
}

export const authService = {
    register,
    login,
    logout,
    profile,
    editUser,
};
