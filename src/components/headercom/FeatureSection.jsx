import { featureItems } from './MobileMenuItem';
import Link from 'next/link';

const FeatureSection = () => {
    return (
        <section className="sm:hidden md:block">
            <div className="flex justify-center bg-gray-200 h-10 text-gray-500 shadow-sm">
                {
                    featureItems && featureItems.map((item, index) => (
                        <div className="flex xl:px-8 sm:px-2 border-x-2 border-gray-400 h-full items-center" key={index}>
                            <span className="pr-2">{item.icon}</span>
                            <Link href={item.url} className="text-sm font-medium">{item.name}</Link>
                        </div>
                    ))
                }
            </div>
        </section>
    )
}
export default FeatureSection