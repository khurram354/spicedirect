"use client";
import Image from "next/image";

const WhoWeServe = () => {
  // const data = [
  //   {
  //     title: "Fast Food",
  //     description: "We offer a wide range of high-quality ingredients for fast food businesses, including poultry, cheese, pizza flour, seasonings, sauces, and pizza toppings, all available in bulk for your convenience.",
  //     imageSrc: "/images/whoweserve/fastfood.jpg",
  //     bgColor: "bg-warningcolor",
  //   },
  //   {
  //     title: "Restaurant & Cafe",
  //     description: "Spice Direct Wholesale offers an extensive selection of premium spices, sauces, fresh produce, meats, cleaning supplies, hygiene products, and packaging, tailored to meet the needs of restaurants and cafés.",
  //     imageSrc: "/images/whoweserve/restaurant.jpg",
  //     bgColor: "bg-green-500",
  //   },
  //   {
  //     title: "Event Organizers",
  //     description: "We provide event organizers with bulk supplies of spices, sauces, fresh produce, meats, cleaning materials, and packaging solutions, ensuring quality and consistency for large-scale events and catering services.",
  //     imageSrc: "/images/whoweserve/eventorganizers.jpg",
  //     bgColor: "bg-warningcolor",
  //   },
  //   {
  //     title: "Open for Public",
  //     description: "Spice Direct Wholesale now offers the public access to purchase high-quality spices, sauces, meats, and more in bulk, making it easier for home chefs and food enthusiasts to stock up on premium ingredients.",
  //     imageSrc: "/images/whoweserve/homechef.jpg",
  //     bgColor: "bg-green-500",
  //   }
  // ];
  const data = [
    {
      title: "Fast Food",
      description: "Bulk ingredients tailored for fast food businesses, ensuring quick and reliable service with quality products and fast delivery.",
      imageSrc: "/images/whoweserve/fastfood.jpg",
      bgColor: "bg-warningcolor",
    },
    {
      title: "Restaurant & Cafe",
      description: "Premium products with flexible bulk ordering to help restaurants and cafés streamline operations and maintain consistency.",
      imageSrc: "/images/whoweserve/restaurant.jpg",
      bgColor: "bg-green-500",
    },
    {
      title: "Event Organizers",
      description: "Dependable supply chain for event organizers, offering timely delivery and hassle-free service for large-scale events.",
      imageSrc: "/images/whoweserve/eventorganizers.jpg",
      bgColor: "bg-warningcolor",
    },
    {
      title: "Open for Public",
      description: "Hassle-free shopping for home chefs with no membership required, making it easy to access premium ingredients in bulk.",
      imageSrc: "/images/whoweserve/homechef.jpg",
      bgColor: "bg-green-500",
    }
  ];
  
  
  return (
    <section className="sm:w-11/12 md:w-5/6 mx-auto md:mt-6 rounded-sm md:bg-blue-100 md:p-4">
      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 sm:gap-4 lg:gap-6">
        {data.map((item, index) => (
          <div key={index} className={`flex flex-col items-center justify-center p-4 ${item.bgColor} rounded-lg shadow-md`}>
            <h4 className="text-xl font-semibold mb-2 text-gray-700">{item.title}</h4>
            <p className="text-center text-gray-600 font-medium">{item.description}</p>
            <div className=" md:h-44 lg:h-[215px] pt-4">
              <Image
                src={item.imageSrc}
                width={500}
                height={500}
                alt={item.title}
                className="object-cover w-full h-full rounded-sm bg-white shadow-md"
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default WhoWeServe;

