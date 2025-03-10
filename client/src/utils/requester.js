const host = "http://localhost:3000/api";

async function requester(method, url, data) {
    const option = {
        method,
        credentials: "include",
        headers: {},
    };

    if (data != undefined) {
        option.headers["Content-Type"] = "application/json";
        option.body = JSON.stringify(data);
    }

    try {
        const response = await fetch(host + url, option);

        if (!response.ok) {
            const error = await response.json();

            throw new Error(error.message);
        }

        if (response.status === 204) {
            return response;
        }

        return response.json();
    } catch (error) {
        throw error;
    }
}

async function get(url) {
    return requester("GET", url);
}

async function post(url, data) {
    return requester("POST", url, data);
}

async function put(url, data) {
    return requester("PUT", url, data);
}

async function del(url) {
    return requester("DELETE", url);
}

export const api = {
    get,
    post,
    put,
    del,
};
