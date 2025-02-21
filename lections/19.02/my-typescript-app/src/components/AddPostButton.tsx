import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { createPost, JSONServerComment, updatePost } from "../api/jsonServer";
import { action, useTypedSelector } from "../store";
import style from '../pages/PostsPage.module.css'

type AddPostButtonProps = {
    postId: JSONServerComment['id'] | null;
    onCancel?: () => void
}

//props для функционала апдейта
export function AddPostButton(props: AddPostButtonProps) {
    const { posts } = useTypedSelector((store) => store.postSlice);

    const dispatch = useDispatch();

    const [addPostMode, setAddPostMode] = useState(false);
    const [postTitle, setPostTitle] = useState('');
    const [postBody, setPostBody] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const post = props.postId
        ? posts.find(item => item.id === props.postId) 
        : null;

        setAddPostMode(Boolean(post));
        setPostTitle(post?.title ?? '');
        setPostBody(post?.body ?? '');
    }, [props.postId]);
    
    async function createPostHandler() {
        setLoading(true);
        try {
            if (props.postId) {
                const returnedPost = await updatePost(props.postId, {
                    title: postTitle,
                    body: postBody
                })
                console.log('#returnedPost', returnedPost);
    
                dispatch(action.postSlice.editPost(returnedPost));
                props?.onCancel?.();
            } else {
                const returnedPost = await createPost({
                    title: postTitle,
                    body: postBody
                })
                console.log('#returnedPost', returnedPost);
    
                dispatch(action.postSlice.addPost(returnedPost));
            }
            setAddPostMode(false);
            setPostTitle('');
            setPostBody('');
        } catch(error){
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

        return <>

        <button 
            onClick={()=> {
                setAddPostMode(prev => !prev)
                props?.onCancel?.();
            }}
        >
            {addPostMode ? 'Hide': 'Add Post'}
        </button>

        { addPostMode ?
        <div>
            <input 
                placeholder="Post Title" 
                value={postTitle}
                onChange={(event) => setPostTitle(event.target.value)}/> <br />
            <textarea 
                value={postBody}
                onChange={(event) => setPostBody(event.target.value)}
            />
            <br />
            <button   
                onClick={createPostHandler} 
                disabled = {loading}>
                { loading 
                    ? 'Loading...' 
                    : props.postId
                        ? 'Edit'
                        : 'Add'
                }
            </button>
        </div> : null }

    </>;
}