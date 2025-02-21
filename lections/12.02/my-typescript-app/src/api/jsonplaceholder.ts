type JSONServerTodo = {
    userId: number;
    id: number;
    title: string;
    completed: boolean
};

const BASE_URL = 'https://jsonplaceholder.typicode.com';

async function doFetch<T>(path: string) {
    const response = await fetch(BASE_URL + path);
    const json = await response.json();
    
    return json as T;
}

export async function getTodos() {
    return doFetch<JSONServerTodo[]>('/todos');
}

export async function getTodosById(id: string) {
    return doFetch<JSONServerTodo[]>(`/todos/${id}`);
}

export async function getPosts(userId?: string) {
    const query = new URLSearchParams();

    if (userId) {
        query.append('userId', userId);
    }
    
    return await doFetch(`/posts${query ? '?' + query : ''}`);
}

export async function getPostById(id: string) {
    return doFetch<JSONServerTodo[]>(`/posts/${id}`);
}

export async function getComments() {
    return doFetch('/comments');
}

export async function getAlbums() {
    return doFetch('/albums');
}

export async function getPhotos() {
    return doFetch('/photos');
}

export async function getUsers() {
    return doFetch('/users');
}