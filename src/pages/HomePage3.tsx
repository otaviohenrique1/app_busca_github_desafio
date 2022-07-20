import { FormEvent, useState } from "react";
import styled from "styled-components";

export function HomePage3() {
  const [termo, setTermo] = useState<string>("");
  const [busca, setBusca] = useState<string>("");

  function handleSubmitForm(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusca(termo);
  }

  function handleResetForm() {
    setTermo("");
    setBusca("");
  }

  return (
    <Center>
      <h1>Busca</h1>
      <h2>{busca}</h2>
      <Form onSubmit={handleSubmitForm}>
        <input type="text" name="termo" value={termo} onChange={text => setTermo(text.target.value)} />
        <div>
          <button type="submit">Buscar</button>
          <button type="button" onClick={handleResetForm}>Limpar</button>
        </div>
      </Form>
    </Center>
  );
}

const Form = styled.form`
  width: 100%;
  max-width: 250px;
  display: flex;
  align-items: center;
  flex-direction: column;
  
  & input {
    width: 100%;
  }
  
  & div {
    width: 100%;
    margin-top: 10px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
`;

const Center = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  height: 100%;
  width: 100%;
`;
