import wind_turbines from '../images/wind-turbines.svg';
import wind from '../images/wind.jpg';
import React from 'react';
import asset9 from '../images/asml/asset 4.jpeg';
import register_logo from '../images/vbharat/register_logo.jpg';
import card_image from '../images/vbharat/card_image.png';

//[#0096D5] [#00bcd4]


const Card = ({ pre_sale, long_plan_state, product_type, product_image, plan_name, plan_type, plan_amount, plan_daily_earning, plan_cycle, handleClick }) => {


  return (
    <div className='  bg-[#fafff9]  shadow-cardShadow pb-1'  >
      {/* <div className="title text-[#464945] font-bold text-lg">{plan_name}</div>         */}
      <div className="info text-xs flex flex-col items-center">
        <img src={product_image} alt="comp_img" className=' h-[230px] w-full mb-1' />
        <div className="title text-black w-full px-3 ml-1   font-semibold text-2xl">{plan_name}</div>
        {/* {product_type === 'long' && (<div className="text-xs font-black text-center px-1 ml-1 w-full  text-red-800 ">Daily Income, Daily Withdrawals</div>)} */}
        {/* {product_type==='short' && (<div className="text-xs p-1 w-full  text-red-500 font-extrabold">Daily Income, Daily Withdrawals</div>)} */}
        <div className="w-full bg-red-800 h-1"></div>
        <div className=' w-full grid grid-cols-2 px-2 py-1 gap-2 text-[11px]'>
          <div className="basic_info flex justify-start gap-1 bg-white text-black">
            <div className='font-bold'>Price:</div>
            <div className=' text-black font-bold'>&#8377;{new Intl.NumberFormat().format(plan_amount)}</div>
          </div>
          <div className="basic_info text-black flex justify-start gap-1 bg-white ">
            <div className='font-bold'>Daily Profit:</div>
            <div className='text-black font-bold'>&#8377;{new Intl.NumberFormat().format(plan_daily_earning)}</div>
          </div>
          <div className="basic_info text-black flex justify-start gap-1 bg-white">
            <div className='font-bold'>Total income:</div>
            <div className='text-black font-bold'>&#8377;{new Intl.NumberFormat().format(plan_cycle * plan_daily_earning)}</div>
          </div>
          <div className="basic_info text-black flex justify-start gap-1 bg-white ">
            <div className='font-bold'>Time:</div>
            <div className='text-black font-bold'>{plan_cycle} days</div>
          </div>

        </div>

        {/* {(plan_name==='Walton Plan 6' || plan_name==='Walton Plan 7' || plan_name==='Walton Plan 8' )?<div className="cursor-pointer btn text-white text-center p-2 mt-1 text-lg rounded-md  w-4/5 mx-auto bg-red-400"
            >Click to buy</div>: */}
      </div>

      {pre_sale === true ? (
        <div className="cursor-pointer btn text-black font-semibold text-center  py-2  px-2 mt-5 text-md mb-2 shadow-md  w-[55%] mx-auto bg-pre_sale">
          Pre-Sale
        </div>
      ) : null}

      {/* {console.log(pre_sale, product_type, long_plan_state)} */}

      {
        pre_sale === false ? (
          product_type === 'long' ? (
            <div className="rounded-full cursor-pointer btn text-white font-semibold text-center  py-2  px-2 mt-5 text-md mb-2 shadow-md  w-[85%] mx-auto bg-red-800"
              onClick={() => handleClick(product_type, plan_name, plan_type, plan_amount, plan_daily_earning, plan_cycle)}>
              click to buy
            </div>
          ) : (long_plan_state === true)  ? (
            <div className="rounded-full cursor-pointer btn text-white font-semibold text-center  py-2  px-2 mt-5 text-md mb-2 shadow-md  w-[85%] mx-auto bg-red-800">
              click to buy
            </div>
          ) : (
            <div className="rounded-full cursor-pointer btn text-white font-semibold text-center  py-2  px-2 mt-5 text-md mb-2 shadow-md  w-[85%] mx-auto bg-red-800"
              onClick={() => handleClick(product_type, plan_name, plan_type, plan_amount, plan_daily_earning, plan_cycle)}>
              click to buy
            </div>
          )
        ) : null
      }

      {/* <div className="cursor-pointer btn text-white font-semibold text-center  py-2  px-2 mt-5 text-md mb-2 shadow-md  w-[55%] mx-auto bg-red-700"
        onClick={() => handleClick(product_type, plan_name, plan_type, plan_amount, plan_daily_earning, plan_cycle)}>
        Buy Now
      </div> */}

    </div>
  )
}

export default Card