import {
  useReactTable,
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  SortingState,
  getSortedRowModel,
  ColumnFiltersState,
  SortingFn,
  sortingFns,
  FilterFn,
  // getFilteredRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFacetedMinMaxValues,
  ColumnDef,
} from '@tanstack/react-table'
import { InputHTMLAttributes, useEffect, useMemo, useState } from 'react'
import { ButtonGroup, Input, Table } from 'reactstrap'
import styled from 'styled-components'
import { Button } from './Button'
import { Repository } from './ListRepositories'
import { MdOutlineFirstPage, MdOutlineLastPage, MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { BsArrowUp, BsArrowDown, BsArrowDownUp } from "react-icons/bs";
import { Center } from './Center'
import { RankingInfo, rankItem, compareItems } from '@tanstack/match-sorter-utils'
// import { matchSorter } from 'match-sorter'

interface ListRepositoriesProps {
  data: Repository[];
  github_username: string;
}

declare module '@tanstack/table-core' {
  interface FilterMeta {
    itemRank: RankingInfo
  }
}

const fuzzyFilter: FilterFn<any> = (row, columnId, value, addMeta) => {
  const itemRank = rankItem(row.getValue(columnId), value);
  addMeta({ itemRank });
  return itemRank.passed
}

const fuzzySort: SortingFn<any> = (rowA, rowB, columnId) => {
  let dir = 0

  // Only sort by rank if the column has ranking information
  if (rowA.columnFiltersMeta[columnId]) {
    dir = compareItems(
      rowA.columnFiltersMeta[columnId]?.itemRank!,
      rowB.columnFiltersMeta[columnId]?.itemRank!
    )
  }

  // Provide an alphanumeric fallback for when the item ranks are equal
  return dir === 0 ? sortingFns.alphanumeric(rowA, rowB, columnId) : dir
}

// function fuzzyTextFilterFn(rows: any, id: any, filterValue: any) {
//   return matchSorter(rows, filterValue, { keys: [row => row.values[id]] });
// }

export function TableRepositories(props: ListRepositoriesProps) {
  const [dataRepositories, setDataRepositories] = useState<Repository[]>([]);
  const [sorting, setSorting] = useState<SortingState>([]);

  useEffect(() => {
    setDataRepositories(props.data);
    // console.log(props.data);
  }, [props.data]);

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

  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [globalFilter, setGlobalFilter] = useState('')

  const table = useReactTable({
    data: dataRepositories,
    // columns,
    columns: useMemo<ColumnDef<Repository>[]>(
      () => [
        {
          accessorFn: row => row.name,
          id: 'name',
          header: 'Nome',
          cell: info => info.getValue(),
          footer: () => null,
          // footer: props => props.column.id,
          filterFn: fuzzyFilter,
          sortingFn: fuzzySort,
        },
        {
          accessorFn: row => row.archived,
          id: 'archived',
          cell: info => (info.getValue()) ? "Sim" : "Não",
          header: "Arquivado",
          footer: () => null,
          // footer: props => props.column.id,
          filterFn: fuzzyFilter, // Mudar
        },
        {
          accessorFn: row => row.private,
          id: 'private',
          cell: info => (info.getValue()) ? "Sim" : "Não",
          header: "Privado",
          footer: () => null,
          // footer: props => props.column.id,
          filterFn: fuzzyFilter, // Mudar
        },
        {
          accessorFn: row => row.fork,
          id: 'fork',
          cell: info => (info.getValue()) ? "Sim" : "Não",
          header: "Fork",
          footer: () => null,
          // footer: props => props.column.id,
          filterFn: fuzzyFilter, // Mudar
        },
        {
          accessorFn: row => row.language,
          id: 'language',
          cell: info => (info.getValue()) ? info.getValue() : "Não informado",
          header: "Linguagem",
          footer: () => null,
          // footer: props => props.column.id,
          filterFn: fuzzyFilter,
        },
        {
          accessorFn: row => row.license,
          id: 'license',
          cell: info => (info.getValue()) ? info.getValue() : "Não informado",
          header: "Licença",
          footer: () => null,
          // footer: props => props.column.id,
          filterFn: fuzzyFilter,
        },
      ],
      []
    ),
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    state: {
      sorting,
      columnFilters,
      globalFilter
    },
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    globalFilterFn: fuzzyFilter,
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getFacetedMinMaxValues: getFacetedMinMaxValues(),
    onGlobalFilterChange: setGlobalFilter,
    onColumnFiltersChange: setColumnFilters,
  })

  return (
    <TableContainer className="p-2 w-100">
      <Center className="mb-5">
        <h2 className="w-100 text-center mb-3">Filtros</h2>
        <TableFilterForm className="border-bottom pb-4">
          <DebouncedInput
            value={globalFilter ?? ''}
            onChange={value => setGlobalFilter(String(value))}
            type="text"
            className="w-100 rounded-0
            mb-2"
            placeholder="Nome do repósitorio"
          />
          <Input type="text" className="w-100 rounded-0 mb-2" placeholder="Linguagem" />
          <Input type="text" className="w-100 rounded-0" placeholder="Licença" />
          <div>
            {/*  */}
          </div>
        </TableFilterForm>
      </Center>
      <Table bordered striped>
        <thead>
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <th key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : (
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
                        <DebouncedInput
                          type="text"
                          value={(header.column.getFilterValue() ?? '') as string}
                          onChange={value => header.column.setFilterValue(value)}
                          placeholder={`Search... (${header.column.getFacetedUniqueValues().size})`}
                          className="w-36 border shadow rounded"
                        />
                      </div>
                    )
                  }
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

type DebouncedInputProps = {
  value: string | number
  onChange: (value: string | number) => void
  debounce?: number
} & Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'>

function DebouncedInput(props: DebouncedInputProps) {
  const { value: initialValue, onChange, debounce = 500 } = props;

  const [value, setValue] = useState(initialValue)

  useEffect(() => {
    setValue(initialValue)
  }, [initialValue])

  useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(value)
    }, debounce)

    return () => clearTimeout(timeout)
  }, [debounce, onChange, value])

  return (
    <input {...props} value={value} onChange={e => setValue(e.target.value)} />
  )
}

/*
function DebouncedInput({
  value: initialValue,
  onChange,
  debounce = 500,
  ...props
}: {
  value: string | number
  onChange: (value: string | number) => void
  debounce?: number
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'>) {
  const [value, setValue] = React.useState(initialValue)

  React.useEffect(() => {
    setValue(initialValue)
  }, [initialValue])

  React.useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(value)
    }, debounce)

    return () => clearTimeout(timeout)
  }, [value])

  return (
    <input {...props} value={value} onChange={e => setValue(e.target.value)} />
  )
}
*/

const TableFilterForm = styled.div`
  width: 100%;
  max-width: 600px;
`;
