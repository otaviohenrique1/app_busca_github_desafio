import {
  Column,
  Table,
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
  SortingState,
  getSortedRowModel,
  getFilteredRowModel,
} from '@tanstack/react-table'
import { useEffect, useState } from 'react'
import { ButtonGroup, Input, Table as ReactstrapTable } from 'reactstrap'
import styled from 'styled-components'
import { Button } from './Button'
import { MdOutlineFirstPage, MdOutlineLastPage, MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { BsArrowUp, BsArrowDown, BsArrowDownUp } from "react-icons/bs";
import { Commit, Repository } from '../utils/types'
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { app_typescript_teste_language_list } from '../utils/lista'

interface RepositoryTableProps {
  data: Repository[];
  github_username: string;
}

export function RepositoryTable(props: RepositoryTableProps) {
  const [dataRepositories, setDataRepositories] = useState<Repository[]>([]);
  const [sorting, setSorting] = useState<SortingState>([]);
  const MySwal = withReactContent(Swal)

  useEffect(() => {
    setDataRepositories(props.data);
  }, [props.data]);

  const columnHelper = createColumnHelper<Repository>()

  const columns = [
    columnHelper.accessor('name', {
      cell: info => info.getValue(),
      header: () => "Nome",
    }),
    columnHelper.accessor('archived', {
      cell: info => info.getValue(),
      header: () => "Arquivado",
    }),
    columnHelper.accessor('private', {
      cell: info => info.getValue(),
      header: () => "Privado",
    }),
    columnHelper.accessor('fork', {
      cell: info => info.getValue(),
      header: () => "Fork",
    }),
    columnHelper.accessor('language', {
      cell: info => info.getValue(),
      header: () => "Linguagem",
    }),
    columnHelper.accessor('license', {
      cell: info => info.getValue(),
      header: () => "Licença",
    }),
  ]

  const table = useReactTable({
    data: dataRepositories,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    state: { sorting, },
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  })

  const [dataCommit, setDataCommit] = useState<Commit[]>([]);
  const [openDataCommit, setOpenDataCommit] = useState<boolean>(false);

  return (
    <TableContainer className="p-2 w-100">
      <ReactstrapTable bordered striped>
        <thead>
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <th key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : (
                      <>
                        <div
                          {...{
                            className: header.column.getCanSort()
                              ? 'cursor-pointer select-none'
                              : '',
                            onClick: header.column.getToggleSortingHandler(),
                          }}
                        >
                          {flexRender(header.column.columnDef.header, header.getContext())}
                          <span className="ms-2">
                            {{
                              asc: <BsArrowUp color="#000000" size={20} />,
                              desc: <BsArrowDown color="#000000" size={20} />,
                            }[header.column.getIsSorted() as string] ?? <BsArrowDownUp color="#000000" size={20} />}
                          </span>
                        </div>
                        {header.column.getCanFilter() ? (
                          <div>
                            <Filter column={header.column} table={table} />
                          </div>
                        ) : null}
                      </>
                    )
                  }
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {(table.getRowModel().rows.length !== 0)
            ? table.getRowModel().rows.map(row => (
              <tr key={row.id} onClick={() => {
                // MySwal.fire({
                //   html: <div>
                //     <p>{row.original.name || "Não informado"}</p>
                //     <p>{row.original.language || "Não informado"}</p>
                //     <p>{Object.keys(app_typescript_teste_language_list).toString()}</p>
                //     <p>{row.original.license || "Não informado"}</p>
                //     <p>{row.original.archived.toString()}</p>
                //     <p>{row.original.private.toString()}</p>
                //     <p>{row.original.fork.toString()}</p>
                //     <ReactstrapTable>
                //       <thead>
                //         <tr>
                //           <th colSpan={4} className="text-center">Commits</th>
                //         </tr>
                //         <tr>
                //           <th>sha</th>
                //           <th>author</th>
                //           <th>message</th>
                //           <th>date</th>
                //         </tr>
                //       </thead>
                //       <tbody>
                //         {row.original.commit?.map((item) => {
                //           return (
                //             <tr key={item.sha}>
                //               <td>{item.author}</td>
                //               <td>{item.message}</td>
                //               <td>{item.date}</td>
                //             </tr>
                //           );
                //         })}
                //       </tbody>
                //     </ReactstrapTable>
                //     <p>{row.original.commit?.toString()}</p>
                //   </div>,
                // })
                setDataCommit(row.original.commit);
                console.log(row.original.commit?.toString());
              }}>
                {row.getVisibleCells().map(cell => (
                  <td key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))
            : (
              <tr>
                <th colSpan={10} className="text-center">Lista vazia</th>
              </tr>
            )}
        </tbody>
      </ReactstrapTable>
      <div className="d-flex align-items-center justify-content-between flex-row w-100 pb-4">
        <ButtonGroup>
          <Button
            className="pt-2 pb-2 ps-3 pe-3 fw-bolder d-flex justify-content-center align-items-center"
            color="info"
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
          >
            <MdOutlineFirstPage size={25} color="#000000" />
          </Button>
          <Button
            className="pt-2 pb-2 ps-3 pe-3 fw-bolder d-flex justify-content-center align-items-center"
            color="info"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <MdKeyboardArrowLeft size={25} color="#000000" />
          </Button>
          <Button
            className="pt-2 pb-2 ps-3 pe-3 fw-bolder d-flex justify-content-center align-items-center"
            color="info"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <MdKeyboardArrowRight size={25} color="#000000" />
          </Button>
          <Button
            className="pt-2 pb-2 ps-3 pe-3 fw-bolder d-flex justify-content-center align-items-center"
            color="info"
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
          >
            <MdOutlineLastPage size={25} color="#000000" />
          </Button>
        </ButtonGroup>
        <div className="d-flex align-items-center flex-row">
          <span className="pe-1">Pagina</span>
          <strong>
            <span>{table.getState().pagination.pageIndex + 1}</span>
            <span className="ps-1 pe-1">de</span>
            <span>{table.getPageCount()}</span>
          </strong>
        </div>
        <div className="d-flex align-items-center justify-content-between flex-row">
          <span className="w-25 me-1">Ir para:</span>
          <Input
            className="w-75"
            type="number"
            defaultValue={table.getState().pagination.pageIndex + 1}
            onChange={e => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0
              table.setPageIndex(page)
            }}
          />
        </div>
        <select
          value={table.getState().pagination.pageSize}
          onChange={e => { table.setPageSize(Number(e.target.value)) }}
          className="form-select w-25"
        >
          {[10, 20, 30, 40, 50].map(pageSize => (
            <option key={pageSize} value={pageSize}>
              Exibir {pageSize}
            </option>
          ))}
        </select>
      </div>
      <ReactstrapTable>
        <thead>
          <tr>
            <th colSpan={4} className="text-center">Commits</th>
          </tr>
          <tr>
            <th>sha</th>
            <th>author</th>
            <th>message</th>
            <th>date</th>
          </tr>
        </thead>
        <tbody>
          {dataCommit.map((item) => {
            return (
              <tr key={item.sha}>
                <td>{item.author}</td>
                <td>{item.message}</td>
                <td>{item.date}</td>
              </tr>
            );
          })}
        </tbody>
      </ReactstrapTable>
    </TableContainer>
  )
}

const TableContainer = styled(ReactstrapTable)`
  max-width: 1000px;
`;

function Filter({
  column,
  table,
}: {
  column: Column<any, any>
  table: Table<any>
}) {
  const firstValue = table
    .getPreFilteredRowModel()
    .flatRows[0]?.getValue(column.id)

  const columnFilterValue = column.getFilterValue()

  return typeof firstValue === 'number' ? (
    <div className="flex space-x-2">
      <input
        type="number"
        value={(columnFilterValue as [number, number])?.[0] ?? ''}
        onChange={e =>
          column.setFilterValue((old: [number, number]) => [
            e.target.value,
            old?.[1],
          ])
        }
        placeholder={`Min`}
        className="w-24 border shadow rounded"
      />
      <input
        type="number"
        value={(columnFilterValue as [number, number])?.[1] ?? ''}
        onChange={e =>
          column.setFilterValue((old: [number, number]) => [
            old?.[0],
            e.target.value,
          ])
        }
        placeholder={`Max`}
        className="w-24 border shadow rounded"
      />
    </div>
  ) : (
    <input
      type="text"
      value={(columnFilterValue ?? '') as string}
      onChange={e => column.setFilterValue(e.target.value)}
      placeholder={`Search...`}
      className="w-36 border shadow rounded"
    />
  )
}
