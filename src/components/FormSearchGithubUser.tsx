import { Formik, Form, FormikProps } from "formik";
import * as Yup from "yup";
import styled from "styled-components";
import { Input, InputContainer, InputErrorMessage } from "./Input";
import { Button, ButtonGroup } from "./Button";

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
            <InputSearchContainer>
              <Input
                type="text"
                value={values.github_url}
                name="github_url"
                placeholder="Github url"
              />
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
            </InputSearchContainer>
            <InputErrorMessage name="github_url" />
          </InputContainer>
        </FormStyled>
      )}
    </Formik>
  );
}

const InputSearchContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

export interface FormSearchGithubUrlTypes {
  github_url: string;
}

export const initialValues: FormSearchGithubUrlTypes = {
  github_url: "",
};

export const validationSchema = Yup.object().shape({
  github_url: Yup.string().required("Campo vazio"),
});

const FormStyled = styled(Form)`
  width: 100%;
  max-width: 400px;
  margin-bottom: 20px;
`;
