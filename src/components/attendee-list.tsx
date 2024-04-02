import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, MoreHorizontal, Search } from "lucide-react"

export const AttendeeList = () => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-3 items-center">
        <h1 className={`text-xl font-bold`}>
          Participantes
        </h1>
        <div className="px-3 py-1.5 w-72 border border-white/10  rounded-lg text-sm flex items-center gap-3">
          <Search className="size-4 text-emerald-300" />
          <input className="bg-transparent flex-1 outline-none h-auto border-0 ring-0 shadow-none p-0 text-sm" placeholder="Buscar participantes" />
        </div>
      </div>

      <div className=" border border-white/10 rounded-lg">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/10">
              <th style={{ width: 48 }} className="text-left px-4 py-3 text-sm font-semibold">
                <input className="size-4 bg-black/20 border rounded border-white/10 acc" type="checkbox" />
              </th>
              <th className="text-left px-4 py-3 text-sm font-semibold">Código</th>
              <th className="text-left px-4 py-3 text-sm font-semibold">Participante</th>
              <th className="text-left px-4 py-3 text-sm font-semibold">Data de inscrição</th>
              <th className="text-left px-4 py-3 text-sm font-semibold">Data do check-in</th>
              <th style={{ width: 64 }} className="text-left px-4 py-3 text-sm font-semibold"></th>
            </tr>
          </thead>
          <tbody>
          {Array.from({ length: 30 }).map((_,i)=> 
            <tr key={i} className="border-b border-white/10">
              <td className="text-zinc-300 px-4 py-3 text-sm">
                <input className="size-4 bg-black/20 border rounded border-white/10 text-emerald-400" type="checkbox" />
              </td>
              <td className="text-zinc-300 px-4 py-3 text-sm">1231231</td>
              <td className="text-zinc-300 px-4 py-3 text-sm">
                <div className="flex flex-col gap-1">
                  <span className="font-semibold text-white">Ricardo Monteiro</span>
                  <span>rcmonteiro@gmail.com</span>
                </div>
              </td>
              <td className="text-zinc-300 px-4 py-3 text-sm">7 dias atrás</td>
              <td className="text-zinc-300 px-4 py-3 text-sm">3 dias atrás</td>
              <td className="text-zinc-300 px-4 py-3 text-sm">
                <button className="bg-black/20 border border-white/10 rounded-md p-1.5">
                  <MoreHorizontal className="size-4" />
                </button>
              </td>
            </tr>
          )}
          </tbody>
          <tfoot>
            <tr>
              <td className="text-zinc-300 px-4 py-3 text-sm" colSpan={3}>
                Mostrando 10 de 228
              </td>
              <td className="text-zinc-300 text-right px-4 py-3 text-sm" colSpan={3}>
                <div className="inline-flex gap-8 items-center">
                  <span>Página 1 de 23</span>
                  <div className="flex gap-1.5">
                    <button className="bg-white/10 border border-white/10 rounded-md p-1.5">
                      <ChevronsLeft className="size-4" />
                    </button>
                    <button className="bg-white/10 border border-white/10 rounded-md p-1.5">
                      <ChevronLeft className="size-4" />
                    </button>
                    <button className="bg-white/10 border border-white/10 rounded-md p-1.5">
                      <ChevronRight className="size-4" />
                    </button>
                    <button className="bg-white/10 border border-white/10 rounded-md p-1.5">
                      <ChevronsRight className="size-4" />
                    </button>
                  </div>
                </div>
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>

  )
}