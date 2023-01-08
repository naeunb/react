import { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import { deleteComment, getComments, postComment } from "../../api/admin";
import { useUserId } from "../../data/auth";

function CommentList({ postId }) {
  const [page, setPage] = useState(1);
  const [commentList, setCommentList] = useState([]);
  const [input, setInput] = useState("");

  const currUserId = useUserId();

  const getData = useCallback(() => {
    getComments(postId, page).then((data) => setCommentList(data));
  }, [postId, page]);

  const handleInput = (e) => {
    setInput(e.target.value);
  };

  const handlePage = () => {
    setPage(page + 1);
  };
  const handleSubmit = async () => {
    if (input.length === 0) {
      alert("댓글을 입력해주세요.");
      return;
    }

    const result = await postComment({ postId, content: input });

    setCommentList([result, ...commentList]);
  };

  const handleDelete = async (commentId) => {
    if (!window.confirm("?")) return;

    await deleteComment(commentId);

    setCommentList(commentList.filter((comment) => comment.id !== commentId));
  };

  useEffect(() => {
    getData();
  }, [getData]);

  return (
    <Container>
      {commentList.map((comment) => (
        <CommentItem key={comment.id}>
          <p>{comment.content}</p>
          {currUserId === comment.id && (
            <BtnDelete onClick={() => handleDelete(comment.id)}>삭제</BtnDelete>
          )}
        </CommentItem>
      ))}
      <BtnMore onClick={handlePage}>more</BtnMore>
      <InputBox>
        <InputComment placeholder="comment..." onChange={handleInput} />
        <BtnSubmit onClick={handleSubmit}>등록</BtnSubmit>
      </InputBox>
    </Container>
  );
}

const Container = styled.div``;

const InputBox = styled.div`
  display: flex;
  margin-top: 20px;
`;

const InputComment = styled.input`
  outline: none;
  border: 0;
  flex: 1;
  padding: 5px 5px;
  border-bottom: 1px solid #eee;
`;

const CommentItem = styled.li`
  display: flex;
  justify-content: space-between;
`;
const BtnSubmit = styled.div`
  color: #fff;
  font-size: 0.7rem;
  margin-left: 5px;
  padding: 0 10px;
  line-height: 26px;
  border-radius: 25px;
  cursor: pointer;
  user-select: none;
  background-color: rgba(0, 0, 0, 0.4);
`;

const BtnDelete = styled(BtnSubmit)`
  background: tomato;
  /* &:hover {
    background-color: ;
  } */
`;

const BtnMore = styled.span`
  font-size: 0.8rem;
  border-radius: 25px;
  background: #400080;
  margin-top: 10px;
  cursor: pointer;
  color: #fff;
  padding: 5px 10px;
`;

export default CommentList;
