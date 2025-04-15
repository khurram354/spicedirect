import { IoHomeOutline } from "react-icons/io5";
import { FaBorderAll } from "react-icons/fa";
import { AiOutlineProduct } from "react-icons/ai";
import { FaCircleDollarToSlot, FaBorderNone } from "react-icons/fa6";
import { PiSquaresFourDuotone } from "react-icons/pi";
import { AiFillProduct } from "react-icons/ai";
export const NavBarItems = [
	{
        id: "1",
		name: "Dashboard",
		icon: < IoHomeOutline/>,		
		subItems: []
	},
	{
        id: '2',
		name: "Create SubCate",
		icon: <FaBorderAll />,		
		subItems: [
            { 
                id: "33",
                name: "Create SubCategory", 
                link: '/admin/addsubcategory'
            },{ 
                id: "34",
                name: "Create SubSubCate", 
                link: '/admin/addsubsubcategory'
            },
        ]
	},
	{
        id: '3',
		name: "Product Categories",
		icon: <AiOutlineProduct />,		
		subItems: [
			{ 
                id: "100",
                name: "Add SubCategories", 
                link: '/admin/allproduct'
            },
		]
	},
	{
        id: "4",
		name: "Featured Categories",
        icon: <AiOutlineProduct />,
		
		subItems: [
			{ 
                id: "200",
                name: "Update Banner", 
                link: "/admin/editbanners",
            },
			{ 
                id: "201",
                name: "Update Cuisine",
                link: "/admin/editcuisines", 
            },
            {
                id: '202',
                name: 'Update Home Slider',
                link: '/admin/edithomeslider'
            },
            {
                id: '203',
                name: 'Update Supplier Logo',
                link: '/admin/editsupplier'
            },
		]
	},{
        id: "5",
		name: "Blogs",
        icon: <AiOutlineProduct />,
		
		subItems: [
			{ 
                id: "300",
                name: "Write Blog", 
                link: "/admin/writeblog",
            },
			{ 
                id: "301",
                name: "Update Blog",
                link: "/admin/editblog", 
            },
		]
	},{
        id: "6",
		name: "Terms & Conditions",
        icon: <AiOutlineProduct />,
		
		subItems: [
			{ 
                id: "360",
                name: "Update Terms & conditions", 
                link: "/admin/update_terms_&_conditions",
            },
		]
	}
	
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