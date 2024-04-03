import dayjs from 'dayjs'
import "dayjs/locale/pt-br"
import relativeTime from "dayjs/plugin/relativeTime"
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, MoreHorizontal, Search } from "lucide-react"
import { ChangeEvent, useEffect, useState } from "react"
// import { attendees } from "../data/attendees"
import { ButtonIcon } from "./button-icon"
import { Table } from "./table/table"
import { TableCell } from "./table/table-cell"
import { TableHeader } from "./table/table-header"
import { TableRow } from "./table/table-row"

dayjs.extend(relativeTime)
dayjs.locale('pt-br')

interface Attendee {
  id: string
  public_id: string
  name: string
  email: string
  createdAt: string
  checkinAt: string | null
}

export const AttendeeList = () => {
  const [searchKeyword, setSearchKeyword ] = useState(() => {
    const url = new URL(window.location.toString())
    if (url.searchParams.has('query')) {
      return url.searchParams.get('query') ?? ''
    }
    return ''
  })
  const [page, setPage] = useState(() => {
    const url = new URL(window.location.toString())
    if (url.searchParams.has('page')) {
      return Number(url.searchParams.get('page'))
    }
    return 1
  })
  const [total, setTotal] = useState(0)
  const [attendees, setAttendees] = useState<Attendee[]>([])

  const eventId = "9e9bd979-9d10-4915-b339-3786b1634f33"
  const ITEMS_PER_PAGE = 10
  const pages = Math.ceil(total / ITEMS_PER_PAGE)
  
  useEffect(() => {
    const url = new URL(`http://localhost:3333/events/${eventId}/attendees`)
    url.searchParams.set('pageIndex', String(page - 1))
    url.searchParams.set('perPage', String(ITEMS_PER_PAGE))
    !!searchKeyword && url.searchParams.set('query', searchKeyword)

    fetch(url)
      .then(response => response.json())
      .then(data => {
        setAttendees(data.attendees)
        setTotal(data.total)
      })
  },[page, searchKeyword])

  const setCurrentPage = (page: number) => {
    const url = new URL(window.location.toString())
    url.searchParams.set('page', String(page))
    window.history.pushState({}, "", url)
    setPage(page)
  }

  const setCurrentSearch = (query: string) => {
    const url = new URL(window.location.toString())
    if (query) url.searchParams.set('query', query)
    else url.searchParams.delete('query')
    window.history.pushState({}, "", url)
    setSearchKeyword(query)
  }

  const handleSearchInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setCurrentSearch(event.target.value)
    setCurrentPage(1)
  }

  const handleFirstPage = () => {
    setCurrentPage(1)
  }

  const handlePreviousPage = () => {
    setCurrentPage(page - 1)
  }

  const handleNextPage = () => {
    setCurrentPage(page+1)
  }

  const handleLastPage = () => {
    setCurrentPage(pages)
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
            className="bg-transparent flex-1 outline-none border-0 h-auto p-0 text-sm focus-visible:ring-0" 
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
              <input className="size-4 bg-black/20 border rounded border-white/10 text-orange-400" type="checkbox" />
            </TableHeader>
            <TableHeader>Código</TableHeader>
            <TableHeader>Participante</TableHeader>
            <TableHeader>Data de inscrição</TableHeader>
            <TableHeader>Data do check-in</TableHeader>
            <TableHeader style={{ width: 64 }}></TableHeader>
          </TableRow>
        </thead>
        <tbody>
        {attendees.map((attendee)=> {
          return (
            <TableRow key={attendee.id}>
              <TableCell>
                <input className="size-4 bg-black/20 border rounded border-white/10 text-orange-400" type="checkbox" />
              </TableCell>
              <TableCell>{attendee.public_id}</TableCell>
              <TableCell>
                <div className="flex flex-col gap-1">
                  <span className="font-semibold text-white">{attendee.name}</span>
                  <span>{attendee.email}</span>
                </div>
              </TableCell>
              <TableCell>{dayjs().to(attendee.createdAt)}</TableCell>
              <TableCell>
                {
                  attendee.checkinAt === null 
                    ? (<span className='text-zinc-400'>Não fez check-in</span>) 
                    : dayjs().to(attendee.checkinAt)
                }
              </TableCell>
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
              Mostrando {attendees.length} de {total}
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