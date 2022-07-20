import { DetailedHTMLProps, ButtonHTMLAttributes } from 'react'
import styled from "styled-components";

export type ButtonProps = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>;

export function Button(props: ButtonProps) {
  return (
    <button {...props} />
  )
}

export const ButtonGroup = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-top: 10px;
`;