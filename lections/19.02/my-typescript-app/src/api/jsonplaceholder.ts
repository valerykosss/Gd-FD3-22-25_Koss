export type JPTodo = {
    userId: number;
    id: number;
    title: string;
    completed: boolean
};

export type JPComment = {
    body: string;
    email: string;
    id: number;
    name: string;
    postId: number;
}

export type JPPost = {
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
    return doFetch<JPTodo[]>('/todos', {userId});
}

export async function getTodosById(id: string) {
    return doFetch<JPTodo[]>(`/todos/${id}`);
}

export async function getPosts(userId?: string) {
    return await doFetch<JPPost[]>('/posts', {
        userId,
    });
}

export async function getPostById(id: string) {
    return await doFetch<JPPost>(`/posts/${id}`);
}

// export async function getComments() {
//     return doFetch<JPComment[]>('/comments');
// }

//если не будет postId, итог такой, как и getComments вверху
// export async function getComments(postId?: string) {
//     const query = new URLSearchParams();
//     if (postId) {
//         query.append('userId', postId);
//     }
//     // return await doFetch<JPComment[]>(`/posts/${postId}/comments`);
//     return await doFetch<JPComment[]>(`comments${query ? '?' + query : ''}`);
// }

export async function getComments(postId?: string) {
    return await doFetch<JPComment[]>(`comments`,{ postId });
}

export async function getCommnetById(id: string) {
    return doFetch<JPComment>(`/comments/${id}`);
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