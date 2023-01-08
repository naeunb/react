import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import styled from "styled-components";
import NavBar from "../common/NavBar";

function Main() {
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("access-token");

    if (!token) {
      navigate("/signIn");
    }
  }, [navigate]);
  return (
    <Container>
      <OutletWrapper>
        <Outlet />
      </OutletWrapper>
      <NavBar />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  height: 100%;
  flex-direction: column; //주축 변경
`;

const OutletWrapper = styled.div`
  flex: 1;

  overflow-y: scroll;

  & > div {
    height: 100%;
  }
`;

export default Main;
