async function fetchRequest(url: string, method: string, data: any = false) {
    const token = false; // Get token from local storage or cookies
    const options: any = {
        method: method,
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
        },
    };

    if (token) {
        options.headers = {
            ...options.headers,
            Authorization: 'Bearer ' + token,
        };
    }

    if (data) {
        options.body = JSON.stringify(data);
    }

    try {
        const fetcher = await fetch(url, options);
        const response = await fetcher.json();

        return {
            ok: fetcher.ok,
            status: fetcher.status,
            message: response.message,
            data: response,
        };
    } catch (error: any) {
        return {
            ok: false,
            status: 500,
            message: error.message,
        };
    }
}

export const get = (endpoint: string) => fetchRequest(endpoint, 'GET');
export const put = (endpoint: string, data: any = null) => fetchRequest(endpoint, 'PUT', data);
export const post = (endpoint: string, data: any = null) => fetchRequest(endpoint, 'POST', data);
export const remove = (endpoint: string) => fetchRequest(endpoint, 'DELETE');

export default {
    get,
    post,
    put,
    delete: remove,
};
