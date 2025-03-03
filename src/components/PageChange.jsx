export const PageChange = ({ page, changePage, totalPages }) => {

    const prev = () => {
        if(page>1){
            changePage(page-1);
        }
    }
    const next = () => {
        if(page<totalPages){
            changePage(page+1)
        }
    }
    const isDisabled = totalPages === 0 || page === totalPages;
    return (
        <div className="flex flex-row justify-center items-center gap-x-5">
            <button onClick={prev} className="rounded-md bg-slate-800 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none" disabled={page === 1 || totalPages === 0}>PREV</button>
            <button onClick={next} className="rounded-md bg-slate-800 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none" disabled={isDisabled}>NEXT</button>
        </div>
    )
}
