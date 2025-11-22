import Link from 'next/link';
import Image from 'next/image';
import { OurAim, OurProcess } from './OurAim';

const OurJourney = () => {
    return (
        <section className="sm:w-11/12 md:w-5/6 mx-auto md:mt-8 sm:mt-4">
            <section className="md:p-12 sm:p-10 text-center rounded-sm shadow-md"
                style={{
                    backgroundImage: `url('/images/aboutus/about_us_heading.jpg')`,
                    backgroundPosition: "center",
                    backgroundSize: "cover"
                }}
            >
                <h1 className="text-3xl sm:font-bold text-white">Our Wholesale Journey</h1>
                <p className="mt-4 text-lg text-white font-semibold">From sourcing quality products to delivering them fresh to you</p>
            </section>
            <OurProcess />
            <section className="flex flex-col-reverse lg:flex-row items-center py-10 md:px-5 bg-gray-200 shadow-md">
                {/* Text Section */}
                <div className="lg:w-1/2 sm:text-left space-y-4">
                    <h2 className="md:text-3xl sm:text-2xl font-semibold text-secondary text-center">Spice Direct Wholesale Commitment</h2>
                    <div className="text-gray-600 sm:px-2 md:px-0">
                        <p>At Spice Direct Wholesale, we are proud to be the trusted food supplier for a diverse range of kitchens across the catering industry nationwide. We specialize in offering high-quality products, from cheese and groceries to fresh vegetables, drinks, dry foods, packaging, and more. Our close collaboration with top global brands enables us to provide exceptional products and services, ensuring on-time deliveries and the freshest items for our clients.</p>
                        <br />
                        <p>With years of industry experience and strong relationships with trusted suppliers, we understand the unique challenges and opportunities in catering. Our dedicated telesales team is always on hand to support your business, providing expert advice and assistance whenever you need it. At Spice Direct Wholesale, we are committed to offering outstanding customer service, making us the preferred choice for businesses in the food sector.</p>
                    </div>
                    <div className="space-x-4 pt-6 pl-2">
                        <Link href={'tel:01415303120'} className="bg-secondary text-white px-4 py-3 rounded-md hover:bg-secondary">
                            Contact Telesales
                        </Link>
                        <Link href={'mailto:Orders@spicedirectwholesale.co.uk'} className="bg-secondary border-2 border-secondary text-white px-4 py-[10px] rounded-md hover:bg-white hover:text-secondary">
                            Email Us
                        </Link>
                    </div>
                </div>
                <div className="lg:w-1/2 mb-8 lg:mt-0 lg:flex lg:justify-end">
                    <div className='lg:w-5/6 lg:h-96 md:h-64 sm:h-52'>
                        <Image
                            src="/images/aboutus/our_commitment.jpg"
                            alt="Spice Direct Wholesale"
                            width={500}
                            height={500}
                            className="w-full h-full rounded-sm shadow-lg"
                        />
                    </div>
                </div>
            </section>
            <OurAim />
            <section className='mt-14 mb-20'>
                <h4 className='md:text-3xl sm:text-2xl font-bold text-center text-secondary'>OUR SUPPLIERS</h4>
                <p className='sm:text-left md:text-center py-3 text-gray-600 sm:pl-2'>
                    At Spice Direct Wholesale we are proud to collaborate with some of the most prestigious and well-known brands in the catering industry worldwide. Our strong partnerships with global household names allow us to provide our customers with a diverse selection of premium products, ensuring that they always have access to the best and freshest supplies. By working closely with these industry leaders, we guarantee reliable delivery, consistent quality, and a comprehensive range of items tailored to meet the needs of any business, big or small. With SDW, you can trust that you are getting the best products from the most respected suppliers in the world.
                </p>
            </section>
            <section className="bg-secondary text-white sm:py-6 md:py-12 sm:px-4 text-center shadow-md rounded-sm">
                <h2 className="text-3xl font-bold">Ready to Partner with Us?</h2>
                <p className="mt-4 text-lg">Contact us today to start your wholesale journey with Spice Direct Wholesale.</p>
                <Link href="/customer_service" className="mt-6 inline-block bg-white text-secondary py-2 px-6 rounded-lg font-medium hover:font-semibold hover:shadow-lg ">Contact Us</Link>
            </section>
        </section>
    );
};

export default OurJourney;
