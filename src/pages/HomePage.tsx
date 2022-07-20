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
                <Button type="submit">Buscar</Button>
                <Button type="button" onClick={() => resetForm()}>Limpar</Button>
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
