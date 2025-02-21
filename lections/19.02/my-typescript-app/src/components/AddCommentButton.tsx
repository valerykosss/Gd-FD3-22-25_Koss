import { useState } from "react";
import { createComment, JSONServerComment } from "../api/jsonServer";

type AddCommentButtonProps = {
    postId: JSONServerComment['id'];
    commentAddedCallback: (newComment: JSONServerComment) => void
}

export function AddCommentButton(props: AddCommentButtonProps) {
    const [addCommentMode, setAddCommentMode] = useState(false);
    const [authorName, setAuthorName] = useState('');
    const [email, setEmail] = useState('');
    const [commentBody, setCommentBody] = useState('');
    const [loading, setLoading] = useState(false);
    
    async function createCommentHandler() {
        setLoading(true);
        try {
            const returnedComment = await createComment({
                postId: props.postId,
                name: authorName,
                email,
                body: commentBody
            });
            console.log('#returnedComment', returnedComment);

            // dispatch(action.postSlice.addComment(returnedComment));
            props.commentAddedCallback(returnedComment)
                
            setAddCommentMode(false);
            setAuthorName('');
            setEmail('');
            setCommentBody('');
        } catch(error){
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    return <>

        <button onClick={()=> setAddCommentMode(prev => !prev)}>
        {addCommentMode ? 'Hide': 'Add Comment'}</button>

        { addCommentMode ?
        <div>
            <input 
                placeholder="Author Name" 
                onChange={(event) => setAuthorName(event.target.value)}/> <br />
            <input 
                placeholder="Author Email" 
                onChange={(event) => setEmail(event.target.value)}/><br />
            <textarea 
                onChange={(event) => setCommentBody(event.target.value)}
            /><br />
            <button 
                onClick={createCommentHandler} 
                disabled = {loading}>
                {loading ? 'Loading...' : 'Add'}
            </button>
        </div> : null}

    </>;
}