import { ButtonHTMLAttributes } from 'react'
import styled from "styled-components";

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

export function Button(props: ButtonProps) {
  return (
    <ButtonStyled {...props} />
  )
}

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

const ButtonStyled = styled.button`
  width: 100%;
  font-size: 20px;
  padding-top: 5px;
  padding-bottom: 5px;
  color: #ffffff;
`;

export const ButtonGroup = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-top: 10px;
`;