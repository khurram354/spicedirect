'use client'

const Pagination = ({productdata, pageHandler, hasMore, pageno, totalPages}) => {
  const generatePages = () => {
    const pages = [];
    const maxVisible = 5;
    let start = Math.max(1, pageno-2);
    let end = Math.min(totalPages, start+maxVisible-1);
    if(end-start < maxVisible-1){
      start = Math.max(1,end-maxVisible+1);
    }
    for (let i = start; i <= end; i++){pages.push(i)};
    return pages;
  }
  const pageNumbers = generatePages();
  return (
    <div className={`${productdata ? 'block' : 'hidden'} mt-14`}>
    <div className='text-warningcolor text-center'>
      <ul className="inline-flex -space-x-px text-sm">
        <button onClick={() => pageHandler(pageno - 1)} disabled = {pageno === 1}
        className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 disabled:opacity-50"
          >previous</button>
          {pageNumbers[0] > 1 && (
            <>
            <li><button onClick={()=>pageHandler(1)} className="px-3 h-8 border text-gray-500 bg-white hover:bg-gray-100">1</button></li>
            <li className="px-2"><span>...</span></li>
            </>
          )}
          {pageNumbers.map(num => (
            <li key={num}>
              <button
                onClick={() => pageHandler(num)}
                className={`px-3 h-8 border ${num === pageno ? 'bg-warningcolor text-white' : 'bg-white text-gray-500 hover:bg-gray-100'}`}
              >
                {num}
              </button>
            </li>
          ))}
          {pageNumbers[pageNumbers.length - 1] < totalPages && (
            <>
              <li><span className="px-2">...</span></li>
              <li>
                <button onClick={() => pageHandler(totalPages)} className="px-3 h-8 border text-gray-500 bg-white hover:bg-gray-100">{totalPages}</button>
              </li>
            </>
          )}
        {/* <li>
          <div className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 cursor-pointer" onClick={(e) => pageHandler("decreament")}>Previous</div>
        </li> */}
        {/* <li>
          <div className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 ">{pageno}</div>
        </li> */}
        {/* <li>
          <button className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 cursor-pointer" onClick={(e) => pageHandler('increament')} disabled={productdata && !hasMore ? true : false}>Next</button>
        </li> */}
         <li>
            <button
              onClick={() => pageHandler(pageno + 1)}
              disabled={!hasMore || pageno === totalPages}
              className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 disabled:opacity-50"
            >
              Next
            </button>
          </li>
      </ul>
    </div>
    <p className={`text-dangercolor text-center py-10 ${productdata && hasMore ? 'hidden' : 'block'}`}>No More Products</p>
  </div>
  )
}

export default Pagination