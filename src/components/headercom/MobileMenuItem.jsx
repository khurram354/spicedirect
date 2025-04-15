import { BiCategory } from "react-icons/bi";
import { TiTick } from "react-icons/ti";
import { BiSolidOffer } from "react-icons/bi";
import { MdLocalOffer } from "react-icons/md";
import { FaTruckFast } from "react-icons/fa6";
import { FaFacebook, FaInstagramSquare} from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import { RiYoutubeFill } from "react-icons/ri";
import { AiFillTikTok } from "react-icons/ai";
export const MobileMenuItem = [
    {
        id: "1",
        name: "Shope By Cuisine",
        icon: <  BiCategory />,		
        link:'#',
        subItems: [
            { 
                id: "200",
                icon: < BiCategory />,
                name: "English", 
                link: "/product?cuis_id=English",
            },
            { 
                id: "201",
                icon: < BiCategory  />,
                name: "Chinese",
                link: "/product?cuis_id=Chinese", 
            },
            { 
                id: "200",
                icon: < BiCategory  />,
                name: "Italian", 
                link: "/product?cuis_id=Italian",
            },
            { 
                id: "201",
                icon: < BiCategory  />,
                name: "Indian",
                link: "/product?cuis_id=Indian", 
            },
        ]
    },
    {
        id: '2',
        name: "Shop By Category",
        icon: < BiCategory  />,	
        link: '#',	
        subItems: [
            { 
                id: "300",
                icon: < BiCategory />,
                name: "Dry Food", 
                link: "/product?cate_id=628a6c3bb6b05596c6bf7799",
            },
            { 
                id: "301",
                icon: < BiCategory  />,
                name: "Frozen",
                link: "/product?cate_id=628a6c3bb6b05596c6bf779d", 
            },
            { 
                id: "302",
                icon: < BiCategory  />,
                name: "Packaging", 
                link: "/product?cate_id=628a6c3bb6b05596c6bf7797",
            },
            { 
                id: "303",
                icon: < BiCategory  />,
                name: "Chilled",
                link: "/product?cate_id=643a8d3f497e0fe000979505", 
            },
            { 
                id: "300",
                icon: < BiCategory />,
                name: "Vegetables", 
                link: "/product?cate_id=628a6c3bb6b05596c6bf77a5",
            },
            { 
                id: "301",
                icon: < BiCategory  />,
                name: "Chips",
                link: "/product?cate_id=628a6c3bb6b05596c6bf77a3", 
            },
            { 
                id: "302",
                icon: < BiCategory  />,
                name: "Drinks", 
                link: "/product?cate_id=628a6c3bb6b05596c6bf77a1",
            },
            { 
                id: "303",
                icon: < BiCategory  />,
                name: "Equipment",
                link: "/product?cate_id=628a6c3bb6b05596c6bf77ab", 
            },
        ]
    },
    {
        id: '3',
        name: "Special Offers",
        icon: < BiCategory  />,	
        link: '/product?offers=special_offers',	
        subItems: []
    },
    {
        id: "4",
        name: "New Arrivals",
        icon: < BiCategory  />,
        link: '/product?offers=new_arrivals',        
        subItems: []
    },{
        id: "5",
        name: "My Account",
        icon: < BiCategory  />,   
        link:'#',     
        subItems: []
    },{
        id: "6",
        name: "About Us",
        icon: < BiCategory  />,
        link: '/aboutus',        
        subItems: []
    },{
        id: "7",
        name: "Customer Service",
        icon: < BiCategory  />,   
        link:'/customer_service',     
        subItems: []
    },{
        id: "8",
        name: "Back to Home",
        icon: < BiCategory  />,   
        link:'/',     
        subItems: []
    },
    
];

export const featureItems =[
    {
        name: "Quality WholeSale Food Supplier",
        icon: <TiTick className="text-[25px] text-secondary"/>,
        url: '#'
    },{
        name: "Exclusive Offers",
        icon: <BiSolidOffer className="text-[25px] text-secondary"/>,
        url: '/product?offers=special_offers'
    },{
        name: "Trendings",
        icon: < MdLocalOffer className="text-[25px] text-secondary"/>,
        url: '/product?offers=trending_products'
    },{
        name: "Free And Fast Delivery",
        icon: <FaTruckFast className="text-[25px] text-secondary"/>,
        url: '#'
    }
]

export const socialMediaIcons = [
    {
        id:50,
        icon:<RiYoutubeFill/>
    },{
        id:51,
        icon:< FaFacebook/>
    },{
        id:52,
        icon:<FaSquareXTwitter/>
    },{
        id:53,
        icon:<FaInstagramSquare/>
    },{
        id:54,
        icon:<AiFillTikTok/>
    }
]