import { Formik, Form, FormikProps } from "formik";
import * as Yup from "yup";
import styled from "styled-components";
import { Checkbox, Input, InputContainer, InputErrorMessage } from "../Input";
import { Button } from "../Button";
import { ButtonGroup, InputGroup, Label } from "reactstrap";
import { FormFilterTypes } from "../../utils/types";

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
          <FormStyled className="border-top border-bottom pt-3 pb-3 w-100">
            <h2 className="w-100 text-center mb-3">Filtros</h2>
            <InputContainer>
              <Input
                type="text"
                value={values.name}
                name="name"
                placeholder="Nome do repósitorio"
              />
              <InputErrorMessage name="name" />
            </InputContainer>
            <InputContainer>
              <Input
                type="text"
                value={values.language}
                name="language"
                placeholder="Linguagem"
              />
              <InputErrorMessage name="language" />
            </InputContainer>
            <InputContainer>
              <Input
                type="text"
                value={values.license}
                name="license"
                placeholder="Licença"
              />
              <InputErrorMessage name="license" />
            </InputContainer>
            <InputGroup className="d-flex align-items-center justify-content-around mt-3">
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
            <div className="w-100 d-flex justify-content-end mt-3">
              <ButtonGroup>
                <Button
                  type="submit"
                  color="success"
                  className="rounded-0"
                >Filtrar</Button>
                <Button
                  type="button"
                  color="danger"
                  className="rounded-0"
                  onClick={() => resetForm()}
                >Limpar</Button>
              </ButtonGroup>
            </div>
          </FormStyled>
        );
      }}
    </Formik>
  );
}

export const initialValues: FormFilterTypes = {
  name: "",
  private: false,
  fork: false,
  archived: false,
  language: "",
  license: "",
  languageList: [],
  commit: []
};

export const validationSchema = Yup.object().shape({
  name: Yup.string().required("Campo vazio"),
  language: Yup.string().required("Campo vazio"),
});

const FormStyled = styled(Form)`
  max-width: 600px;
  margin-bottom: 20px;
`;
