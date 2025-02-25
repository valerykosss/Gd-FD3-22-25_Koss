import { useEffect, useState } from "react";
import style from './PostsPage.module.css'
import { Link, useSearchParams } from "react-router";
import { action, useTypedSelector } from "../store";
import { useDispatch } from "react-redux";
import { createPost, deletePost, getPosts, JSONServerPost } from "../api/jsonServer";
import { AddPostButton } from "../components/AddPostButton"
import { Bounce, toast } from "react-toastify";

export default function PostsPage() {
    const [searchParams, setSearchParams] = useSearchParams();
    const [selectedPostId, setSelectedPostId] = useState<JSONServerPost['id'] | null>(null);
    const { posts } = useTypedSelector((store) => store.postSlice);
    
    const dispatch = useDispatch();
    const userId = searchParams.get('userId');
    useEffect(() => {
        async function load() {
            const newPosts = await getPosts(userId ?? '');
            dispatch(action.postSlice.init(newPosts));
        }
        load();
    }, [])


    useEffect(() => {
        async function load() {
            // try {
                const newPosts = await getPosts(userId ?? '');
                dispatch(action.postSlice.init(newPosts));

            // } catch() {}
        }
        load();
    }, []);

    async function deleteHandler(postId: JSONServerPost['id']) {
        const result = confirm('Do you really want to delete post?');
        
        if (result) {
            try {
                await deletePost(postId);
                dispatch(action.postSlice.deletePost(postId));
            } catch(error: any) {
                alert(error.message);
                toast.error(error.message);
            }
        }
    }

    return <>
        <h4>Posts</h4>
        <AddPostButton 
            postId={selectedPostId} 
            onCancel={() => setSelectedPostId(null)}
        />

        <div className={style.wrapper}>
            {posts.map(post => <div
                className={style.card} 
                key={post.id}> 
                    <Link 
                        to={`/posts/${post.id}`} 
                        className={style.cardTitle}>
                    {post.title}
                    </Link>
                    
                    <div className={style.cardBody}>{post.body}</div>
                    <button 
                        onClick={() => setSelectedPostId(post.id)}>
                            Edit
                    </button>
                    <button 
                        onClick={() => deleteHandler(post.id)}>
                            Delete
                    </button>
            </div>)}
        </div>
    </>;
}