import Link from 'next/link';
import Image from 'next/image';

export default function NotFound() {
    return (
        <>
            <div className="bg-gray-200 w-full sm:px-1 md:px-0 h-screen flex items-center justify-center">
                <div className="bg-white border border-gray-200 flex flex-col items-center justify-center px-4 md:px-8 lg:px-24 py-8 rounded-lg shadow-2xl sm:h-screen md:h-auto">
                    <div className='flex lg:flex-row sm:flex-col justify-center items-center'>
                        <div className='w-20 h-12 transform md:-translate-x-4 sm:mb-8 lg:mb-0'>
                        <Image
                        src={`/logo/spicedirect_logo.png`}
                        width={200}
                        height={200}
                        alt='Spice Direct'
                        className='Object cover w-full h-full'
                        />
                        </div>                        
                    <p className="sm:text-2xl md:text-3xl lg:text-4xl font-bold tracking-wider text-secondary">Spice Direct Wholesale</p>
                    </div>
                    
                    <p className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-wider text-gray-500 mt-4">Page Not Found</p>
                    <p className="text-gray-500 mt-4 pb-4 border-b-2 text-center">Sorry, the page you are looking for could not be found.</p>
                    <Link href="/" className="flex items-center space-x-2 bg-secondary hover:bg-transparent text-gray-100 px-4 py-2 mt-6 rounded border-2 hover:text-secondary border-secondary ">
                        <span>Return Home</span>
                    </Link>
                </div>
            </div>
        </>
    )
}