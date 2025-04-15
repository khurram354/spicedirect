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
                        <div className='lg:h-[600px]'>
                            <Image
                                // src={`${isMobile ? '/homesliderimages/mobileslider':'/homesliderimages'}/${ele}`}
                                src={`/images/homeslider/${ele.imageurl}`}
                                width={1280}
                                height={800}
                                alt="Picture of the author"
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