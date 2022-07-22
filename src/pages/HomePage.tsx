import { Center } from "../components/Center";
import { FormSearchGithubUsername, FormSearchGithubUrlTypes } from "../components/FormSearchGithubUser";
import { FormFilter, FormFilterTypes } from "../components/FormFilter";
import { ListRepositories, Repository } from "../components/ListRepositories";
import { useState } from "react";
import axios from "axios";
import { TableRepositories } from "../components/TableRepositories";

export function HomePage() {
  const [dataRepositories, setDataRepositories] = useState<Repository[]>([]);
  const [dataGithubUsername, setDataGithubUsername] = useState<string>("");

  function handleSubmitFormSearchGithubUrl(values: FormSearchGithubUrlTypes) {
    // axios.get("https://api.github.com/users/otaviohenrique1")
    // axios.get("https://api.github.com/users/otaviohenrique1/repos")
    axios.get(`https://api.github.com/users/${values.github_username}/repos?per_page=100`)
      .then((data) => {
        // console.log(data.data);
        setDataRepositories(data.data);
        setDataGithubUsername(values.github_username);
      })
      .catch((error) => console.error(error));
  }

  function handleSubmitFormFilter(values: FormFilterTypes) {
    let name = values.name;
    let archived = values.archived;
    let repository_private = values.private;
    let fork = values.fork;
    let language = values.language;
    let license = values.license ;
    // let resultado = dataRepositories.filter((item) => {});
    console.log(values); 
  }

  return (
    <Center>
      <h1 className="w-100 text-center mb-5 mt-3">Busca</h1>
      <FormSearchGithubUsername handleSubmitForm={handleSubmitFormSearchGithubUrl} />
      <FormFilter handleSubmitForm={handleSubmitFormFilter} />
      {/* <ListRepositories data={dataRepositories} github_username={dataGithubUsername} /> */}
      <TableRepositories data={dataRepositories} github_username={dataGithubUsername} />
    </Center>
  );
}
