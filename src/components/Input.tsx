import { ErrorMessage, Field, ErrorMessageProps } from 'formik'
import { DetailedHTMLProps, InputHTMLAttributes } from 'react'
import styled from "styled-components";

export type InputProps = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;

export function Input(props: InputProps) {
  return (
    <FieldStyled {...props} />
  )
}

const FieldStyled = styled(Field)`
  width: 100%;
  /* padding: 0; */
`;

export type InputErrorMessageProps = ErrorMessageProps;

export function InputErrorMessage(props: InputErrorMessageProps) {
  return (
    <ErrorMessageStyled component="span" {...props} />
  );
}

const ErrorMessageStyled = styled(ErrorMessage)`
  border-width: 1px;
  border-style: solid;
  border-start-end-radius: 0;
  border-start-start-radius: 0;
  border-end-end-radius: 10px;
  border-end-start-radius: 10px;
  border-color: #b30000;
  background-color: #ff8080;
  color: #ffffff;
  text-align: center;
  padding-top: 5px;
  padding-right: 3px;
  padding-bottom: 5px;
  padding-left: 3px;
  width: 100%;
`;

export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
`;