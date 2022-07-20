import { ButtonHTMLAttributes } from 'react'
import styled from "styled-components";

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & ButtonStyledProps;

export function Button(props: ButtonProps) {
  return (
    <ButtonStyled {...props} />
  )
}

type ButtonStyledProps = { 
  font_color: string;
  border_color: string;
  background_color: string;
  background_color_hover: string;
  background_color_active: string;
}

const ButtonStyled = styled.button<ButtonStyledProps>`
  width: 100%;
  font-size: 20px;
  padding-top: 5px;
  padding-bottom: 5px;
  cursor: pointer;
  color: ${(props) => props.font_color};
  background-color: ${(props) => props.background_color};
  border-color: ${(props) => props.border_color};
  border-width: 1px;
  border-style: outset;

  &:hover {
    background-color: ${(props) => props.background_color_hover};
  }

  &:active {
    background-color: ${(props) => props.background_color_active};
  }
`;

export const ButtonGroup = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

/*
  CadetBlue
  #5F9EA0
  rgb(95, 158, 160)

  DarkRed
  #8B0000
  rgb(139, 0, 0)

  Crimson
  #DC143C
  rgb(220, 20, 60)

  FireBrick
  #B22222
  rgb(178, 34, 34)
*/
