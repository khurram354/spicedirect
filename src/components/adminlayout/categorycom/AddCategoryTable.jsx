'use client';
import { TbEdit } from "react-icons/tb";
import Link from 'next/link';
import { useState, useEffect } from "react";
import Image from "next/image";
import UpdateCuisine from "./UpdateCuisine";
import Pagination from "@/components/common/Pagination";
import call_api from "@/helper/Api";

const AddCategoryTable = () => {
  const [productdata, setProductdata] = useState([]);
  const [pageno, setPageno] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [searchText, setSearchText] = useState("");
  const [dialogueOpen, setDialogueOpen] = useState(false);
  const [productId, setProductId] = useState("");
  const [popUpType, setPopUpType] = useState("");
  const [checkChanges, setCheckChanges] = useState(false);

  async function getAllProducts() {
    try {
      const rbody = { pageno, searchText, checked: [] }
      const result = await call_api.getallproducts(rbody);
      setHasMore(result.hasMore);
      setCheckChanges(false)
      return result.data;
    } catch (error) {
      console.log("Error fetching data", error);
      return [];
    }
  }

  const updateCuisineHandler = (id) => {
    setProductId(id);
    setDialogueOpen(!dialogueOpen);
    setPopUpType("cuisine")
  }
  const updateSPCategoryHandler = (id) => {
    setProductId(id);
    setDialogueOpen(!dialogueOpen);
    setPopUpType("sp_category")
  }
  const fetchProducts = async () => {
    const data = await getAllProducts();
    setProductdata(data);
  }

  useEffect(() => {
    if (pageno) {
      fetchProducts();
    };
    if (checkChanges) {
      fetchProducts();
    }
  }, [pageno, checkChanges]);

  const pageHandler = (key) => {
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
  return (
    <>
      <div className="w-3/4 px-4 mx-auto mt-6 relative left-24 top-5">
        <div className="overflow-hidden rounded-lg shadow-xs">
          <div className="w-full overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b dark:border-gray-700 bg-gray-50 dark:text-gray-400 dark:bg-gray-800">
                  <th className="px-1 py-3 w-28">Product ID</th>
                  <th className="px-1 py-3 w-40">Product Name</th>
                  <th className="px-1 py-3 w-28 text-center">Net Price</th>
                  <th className="px-1 py-3 w-28 text-center">VAT+Price</th>
                  <th className="px-1 py-3 w-28 text-center">Add Feature Categories</th>
                  <th className="px-1 py-3 w-28 text-center">Status</th>
                  <th className="px-1 py-3 w-32 text-center">Update Cuisine</th>
                  <th className="px-1 py-3 w-40 text-center">Update Images</th>
                </tr>
              </thead>
              {productdata && productdata.map((pro, index) => {
                return <tbody className="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800" key={index}>
                  <tr className="bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-900 text-gray-700 dark:text-gray-400">
                    <td className="px-1 py-3 text-sm w-28">{`SKU_${pro.barcode}`}</td>
                    <td className="px-1 py-3 text-sm w-40">{pro.name}</td>
                    <td className="px-1 py-3 text-sm w-28 text-center">{pro.default_sale_price}</td>
                    <td className="px-1 py-3 text-sm w-28 text-center">{pro.vat.rate > 0 ? Math.round(pro.vat.rate / 100 * pro.default_sale_price + pro.default_sale_price) : pro.default_sale_price}</td>
                    <td className="px-1 py-3 text-sm w-28 text-center relative flex justify-center items-center">
                      <div className="absolute right-20 top-10">
                        {
                          popUpType === "sp_category" && dialogueOpen && productId === pro._id && <UpdateCuisine setDialogueOpen={setDialogueOpen} proId={pro._id} cuisine={pro.special_categories} type={popUpType} setCheckChanges={setCheckChanges} />
                        }
                      </div>
                      <div className="">
                        <TbEdit className='w-5 h-5 text-secondary cursor-pointer' onClick={(e) => updateSPCategoryHandler(pro._id)} />
                      </div>
                    </td>
                    <td className="px-1 py-3 text-sm w-28 text-center">{pro.active ? 'Available' : 'Out Of Stock'}</td>
                    <td className="px-1 py-3 text-sm w-32 h-20 flex justify-center items-center relative">
                      <div className="absolute right-20 top-10">
                        {
                          popUpType === 'cuisine' && dialogueOpen && productId === pro._id && <UpdateCuisine setDialogueOpen={setDialogueOpen} proId={pro._id} cuisine={pro.cuisine} type={popUpType} setCheckChanges={setCheckChanges} />
                        }
                      </div>
                      <div className="">
                        <TbEdit className='w-5 h-5 text-secondary cursor-pointer' onClick={(e) => updateCuisineHandler(pro._id)} />
                      </div>
                    </td>
                    <td className="px-1 py-3 text-sm w-40 relative">
                      <div className="flex justify-center items-center space-x-2">
                        <span className="relative w-20 h-20 overflow-hidden">
                          <Image
                            src={`/productImages/${pro.image_name}`}
                            width={100}
                            height={100}
                            alt="Loading..."
                            className="object-cover w-full h-full"
                          />
                        </span>
                        <Link href={`/admin/editproductimage/${pro._id}`}><TbEdit className='w-5 h-5 text-secondary' /></Link>
                      </div>
                    </td>
                  </tr>
                </tbody>
              })}
            </table>
            <Pagination
              productdata={productdata}
              pageHandler={pageHandler}
              hasMore={hasMore}
              pageno={pageno}
            />
            <div className='w-full h-20'></div>
          </div>
        </div>
      </div>
    </>
  )
}

export default AddCategoryTable