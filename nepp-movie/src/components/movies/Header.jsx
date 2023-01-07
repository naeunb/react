import { Link } from "react-router-dom";
import styled from "styled-components";

const gnbList = [
  {
    id: 1,
    text: "Movie",
    url: "/movies",
  },
  {
    id: 2,
    text: "TV Show",
    url: "/shows",
  },
  {
    id: 3,
    text: "Person",
    url: "/persons",
  },
];

function Header() {
  return (
    <Container>
      <Wrapper>
        <Logo>
          <Link to="/">Nepp movie</Link>
        </Logo>
        <GnbList>
          {gnbList.map((item) => (
            <NavItem key={item.id}>
              <Link to={item.url}>{item.text}</Link>
            </NavItem>
          ))}
        </GnbList>
      </Wrapper>
    </Container>
  );
}

const Container = styled.header`
  display: flex;
  justify-content: center;
  border-bottom: 1px solid #ccc;

  line-height: 60px;
`;

const Wrapper = styled.div`
  max-width: 960px;
  flex: 1;
  display: flex;
`;

const GnbList = styled.ul`
  display: flex;
`;

const NavItem = styled.li`
  & + & {
    margin-left: 20px;
  }
  a {
    &:hover {
      font-weight: bold;
    }
  }
`;

const Logo = styled.h1`
  font-size: 1.5rem;
  margin-right: 30px;
`;

export default Header;
