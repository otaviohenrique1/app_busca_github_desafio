import styled from "styled-components";
import { useEffect, useState } from "react";

interface ListRepositoriesProps {
  data: any[];
}

export function ListRepositories(props: ListRepositoriesProps) {
  const [dataRepositories, setDataRepositories] = useState<any[]>([]);

  useEffect(() => {
    setDataRepositories(props.data);
  }, [props.data])


  return (
    <List>
      {dataRepositories.map((item, index) => {
        return (
          <ListItem key={index}>{item}</ListItem>
        );
      })}
    </List>
  );
}


const List = styled.ul`
  margin-block-start: 0 !important;
  margin-block-end: 0 !important;
  padding-inline-start: 0 !important;
`;

const ListItem = styled.li`
  list-style: none;
`;