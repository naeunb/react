import { useState } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import styled, { css } from "styled-components";

function PostImageBox({ img_list }) {
  const [idx, setIdx] = useState(0);

  const handleIdx = (operand) => {
    if (
      (operand === -1 && idx + operand < 0) ||
      (operand === 1 && idx + operand > img_list.length - 1)
    )
      return;
    setIdx(idx + operand);
  };

  return (
    <Container>
      <BtnSlide onClick={() => handleIdx(-1)}>
        <IoIosArrowBack size={20} color="fff" />
      </BtnSlide>
      <Wrapper idx={idx}>
        {img_list.map((img, idx) => (
          <PostImg key={idx} url={img.url} />
        ))}
      </Wrapper>
      <BtnSlide onClick={() => handleIdx(1)}>
        <IoIosArrowForward size={20} color="fff" />
      </BtnSlide>
    </Container>
  );
}
const Container = styled.div`
  overflow: hidden;
  position: relative;
`;

const Wrapper = styled.ul`
  display: flex;
  height: 250px;
  background-color: #f7f7f7;
  transition: transform 0.25s;

  ${({ idx }) => css`
    transform: translateX(${idx * -100}%);
  `}
`;

const PostImg = styled.li`
  width: 100%;

  flex-shrink: 0;

  ${({ url }) => css`
    background: url(${url}) center/cover no-repeat;
  `}
`;

const BtnSlide = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 30px;
  height: 30px;
  background: rgba(0, 0, 0, 0.2);
  border-radius: 50%;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 1;

  cursor: pointer;

  &:nth-of-type(1) {
    left: 10px;
  }

  &:nth-of-type(2) {
    right: 10px;
  }
`;

export default PostImageBox;
