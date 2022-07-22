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
        // console.log("languages_url => ", data.data[75].languages_url);
        // languages_url =>  https://api.github.com/repos/otaviohenrique1/lista-veiculos-ts/languages
        // let result = [...data.data].map((item) => {
        //   let resultLanguageList: any[] = [];
        //   // axios.get(`https://api.github.com/repos/${values.github_username}/${item.name}/languages`)
        //   //   .then((data) => {
        //   //     resultLanguageList = data.data;
        //   //   })
        //   //   .catch((error) => console.error(error));
        //   console.log(values.github_username);
        //   console.log(item.name);

        //   return {
        //     id: item.id,
        //     name: item.name,
        //     language: item.language,
        //     // languageList: resultLanguageList,
        //     // languageList: [],
        //     license: item.license,
        //     archived: item.archived,
        //     private: item.private,
        //     fork: item.fork,
        //   }
        // })
        // console.log(data.data);

        setDataRepositories(data.data);
        setDataGithubUsername(values.github_username);
      })
      .catch((error) => console.error(error));
    // axios.get(`https://api.github.com/repos/${values.github_username}/lista-veiculos-ts/languages`)
  }

  function handleSubmitFormFilter(values: FormFilterTypes) {
    let name = values.name;
    let archived = values.archived;
    let repository_private = values.private;
    let fork = values.fork;
    let language = values.language;
    let license = values.license;
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
