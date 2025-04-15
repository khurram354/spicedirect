"use client"
import Heading from "./Heading";
import Link from "next/link";

const ShopByCuisine = ({ cuisines }) => {
  return (
    <section>
      <Heading heading={'Shop By Cuisine'} />
      <section className="sm:w-11/12 md:w-5/6 mx-auto md:mt-6 rounded-sm md:bg-blue-100 md:p-4">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 sm:gap-3 md:gap-4 lg:gap-6 sm:h-64 lg:h-56 md:h-[500px]">
          {
            cuisines && cuisines.map((cuisine, index) => (
              <Link
                key={index}
                href={`/product?cuis_id=${cuisine?.name}`}
                className="relative"
                style={{
                  backgroundImage: `url('/images/cuisine/${cuisine?.image_name[0]}')`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  // opacity: 0.95,
                  backgroundColor: 'white',
                  borderRadius: '2px',
                  cursor: 'pointer'
                }}
              >
                <h5 className="text-white sm:text-base md:text-xl font-medium absolute md:bottom-4 md:left-6 sm:bottom-1 sm:left-2 tracking-wider">{cuisine.name}</h5>
              </Link>
            ))
          }
        </div>
      </section>
    </section>
  )
}

export default ShopByCuisine

