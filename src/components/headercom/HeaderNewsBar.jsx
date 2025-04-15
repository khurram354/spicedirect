import { useEffect, useState } from 'react';
import Marquee from 'react-fast-marquee';

const HeaderNewsBar = () => {
  const [slidesData, setSlidesData] = useState([]);
  const getSlidesData = async () => {
    const response = await fetch('/data/slidesData.json');
    const data = await response.json();
    if (!data) {
      console.log("feature new data not found")
      setSlidesData("");
      return;
    }
    setSlidesData(data)
  }
  useEffect(() => {
    getSlidesData();
  }, [])
  const marqueeStyle = {
    "backgroundColor": "#d41705",
    "fontSize": "13px",
    "color": "white",
    "padding": "6px"
  }
  return (
    <section className=''>
        {slidesData && slidesData.map((slideContent, index) => (
          <Marquee key={index} style={marqueeStyle}>{slideContent.description}</Marquee>
        ))}
      </section>
  )
}
export default HeaderNewsBar