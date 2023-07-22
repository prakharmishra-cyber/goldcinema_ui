import React, { useEffect, useState } from 'react';
import { useContext, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { AmountContext } from '../App';


const Recharge = () => {

    const [recharge_value, setRecharge_Value] = useState(0);
    const navigate = useNavigate();
    const amountDetails = useContext(AmountContext);
    const [toasterShow, setToasterShow] = useState(false);
    const [toasterText, setToasterText] = useState('');
    const valueRef = useRef();

    const toaster = (text) => {
        setToasterText(text);
        setToasterShow(true);
        setTimeout(() => {
            setToasterShow(false);
            //navigate('/index/my/index.html');
        }, 5000);
    }

    useEffect(()=>{
        document.body.style.backgroundColor = "white";
    },[]);

    const handleRecharge = () => {
        if (parseInt(recharge_value)) {
            if (Number(amountDetails.amount) > Number(recharge_value)) {
                toaster(`Amount should be greater than ₹${amountDetails.amount}`);
                return;
            }
            navigate(`/recharge_window/${recharge_value}`);
        } else {
            alert('Enter a valid recharge amount');
        }
    }
    //[#2e9afe] #4daaff #298ae4 [#2e9afe]
    return (
        <div className='bg-recharge-bg h-screen relative'>
            {toasterShow ? <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
                <div className='flex gap-2 bg-black opacity-100 text-white px-2 py-1 rounded-md'>
                    <div>{toasterText}</div>
                </div>
            </div> : null}

            <div className="options text-center  text-recharge-bg flex  bg-recharge-bg text-md  font-normal mb-2 py-2 items-center px-2">
                <svg xmlns="http://www.w3.org/2000/svg"
                     fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"
                    className="w-4 h-4   storke-white  cursor-pointer stroke-white">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                </svg>
                <div className='flex-grow font-bold'>Recharge</div>
            </div>

            <div className="options text-center mx-3 my-3 text-black flex  bg-[#e1e2e4] text-md  mb-2 py-3 items-center px-2">
                    <svg xmlns="http://www.w3.org/2000/svg"
                        onClick={() => navigate(-1)} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"
                        className="w-4 h-4   storke-black  cursor-pointer">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                    </svg>
                    <div className='flex-grow text-center'>Recharge</div>
                </div>

            <div className="box bg-white text-red-800 px-4 py-4 shadow-md shadow-gray-300 mx-3">

               

                <div className='m-1 text-sm text-gray-500 mb-4 '>Enter Amount:</div>
                <div className='m-1 w-full flex items-center border-b border-gray-300 pb-2'>
                    <span className='text-red-700 font-bold p-0.5 text-[12px] pr-1 '>₹</span>
                    <input ref={valueRef} onChange={(e) => setRecharge_Value(e.target.value)} type="text"  name="amount" id="amt" placeholder='Amount' className='w-full bg-inherit text-red-800 outline-none font-normal text-lg ' />
                </div>

                <div className='grid grid-cols-2 gap-2 mx-4 pb-3 pt-1 text-sm'>
                    <div className='text-red-500 border border-gray-400 text-center py-1 cursor-pointer' onClick={()=>{setRecharge_Value(500); valueRef.current.value=500;}}>500₹</div>
                    <div className='text-red-500 border border-gray-400 text-center py-1 cursor-pointer' onClick={()=>{setRecharge_Value(1000); valueRef.current.value=1000;}}>1000₹</div>
                    <div className='text-red-500 border border-gray-400 text-center py-1 cursor-pointer' onClick={()=>{setRecharge_Value(2000); valueRef.current.value=2000;}}>2000₹</div>
                    <div className='text-red-500 border border-gray-400 text-center py-1 cursor-pointer' onClick={()=>{setRecharge_Value(3000); valueRef.current.value=3000;}}>3000₹</div>
                    <div className='text-red-500 border border-gray-400 text-center py-1 cursor-pointer' onClick={()=>{setRecharge_Value(5000); valueRef.current.value=5000;}}>5000₹</div>
                    <div className='text-red-500 border border-gray-400 text-center py-1 cursor-pointer' onClick={()=>{setRecharge_Value(20000); valueRef.current.value=20000;}}>20000₹</div>
                    <div className='text-red-500 border border-gray-400 text-center py-1 cursor-pointer' onClick={()=>{setRecharge_Value(50000); valueRef.current.value=50000;}}>50000₹</div>
                    <div className='text-red-500 border border-gray-400 text-center py-1 cursor-pointer' onClick={()=>{setRecharge_Value(100000); valueRef.current.value=100000;}}>100000₹</div>
                </div>

                <div className="cnf_recharge w-[85%] mx-auto mt-7">
                    <button onClick={handleRecharge} className='w-full bg-red-800 py-2 rounded-md text-white text-xl '>Confirm recharge</button>
                </div>

                <ol className='text-red-800 text-[13px] flex flex-col mt-2'>
                    <li className='mt-1 my-1 mr-1'>1:Follow the recharge video operation to help you quickly recharge successfully.</li>
                    <li className='mt-1 my-1 mr-1'>2:If the funds do not arrive in time, please contact the APP online customer service immediately.</li>
                    <li className='mt-1 my-1 mr-1'>3:Only the online customer service obtained in the APP is authentic and credible, do not trust impostors outside the APP.</li>
                    <li className='mt-1 my-1 mr-1'>4:Fill in the UTR number correctly, the funds will arrive soon.</li>
                </ol>

            </div>


        </div>
    )
}

export default Recharge