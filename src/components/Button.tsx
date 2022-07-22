import { ButtonHTMLAttributes } from 'react'
import { Button as ReactstrapButton, ButtonProps as ReactstrapButtonProps } from "reactstrap";
import styled from "styled-components";

/*
export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  color: "primary" | "secondary" | "success" | "info" | "warning" | "danger" | "link"
};
*/

type ButtonPropsColor = { 
  color: "primary" | "secondary" | "success" | "info" | "warning" | "danger" | "link"
}

export type ButtonProps = ReactstrapButtonProps & ButtonPropsColor;

export function Button(props: ButtonProps) {
  return (
    <ButtonStyled {...props} />
  )
}

const ButtonStyled = styled(ReactstrapButton)`
  width: 100%;
  font-size: 20px;
  padding-top: 5px;
  padding-bottom: 5px;
  cursor: pointer;
`;

export const ButtonGroup = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;
