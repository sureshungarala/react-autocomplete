import styled from 'styled-components';

import { StyledOptionProps } from '../../types';

const StyledOption = styled.li<StyledOptionProps>`
  display: flex;
  position: relative;
  user-select: none;
  word-wrap: break-word;
  cursor: ${(props) => (props.$isActive ? 'pointer' : 'pointer')};
  background-color: ${(props) =>
    props.$isSelected
      ? 'color-mix(in lab, var(--primary-color) 80%, black 20%)'
      : props.$isActive
      ? 'color-mix(in lab, var(--primary-color) 40%, white 60%)'
      : 'transparent'};
  color: ${(props) => (props.$isSelected ? '#fff' : '#000')};

  &:not(:last-child) {
    border-bottom: 0.5px solid var(--primary-color);
  }

  &[aria-selected='true']:has(+ li[aria-selected='true']) {
    border-bottom: 0.5px solid white;
  }

  &[aria-disabled='true'] {
    cursor: 'default';
  }

  &:focus {
    outline: none;
  }

  &:hover:not([aria-disabled='true'], [aria-selected='true']) {
    background-color: color-mix(in lab, var(--primary-color) 40%, white 60%);
  }
`;

export default StyledOption;
