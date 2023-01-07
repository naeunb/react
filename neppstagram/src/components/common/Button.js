import styled, { css } from "styled-components";

export const Button = styled.button`
  width: 100%;
  background: #333;
  color: #fff;
  line-height: 30px;
  border: 0;
  cursor: pointer;

  & + & {
    margin-top: 5px;
  }

  ${({ bgColor }) =>
    bgColor &&
    css`
      background: ${bgColor};
    `}
`;
