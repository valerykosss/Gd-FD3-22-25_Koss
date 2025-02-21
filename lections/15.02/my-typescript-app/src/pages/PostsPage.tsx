import { useEffect, useState } from "react";
import { getPosts, JSONServerPost } from "../api/jsonplaceholder";
import style from './PostsPage.module.css'
import { Link, useSearchParams } from "react-router";
import { action, useTypedSelector } from "../store";
import { useDispatch } from "react-redux";

export default function PostsPage() {
    const [searchParams, setSearchParams] = useSearchParams();

    // 1 variant - use/state
    // const [posts, setPosts] = useState<JSONServerPost[]>([]);

    //2 variant - rtk-postSlice
    const { posts } = useTypedSelector((store) => store.postSlice);
    
    const dispatch = useDispatch();
    const userId = searchParams.get('userId');

    useEffect(() => {
        async function load() {
            // try {
                const newPosts = await getPosts(userId ?? '');
                
                // 1 variant - use/state
                // setPosts(newPosts);

                //2 variant 
                dispatch(action.postSlice.init(newPosts));

            // } catch() {}
        }
        load();
    }, [])

    return <>
        <h4>Posts</h4>

        <div className={style.wrapper}>
            {posts.map(post => <div
                className={style.card} 
                key={post.id}> 
                    <Link 
                        to={`/posts/${post.id}`} 
                        className={style.cardTitle}>
                    {post.title} (userId: {post.userId})
                    </Link>
                    
                    <div className={style.cardBody}>{post.body}</div>
            </div>)}
        </div>
    </>;
}