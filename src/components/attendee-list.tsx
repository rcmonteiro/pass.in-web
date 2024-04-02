import dayjs from 'dayjs'
import "dayjs/locale/pt-br"
import relativeTime from "dayjs/plugin/relativeTime"
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, MoreHorizontal, Search } from "lucide-react"
import { ChangeEvent, useState } from "react"
import { attendees } from "../data/attendees"
import { ButtonIcon } from "./button-icon"
import { Table } from "./table/table"
import { TableCell } from "./table/table-cell"
import { TableHeader } from "./table/table-header"
import { TableRow } from "./table/table-row"

dayjs.extend(relativeTime)
dayjs.locale('pt-br')

export const AttendeeList = () => {
  const [searchKeyword, setSearchKeyword ] = useState('')
  const [page, setPage] = useState(1)

  // const {} = useSearch

  const ITEMS_PER_PAGE = 10
  const pages = Math.ceil(attendees.length / ITEMS_PER_PAGE)

  const handleSearchInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchKeyword(event.target.value)
  }

  const handleFirstPage = () => {
    setPage(1)
  }

  const handlePreviousPage = () => {
    setPage(page - 1)
  }

  const handleNextPage = () => {
    setPage(page + 1)
  }

  const handleLastPage = () => {
    setPage(pages)
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-3 items-center">
        <h1 className={`text-xl font-bold`}>
          Participantes
        </h1>
        <div className="px-3 py-1.5 w-72 border border-white/10 rounded-lg text-sm flex items-center gap-3">
          <Search className="size-4 text-emerald-300" />
          <input 
            className="bg-transparent flex-1 outline-none border-0 h-auto p-0 text-sm" 
            placeholder="Buscar participantes" 
            onChange={handleSearchInputChange}
            value={searchKeyword}
          />
        </div>
      </div>

      <Table>
        <thead>
          <TableRow>
            <TableHeader style={{ width: 48 }}>
              <input className="size-4 bg-black/20 border rounded border-white/10 acc" type="checkbox" />
            </TableHeader>
            <TableHeader>Código</TableHeader>
            <TableHeader>Participante</TableHeader>
            <TableHeader>Data de inscrição</TableHeader>
            <TableHeader>Data do check-in</TableHeader>
            <TableHeader style={{ width: 64 }}></TableHeader>
          </TableRow>
        </thead>
        <tbody>
        {attendees.slice((page-1)*ITEMS_PER_PAGE, page*ITEMS_PER_PAGE).map((attendee)=> {
          return (
            <TableRow key={attendee.id}>
              <TableCell>
                <input className="size-4 bg-black/20 border rounded border-white/10 text-emerald-400" type="checkbox" />
              </TableCell>
              <TableCell>{attendee.id}</TableCell>
              <TableCell>
                <div className="flex flex-col gap-1">
                  <span className="font-semibold text-white">{attendee.name}</span>
                  <span>{attendee.email}</span>
                </div>
              </TableCell>
              <TableCell>{dayjs().to(attendee.createdAt)}</TableCell>
              <TableCell>{dayjs().to(attendee.checkedInAt)}</TableCell>
              <TableCell>
                <ButtonIcon variant="dark" icon={MoreHorizontal} />
              </TableCell>
            </TableRow>
          )
        }
        )}
        </tbody>
        <tfoot>
          <TableRow>
            <TableCell colSpan={3}>
              Mostrando {ITEMS_PER_PAGE} de {attendees.length}
            </TableCell>
            <TableCell className="text-right" colSpan={3}>
              <div className="inline-flex gap-8 items-center">
                <span>Página {page} de {pages}</span>
                <div className="flex gap-1.5">
                  <ButtonIcon disabled={page===1} onClick={handleFirstPage} icon={ChevronsLeft} />
                  <ButtonIcon disabled={page===1} onClick={handlePreviousPage} icon={ChevronLeft} />
                  <ButtonIcon disabled={page===pages} onClick={handleNextPage} icon={ChevronRight} />
                  <ButtonIcon disabled={page===pages} onClick={handleLastPage} icon={ChevronsRight} />
                </div>
              </div>
            </TableCell>
          </TableRow>
        </tfoot>
      </Table>
    </div>

  )
}