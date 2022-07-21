import { Center } from "../components/Center";
import { FormSearchGithubUsername, FormSearchGithubUrlTypes } from "../components/FormSearchGithubUser";
import { FormFilter, FormFilterTypes } from "../components/FormFilter";
import { ListRepositories, Repository } from "../components/ListRepositories";
import { useState } from "react";
import axios from "axios";

export function HomePage() {
  const [dataRepositories, setDataRepositories] = useState<Repository[]>([]);

  function handleSubmitFormSearchGithubUrl(values: FormSearchGithubUrlTypes) {
    // axios.get("https://api.github.com/users/otaviohenrique1")
    //   .then((data) => {
    //     console.log(data.data);
    //   })
    //   .catch((error) => console.error(error));

    axios.get("https://api.github.com/users/otaviohenrique1/repos")
      .then((data) => {
        // console.log(data.data);
        setDataRepositories(data.data);
      })
      .catch((error) => console.error(error));
  }

  function handleSubmitFormFilter(values: FormFilterTypes) {
    // 
  }

  return (
    <Center>
      <h1>Busca</h1>
      <FormSearchGithubUsername handleSubmitForm={handleSubmitFormSearchGithubUrl} />
      <FormFilter handleSubmitForm={handleSubmitFormFilter} />
      <ListRepositories data={dataRepositories} />
    </Center>
  );
}
