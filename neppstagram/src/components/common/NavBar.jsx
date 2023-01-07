import { Link } from "react-router-dom";
import styled from "styled-components";
import { IoIosHome } from "react-icons/io";
import { BsFillPersonFill } from "react-icons/bs";
import { FiSearch } from "react-icons/fi";
import { RxPlus } from "react-icons/rx";

function NavBar() {
  return (
    <Container>
      <NavItem>
        <StyledLink to="home">
          <IoIosHome size={20} />
        </StyledLink>
      </NavItem>
      <NavItem>
        <StyledLink to="search">
          <FiSearch size={20} />
        </StyledLink>
      </NavItem>
      <NavItem>
        <StyledLink to="edit">
          <RxPlus size={20} />
        </StyledLink>
      </NavItem>
      <NavItem>
        <StyledLink to="profile">
          <BsFillPersonFill size={20} />
        </StyledLink>
      </NavItem>
    </Container>
  );
}

const Container = styled.ul`
  display: flex;
  border-top: 1px solid #ddd;
`;

const NavItem = styled.li`
  flex: 1;
  & + & {
    border-left: 1px solid #ddd;
  }
`;

const StyledLink = styled(Link)`
  padding: 10px 0;
  display: flex;
  justify-content: center;
`;

export default NavBar;
