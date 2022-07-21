import { ErrorMessage, Field, ErrorMessageProps } from 'formik'
import { DetailedHTMLProps, InputHTMLAttributes, ReactNode } from 'react'
import { Label } from 'reactstrap';
import styled from "styled-components";

export type InputProps = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;

export function Input(props: InputProps) {
  return (
    <FieldInputStyled className="form-control" {...props} />
  )
}

const FieldInputStyled = styled(Field)`
  padding-top: 5px;
  padding-bottom: 5px;
  font-size: 20px;
  border-radius: 0;
`;

export type InputErrorMessageProps = ErrorMessageProps;

export function InputErrorMessage(props: InputErrorMessageProps) {
  return (
    <ErrorMessageStyled component="span" className="alert alert-danger w-100" {...props} />
  );
}

const ErrorMessageStyled = styled(ErrorMessage)`
  border-width: 1px;
  border-style: solid;
  border-start-end-radius: 0;
  border-start-start-radius: 0;
  border-end-end-radius: 10px;
  border-end-start-radius: 10px;
  text-align: center;
  padding-top: 5px;
  padding-bottom: 5px;
  font-size: 20px;
`;

export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-bottom: 5px;
`;

export type CheckboxProps = InputProps & {
  label: ReactNode; 
};

export function Checkbox(props: CheckboxProps) {
  return (
    <FieldCheckboxStyled className="d-flex flex-row justify-content-center align-items-center">
      <Field type="checkbox" className="form-check mb-0" {...props}/>
      <span className="ms-1">{props.label}</span>
    </FieldCheckboxStyled>
  )
}

const FieldCheckboxStyled = styled(Label)`
  &, input[type="checkbox"], span {
    cursor: pointer;
  }

  span {
    font-size: 20px;
  }
`;
