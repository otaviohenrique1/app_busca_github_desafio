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
    // axios.get("https://api.github.com/users/otaviohenrique1/repos")
    axios.get(`https://api.github.com/users/${values.github_username}/repos?per_page=100`)
      .then((data) => {
        console.log(data.data);
        setDataRepositories(data.data);
      })
      .catch((error) => console.error(error));
  }

  function handleSubmitFormFilter(values: FormFilterTypes) {
    // 
  }

  return (
    <Center>
      <h1 className="w-100 text-center mb-5 mt-3">Busca</h1>
      <FormSearchGithubUsername handleSubmitForm={handleSubmitFormSearchGithubUrl} />
      <FormFilter handleSubmitForm={handleSubmitFormFilter} />
      <ListRepositories data={dataRepositories} />
    </Center>
  );
}
