'use client';
import { IoHomeOutline } from "react-icons/io5";
import { FaBorderAll } from "react-icons/fa";
import { AiOutlineProduct } from "react-icons/ai";
import { FaCircleDollarToSlot, FaBorderNone, FaUsers,FaCubes, FaCube, FaNetworkWired, FaImage, FaImages, FaDiagramProject } from "react-icons/fa6";
import { PiSquaresFourDuotone } from "react-icons/pi";
import { AiFillProduct } from "react-icons/ai";
export const NavBarItems = [
	{
        id: "1",
		name: "Dashboard",
		icon: < IoHomeOutline/>,	
		subItems: [
            { 
                id: "111",
                name: "Order Management", 
                link: '/admin/dashboard/order_management',
                sIcon: FaCube
            },
            { 
                id: "112",
                name: "Customer Management", 
                link: '/admin/dashboard/customer_management',
                sIcon: FaUsers
            },
            { 
                id: "113",
                name: "Category Management", 
                link: '/admin/dashboard/category_management',
                sIcon: FaCubes
            }
        ]
	},
	{
        id: '3',
		name: "Products",
		icon: <AiOutlineProduct />,		
		subItems: [
			{ 
                id: "100",
                name: "Add Main Products Categories",
                link: '/admin/products/add_main_product_categories',
                sIcon: FaNetworkWired
            },{ 
                id: "101",
                name: "Add Product Featured Categories",
                link: '/admin/products/add_product_featured_categories',
                sIcon: FaDiagramProject
            },
		]
	},
	{
        id: "4",
		name: "Featured Images",
        icon: <FaImage />,
		
		subItems: [
			{ 
                id: "200",
                name: "Update Banner", 
                link: "/admin/editbanners",
                sIcon: FaImages
            },
			{ 
                id: "201",
                name: "Update Cuisine",
                link: "/admin/editcuisines", 
                sIcon: FaImages
            },
            {
                id: '202',
                name: 'Update Home Slider',
                link: '/admin/edithomeslider',
                sIcon: FaImages
            },
            {
                id: '203',
                name: 'Update Supplier Logo',
                link: '/admin/editsupplier',
                sIcon: FaImages
            },
            {
                id: '204',
                name: 'Update App Category Banner',
                link: '/admin/editappcategory',
                sIcon: FaImages
            },
		]
	},	
];

export const InfoBar = [
	{
		id:30,
		name:"Total Products",
		icon: <PiSquaresFourDuotone className="text-3xl text-warningcolor font-bold" />
	},{
		id:31,
		name:"Active Products",
		icon:  <AiFillProduct className="text-warningcolor text-2xl font-bold" />
	},{
		id:32,
		name:"Out Of Stock",
		icon: <FaBorderNone className="text-2xl font-bold text-warningcolor" />
	},{
		id:33,
		name:"Total Value",
		icon: <FaCircleDollarToSlot className="text-2xl font-bold text-warningcolor" />
	},
]


export const cuisines = [
    {
        id:6,
        name: "italian",
        title: "Italian",
    }, {
        id: 1,
        name: "english",
        title: "English",
    }, {
        id: 2,
        name: "chinese",
        title: "Chinese",
    },{
        id: 4,
        name: "indian",
        title: "Indian",
    }

]

export const spCategories =[
    {
        id: 11,
        name: "seasonal_promotions",
        title: "Seasonal Promo",
    },{
        id: 12,
        name: "trending_products",
        title: "Trending Products",
    },{
        id: 13,
        name: "new_arrivals",
        title: "New Arrivals",
    },{
        id: 14,
        name: "special_offers",
        title: "Special Offers",
    },{
        id: 15,
        name: "top_selling",
        title: "Top Sellings",
    }
]