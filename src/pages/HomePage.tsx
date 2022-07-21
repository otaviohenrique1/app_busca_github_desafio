import { Center } from "../components/Center";
import { FormSearchGithubUsername, FormSearchGithubUrlTypes } from "../components/FormSearchGithubUser";
import { FormFilter, FormFilterTypes } from "../components/FormFilter";
import { ListRepositories } from "../components/ListRepositories";
import { useState } from "react";
import axios from "axios";

export function HomePage() {
  const [data, setData] = useState<any>('');

  function handleSubmitFormSearchGithubUrl(values: FormSearchGithubUrlTypes) {
    // axios.get("https://api.github.com/users/otaviohenrique1")
    axios.get("https://api.github.com/users/otaviohenrique1/repos")
      .then((data) => {
        console.log(data.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function handleSubmitFormFilter(values: FormFilterTypes) {
    // 
  }

  return (
    <Center>
      <h1>Busca</h1>
      <FormSearchGithubUsername handleSubmitForm={handleSubmitFormSearchGithubUrl} />
      <FormFilter handleSubmitForm={handleSubmitFormFilter} />
      <ListRepositories data={[
        "qweqwe", "asdasd"
      ]} />
    </Center>
  );
}
