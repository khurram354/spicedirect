'use client'

const Pagination = ({productdata, pageHandler, hasMore, pageno}) => {
  return (
    <div className={`${productdata ? 'block' : 'hidden'} mt-28`}>
    <div className='text-warningcolor text-center'>
      <ul className="inline-flex -space-x-px text-sm">
        <li>
          <div className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 cursor-pointer" onClick={(e) => pageHandler("decreament")}>Previous</div>
        </li>
        <li>
          <div className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 ">{pageno}</div>
        </li>
        <li>
          <button className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 cursor-pointer" onClick={(e) => pageHandler('increament')} disabled={productdata && !hasMore ? true : false}>Next</button>
        </li>
      </ul>
    </div>
    <p className={`text-dangercolor text-center py-10 ${productdata && hasMore ? 'hidden' : 'block'}`}>No More Products</p>
  </div>
  )
}

export default Pagination