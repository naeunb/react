import { useEffect, useState } from "react";
import styled from "styled-components";
import { getCurrUser, getPosts } from "../../api/admin";
import { useUserIdDispatch } from "../../data/auth";
import Post from "../home/Post";

function Home() {
  const [postList, setPostList] = useState([]);
  const [currPage, setCurrPage] = useState(1);
  const [isLast, setIsLast] = useState(false);

  const dispatch = useUserIdDispatch();

  useEffect(() => {
    getCurrUser().then((user) => dispatch(user.id));
  }, [dispatch]);

  useEffect(() => {
    getPosts(currPage).then((data) => {
      if (data.length < 10) setIsLast(true);
      setPostList((postList) => [...postList, ...data]);
    });
  }, [currPage]);

  // const getMoreList = (p) => {
  //   getPosts(p + 1).then((res) => {
  //     setPostList(postList.concat(res));
  //   });
  // };

  // const getData = () => {
  //   getPosts(currPage + 1).then((data) => setPostList([...postList, ...data]));
  //   setCurrPage(currPage + 1);
  // };

  return (
    <Container>
      {postList.map((post) => {
        return <Post key={post.id} post={post} />;
      })}
      {/* <BtnMore onClick={() => getMoreList(currPage)}>더 보기</BtnMore> */}
      {/* <BtnMore onClick={getData}>더 보기</BtnMore> */}
      {!isLast && (
        <BtnMore onClick={() => setCurrPage(currPage + 1)}>더 보기</BtnMore>
      )}
    </Container>
  );
}

const Container = styled.div`
  justify-content: center;
  align-items: center;
`;

const BtnMore = styled.button`
  padding: 8px 12px;
  border-radius: 25px;
  background: #555;
  color: #fff;
  margin: 30px 0 0;
  text-align: center;
  font-weight: bold;
  border: 0;
  cursor: pointer;

  user-select: none;
`;

export default Home;
