import styled, { css } from "styled-components";

function UserInfo({ author }) {
  const { name, profile_url } = author;
  return (
    <Container>
      <ImgCircle profile_url={profile_url} />
      <UserName>{name}</UserName>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  padding: 10px;
  align-items: center;
`;

const ImgCircle = styled.div`
  width: 30px;
  height: 30px;
  border: 2px solid #ddd;
  border-radius: 50%;
  margin-right: 10px;

  ${({ profile_url }) => css`
    background: url(${profile_url}) center / cover;
  `}
`;

const UserName = styled.p`
  font-size: 0.8rem;
  font-weight: bold;
  color: #555;
`;

export default UserInfo;
