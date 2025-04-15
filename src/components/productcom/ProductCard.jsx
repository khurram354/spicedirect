"use client";
import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { useAppSelector } from '@/lib/redux/hooks';
import CategoryMenuBar from './CategoryMenuBar';
import { useSearchParams } from 'next/navigation';
import call_api from '@/helper/Api';
import Pagination from '../common/Pagination';

const ProductCard = ({ type, allcategories }) => {
  const [productdata, setProductdata] = useState([]);
  const [pageno, setPageno] = useState(null);
  const [hasMore, setHasMore] = useState(true);
  const searchParams = useSearchParams();
  const categoryId = searchParams.get("cate_id");
  const cuisineId = searchParams.get('cuis_id');
  const offersId = searchParams.get('offers')
  const subcateId = searchParams.get("sub_cate_id");
  const subsubcateId = searchParams.get("subsub_cate_id");
  const searchString = useAppSelector(state => state.search.searchfor);

  async function getAllProducts() {
    let checked = '';
    let searchText = '';
    if (searchText) {
      checked = [];
    } else if (categoryId === null) {
      checked = [];
    } else {
      checked = [categoryId];
    }
    if (categoryId || cuisineId || offersId || subcateId || subsubcateId) {
      searchText = ''
    } else {
      searchText = searchString
    }
    const rbody = { pageno, checked, searchText, cuisineId, offersId, subcateId, subsubcateId };
    const result = await call_api.getallproducts(rbody)
    setHasMore(result.hasMore);
    return result?.data || [];
  };

  const fetchProducts = async () => {
    const data = await getAllProducts();
    setProductdata(data);
    if (data.length > 0) {
      window.scrollTo(0, 0);
    }
  }

  useEffect(() => {
    if (pageno) {
      fetchProducts();
    }
  }, [pageno]);

  useEffect(() => {
    if (pageno === 1) {
      setProductdata([]);
      fetchProducts();
    } else {
      setProductdata([]);
      setPageno(1);
    }
  }, [categoryId, cuisineId, offersId, searchString, subcateId, subsubcateId]);

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
    <section className='md:flex relative'>
      {
        type !== "search" ?
          <div className='md:w-3/6'>
            <CategoryMenuBar allcategories = {allcategories.categories}/>
          </div> : ""
      }
      <div className={`mx-auto mt-8`}>
        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 xl:gap-x-2 xs:gap-y-5">
          {productdata.length > 0 && productdata.map((product, index) => (
            <div key={index} className='border border-1 xs:w-64 xs:mx-auto'>
              <div className="  w-full overflow-hidden rounded-lg h-56 p-2">
                <Link href={`#`}>
                  <Image
                    src={`/productImages/${product.image_name}`}
                    width={500}
                    height={500}
                    alt={`Loading...Product Picture`}
                    className="h-full w-full object-contain object-center group-hover:opacity-75 hover:scale-125"
                  />
                </Link>
              </div>
              <hr />
              <div className=''>
                <div>
                  <h3 className="text-[12px] font-medium  px-2 pt-2 text-dangercolor">SDW  {product.category?.name ?? ""} </h3>
                  <h3 className="text-[12px] font-medium  px-2 text-dangercolor">SKU_0{product.barcode}</h3>
                </div>
                <p className="text-sm px-2 text-gray-600 leading-4 font-semibold">{product.name}</p>
                <div className='py-2'>
                  <div className='pl-2 text-sm flex'>
                    <p className='text-xs font-medium text-secondary'>Pack Size:&nbsp;&nbsp;</p>
                    <p className='text-xs font-medium text-secondary'>{product.weight_kg}kg</p>
                  </div>
                  {/* <div className='pr-4 text-sm'>
                    <p className='text-dangercolor font-semibold'><span>&pound;</span>{product.default_sale_price}</p>
                    <p className='text-secondary font-semibold text-xs'>inc VAT <span>&pound;</span>{product.vat.rate > 0 ? Math.round(product.vat.rate / 100 * product.default_sale_price + product.default_sale_price) : product.default_sale_price}</p>
                  </div> */}
                </div>
              </div>
            </div>
          ))}
        </div>
        <Pagination
        productdata = {productdata}
        pageHandler = {pageHandler}
        hasMore = {hasMore}
        pageno = {pageno}
        />
        <div className='w-full h-20'></div>
      </div>
    </section>
  )
}

export default ProductCard