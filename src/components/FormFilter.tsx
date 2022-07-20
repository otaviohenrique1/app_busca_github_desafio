import { Formik, Form, FormikProps } from "formik";
import * as Yup from "yup";
import styled from "styled-components";
import { Input, InputContainer, InputErrorMessage } from "./Input";
import { Button, ButtonGroup } from "./Button";

interface FormFilterProps {
  handleSubmitForm(values: FormFilterTypes): void;
}

export function FormFilter(props: FormFilterProps) {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={props.handleSubmitForm}
    >
      {(formikProps: FormikProps<FormFilterTypes>) => {
        const { values, resetForm } = formikProps;
        return (
          <FormStyled>
            <InputContainer>
              <Input
                type="text"
                value={values.termo}
                name="termo"
                placeholder="Repósitorio"
              />
              <InputErrorMessage name="termo" />
            </InputContainer>
            <ButtonGroup>
              <Button
                type="submit"
                font_color="#ffffff"
                border_color="#1d2e30"
                background_color="#5f9ea0"
                background_color_active="#263e40"
                background_color_hover="#436e70"
              >Buscar</Button>
              <Button
                type="button"
                onClick={() => resetForm()}
                font_color="#ffffff"
                border_color="#2f040d"
                background_color="#dc143c"
                background_color_active="#5e081b"
                background_color_hover="#a40e2f"
              >Limpar</Button>
            </ButtonGroup>
          </FormStyled>
        );
      }}
    </Formik>
  );
}

export interface FormFilterTypes {
  termo: string;
}

export const initialValues: FormFilterTypes = {
  termo: "",
};

export const validationSchema = Yup.object().shape({
  termo: Yup.string().required("Campo vazio"),
});

const FormStyled = styled(Form)`
  width: 100%;
  max-width: 400px;
  margin-bottom: 20px;
`;
