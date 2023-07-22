import React from 'react';
// import hp_cpy_image from '../images/hp_cpy_image.jpg';
import { useNavigate } from 'react-router-dom';
import waltonbd_logo from '../images/waltonbd_logo.jpg'
import tuborg_company from '../images/tuborg_company.jpg';
import asset43 from '../images/assets4/asset 0.jpeg'
import lenskart_logo from '../images/lenskart_logo.png';
import jio from '../images/asml/jio.png'
import company from '../images/asml/company.jpg'
import company2 from '../images/asml/company2.jpg'
import company3 from '../images/asml/company3.jpg'
import company4 from '../images/asml/company4.jpg'
import logo from '../images/dew/logo.webp';
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
                <img src={register_logo} alt="hp" className='sm:w-3/6 md:w-2/6 mx-auto' width={280} />
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
                    <div className='font-semibold'>Gold Cinema</div>
                    <div className='text-xs'>
                        About Time: In early 1980s, Time made its beginning as Time Magnetic, the first in India to manufacture pre-recorded video cassettes. Time Audio followed with publishing film music audio. In 1997, all of Time's activities were integrated under Time Media and Entertainment Pvt. Ltd. In the late 1990s, Time was involved in the licensing of film video content to numerous TV channels as it held a large library of titles with copyrights. Film production seemed like a natural progression.Time produced hits such as Vijay Path, Sabse Bada Khiladi, Krishna, Khiladiyon Ka Khiladi, Kurukshetra, Hu Tu Tu, Jodi No. 1, The Hero-Love Story of a Spy and many other titles. Television came next and serials like Dishayen, Khushiyaan and others were produced for Doordarshan. Time's gamut of businesses included film distribution and saw success with Gadar-Ek Prem Katha on the Bombay circuit.
                        About Prachar: Prachar Communications Ltd. Is a venture committed to making publicity profitable for all its clients. Established in 1994, the company has seen phenomenal growth in a short span of time. It specializes in media planning, buying, and selling; developing marketing and advertising strategy; co-coordinating market research; designing and executing creative campaigns; and producing television commercials.




                    </div>
                    {/* <img src={lenskart_logo} alt="spacex" /> */}
                </div>
            </div>


        </div>
    )
}

export default Company