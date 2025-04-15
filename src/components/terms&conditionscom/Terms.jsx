
const Terms = ({allterms, type}) => {
  return (
    <section className="bg-gray-100 sm:px-2 md:px-8 shadow-lg rounded-md py-4 mt-6">
    <h4 className="text-center sm:mt-6 md:mt-10 md:text-3xl sm:text-xl font-semibold text-secondary pb-4">{type === 'return policy' ? "Return Policy" : "Terms & Conditions"}</h4>
    <div className="">
        {
            allterms.length > 0 && allterms.map((ele,index)=>(
                <div key={index} className="pb-4">
                    <h4 className="sm:text-secondary font-semibold md:text-lg pt-4 pb-1">{ele.heading}</h4>
                    <div>
                        {
                            ele.terms && ele.terms.map((term,index)=>(
                                <div key={index} >
                                    <p className="py-1 text-gray-500">{term.condition}</p><br />
                                    </div>                                
                            ))
                        }
                    </div>
                </div>
            ))
        }
        <br />
    </div>
    </section>
  )
}

export default Terms