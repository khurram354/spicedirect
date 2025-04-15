import Image from "next/image";
const ourAimArray = [
    {
        id:1,
        name:'Who We Serve',
        desc:'We provide wholesale products to a wide range of businesses, including restaurants, grocery stores, schools, event organizers, fast food shops and many more.',
        url:'/images/aboutus/ourprocess/who_we_serve.jpg'
    },{
        id:2,
        name:'How To Order',
        desc:'Place your order easily through our platform. Simply browse our selection, choose your items, and we will deliver to your business on time',
        url:'/images/aboutus/ourprocess/how_to_order.jpg'
    },{
        id:3,
        name:'Register With Us',
        desc:'Call us today to access exclusive wholesale prices on fresh produce, packaging, beverages and many more, Fast and simple registeration process.',
        url:'/images/aboutus/ourprocess/register_with_us.jpg'
    },{
        id:4,
        name:'Our Team',
        desc:'Our team is dedicated to providing you with the best quality products, timely service, and expert guidence. We are here to help your business thrive.',
        url:'/images/aboutus/ourprocess/our_team.jpg'
    },{
        id:5,
        name:'Our Products',
        desc:'We offer a wide range of high-quality products, including fresh vegetables, cleaning supplies, cheese, sauces and packaging solutions, all from reliable sources.',
        url:'/images/aboutus/ourprocess/our_products.jpg'
    },{
        id:6,
        name:'Our Aim',
        desc:'Our goal is to provide business with top-quality wholesale product, timely deliveries, and outstanding customer support to help your operations run smoothly.',
        url:'/images/aboutus/ourprocess/our_aim.jpg'
    }
]

const ourProcessArray = [
    {
        id:10,
        name:'Sourcing the Best Products',
        desc:'We work directly with local farmers and suppliers to source high-quality cheeses, vegetables, and dry foods.',
        url:'/images/aboutus/ouraim/best_products.jpg'
    },{
        id:20,
        name:'Packaging with Care',
        desc:'Our products are carefully packaged to ensure freshness and longevity.',
        url:'/images/aboutus/ouraim/package_with_care.jpg'
    },{
        id:30,
        name:'Fast Delivery',
        desc:'We ensure timely delivery of products directly to your doorstep.',
        url:'/images/aboutus/ouraim/fast_delivery.jpg'
    }
]

export const OurAim = () => {
   return (
    <section>        
    <div className="sm:mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 md:gap-12 sm:gap-6">
            {ourAimArray && ourAimArray.map((aim,index)=>(
                <div className="flex flex-col items-center" key={index}>
                <h3 className=" text-xl font-semibold text-secondary my-2">{aim.name}</h3>
                <Image src={aim.url} alt="Sourcing" width={300} height={200} className="rounded-md" quality={100}/>
                <p className="mt-2 text-center text-gray-600">{aim.desc}</p>
            </div>  
            ))}              
    </div>
</section>
  )
}

export const OurProcess = () => {
    return (
        <section className="sm:my-6 md:my-12 px-4">
                <div className="max-w-7xl mx-auto">
                    <div className="sm:mt-2 md:mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 md:gap-12 sm:gap-6">
                        {ourProcessArray && ourProcessArray.map((process,index)=>(
                            <div className="flex flex-col items-center" key={index}>
                            <Image src={process.url} alt="Sourcing" width={300} height={200} className="rounded-md" />
                            <h3 className="mt-4 text-xl font-semibold text-secondary">{process.name}</h3>
                            <p className="mt-2 text-center text-gray-600">{process.desc}</p>
                        </div>
                        ))}
                        
                    </div>
                </div>
            </section>
    )
}