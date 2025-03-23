import { api } from "../utils/requester";

const endPoints = {
    getAll: "/teacher",
    // createNew: '/data/cars',
    // apiById: "/item",
    search: (query) => `/teacher?email=${query}`,
};

async function getAll(signal) {
    return await api.get(endPoints.getAll, signal);
}

async function createNew(data, signal) {
    return await api.post(endPoints.getAll, data, signal);
}

async function getById(id, signal) {
    return await api.get(endPoints.getAll + `/${id}`, signal);
}

async function editById(id, data, signal) {
    return await api.put(endPoints.getAll + `/${id}`, data, signal);
}

async function delById(id, signal) {
    return await api.del(endPoints.getAll + `/${id}`, signal);
}

async function searchTeacher(query, signal) {
    return await api.get(endPoints.search(query, signal));
}

// async function getMyCar(userId) {
//     return await api.get(endPoints.getMyCar(userId));
// }

export const teacherService = {
    getAll,
    createNew,
    getById,
    editById,
    delById,
    searchTeacher,
    // getMyCar
};
