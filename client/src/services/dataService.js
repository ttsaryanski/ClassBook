import { api } from "../utils/requester";

const endPoints = {
    getAll: "/item",
    // createNew: '/data/cars',
    // apiById: "/item",
    // search: (query) => `/data/cars?where=year%3D${query}`,
    // getMyCar: (userId) => `/data/cars?where=_ownerId%3D%22${userId}%22&sortBy=_createdOn%20desc`
};

async function getAll() {
    return await api.get(endPoints.getAll);
}

async function createNew(data) {
    const postData = transformUserData(data);

    return await api.post(endPoints.getAll, postData);
}

async function getById(id) {
    return await api.get(endPoints.getAll + `/${id}`);
}

async function editById(id, data) {
    const postData = transformUserData(data);

    return await api.put(endPoints.getAll + `/${id}`, postData);
}

async function delItemById(id) {
    return await api.del(endPoints.getAll + `/${id}`);
}

// async function searchItem(query) {
//     return await api.get(endPoints.search(query));
// }

// async function getMyCar(userId) {
//     return await api.get(endPoints.getMyCar(userId));
// }

export const dataService = {
    getAll,
    createNew,
    getById,
    editById,
    delItemById,
    // searchItem,
    // getMyCar
};

function transformUserData(userData) {
    const { country, city, street, streetNumber, ...transformedData } =
        userData;

    transformedData.address = { country, city, street, streetNumber };
    transformedData.createdAt = new Date().toISOString();
    transformedData.updatedAt = new Date().toISOString();

    return transformedData;
}
