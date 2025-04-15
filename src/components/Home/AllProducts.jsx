'use client'
import ProductCard from "../productcom/ProductCard";
import { useAppSelector } from '@/lib/redux/hooks';

const AllProducts = () => {
  const searchText = useAppSelector(state => state.search.searchfor);
  return (
    <>{searchText ?
      <section className="flex sm:w-5/6 mx-auto">
        <ProductCard type='search' />
      </section> : ""
    }
    </>
  )
}
export default AllProducts