'use client'
import { useState, useEffect } from 'react';
import { FiSearch, FiRefreshCw, FiCalendar, FiX, FiBox, FiDollarSign, FiBarChart2, FiClock, FiShoppingCart, FiTruck, FiCheckCircle, FiXCircle, FiEye, FiEdit, FiPhone, FiFilter } from 'react-icons/fi';
import { useDispatch } from 'react-redux';
import { FaBars } from 'react-icons/fa';
import { toggleSidebar } from '@/lib/redux/features/sidebarSlice';
import call_api from '@/helper/Api';
import Pagination from '@/components/common/Pagination';

const OrderManagement = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [pageno, setPageno] = useState(1);
  const [totalpages, setTotalpages] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [orderData, setOrderData] = useState([]);
  const [stats, setStats] = useState({ total: 0, confirmed: 0, cancelled: 0, totalRevenue: 0, avgOrderValue: 0 })

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'confirmed':
        return <FiPhone className="w-4 h-4 mr-1" />;
      case 'processing':
        return <FiBox className="w-4 h-4 mr-1" />;
      case 'shipped':
        return <FiTruck className="w-4 h-4 mr-1" />;
      case 'delivered':
        return <FiCheckCircle className="w-4 h-4 mr-1" />;
      case 'cancelled':
        return <FiXCircle className="w-4 h-4 mr-1" />;
      default:
        return <FiShoppingCart className="w-4 h-4 mr-1" />;
    }
  };

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

  const handleRefresh = async () => {
    setStartDate(""); setEndDate(""), setSearchQuery(""); setActiveTab("all"); setPageno(1)
  }

  const fetchordermanagement = async () => {
    const rbody = {
      pageno,
      searchText: searchQuery,
      statusFilter: activeTab,
      ...(startDate && endDate ? { startDate, endDate } : {})
    };
    const resp = await call_api.fetchordermanagement(rbody);
    if (resp.success) { setOrderData(resp.data); setStats(resp.stats); setHasMore(resp.hasMore); setTotalpages(resp.totalPages); }
  }
  useEffect(() => { fetchordermanagement() }, [searchQuery, activeTab, startDate, endDate, pageno])
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className=' mr-8 mt-2 flex'>
              <button onClick={() => dispatch(toggleSidebar())} className=' text-gray-800 rounded-md mr-8'>
                <FaBars size={40} className='' />
              </button>
              <h1 className="text-3xl font-bold text-gray-900">Order Management</h1>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search orders..."
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <div className="absolute left-3 top-2.5">
                  <FiSearch className="w-5 h-5 text-gray-400" />
                </div>
              </div>
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center" onClick={handleRefresh}>
                <FiRefreshCw className="w-4 h-4 mr-2" />
                Refresh Data
              </button>
            </div>
          </div>
        </div>
      </header>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-6">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8">
              {[
                { id: 'all', label: 'All Orders', icon: <FiShoppingCart className="w-4 h-4 mr-1" />, total: stats?.total },
                { id: 'confirmed', label: 'Confirmed', icon: <FiPhone className="w-4 h-4 mr-1" />, total: stats?.confirmed },
                { id: 'cancelled', label: 'Cancelled', icon: <FiXCircle className="w-4 h-4 mr-1" />, total: stats?.cancelled }
              ].map((tab) => (
                <button
                  key={tab.id}
                  className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center ${activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  onClick={() => setActiveTab(tab.id)}
                >
                  {tab.icon}
                  {tab.label}
                  <span className={`ml-2 py-0.5 px-2 text-xs rounded-full ${activeTab === tab.id ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'
                    }`}>
                    {[tab.total]}
                  </span>
                </button>
              ))}
            </nav>
          </div>
          <div className="flex space-x-4 items-center">
            <div className="relative">
              <button
                className="flex items-center px-3 py-2 border border-gray-300 rounded-md bg-white text-gray-700 hover:bg-gray-50"
                onClick={() => setShowDatePicker(!showDatePicker)}
              >
                <FiCalendar className="w-5 h-5 mr-2" />
                {startDate && endDate
                  ? `${new Date(startDate).toLocaleDateString()} - ${new Date(endDate).toLocaleDateString()}`
                  : 'Filter by Date'
                }
              </button>
              {showDatePicker && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-md shadow-lg p-4 z-10 border border-gray-200">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-medium">Select Date Range</h3>
                    <button onClick={() => setShowDatePicker(false)} className="text-gray-500 hover:text-gray-700">
                      <FiX className="w-5 h-5" />
                    </button>
                  </div>
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                      <input
                        type="date"
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                        value={startDate}
                        max={endDate || undefined}
                        onChange={(e) => {
                          const newStartDate = e.target.value;
                          setStartDate(newStartDate);
                          if (endDate && newStartDate && new Date(endDate) < new Date(newStartDate)) {
                            setEndDate(newStartDate);
                          }
                        }}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
                      <input
                        type="date"
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                        value={endDate}
                        min={startDate || undefined}
                        onChange={(e) => {
                          const newEndDate = e.target.value;
                          setEndDate(newEndDate);
                          if (startDate && newEndDate && new Date(startDate) > new Date(newEndDate)) {
                            setStartDate(newEndDate);
                          }
                        }}
                      />
                    </div>
                  </div>
                  {startDate && endDate && new Date(startDate) > new Date(endDate) && (
                    <div className="text-red-500 text-sm mb-3">
                      End date cannot be earlier than start date
                    </div>
                  )}
                  <div className="flex justify-end space-x-2">
                    <button
                      onClick={() => {
                        setStartDate('');
                        setEndDate('');

                        setShowDatePicker(false);
                      }}
                      className="px-3 py-2 text-sm text-gray-600 hover:text-gray-800"
                    >
                      Clear
                    </button>
                    <button
                      onClick={() => {
                        if (startDate && endDate) {
                          if (new Date(startDate) <= new Date(endDate)) {
                            setShowDatePicker(false);
                          }
                        }
                      }}
                      disabled={!startDate || !endDate || new Date(startDate) > new Date(endDate)}
                      className="px-3 py-2 text-sm bg-blue-600 text-white rounded-md disabled:bg-gray-300 disabled:cursor-not-allowed"
                    >
                      Apply Filter
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8">
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 bg-blue-500 rounded-md flex items-center justify-center">
                    <FiShoppingCart className="w-6 h-6 text-white" />
                  </div>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Total Orders</dt>
                    <dd className="flex items-baseline">
                      <div className="text-2xl font-semibold text-gray-900">{stats?.total}</div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 bg-green-500 rounded-md flex items-center justify-center">
                    <FiDollarSign className="w-6 h-6 text-white" />
                  </div>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Total Revenue</dt>
                    <dd className="flex items-baseline">
                      <div className="text-2xl font-semibold text-gray-900">{stats?.totalRevenue}</div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 bg-yellow-500 rounded-md flex items-center justify-center">
                    <FiBarChart2 className="w-6 h-6 text-white" />
                  </div>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Avg Order Value</dt>
                    <dd className="flex items-baseline">
                      <div className="text-2xl font-semibold text-gray-900">{stats.avgOrderValue.toFixed(2)}</div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 bg-red-500 rounded-md flex items-center justify-center">
                    <FiClock className="w-6 h-6 text-white" />
                  </div>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Confirm Orders</dt>
                    <dd className="flex items-baseline">
                      <div className="text-2xl font-semibold text-gray-900">{stats.confirmed}</div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white shadow overflow-hidden rounded-lg">
          <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              {activeTab === 'all' ? 'All Orders' : `${activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Orders`}
            </h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">
              {orderData.length} orders found
            </p>
          </div>
          <div className="px-4 py-5 sm:p-6">
            {loading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
              </div>
            ) : orderData.length === 0 ? (
              <div className="text-center py-12">
                <FiShoppingCart className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-sm font-medium text-gray-900">No orders found</h3>
                <p className="mt-1 text-sm text-gray-500">
                  Try changing your filters or search terms
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead>
                    <tr>
                      <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Order #
                      </th>
                      <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Customer
                      </th>
                      <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date
                      </th>
                      <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Items
                      </th>
                      <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Total Amount
                      </th>
                      <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Profit
                      </th>
                      <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {orderData?.map((order) => (
                      <tr key={order._id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {order.order_number}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {order.customer?.customer_name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {formatDate(order.invoice_date)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {order.items.length} items
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          £ {order.total_incl_vat}
                        </td>
                        <td className={`px-6 py-4 whitespace-nowrap text-sm font-medium ${order.profit > 20 ? 'text-green-600' : 'text-yellow-600'}`}>
                          £ {order.profit}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${order.statusColor} items-center`}>
                            {getStatusIcon(order.order_status)}
                            {order.order_status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
          <div className="bg-gray-50 px-4 sm:px-6 border-t border-gray-200">
            <Pagination
              productdata={orderData}
              pageHandler={pageHandler}
              hasMore={hasMore}
              pageno={pageno}
              totalPages={totalpages}
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default OrderManagement;