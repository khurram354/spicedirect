'use client';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css/effect-fade';
import "swiper/css";
import { Autoplay, EffectFade } from "swiper/modules";
import Image from 'next/image';
import { useState, useEffect } from 'react';

const Slide = ({ sliderFiles, mobileImageFiles }) => {
    const [isMobile, setIsMobile] = useState(false);
    const [sliderImages, setSliderImages] = useState(sliderFiles || []);
    useEffect(()=>{
        const checkIsMobile = () => {
            if(window.innerWidth < 650){
                setSliderImages(mobileImageFiles);
                setIsMobile(true)
            }
        }
        checkIsMobile();
        window.addEventListener('resize', checkIsMobile);
        return window.removeEventListener('resize', checkIsMobile)
    },[]);
   
    return (
        <section className={`mt-5`}>
            <Swiper
                loop={true}
                autoplay={{
                    delay: 4000,
                    disableOnInteraction: false,
                }}
                speed={4000}
                effect='fade'
                spaceBetween={0}
                centeredSlides={true}
                modules={[Autoplay, EffectFade]}
                className='mySwiper relative'
            >
                {sliderImages.map((ele, index) => (
                    <SwiperSlide key={index}>
                        {/* <div className='lg:h-[600px]'> */}
                        <div className={`relative ${isMobile ? 'aspect-[3/3]' : 'aspect-[21/9]'} w-full`}>
                            <Image
                                // src={`${isMobile ? '/homesliderimages/mobileslider':'/homesliderimages'}/${ele}`}
                                src={`${process.env.NEXT_PUBLIC_AWS_URL}/${ele.imageurl}`}
                                // width={1280}
                                // height={800}
                                fill
                                alt="Picture of the spice direct"
                                quality={100}
                                className='object-cover w-full h-full'
                            />
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </section>
    )
}
export default Slide