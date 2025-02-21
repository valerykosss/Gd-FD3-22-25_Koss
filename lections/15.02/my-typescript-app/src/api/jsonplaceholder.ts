export type JSONServerTodo = {
    userId: number;
    id: number;
    title: string;
    completed: boolean
};

export type JSONServerComment = {
    body: string;
    email: string;
    id: number;
    name: string;
    postId: number;
}

export type JSONServerPost = {
    userId: number;
    id: number;
    title: string;
    body: string;
}

const BASE_URL = 'https://jsonplaceholder.typicode.com/';

//Record<string, string> - ключ и значение - строки
async function doFetch<T>(path: string, queryObject?: Record<string, string | undefined>) {
    const query = new URLSearchParams();

    if(queryObject) {
        Object.entries(queryObject).forEach(([key, value]) => {
            if (value) {
                query.append(key, value);
            }
        })
    }

    const response = await fetch(BASE_URL + path + (query ? '?' + query : ''));
    const json = await response.json();
    
    return json as T;
}

export async function getTodos(userId?: string) {
    return doFetch<JSONServerTodo[]>('/todos', {userId});
}

export async function getTodosById(id: string) {
    return doFetch<JSONServerTodo[]>(`/todos/${id}`);
}

export async function getPosts(userId?: string) {
    return await doFetch<JSONServerPost[]>('/posts', {
        userId,
    });
}

export async function getPostById(id: string) {
    return await doFetch<JSONServerPost>(`/posts/${id}`);
}

// export async function getComments() {
//     return doFetch<JSONServerComment[]>('/comments');
// }

//если не будет postId, итог такой, как и getComments вверху
// export async function getComments(postId?: string) {
//     const query = new URLSearchParams();
//     if (postId) {
//         query.append('userId', postId);
//     }
//     // return await doFetch<JSONServerComment[]>(`/posts/${postId}/comments`);
//     return await doFetch<JSONServerComment[]>(`comments${query ? '?' + query : ''}`);
// }

export async function getComments(postId?: string) {
    return await doFetch<JSONServerComment[]>(`comments`,{ postId });
}

export async function getCommnetById(id: string) {
    return doFetch<JSONServerComment>(`/comments/${id}`);
}

// export async function getAlbums() {
//     return doFetch('/albums');
// }

// export async function getPhotos() {
//     return doFetch('/photos');
// }

// export async function getUsers() {
//     return doFetch('/users');
// }