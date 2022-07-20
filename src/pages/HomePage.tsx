import { Center } from "../components/Center";
import { FormSearchGithubUrl, FormSearchGithubUrlTypes } from "../components/FormSearchGithubUrl";
import { FormFilter, FormFilterTypes } from "../components/FormFilter";
import { ListRepositories } from "../components/ListRepositories";

export function HomePage() {


  function handleSubmitFormSearchGithubUrl(values: FormSearchGithubUrlTypes) {
    // 
  }

  function handleSubmitFormFilter(values: FormFilterTypes) {
    // 
  }

  return (
    <Center>
      <h1>Busca</h1>
      <FormSearchGithubUrl handleSubmitForm={handleSubmitFormSearchGithubUrl} />
      <FormFilter handleSubmitForm={handleSubmitFormFilter} />
      <ListRepositories data={[
        "qweqwe", "asdasd"
      ]} />
    </Center>
  );
}
