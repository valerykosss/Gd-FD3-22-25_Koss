import styled from "styled-components";
import { Heading } from "./ContactPage";
import { Link } from "react-router";
import { useEffect, useState } from "react";
import { SESSION_STORAGE_KEY } from "./PostsPage";

export const Text = styled.p`
  font-size: 22px;
  color: #232323;
  max-width: 600px;
  margin: 20px 0;
  text-align: center;
  line-height: 150%;
`;

export default function StartPage() {
        const [firstNumericPost, setFirstNumericPost] = useState<string | null>(null);
      
        useEffect(() => {
          const storedIds = sessionStorage.getItem(SESSION_STORAGE_KEY);
      
          if (storedIds) {
            const postIds: string[] = JSON.parse(storedIds);
            const numericPost = postIds.find((id) => /^\d+$/.test(id)) || null;
            setFirstNumericPost(numericPost);
          }
        }, []);
        
    return <>
        <Heading>Welcome to Our Blog!</Heading>
        <Text>
            Discover amazing posts on various topics. Whether you're looking for inspiration, 
            knowledge, or just an interesting read, we’ve got something for you.
        </Text>
        {firstNumericPost ? (
        <Link to={`/post/${firstNumericPost}`}>First already generated numeric post</Link>
      ) : (
        <Link to="/posts">To show first post - click this Link!</Link>
      )}
        
    </>
}