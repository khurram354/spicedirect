import { FooterMenu } from "./FooterMenu";
import Link from "next/link";

const FooterLinks = () => {
    return (
        <>
            {
                FooterMenu && FooterMenu.map((fmenu, index) => (
                    <div className="col-span-2 sm:col-span-1" key={index}>
                        <p className="font-medium text-gray-900">{fmenu.name}</p>
                        {
                            fmenu && fmenu.subitems.map((item, index) => (
                                <ul className="mt-6 space-y-4 text-sm" key={index}>
                                    <li>
                                        <Link href={`${item.link}`} className="text-medium transition hover:text-secondary text-gray-600 font-medium"> {item.subItemName} </Link>
                                    </li>
                                </ul>
                            ))
                        }
                    </div>
                ))
            }
        </>
    )
}

export default FooterLinks