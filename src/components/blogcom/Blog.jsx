import Image from "next/image";
import { corevalues } from "./CoreValues";
import Link from "next/link";

const Blog = ({ blog }) => {
    return (
        <section className="xl:w-4/6 md:w-5/6 sm:w-11/12 mx-auto mt-8 bg-gray-100 p-2">
            <div className="px-2">
                <h4 className="md:text-2xl sm:text-2xl sm:font-semibold lg:font-bold pt-12 text-secondary uppercase">{blog?.mainTitle.slice(0, 70)}</h4>
                <h4 className="md:text-lg sm:text-base font-semibold text-secondary pt-4 pb-2 capitalize">{blog?.subTitle.slice(0, 100)}</h4>
                <div className="w-full md:h-[450px] sm:h-52">
                    <Image
                        src={`/images/blogs/${blog?.mainTitleImage}`}
                        width={500}
                        height={500}
                        alt="Loading Image"
                        className="object-cover w-full h-full bg-white rounded-sm shadow-lg"
                    />
                </div>
            </div>
            <div className="md:p-4">
                <p className="my-6 text-gray-600 text-left">{blog?.mainTitleParaFirst}</p>
                <p className="text-gray-600 text-left ">{blog?.mainTitleParaSecond}</p>
            </div>
            <div className="grid lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-1 my-16">
                {
                    corevalues && corevalues.map((item, index) => (
                        <div className="flex flex-col items-center p-2" key={index}>
                            <span>{item.icon}</span>
                            <h6 className="p-2 font-bold text-dangercolor text-center">{item.heading}</h6>
                            <h4 className="sm:px-1 md:px-2 text-center text-dangercolor font-medium text-sm">{item.subheading}</h4>
                        </div>
                    ))
                }
            </div>
            <div className="p-1">
                <h6 className="text-secondary font-bold text-3xl text-center py-4">What Do We Sell</h6>
                <p className="text-gray-600 text-left leading-6 md:px-2">{blog?.sellSectionParaFirst}</p>
                <br />
                <p className="text-gray-600 text-left leading-6 md:px-2">{blog?.sellSectionParaSecond}</p>
            </div>
            <div className="grid sm:grid-cols-5 p-2 sm:my-4 md:my-12 justify-items-center gap-2">
                {blog && blog?.fiveCircleImage.map((img, index) => (
                    <div className="rounded-full lg:w-40 lg:h-40 md:w-28 md:h-28 sm:w-16 sm:h-16 2xl:w-44 2xl:h-44 flex justify-center items-center" key={index}>
                        <Image
                            src={`/images/blogs/${img}`}
                            width={500}
                            height={500}
                            alt={"  "}
                            className="object-cover w-full h-full rounded-full bg-white shadow-lg"
                        />
                    </div>
                ))
                }
            </div>
            <div>
                <p className="text-gray-600 p-2 text-left leading-6">{blog.sellSectionParaThird}</p>
            </div>
            <div className="grid grid-cols-5 gap-2 p-2 md:my-12 sm:my-4 justify-items-center">
                {
                    blog && blog.fiveCircleTitle.map((title, index) => (
                        <div className="rounded-full lg:w-40 lg:h-40 md:w-28 md:h-28 sm:w-16 sm:h-16 text-center flex items-center justify-center" key={index}>
                            <Image
                            src={`/images/blogs/${title}`}
                            width={500}
                            height={500}
                            alt={"  "}
                            className="object-cover w-full h-full rounded-full shadow-lg"
                        />
                        </div>
                    ))
                }
            </div>
            <div className="">
                <Link href={`/product?offers=special_offers`} className="bg-warningcolor block text-center rounded-sm text-white md:text-2xl sm:text-sm font-medium p-4 hover:bg-white hover:text-warningcolor shadow-2xl">Check Our Special Offers</Link>
            </div>

            <div className="w-full sm:mt-4">
                <div className="w-full md:h-auto sm:h-52 bg-gray-100">
                    <Image
                        src={`/images/blogs/${blog?.spOfferImage}`}
                        width={500}
                        height={500}
                        alt="loading image !!"
                        quality={100}
                        className="object-cover w-full h-full bg-white shadow-xl"
                    />
                </div>
            </div>
            <div className="my-14 px-2">
                <h4 className="text-center md:text-xl font-bold text-secondary uppercase">{blog?.spOfferMainTitle?.slice(0, 100)}</h4>
                <div className="my-4 text-center text-gray-600 leading-6">
                    <p>{blog?.spOfferMainPara}</p>
                </div>
            </div>
            <div className="my-14">
                <h4 className="text-center md:text-3xl font-semibold text-secondary sm:text-xl">Why We have the Thumbs Up</h4>
                <div className="my-4 text-center sm:text-sm md:text-lg font-semibold  text-gray-600">
                    <h6>Reliable Service</h6>
                    <h6>Great Value Own Brands</h6>
                    <h6>Premium Fresh Localy Source Options</h6>
                    <h6>Speedy Collection & Delivery</h6>
                    <h6>Friendly Team on Hand to Help</h6>
                </div>
            </div>
            <br />
            <div className="w-full">
                <div className="w-full md:h-auto">
                    <Image
                        src={`/images/blogs/${blog?.thumpsUpImage}`}
                        width={500}
                        height={500}
                        alt="loading image !!"
                        quality={100}
                        className="object-cover w-full h-full bg-white shadow-lg"
                    />
                </div>
                <br /> <br />
            </div>
        </section>
    )
}

export default Blog