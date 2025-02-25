import { useEffect, useState } from "react";
import { getPostById, getComments, JSONServerComment, JSONServerPost } from "../api/jsonServer";
import { useParams, useSearchParams } from "react-router";
import style from "./PostPage.module.css"
import { action, useTypedSelector } from "../store";
import { useDispatch } from "react-redux";
import { AddCommentButton } from "../components/AddCommentButton";

export default function PostPage() {
    const { postId } = useParams();
    const [loading, setLoading] = useState<boolean>(false);
    const [comments, setComments] = useState<JSONServerComment[]>([]);
    const { selectedPost, posts } = useTypedSelector((store) => store.postSlice);
    
    const dispatch = useDispatch();

    function commentAddedCallback(newComment: JSONServerComment) {
        setComments(prev => [...prev, newComment]);
    }
        
        //если перешли по прямой ссылке - грузим post (т.к. нету posts)
        useEffect(() => {
            async function load() {
                    if (postId) {
                        setLoading(true);
                        const newPost = await getPostById(postId); 
                        dispatch(action.postSlice.initPost(newPost));
                        setLoading(false);
                    }
            }
            load();

        }, [postId]);

        useEffect(() => {
            if (postId) {
                dispatch(action.postSlice.select(postId));
            }

            //unmounting if leave the page
            return () => {
                //и убираем при выходе со страницы
                dispatch(action.postSlice.unselect());
            }
        }, [postId]);


        //подгрузка комментов
        useEffect(() => {
            async function load() {
                if (postId) {
                    // setLoading(true);
                    const newCommnets = await getComments(postId);
                    
                    setComments(newCommnets);
                    // setLoading(false);
                }
            }
            load();
        }, [selectedPost?.id])

    return <>
        {
            loading || !selectedPost
            ? <h4>Loading...</h4> 
            : <>
                <h4 className={style.postTitle}>{selectedPost.title}</h4>
                <div className={style.postBody}>{selectedPost.body}</div>

                <AddCommentButton 
                    postId={postId!} 
                    commentAddedCallback={commentAddedCallback}
                />

                <div className={style.wrapper}>
                    {comments.map(comment => <div
                        className={style.comment}
                        key={comment.id}> 
                            <a 
                                href={`mailto:${comment.email}`} 
                                className={style.commentAuthor}
                            >
                                {comment.name}
                            </a>
                            <div className={style.commentBody}>#{comment.id} {comment.body}</div>
                    </div>)}
                </div>
            </>
        }

    </>;
}