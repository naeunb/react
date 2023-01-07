import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled, { css } from "styled-components";
import { getDetail } from "../../api/movies";

function Detail() {
  const { id } = useParams();
  const [detail, setDetail] = useState({
    data: null,
    error: null,
    loading: true,
  });
  const { data, error, loading } = detail;
  useEffect(() => {
    getDetail(id)
      .then((movie) =>
        setDetail({
          data: movie,
          error: null,
          loading: false,
        })
      )
      .catch((error) => {
        setDetail({
          data: null,
          loading: false,
          error,
        });
      });
  }, [id]);

  if (loading) return <div>로딩중</div>;
  if (!data) return <div>영화 정보가 없습니다</div>;
  if (error) return <div>{error.message}</div>;

  const { title, tagline, release_date, poster_path, overview, backdrop_path } =
    data;
  const img_url = "https://image.tmdb.org/t/p/w342" + poster_path;
  const back_url = "https://image.tmdb.org/t/p/w1280" + backdrop_path;

  return (
    <Container back_url={back_url}>
      <Wrapper>
        <ImgBox>
          <img src={img_url} alt="" />
        </ImgBox>
        <TextBox>
          <Title>
            {title} <span>({release_date.substr(0, 4)})</span>
          </Title>
          <h5>{tagline}</h5>
          <h4>개요</h4>
          <Desc>{overview}</Desc>
        </TextBox>
      </Wrapper>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  position: relative;
  color: #fff;
  &:before {
    content: "";
    display: block;
    position: absolute;
    width: 100%;
    height: 100%;

    /* background-image: url(${({ back_url }) => back_url}); */
    ${({ back_url }) => css`
      background-image: url(${back_url});
      background-color: rgba(0, 0, 0, 0.5);
      background-blend-mode: overlay;
    `}/* opacity: 0.5; */
  }
`;

const Wrapper = styled.div`
  flex: 1;
  max-width: 960px;
  padding: 30px 0;
  display: flex;
  position: relative;
  z-index: 1;
`;

const ImgBox = styled.div`
  width: 300px;
  height: 450px;

  justify-content: center;
  align-items: center;
  overflow: hidden;
  background-color: #333;

  flex-shrink: 0;
`;

const TextBox = styled.div`
  margin-left: 20px;

  h4 {
    margin: 15px 0 5px;
  }

  h5 {
    font-style: italic;
    margin-top: 10px;
    font-size: 1.3rem;
    font-weight: normal;
  }
`;

const Title = styled.h1`
  span {
    font-weight: normal;
    font-size: 1.5rem;
  }
`;

const Desc = styled.p``;

export default Detail;
