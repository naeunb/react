import styled from "styled-components";
import MovieList from "./MovieList";

function Main() {
  return (
    <ContentContainer>
      <Wrapper>
        <MovieList title="What's Popular" />
      </Wrapper>
    </ContentContainer>
  );
}

const ContentContainer = styled.div`
  display: flex;
  justify-content: center;
  padding: 30px 0;
`;

const Wrapper = styled.div`
  max-width: 960px;
  flex: 1;
`;

export default Main;
