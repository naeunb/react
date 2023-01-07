import styled from "styled-components";

export const Input = styled.input`
  padding: 5px;
  border: 1px solid #ddd;
  width: 100%;
  outline: none;

  & + & {
    margin-top: 10px;
  }
`;
