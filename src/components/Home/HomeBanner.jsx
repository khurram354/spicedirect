"use client"
import Image from "next/image";
import Link from "next/link";

const HomeBanner = ({ homeBanners }) => {
    const newArrivals = homeBanners && homeBanners.filter(ban => ban.name === "new_arrivals");
    const remainingProducts = homeBanners && homeBanners.filter(ban => ban.name !== 'new_arrivals');
    return (
        <section className={`sm:w-11/12 md:w-5/6 m-auto sm:mt-8 rounded-sm md:bg-red-100 md:p-4`}>
            <div>
                <div className="grid md:grid-cols-2 md:gap-4 sm:gap-2">
                    <Link className="sm:h-64 md:h-96 lg:h-[450px]"
                    href={`/product?offers=${newArrivals[0]?.name}`}
                    >
                        <Image
                            src={`/images/banners/${newArrivals[0]?.image_name[0]}`}
                            width={500}
                            height={500}
                            alt="Upload New Arrivals"
                            className="object-cover w-full h-full rounded-sm bg-white"
                        />
                    </Link>
                    <div className="grid grid-cols-2 sm:gap-3 sm:mt-4 md:mt-1 md:bg-inherit">
                        {
                            remainingProducts && remainingProducts.map((banner, index) => (
                                <Link 
                                className="sm:h-36 md:h-44 lg:h-[215px]" key={index}
                                href={`/product?offers=${banner?.name}`}
                                >
                                    <Image
                                        src={`/images/banners/${banner?.image_name[0]}`}
                                        width={500}
                                        height={500}
                                        alt="Upload New Arrivals"
                                        className="object-cover w-full h-full rounded-sm bg-white"
                                    />
                                </Link>
                            ))
                        }

                    </div>
                </div>
            </div>
        </section>
    )
}

export default HomeBanner

