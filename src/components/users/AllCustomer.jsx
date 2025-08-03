'use client';
import Link from 'next/link';
import { useState, useEffect } from "react";
import Pagination from "../common/Pagination";
import { FaSearch } from "react-icons/fa";
import call_api from "@/helper/Api";

const AllCustomer = () => {
  const [customerdata, setCustomerdata] = useState([]);
  const [pageno, setPageno] = useState(1);
  const [totalpages, setTotalpages] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [searchText, setSearchText] = useState(""); 
  const [checkChanges, setCheckChanges] = useState(false);

  async function getAllUsers() {
    try {
      const rbody = { pageno, searchText }
      const result = await call_api.getallusers(rbody);
      setHasMore(result.hasMore);
      setTotalpages(result.totalPages);
      setCheckChanges(false);
      return result.data;
    } catch (error) {
      console.log("Error fetching data", error);
      return [];
    }
  }

  
  const fetchUsers = async () => {
    const data = await getAllUsers();
    setCustomerdata(data);
  }
  useEffect(() => {
    if (pageno) {
      fetchUsers();
    }
    if (checkChanges) {
      fetchUsers();
    }
  }, [pageno, checkChanges]);

  const pageHandler = (key) => {
    if(typeof key === 'number') return setPageno(key);
    setPageno((prevPage) => {
      if (key === 'increament') {
        return prevPage + 1
      }
      if (key === 'decreament') {
        return prevPage > 1 ? prevPage - 1 : 1;
      };
      return prevPage;
    })
  }

  useEffect(() => {
    if (pageno === 1) {
      setCustomerdata([]);
      fetchUsers();
    } else {
      setCustomerdata([]);
      setPageno(1);
    }
  }, [searchText]);

  const handleGenLink = async(id) => {
    try {
      const rbody = {id}
      const resp = await call_api.checkcustomer(rbody);
      console.log(resp)
    } catch (error) {
      console.log("network error", error)
    }
  }

  return (
    <>
      <div className='w-3/4 px-4 mx-auto mt-3 relative left-24 top-5'>
        <input type="text"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          placeholder="Enter Customer Name"
          className="ring-4 w-full rounded-sm lg:px-10 sm:px-4 sm:text-base lg:py-3 sm:py-2 text-gray-600 focus:outline-dangercolor"
        />
        <FaSearch className="absolute lg:top-4 lg:right-32 text-gray-400 text-xl sm:top-5 md:right-20 sm:right-10" />
      </div>
      <div className="w-3/4 px-4 mx-auto mt-6 relative left-24 top-5">
        <div className="overflow-hidden rounded-lg shadow-xs">
          <div className="w-full overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b dark:border-gray-700 bg-gray-50 dark:text-gray-400 dark:bg-gray-800">
                  <th className="px-1 py-3 w-40">Customer Name</th>
                  <th className="px-1 py-3 w-24 text-center">City</th>
                  <th className="px-1 py-3 w-28 text-center">Mobile Number</th>
                  <th className="px-1 py-3 w-40 text-center">Email Address</th>
                  <th className="px-1 py-3 w-24 text-center">Status</th>                 
                  <th className="px-1 py-3 w-32 text-center">Generate Password</th>                 
                </tr>
              </thead>
              {customerdata && customerdata.map((ele, index) => {
                return <tbody className="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800" key={index}>
                  <tr className="bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-900 text-gray-700 dark:text-gray-400">
                    <td className="px-1 py-3 text-sm w-40">{ele.customer_name}</td>
                    <td className="px-1 py-3 text-sm w-24 text-center">{ele.city}</td>
                    <td className="px-1 py-3 text-sm w-28 text-center">{ele.mobile}</td>
                    <td className="px-1 py-3 text-sm w-40 text-center">{ele.email}</td>
                    <td className="px-1 py-3 text-sm w-40 text-center">{ele.status === true ? "active":"close"}</td>                    
                    <td className="px-1 py-3 text-sm w-32 text-center"><button className='bg-secondary p-2 text-white border-2 rounded-md' onClick= {()=>handleGenLink(ele._id)}>Send Link</button></td>                    
                  </tr>
                </tbody>
              })}
            </table>
            <Pagination
              productdata={customerdata}
              pageHandler={pageHandler}
              hasMore={hasMore}
              pageno={pageno}
              totalPages={totalpages}
            />
            <div className='w-full h-20'></div>
          </div>
        </div>
      </div>
    </>
  )
}

export default AllCustomer;