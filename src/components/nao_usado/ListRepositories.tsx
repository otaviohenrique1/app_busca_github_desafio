import styled from "styled-components";
import { useEffect, useState } from "react";
import { Table } from "reactstrap";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { Repository } from "../../utils/types";
// import axios from "axios";

interface ListRepositoriesProps {
  data: Repository[];
  github_username: string;
}

export function ListRepositories(props: ListRepositoriesProps) {
  const MySwal = withReactContent(Swal);
  const [dataRepositories, setDataRepositories] = useState<Repository[]>([]);
  const [dataCommits, setDataCommits] = useState<any[]>([]);

  useEffect(() => {
    setDataRepositories(props.data);
  }, [props.data]);

  return (
    <div className="w-100 mb-5 d-flex align-items-center flex-column">
      <h2 className="w-100 text-center mb-3">Resultado</h2>
      <TableStyled bordered striped>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Arquivado</th>
            <th>Privado</th>
            <th>Fork</th>
            <th>Linguagem(s)</th>
            <th>Licença</th>
          </tr>
        </thead>
        <tbody>
          {(dataRepositories.length !== 0) ? (
            dataRepositories.map((item, index) => {
              const { id, name, archived, private: repository_private, fork, language, license } = item;

              return (
                <tr key={`${index}-${id}`} onClick={() => {
                  // axios.get(`https://api.github.com/users/${props.github_username}/${name}/commits`)
                  //   .then((data) => {
                  //     // setDataCommits(data.data);
                  //     console.log(data.data);
                  //   })
                  //   .catch((error) => console.error(error));

                  return MySwal.fire({
                    title: <strong>{name}</strong>,
                    html: <div>
                      {/* {dataCommits} */}
                      dataCommits
                    </div>
                  });
                }}>
                  <td>{name}</td>
                  <td>{(archived).toString()}</td>
                  <td>{(repository_private).toString()}</td>
                  <td>{(fork).toString()}</td>
                  <td>{(language) ? language : "Não informado"}</td>
                  <td>{(license) ? license : "Não informado"}</td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan={6} className="text-center">Lista vazia</td>
            </tr>
          )}
        </tbody>
      </TableStyled>
    </div>
  );
}

const TableStyled = styled(Table)`
  width: 100%;
  max-width: 800px;
`;
