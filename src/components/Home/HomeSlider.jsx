import Slide from '../Slide';
import call_api from '@/helper/Api';

export default async function HomeSlider() {
    let desktopSlider = [];
    let mobileSlider = [];
    async function getallsliderimages () {
      const result = await call_api.getallhomeslider();
      if(result.success){
        desktopSlider = result.sliders && result.sliders.filter(item => item.device === 'desktop');
        mobileSlider = result.sliders && result.sliders.filter(item => item.device === 'mobile');
        return;
      }return []
    }
  await getallsliderimages();
  return (
    <section className='sm:w-11/12 md:w-5/6 mx-auto'>
      <Slide sliderFiles = {desktopSlider} mobileImageFiles = {mobileSlider}/>
    </section>    
  )
}
