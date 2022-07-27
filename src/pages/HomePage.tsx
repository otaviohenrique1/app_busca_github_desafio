import { Center } from "../components/Center";
import { FormSearchGithubUsername, FormSearchGithubUrlTypes } from "../components/FormSearchGithubUser";
// import { FormFilter } from "../components/nao_usado/FormFilter";
import { useState } from "react";
// import axios from "axios";
// import { TableRepositories } from "../components/nao_usado/TableRepositories";
import { app_typescript_teste_commit_list, app_typescript_teste_language_list, lista_repositorios } from "../utils/lista";
import { Repository } from "../utils/types";
import { RepositoryTable } from "../components/RepositoryTable";

export function HomePage() {
  const [dataRepositories, setDataRepositories] = useState<Repository[]>([]);
  const [dataGithubUsername, setDataGithubUsername] = useState<string>("");

  function handleSubmitFormSearchGithubUrl(values: FormSearchGithubUrlTypes) {
    setDataGithubUsername(values.github_username);
    // axios.get("https://api.github.com/users/otaviohenrique1")
    // axios.get("https://api.github.com/users/otaviohenrique1/repos")
    // axios.get(`https://api.github.com/users/${values.github_username}/repos?per_page=100`)
    //   .then((data) => {
    // console.log(JSON.stringify(data.data));
    // console.log("languages_url => ", data.data[75].languages_url);
    // languages_url =>  https://api.github.com/repos/otaviohenrique1/lista-veiculos-ts/languages
    // let result = [...data.data].map((item) => {
    //   let resultLanguageList: any[] = [];
    //   let resultCommitsList: any[] = [];
    //   axios.get(item.languages_url)
    //     .then((data) => { resultLanguageList = data.data; })
    //     .catch((error) => console.error(error));
    //   axios.get(item.commits_url)
    //     .then((data) => { resultCommitsList = data.data; })
    //     .catch((error) => console.error(error));
    //   // console.log(values.github_username);
    //   console.log(resultCommitsList);
    //   console.log("item.commits_url => ", item.commits_url);
    //   console.log("item.languages_url => ", item.languages_url);
    //   return {
    //     id: item.id,
    //     name: item.name,
    //     language: item.language,
    //     languageList: resultLanguageList,
    //     // languageList: [],
    //     license: item.license,
    //     archived: item.archived,
    //     private: item.private,
    //     fork: item.fork,
    //   }
    // })
    // console.log(data.data);

    // setDataRepositories(result);
    // setDataRepositories(data.data);
    // })
    // .catch((error) => console.error(error));
    // axios.get(`https://api.github.com/repos/${values.github_username}/lista-veiculos-ts/languages`)
    // setDataRepositories([
    //   {
    //     id: "512965015",
    //     name: "app_typescript_teste",
    //     language: "TypeScript",
    //     languageList: ["TypeScript"],
    //     license: "",
    //     archived: false,
    //     private: false,
    //     fork: false,
    //   }
    // ]);
    let resultado = lista_repositorios.map((item) => {
      let languageList = Object.keys(app_typescript_teste_language_list);
      
      console.log(commits);
      
      return {
        id: item.id,
        name: item.name,
        language: (item.language) ? item.language : "Não informado",
        languageList,
        // languageList: item.languageList,
        license: (item.license) ? item.license : "Não informado",
        archived: (item.archived) ? "Sim" : "Não",
        private: (item.private) ? "Sim" : "Não",
        fork: (item.fork) ? "Sim" : "Não",
        commits: app_typescript_teste_commit_list,
        // commits: item.commit,
      };
    });
    setDataRepositories(resultado);
    // setDataRepositories(lista_repositorios);
  }

  return (
    <Center>
      <h1 className="w-100 text-center mb-5 mt-3">Busca</h1>
      <FormSearchGithubUsername handleSubmitForm={handleSubmitFormSearchGithubUrl} />
      <RepositoryTable data={dataRepositories} github_username={dataGithubUsername} />
    </Center>
  );
}
