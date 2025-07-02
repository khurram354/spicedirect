import Marquee from 'react-fast-marquee';
import Image from 'next/image'

const OurSupplier = ({ suppliers }) => {
  return (
    <div className='m:w-11/12 md:w-5/6 mx-auto md:mt-6'>
                <Marquee>
                        {suppliers && suppliers.map((supplier, index) => (
                            <div className='flex justify-center items-center sm:mx-1 md:mx-10 h-32 w-32 overflow-hidden' key={index}>
                                <div>
                                    <Image
                                        src={`${process.env.NEXT_PUBLIC_AWS_URL}/${supplier.imageurl}`}
                                        width={250}
                                        height={250}
                                        alt='supplier'
                                        className='object-contain w-full h-full'
                                    />
                                </div>
                            </div>
                        ))}
                    </Marquee>
                </div>
  )
}

export default OurSupplier