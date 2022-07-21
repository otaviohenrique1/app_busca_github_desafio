import styled from "styled-components";
import { useEffect, useState } from "react";
import { Table } from "reactstrap";

export interface Repository {
  id: string | number;
  name: string;
  archived: boolean;
}

interface ListRepositoriesProps {
  data: Repository[];
}

export function ListRepositories(props: ListRepositoriesProps) {
  const [dataRepositories, setDataRepositories] = useState<Repository[]>([]);

  useEffect(() => {
    setDataRepositories(props.data);
  }, [props.data])


  return (
    <>
      <h2 className="w-100 text-center mb-3">Resultado</h2>
      <TableStyled bordered striped>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Archived</th>
          </tr>
        </thead>
        <tbody>
          {(dataRepositories.length !== 0) ? (
            dataRepositories.map((item, index) => {
              const { id, name, archived } = item;
              return (
                <tr key={index}>
                  <td>{id}</td>
                  <td>{name}</td>
                  <td>{(archived).toString()}</td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan={3}>Lista vazia</td>
            </tr>
          )}
        </tbody>
      </TableStyled>
    </>
  );
}

const TableStyled = styled(Table)`
  width: 100%;
  max-width: 600px;
`;