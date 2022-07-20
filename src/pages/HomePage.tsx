import { Formik, Form, FormikProps } from "formik";
import * as Yup from "yup";
import styled from "styled-components";
import { Center } from "../components/Center";
import { Input, InputContainer, InputErrorMessage } from "../components/Input";
import { Button, ButtonGroup } from "../components/Button";

export function HomePage() {
  function handleSubmitForm(values: FormTypes) {
    // 
  }

  function handleResetForm() {}

  return (
    <Center>
      <h1>Busca</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmitForm}
      >
        {(formikProps: FormikProps<FormTypes>) => {
          const { values, resetForm } = formikProps;
          return (
            <FormStyled>
              <InputContainer>
                <Input type="text" value={values.termo} name="termo" />
                <InputErrorMessage name="termo" />
              </InputContainer>
              <ButtonGroup>
                <ButtonBuscar type="submit">Buscar</ButtonBuscar>
                <ButtonLimpar type="button" onClick={() => resetForm()}>Limpar</ButtonLimpar>
                <Button type="button">Buscar</Button>
              </ButtonGroup>
            </FormStyled>
          );
        }}
      </Formik>
    </Center>
  );
}

interface FormTypes {
  termo: string;
}

const initialValues: FormTypes = {
  termo: "",
};

const validationSchema = Yup.object().shape({
  termo: Yup.string().required("Campo vazio")
});

const FormStyled = styled(Form)`
  width: 100%;
  max-width: 400px;
`;

const ButtonBuscar = styled(Button)`
  background-color: #5f9ea0;
  border-width: 1px;
  border-style: outset;
  border-color: #1d2e30;

  &:hover {
    background-color: #436e70;
  }

  &:active {
    background-color: #263e40;
  }
`;

const ButtonLimpar = styled(Button)`
  background-color: #dc143c;
  border-width: 1px;
  border-style: outset;
  border-color: #2f040d;

  &:hover {
    background-color: #a40e2f;
  }

  &:active {
    background-color: #5e081b;
  }
`;
