import { useEffect, useState } from "react";
import style from './PostsPage.module.css'
import { Link, useSearchParams } from "react-router";
import { action, useTypedSelector } from "../store";
import { useDispatch } from "react-redux";
import { createPost, getPosts, JSONServerPost } from "../api/jsonServer";
import { AddPostButton } from "../components/AddPostButton"

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
    }, [])

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
            </div>)}
        </div>
    </>;
}