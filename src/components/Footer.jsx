import Link from "next/link";
import { socialMediaIcons } from "./headercom/MobileMenuItem";
import Image from "next/image";
import { FooterBottomMenu } from "./footercom/FooterMenu";
import FooterLinks from "./footercom/FooterLinks";
import PromotionEmail from "./footercom/PromotionEmail";

const Footer = () => {
  return (
    <>
      <footer className="bg-white">
        <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="lg:flex lg:items-start lg:gap-8">
            <div className="w-48 h-42">
              <Image
                src="/logo/spicedirect_logo.png"
                width={500}
                height={500}
                alt="Picture of the author"
                className="w-full h-full object-contain"
              />
            </div>
            <div className="mt-8 grid grid-cols-2 gap-8 lg:mt-0 lg:grid-cols-5 lg:gap-y-16">
              <div className="col-span-2">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Get the latest news!</h2>
                  <p className="mt-4 text-gray-500">
                    Sign up to receive the latest offers and exclusive sales updates!
                  </p>
                </div>
              </div>
              <PromotionEmail/>
              <FooterLinks/>
              <ul className="col-span-2 flex justify-start gap-6 lg:col-span-5 lg:justify-end">
                {
                  socialMediaIcons && socialMediaIcons.map((item, index) => (
                    <li key={index}>
                      <Link
                        href="/"
                        className="text-primary transition hover:text-secondary text-2xl"
                      >
                        {item.icon}
                      </Link>
                    </li>
                  ))
                }
              </ul>
            </div>
          </div>
          <div className="mt-8 border-t border-gray-100 pt-8">
            <div className="sm:flex sm:justify-between">
              <p className="text-xs text-gray-500">&copy; 2025. Spice Direct Wholesale. All rights reserved.</p>
              <ul className="mt-8 flex flex-wrap justify-start gap-4 text-xs sm:mt-0 lg:justify-end">
                {
                  FooterBottomMenu && FooterBottomMenu.map((itm, index) => (<li key={index}>
                    <Link href={`${itm.link}`} className="text-gray-700 transition hover:text-secondary"> {itm.subItemName} </Link>
                  </li>))
                }
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}
export default Footer