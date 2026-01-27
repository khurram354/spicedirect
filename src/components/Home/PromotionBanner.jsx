'use client';
import Link from "next/link";
import { FaFire, FaArrowRight } from "react-icons/fa6";

const PromotionBanner = () => {
  return (
    <section className="w-full py-4 mt-8">
      <div className="sm:w-11/12 md:w-5/6 mx-auto rounded-xl bg-gradient-to-r from-green-600 via-emerald-500 to-green-700 text-white shadow-lg overflow-hidden">
        <div className="flex flex-col md:flex-row items-center justify-between p-6 md:p-8 gap-4">
          <div className="flex items-center gap-4 text-center md:text-left">
            <span className="text-4xl md:text-5xl text-red-500 animate-pulse">
              <FaFire />
            </span>
            <div>
              <h2 className="text-xl md:text-2xl font-bold">
                Latest Promotion – February 2026
              </h2>
              <p className="text-sm md:text-base text-green-100 mt-1">
                Limited-time offers you don’t want to miss
              </p>
            </div>
          </div>
          <Link
            href="/promotions"
            className="group inline-flex items-center gap-2 bg-white text-green-700 font-semibold px-6 py-3 rounded-full shadow-md hover:bg-green-100 transition-all duration-300 text-sm md:text-base"
          >
            View Our Latest Promotion
            <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
          </Link>

        </div>
      </div>
    </section>
  );
};

export default PromotionBanner;
