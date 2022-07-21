import { Formik, Form, FormikProps } from "formik";
import * as Yup from "yup";
import styled from "styled-components";
import { Checkbox, Input, InputContainer, InputErrorMessage } from "./Input";
import { Button } from "./Button";
import { ButtonGroup, InputGroup, Label } from "reactstrap";

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
          <FormStyled className="border-top border-bottom pt-3 pb-3">
            <h2 className="w-100 text-center mb-3">Filtros</h2>
            <InputContainer>
              <Input
                type="text"
                value={values.repository_name}
                name="repository_name"
                placeholder="Nome do repósitorio"
              />
              <InputErrorMessage name="repository_name" />
            </InputContainer>
            <InputGroup className="d-flex align-items-center justify-content-around">
              <Checkbox
                name="archived"
                id="archived"
                label={"Arquivado"}
              />
              <Checkbox
                name="private"
                id="private"
                label={"Privado"}
              />
              <Checkbox
                name="fork"
                id="fork"
                label={"Fork"}
              />
            </InputGroup>
            <ButtonGroup className="mt-2">
              <Button
                type="submit"
                color="info"
                className="rounded-0"
              >Filtrar</Button>
              <Button
                type="button"
                color="danger"
                className="rounded-0"
                onClick={() => resetForm()}
              >Limpar</Button>
            </ButtonGroup>
          </FormStyled>
        );
      }}
    </Formik>
  );
}

export interface FormFilterTypes {
  repository_name: string;
  language: string[] | string;
  topics: string[] | string;
  license: any;
  archived: boolean;
  private: boolean;
  fork: boolean;
  allow_forking: boolean;
}

export const initialValues: FormFilterTypes = {
  repository_name: "",
  private: false,
  fork: false,
  archived: false,
  language: "",
  topics: "",
  allow_forking: false,
  license: ""
};

export const validationSchema = Yup.object().shape({
  repository_name: Yup.string().required("Campo vazio"),
});

const FormStyled = styled(Form)`
  width: 100%;
  max-width: 600px;
  margin-bottom: 20px;
`;
