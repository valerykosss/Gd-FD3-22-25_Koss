import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import { generateAllPostIds } from "../helpers/idGenerationHelper"
import styled from "styled-components";

const UlStyled = styled.ul`
    list-style: none;
    padding: 0;
`

const LinkStyled = styled(Link)`
    color: #232323;
`

const PostsUlStyled = styled.div`
    text-align: center;
`

export const SESSION_STORAGE_KEY = "postIds";

export default function PostsPage() {
  const [postIds, setPostIds] = useState<string[]>([]);

  useEffect(() => {
    const storedIds = sessionStorage.getItem(SESSION_STORAGE_KEY);

    if (storedIds) {
      setPostIds(JSON.parse(storedIds));
    } else {
      const newPostIds = generateAllPostIds();

      setPostIds(newPostIds);
      sessionStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(newPostIds));
    }
  }, []);

  return (
    <PostsUlStyled>
      <h1>Posts (only numeric links exist)</h1>
      <UlStyled>
        {postIds.map((id) => (
          <li key={id}>
            <LinkStyled to={`/post/${id}`}>Post #{id}</LinkStyled>
          </li>
        ))}
      </UlStyled>
    </PostsUlStyled>
  );
}