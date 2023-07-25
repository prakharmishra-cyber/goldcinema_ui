import React from 'react';
// import hp_cpy_image from '../images/hp_cpy_image.jpg';
import { useNavigate } from 'react-router-dom';
import waltonbd_logo from '../images/waltonbd_logo.jpg'
import tuborg_company from '../images/tuborg_company.jpg';
import asset43 from '../images/assets4/asset 0.jpeg'
import lenskart_logo from '../images/lenskart_logo.png';
import jio from '../images/asml/jio.png'
import company2 from '../images/asml/company2.jpg'
import company3 from '../images/asml/company3.jpg'
import company4 from '../images/asml/company4.jpg'
import logo from '../images/dew/logo.webp';
import company_image from '../images/vbharat/company _image.png';
import register_logo from '../images/vbharat/register_logo.png';


const Company = () => {
    const navigate = useNavigate();
    return (
        <div className='bg-white w-full '>
            {/* [#2e9afe] */}
            <div className="options text-center text-black bg-cstGray py-2 px-1  items-center text-lg flex ">
                <svg xmlns="http://www.w3.org/2000/svg"
                    onClick={() => navigate('/index/index/home.html')} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"
                    className="w-4 h-4   storke-white  cursor-pointer stroke-black">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                </svg>
                <div className="flex-grow">News Advisory</div>
            </div>

            <div className="hp_company mt-4">
                <img src={company_image} alt="hp" className='sm:w-3/6 md:w-2/6 mx-auto' width={280} />
            </div>

            <div className='flex flex-col w-[88%] mx-auto justify-between items-center p-2'>
                <div className="flex items-center justify-between px-2 shadow-sm shadow-gray-400 py-3 mt-4 rounded-md w-full mx-auto">
                    <div className='text-sm'>News Advisory</div>
                    <div>
                        <svg xmlns="http://www.w3.org/2000/svg"
                            fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"
                            className="w-4 h-4 stroke-gray-400 rotate-180  cursor-pointer ">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                        </svg>
                    </div>
                </div>

                <div className="flex flex-col gap-2 px-2  py-2 mt-4 rounded-md w-full mx-auto">
                    <div className='font-semibold'>Britannia</div>
                    <div className="text-xs">
                        <p>Global Total Foods company. We believe that food should be both tasty and healthy, and our product portfolio reflects this vision. From our classic biscuits and cakes to our new range of healthy snacks, we are committed to offering products that are good for you and good for the planet.&nbsp;</p>

                        <p>&nbsp;</p>

                        <p>At Britannia, we are constantly working towards making exciting new products for all consumer segments and consumption&nbsp;occasions.</p>

                        <p>&nbsp;</p>

                        <p>We are committed to being a responsible and sustainable company. We believe that it is our responsibility to take care of the planet and the communities in which we operate. We champion several initiatives to reduce our environmental footprint, including using renewable energy sources, reducing packaging waste, and promoting sustainable farming practices. We also believe in giving back to the communities in which we operate.&nbsp;</p>

                        <p>&nbsp;</p>

                        <p>Through our various CSR initiatives, we have been able to make a positive impact on the lives of thousands of people across India. Our initiatives include programs for education, health, and nutrition, and we work closely with local communities to understand their needs and provide support where it is most needed. At Britannia, we believe that our success is not just measured by our financial performance but also by our impact on society and the environment.&nbsp;</p>

                        <p>&nbsp;</p>

                        <p>We are committed to being a responsible and sustainable company, and we believe that our actions today will shape the future. Britannia Industries is a company with a rich legacy and a commitment to innovation, sustainability, and responsibility. We are proud to serve a billion people across India and to provide products that are both delicious and nutritious. With our focus on R&amp;D, innovation, and sustainability, we will continue to uphold the standards of leadership in&nbsp;our&nbsp;industry.</p>

                    </div>
                    {/* <img src={lenskart_logo} alt="spacex" /> */}
                </div>
            </div>


        </div>
    )
}

export default Company