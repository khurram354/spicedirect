'use client';
import { TbEdit } from "react-icons/tb";
import Link from 'next/link';
import { useState, useEffect } from "react";
import Image from "next/image";
import FavouriteDialogue from "./FavouriteDialogue";
import SubCategoryDialogue from "./SubCategoryDialogue";
import SubSubCategoryDialogue from './SubSubCategoryDialogue';
import Pagination from "@/components/common/Pagination";
import { FaSearch } from "react-icons/fa";
import call_api from "@/helper/Api";
import ProSequenceDialogue from "./ProSequenceDialogue";

const ProductTable = () => {
  const [productdata, setProductdata] = useState([]);
  const [pageno, setPageno] = useState(1);
  const [totalpages, setTotalpages] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [searchText, setSearchText] = useState("");
  const [dialogueOpen, setDialogueOpen] = useState(false);
  const [subcatedialogueopen, setSubcatedialogueopen] = useState(false);
  const [subsubcatedialogueopen, setSubsubcatedialogueopen] = useState(false);
  const [proseqdialogueopen, setProseqdialogueopen] = useState(false);
  const [prosubseqdialogueopen, setProsubseqdialogueopen] = useState(false);
  const [productId, setProductId] = useState("");
  const [checkChanges, setCheckChanges] = useState(false);

  async function getAllProducts() {
    try {
      const rbody = { pageno, searchText, checked: [] }
      const result = await call_api.getallproducts(rbody);
      setHasMore(result.hasMore);
      setTotalpages(result.totalPages);
      setCheckChanges(false);
      return result.data;
    } catch (error) {
      console.log("Error fetching data", error);
      return [];
    }
  }

  const AddToFavHandler = (id) => {
    setProductId(id);
    setDialogueOpen(!dialogueOpen);
  }
  const AddToSubCategoryHandler = (id) => {
    setSubsubcatedialogueopen(false);
    setProductId(id);
    setSubcatedialogueopen(!subcatedialogueopen);
  }
  const AddToSubSubCategoryHandler = (id) => {
    setSubcatedialogueopen(false);
    setProductId(id);
    setSubsubcatedialogueopen(!subsubcatedialogueopen);
  }
  const AddProductSeqHandler = (id) => {
    setProductId(id);
    setProsubseqdialogueopen(false)
    setProseqdialogueopen(!proseqdialogueopen);
  }
  const AddProductSubSeqHandler = (id) => {
    setProductId(id);
    setProseqdialogueopen(false)
    setProsubseqdialogueopen(!prosubseqdialogueopen);
  }
  const fetchProducts = async () => {
    const data = await getAllProducts();
    setProductdata(data);
  }
  useEffect(() => {
    if (pageno) {
      fetchProducts();
    }
    if (checkChanges) {
      fetchProducts();
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
      setProductdata([]);
      fetchProducts();
    } else {
      setProductdata([]);
      setPageno(1);
    }
  }, [searchText]);

  return (
    <>
      <div className='w-3/4 px-4 mx-auto mt-3 relative left-24 top-5'>
        <input type="text"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          placeholder="Enter Product Name"
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
                  <th className="px-1 py-3 w-28">Product ID</th>
                  <th className="px-1 py-3 w-40">Product Name</th>
                  <th className="px-1 py-3 w-28 text-center">Category</th>
                  <th className="px-1 py-3 w-28 text-center">Product Cate Sequence</th>
                  <th className="px-1 py-3 w-28 text-center">Sub Category</th>
                  <th className="px-1 py-3 w-28 text-center">Product SubCate Sequence</th>
                  <th className="px-1 py-3 w-28 text-center">Sub SubCategory</th>
                  <th className="px-1 py-3 w-28 text-center">Status</th>
                  <th className="px-1 py-3 w-32 text-center">Favourite Product</th>
                  <th className="px-1 py-3 w-40 text-center">Update Images</th>
                </tr>
              </thead>
              {productdata && productdata.map((pro, index) => {
                return <tbody className="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800" key={index}>
                  <tr className="bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-900 text-gray-700 dark:text-gray-400">
                    <td className="px-1 py-3 text-sm w-28">{`SKU_${pro.barcode}`}</td>
                    <td className="px-1 py-3 text-sm w-40">{pro.name}</td>
                    <td className="px-1 py-3 text-sm w-28 text-center">{pro.category?.name}</td>
                     <td className="px-1 py-3 text-sm w-28 relative">{pro?.cate_sequence_no??''}
                       <div className="absolute right-20 top-10">
                        {
                          proseqdialogueopen && productId === pro._id && <ProSequenceDialogue id={pro._id} procateid = {pro.category} setCheckChanges={setCheckChanges} sequenceType = {"category"} setProseqdialogueopen={setProseqdialogueopen} setProsubseqdialogueopen={setProsubseqdialogueopen}/>
                        }
                      </div>
                      <div className="">
                        <TbEdit className='w-5 h-5 text-secondary cursor-pointer' onClick={(e) => AddProductSeqHandler(pro._id)} />
                      </div>
                    </td>
                    <td className="px-1 py-3 text-sm w-28 relative">{pro.subcategory?.name}
                      <div className="absolute right-20 top-10">
                        {
                          subcatedialogueopen && productId === pro._id && <SubCategoryDialogue setSubcatedialogueopen={setSubcatedialogueopen} proId={pro._id} setCheckChanges={setCheckChanges} />
                        }
                      </div>
                      <div className="">
                        <TbEdit className='w-5 h-5 text-secondary cursor-pointer' onClick={(e) => AddToSubCategoryHandler(pro._id)} />
                      </div>
                    </td>
                    <td className="px-1 py-3 text-sm w-28 relative">{pro?.subcate_sequence_no??''}
                       <div className="absolute right-20 top-10">
                        {
                          prosubseqdialogueopen && productId === pro._id && <ProSequenceDialogue  id={pro._id} procateid = {pro.subcategory} setCheckChanges={setCheckChanges} sequenceType={"subcategory"} setProseqdialogueopen = {setProseqdialogueopen} setProsubseqdialogueopen={setProsubseqdialogueopen}/>
                        }
                      </div>
                      <div className="">
                        <TbEdit className='w-5 h-5 text-secondary cursor-pointer' onClick={(e) => AddProductSubSeqHandler(pro._id)} />
                      </div>
                    </td>
                    <td className="px-1 py-3 text-sm w-28 relative">{pro.subsubcategory?.name}
                      <div className="absolute right-20 top-10">
                        {
                          subsubcatedialogueopen && productId === pro._id && <SubSubCategoryDialogue setSubsubcatedialogueopen={setSubsubcatedialogueopen} proId={pro._id} setCheckChanges={setCheckChanges} />
                        }
                      </div>
                      <div className="">
                        <TbEdit className='w-5 h-5 text-secondary cursor-pointer' onClick={(e) => AddToSubSubCategoryHandler(pro._id)} />
                      </div>
                    </td>
                    <td className="px-1 py-3 text-sm w-28 text-center">{pro.active ? 'Available' : 'Out Of Stock'}</td>
                    <td className="px-1 py-3 text-sm w-32 h-20 flex justify-center items-center relative">
                      <div className="absolute right-20 top-10">
                        {
                          dialogueOpen && productId === pro._id && <FavouriteDialogue setDialogueOpen={setDialogueOpen} proId={pro._id} setCheckChanges={setCheckChanges} />
                        }
                      </div>
                      <div className="">
                        <TbEdit className='w-5 h-5 text-secondary cursor-pointer' onClick={(e) => AddToFavHandler(pro._id)} />
                      </div>
                    </td>
                    <td className="px-1 py-3 text-sm w-40 relative">
                      <div className="flex justify-center items-center space-x-2">
                        <span className="relative w-20 h-20 overflow-hidden">
                          <Image
                            src={`${process.env.NEXT_PUBLIC_AWS_URL}/${pro.image_name}`}
                            width={100}
                            height={100}
                            alt="Loading..."
                            className="object-cover w-full h-full"
                          />
                        </span>
                        <Link href={`/admin/editproductimage/${pro._id}`}><TbEdit className='w-5 h-5 text-secondary cursor-pointer' /></Link>
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
              totalPages={totalpages}
            />
            <div className='w-full h-20'></div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ProductTable