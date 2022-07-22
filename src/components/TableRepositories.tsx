import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel
} from '@tanstack/react-table'
import { useEffect, useState } from 'react'
import { ButtonGroup, Input, Table } from 'reactstrap'
import styled from 'styled-components'
import { Button } from './Button'
import { Repository } from './ListRepositories'
import { BiLastPage, BiFirstPage } from "react-icons/bi";
import { MdOutlineFirstPage, MdOutlineLastPage, MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";

const columnHelper = createColumnHelper<Repository>()

const columns = [
  columnHelper.accessor('name', {
    cell: info => info.getValue(),
    header: () => "Nome",
    footer: () => null,
  }),
  columnHelper.accessor('archived', {
    cell: info => (info.getValue()) ? "Sim" : "Não",
    header: () => "Arquivado",
    footer: () => null,
  }),
  columnHelper.accessor('private', {
    cell: info => (info.getValue()) ? "Sim" : "Não",
    header: () => "Privado",
    footer: () => null,
  }),
  columnHelper.accessor('fork', {
    cell: info => (info.getValue()) ? "Sim" : "Não",
    header: () => "Fork",
    footer: () => null,
  }),
  columnHelper.accessor('language', {
    cell: info => (info.getValue()) ? info.getValue() : "Não informado",
    header: () => "Linguagem",
    footer: () => null,
  }),
  columnHelper.accessor('license', {
    cell: info => (info.getValue()) ? info.getValue() : "Não informado",
    header: () => "Licença",
    footer: () => null,
  }),
]

interface ListRepositoriesProps {
  data: Repository[];
  github_username: string;
}

export function TableRepositories(props: ListRepositoriesProps) {
  const [dataRepositories, setDataRepositories] = useState<Repository[]>([]);

  useEffect(() => {
    setDataRepositories(props.data);
    console.log(props.data);
  }, [props.data]);

  const table = useReactTable({
    data: dataRepositories,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  })

  return (
    <TableContainer className="p-2 w-100">
      <Table bordered striped>
        <thead>
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <th key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map(row => (
            <tr key={row.id}>
              {row.getVisibleCells().map(cell => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
        <tfoot>
          {table.getFooterGroups().map(footerGroup => (
            <tr key={footerGroup.id}>
              {footerGroup.headers.map(header => (
                <th key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                      header.column.columnDef.footer,
                      header.getContext()
                    )}
                </th>
              ))}
            </tr>
          ))}
        </tfoot>
      </Table>
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
    </TableContainer>
  )
}

const TableContainer = styled(Table)`
  max-width: 1000px;
`;
