import React from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';

import s1 from '../images/dew/s1.jpg';
import s2 from '../images/dew/s2.png';
import s3 from '../images/dew/s3.png';

import slide1 from '../images/vbharat/slide1.jpg';
import slide2 from '../images/vbharat/slide2.jpg';
import slide3 from '../images/vbharat/slide3.jpg';




const Slider = () => {
  return (
    <div className='sm:w-3/5 lg:w-3/5'>
      <Carousel showThumbs={false} autoPlay showArrows={true} infiniteLoop>
        <div>
          <img src={slide1} className="h-[200px]" alt="img_2" />
        </div>

        <div>
          <img src={slide2} className="h-[200px]" alt="img_2" />
        </div>

        <div>
          <img src={slide3} className="h-[200px]" alt="img_2" />
        </div>


        {/* <div>
          <img src={slide4} className="h-[200px]" alt="img_2" />
        </div> */}

        {/* <div>
          <img src={slide5} className="h-[200px]" alt="img_2" />
        </div>

        <div>
          <img src={slide6} className="h-[200px]" alt="img_2" />
        </div> */}

        {/* <div>
          <img src={slide8} className="h-[180px]" alt="img_2" />
        </div>


        <div>
          <img src={slide2} className="h-[180px]" alt="img_2" />
        </div>

        <div>
          <img src={slide5} className="h-[180px]" alt="img_2" />
        </div> */}


        {/* <div>
          <img src={slide4} className="h-[180px]" alt="img_2" />
        </div> */}

        {/* <div>
          <img src={lenscart_slide2} className="h-[180px]" alt="img_2" />
        </div>

        <div>
          <img src={lenscart_slide3} className="h-[180px]" alt="img_1" />
        </div>

        <div>
          <img src={lenscart_slide4} className="h-[180px]" alt="img_1" />
        </div>

        <div>
          <img src={lenscart_slide5} className="h-[180px]" alt="img_1" />
        </div> */}

      </Carousel>
    </div>
  )
}

export default Slider;
