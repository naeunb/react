import { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useUserId } from "../../data/auth";
import CommentList from "../common/CommentList";
import PostImageBox from "../common/PostImageBox";
import UserInfo from "../common/UserInfo";

function Post({ post }) {
  const { author, img_list, content, id } = post;
  const [showComment, setShowComment] = useState(false);
  const userId = useUserId();

  return (
    <Container>
      <UserInfo author={author} />
      <PostImageBox img_list={img_list} />
      <div style={{ textAlign: "right", fontSize: "0.7rem", marginTop: 10 }}>
        {author.id === userId && <Link to={`edit/${id}`}>modify</Link>}
      </div>
      <ContentBox>
        <p>{content}</p>
        <BtnComment onClick={() => setShowComment(!showComment)}>
          댓글 보기
        </BtnComment>
      </ContentBox>
      {showComment && <CommentList postId={id} />}
    </Container>
  );
}

const Container = styled.div`
  & + & {
    border-top: 1px solid #eee;
    margin-top: 20px;
  }
`;

const ContentBox = styled.div`
  padding: 5px 10px;
  font-size: 0.8rem;
`;

const BtnComment = styled.div`
  font-size: 0.7rem;
  font-weight: bold;
  cursor: pointer;
  user-select: none;
  margin: 10px 0 0;
`;

export default Post;
