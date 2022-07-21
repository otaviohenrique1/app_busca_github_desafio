import { Formik, Form, FormikProps } from "formik";
import * as Yup from "yup";
import styled from "styled-components";
import { Input, InputContainer, InputErrorMessage } from "./Input";
import { Button } from "./Button";
import { ButtonGroup, InputGroup } from "reactstrap";

interface FormSearchGithubUsernameProps {
  handleSubmitForm(values: FormSearchGithubUrlTypes): void;
}

export function FormSearchGithubUsername(props: FormSearchGithubUsernameProps) {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={props.handleSubmitForm}
    >
      {({ values, resetForm }: FormikProps<FormSearchGithubUrlTypes>) => (
        <FormStyled>
          <InputContainer>
            <InputGroup>
              <Input
                type="text"
                value={values.github_username}
                name="github_username"
                placeholder="Github url"
              />
              <ButtonGroup>
                <Button
                  type="submit"
                  color="primary"
                  className="rounded-0"
                  >Buscar</Button>
                <Button
                  type="button"
                  color="danger"
                  onClick={() => resetForm()}
                  className="rounded-0"
                  >Limpar</Button>
              </ButtonGroup>
            </InputGroup>
            <InputErrorMessage name="github_username" />
          </InputContainer>
        </FormStyled>
      )}
    </Formik>
  );
}

export interface FormSearchGithubUrlTypes {
  github_username: string;
}

export const initialValues: FormSearchGithubUrlTypes = {
  github_username: "",
};

export const validationSchema = Yup.object().shape({
  github_username: Yup.string().required("Campo vazio"),
});

const FormStyled = styled(Form)`
  width: 100%;
  max-width: 600px;
  margin-bottom: 20px;
`;
