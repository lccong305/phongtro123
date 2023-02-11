import React, { memo } from 'react'
import Slider from "react-slick"

const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };

const SliderCustom = ({images}) => {
  console.log(images)
  return (
    <div className='w-full'>
        <Slider {...settings}>
            {images?.length > 0 && images?.map((item, index) =>{
              return (
                <div key={index} className='bg-black flex items-center justify-center h-[320px] px-12'>
                  <img 
                  src={item}
                  alt="slider image"
                  className="h-full object-contain m-auto"
                />
                </div>
              )
            })}
        </Slider>
    </div>
  )
}

export default memo(SliderCustom)