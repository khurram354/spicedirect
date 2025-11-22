'use client';
import Link from 'next/link';
import { useState, useEffect } from "react";
import Pagination from '@/components/common/Pagination';
import call_api from "@/helper/Api";
import { FaSearch, FaUser, FaUserCheck, FaUserTimes, FaEnvelope, FaCity, FaMobileAlt, FaSync, FaBars } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { useDispatch } from 'react-redux';
import { toggleSidebar } from '@/lib/redux/features/sidebarSlice';

const CustomerManagement = () => {
  const [customerdata, setCustomerdata] = useState([]);
  const [pageno, setPageno] = useState(1);
  const [totalpages, setTotalpages] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [searchText, setSearchText] = useState("");
  const [checkChanges, setCheckChanges] = useState(false);
  const [loading, setLoading] = useState(false);
  const [stats, setStats] = useState({ total: 0, active: 0, inactive: 0 });
  const dispatch = useDispatch();

  async function getAllUsers() {
    try {
      const rbody = { pageno, searchText }
      const result = await call_api.getallusers(rbody);
      setHasMore(result.hasMore);
      setTotalpages(result.totalPages);
      setCheckChanges(false);
      setStats(result.stats);
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
    if (typeof key === 'number') return setPageno(key);
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

  const handleGenLink = async (id) => {
    try {
      setLoading(true);
      const rbody = { id }
      const resp = await call_api.checkcustomer(rbody);
      if (resp.success) {
        alert(resp.message)
      } else { alert("message not sent, network error") }
      setLoading(false)
    } catch (error) {
      console.log("network error", error); setLoading(false);
    }
  }

  return (
    <>
      <div className="min-h-screen bg-gray-100 p-4 rounded">
      <div className="max-w-7xl mx-auto">
        <div className='flex'>
          <div className=' mr-8 mt-2'>
          <button onClick={()=>dispatch(toggleSidebar())} className=' text-gray-800 p-2 rounded-md mr-4'>
            <FaBars size={40} className=''/>
          </button>
        </div>
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Customer Management</h1>
          <p className="text-gray-600 mt-2">Manage and view all your customers in one place</p>
        </div>
        </div>
        

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-md p-6 flex items-center">
            <div className="rounded-full bg-blue-100 p-4 mr-4">
              <FaUser className="text-blue-600 text-2xl" />
            </div>
            <div>
              <h2 className="text-gray-500 text-sm font-medium">Total Customers</h2>
              <p className="text-3xl font-bold text-gray-800">{stats.total}</p>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-md p-6 flex items-center">
            <div className="rounded-full bg-green-100 p-4 mr-4">
              <FaUserCheck className="text-green-600 text-2xl" />
            </div>
            <div>
              <h2 className="text-gray-500 text-sm font-medium">Active Customers</h2>
              <p className="text-3xl font-bold text-gray-800">{stats.active}</p>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-md p-6 flex items-center">
            <div className="rounded-full bg-red-100 p-4 mr-4">
              <FaUserTimes className="text-red-600 text-2xl" />
            </div>
            <div>
              <h2 className="text-gray-500 text-sm font-medium">Inactive Customers</h2>
              <p className="text-3xl font-bold text-gray-800">{stats.inactive}</p>
            </div>
          </div>
        </div>

        {/* Search and Content Card */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          {/* Search Bar */}
          <div className="px-6 py-5 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between">
            <div className="relative flex-grow max-w-md">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaSearch className="text-gray-400" />
              </div>
              <input 
                type="text"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                placeholder="Search by customer name, email, or city..."
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <button 
              onClick={()=> {setSearchText(""); fetchUsers}}
              className="mt-3 sm:mt-0 ml-0 sm:ml-4 flex items-center justify-center px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors"
            >
              <FaSync className="mr-2" /> Refresh
            </button>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <th className="px-6 py-3">Customer</th>
                  <th className="px-6 py-3">City</th>
                  <th className="px-6 py-3">Contact</th>
                  <th className="px-6 py-3">Status</th>
                  <th className="px-6 py-3 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {loading ? (
                  <tr>
                    <td colSpan="5" className="px-6 py-12 text-center">
                      <div className="flex justify-center">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                      </div>
                      <p className="mt-2 text-gray-500">Loading customers...</p>
                    </td>
                  </tr>
                ) : customerdata.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="px-6 py-12 text-center">
                      <FaUser className="mx-auto h-12 w-12 text-gray-400" />
                      <h3 className="mt-2 text-sm font-medium text-gray-900">No customers found</h3>
                      <p className="mt-1 text-sm text-gray-500">
                        Try adjusting your search query or add new customers.
                      </p>
                    </td>
                  </tr>
                ) : (
                  customerdata.map((ele, index) => (
                    <tr key={index} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10">
                            <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                              <FaUser className="text-blue-600" />
                            </div>
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{ele.customer_name}</div>
                            <div className="text-sm text-gray-500">{ele.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center text-sm text-gray-700">
                          <FaCity className="mr-2 text-gray-400" />
                          {ele.city}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center text-sm text-gray-700">
                          <FaMobileAlt className="mr-2 text-gray-400" />
                          {ele.mobile}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${ele.status ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                          {ele.status ? "Active" : "Inactive"}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                        <button
                          onClick={() => handleGenLink(ele._id)}
                          disabled={loading}
                          className={`inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-full shadow-sm text-white ${loading ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
                        >
                          <MdEmail className="mr-1" />
                          {loading ? "Sending..." : "Send Password"}
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="px-6 py-4 border-t border-gray-100">
            <Pagination
              productdata={customerdata}
              pageHandler={pageHandler}
              hasMore={hasMore}
              pageno={pageno}
              totalPages={totalpages}
            />
          </div>
        </div>
      </div>
    </div>
    </>
  )
}

export default CustomerManagement;