import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, MoreHorizontal, Search } from 'lucide-react'
import { ChangeEvent, useState } from 'react'
import { attendees } from '../data/attendees'
import { IconButton } from './icon-button'
import { Table } from './table/table'
import { TableCell } from './table/table-cell'
import { TableHeader } from './table/table-header'
import { TableRow } from './table/table-row'

dayjs.extend(relativeTime)

export function AttendeeList (){
    const [search, setSearch] = useState('')
    const [page, setPage] = useState(1)

    const totalPages = Math.ceil(attendees.length/10)

    function onSearchInputChanged(event: ChangeEvent<HTMLInputElement>) {
      setSearch(event.target.value)
    }

    function goToNextPage() {
      setPage(page + 1)
    }

    function goToPrevioustPage() {
      setPage(page - 1)
    }

    function goToFirstPage() {
      setPage(1)
    }

    function goToLastPage() {
      setPage(totalPages)
    }

    return (
      <div className="flex flex-col gap-4">
        <div className="flex gap-3 items-center">
          <h1 className="text-2xl font-bold">Attendees</h1>
          <div className="px-3 w-72 py-1.5 border border-white/10  rounded-lg flex items-center gap-3">
            <Search className="size-4 text-emerald-300 "/>
            <input onChange={onSearchInputChanged} className="bg-transparent flex-1 outline-none border-0 p-0 text-sm" placeholder="Search attendee..."/>
          </div>
          {search}
        </div>
        <Table>
          <thead>
            <tr className="border-b border-white/10">
              <TableHeader  style={{ width: 48 }}>
                <input className="size-4 bg-black/20 rounded border-white/10" type="chekbox" />
              </TableHeader>
              <TableHeader>ID</TableHeader>
              <TableHeader>Attendee</TableHeader>
              <TableHeader>Enrolment date</TableHeader>
              <TableHeader>Check-in date</TableHeader>
              <TableHeader style={{ width: 64 }}></TableHeader>
      
            </tr>
          </thead>
          <tbody>
            {attendees.slice((page - 1) * 10, page * 10).map((attendee)=>{
              return (
                <TableRow key={attendee.id} >
                  <th>
                    <input className="size-4 bg-black/20 rounded border-white/10" type="checkbox" />
                  </th>
                  <TableCell>{attendee.id}</TableCell>
                  <TableCell>
                    <div className="flex flex-col gap-1">
                      <span className="font-semibold text-white">{attendee.name} </span>
                      <span>{attendee.email} </span>
                    </div>
                  </TableCell>
                  <TableCell>{dayjs().to(attendee.createAt)}</TableCell>
                  <TableCell>{dayjs().to(attendee.checkdInAt)}</TableCell>
                  <TableCell>
                    <IconButton transparent>
                      <MoreHorizontal className="size-4"/>
                    </IconButton>
                  </TableCell>
                </TableRow>
              )
            })}
          </tbody>
          <tfoot>
            <tr>
              <TableCell colSpan={3}>
                Showing 10 of {attendees.length} items
              </TableCell>
              <TableCell colSpan={3} className="text-right">
                <div className="inline-flex items-center gap-8">
                  <span>Page {page} of {totalPages}</span>
                  <div className="flex gap-1.5">
                    <IconButton onClick={goToFirstPage} disabled={page === 1}>
                      <ChevronsLeft className="size-4"/>
                    </IconButton>
                    <IconButton onClick={goToPrevioustPage} disabled={page === 1}>
                      <ChevronLeft className="size-4"/>
                    </IconButton>
                    <IconButton onClick={goToNextPage} disabled={page === totalPages}>
                      <ChevronRight className="size-4"/>
                    </IconButton>
                    <IconButton onClick={goToLastPage} disabled={page === totalPages}>
                      <ChevronsRight className="size-4"/>
                    </IconButton>
                  </div>
                </div>
              </TableCell>
            </tr>
          </tfoot>
      </Table>
      </div>
    )
}