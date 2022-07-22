import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { useEffect, useState } from 'react'
import { Repository } from './ListRepositories'

const columnHelper = createColumnHelper<Repository>()

const columns = [
  columnHelper.accessor('name', {
    cell: info => info.getValue(),
    header: () => "Nome"
  }),
  columnHelper.accessor('archived', {
    cell: info => info.getValue(),
    header: () => "Arquivado"
  }),
  columnHelper.accessor('private', {
    cell: info => info.getValue(),
    header: () => "Privado"
  }),
  columnHelper.accessor('fork', {
    cell: info => info.getValue(),
    header: () => "Fork"
  }),
  columnHelper.accessor('language', {
    cell: info => info.getValue(),
    header: () => "Linguagem"
  }),
  columnHelper.accessor('license', {
    cell: info => info.getValue(),
    header: () => "Licença"
  }),
]

interface ListRepositoriesProps {
  data: Repository[];
  github_username: string;
}

export function Tabela(props: ListRepositoriesProps) {
  const [dataRepositories, setDataRepositories] = useState<Repository[]>([]);

  useEffect(() => {
    setDataRepositories(props.data);
  }, [props.data]);

  const table = useReactTable({
    data: dataRepositories,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <div className="p-2">
      <table>
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
      </table>
    </div>
  )
}
