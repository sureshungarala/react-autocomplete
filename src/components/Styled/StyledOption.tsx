import styled from "styled-components";

import { StyledOptionProps } from "../../types";

const StyledOption = styled.li<StyledOptionProps>`
  display: flex;
  position: relative;
  user-select: none;
  word-wrap: break-word;
  cursor: ${(props) => (props.$isActive ? "pointer" : "pointer")};
  background-color: ${(props) => (props.$isActive ? "#edf7ff" : "transparent")};
  &:focus {
    outline: none;
  }

  $[aria-disabled="true"] {
    cursor: "default";
  }
`;

export default StyledOption;
