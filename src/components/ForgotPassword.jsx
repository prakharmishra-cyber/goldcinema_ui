import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import BASE_URL from '../api_url';

const ForgotPassword = () => {

    const navigate = useNavigate();
    const [mobno, setMobno] = useState('');
    const [otpfield, setOTPfield] = useState('');
    const [otp, setOtp] = useState('');
    //const [otpVerified, setOtpVerified] = useState(false);
    const [clickable, setClickable] = useState((otpfield == otp && otp.length > 0 && otpfield.length > 0));
    const [toasterShow, setToasterShow] = useState(false);
    const [toasterText, setToasterText] = useState('');

    const toaster = (text) => {
        setToasterText(text);
        setToasterShow(true);
        setTimeout(()=>{
            setToasterShow(false);
            //navigate('/index/my/index.html');
        },5000);
    }

    useEffect(()=>{
        document.body.style.backgroundColor = "#f7f9f8";
    },[]);

    const handleMessage = () => {
        if (mobno.length !== 10) {
            toaster('Invalid Mobile No, please enter a valid number');
            return;
        }
        fetch(`https://www.fast2sms.com/dev/bulkV2?authorization=27b58V4YOqBDMgWvNjapz1k9IHlrJfynC6w0hceRAZGoLimK3PuJC7OoiV4N2B6DjfwWKzb0lhgEetPH&variables_values=${otpfield}&route=otp&numbers=${mobno}`)
            .then((response) => {
                //console.log(response);
                toaster('OTP sent successfully');
            })
            .catch(error => toaster('Something went wrong'));
    }

    const handleReset = async () => {
        await axios.post(`${BASE_URL}/forgot_password`, {mobno: mobno}).then(({data})=>
         {
            toaster('Check Message Inbox for password');
            setOtp('');
            setOTPfield('');
            navigate('/index/user/login.html');
        })
    }
//[#0096D5] [#0096D5] [#0096D5]
    return (
        <div className='bg-white h-screen relative'>
            {toasterShow?<div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
                <div className='flex gap-2 bg-black opacity-100 text-white px-2 py-1 rounded-md text-center'>
                    <div>{toasterText}</div>
                </div>
            </div>:null}
            <div className='text-center bg-red-800 font-sans text-white pt-2 text-lg mb-10
        pb-2'> <svg xmlns="http://www.w3.org/2000/svg" onClick={() => navigate('/index/user/login.html')} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 absolute left-2 cursor-pointer hover:bg-white hover:stroke-black hover:rounded-full transition rounded-full ease-in-out delay-150 duration-200">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
                Find Password</div>
                {/* [#d3d6fe] */}
            <div className="box mb-20 border-2 m-auto border-gray-200 bg-blue-200 rounded-3xl border-solid lg:w-3/5 w-[86%] shadow-xl shadow-slate-600 p-4 w-50% flex flex-col">
                <div className="no_phone mb-3 flex items-center bg-white border-2 border-gray-100 rounded-full ">
                    <input onChange={(e) => { setMobno(e.target.value); setOTPfield(String(Math.floor(100000 + Math.random() * 900000))) }} type="number" className='p-2 w-full outline-none rounded-full' placeholder='Phone number' name="phoneno" id="phoneno" />
                    <div onClick={handleMessage} className='opt w-20 bg-red-800 mr-4 text-xs cursor-pointer  shadow-md rounded-md text-white text-center'>OTP</div>
                </div>


                <input type="password" className='p-2 mb-3 outline-none border-2 border-gray-100 rounded-full' onChange={(e) => setOtp(e.target.value)} placeholder='Please enter the OTP' name="passowrd" id="pass" />
                <button onClick={handleReset} disabled={!(otpfield == otp && otp.length > 0 && otpfield.length > 0)} className={`${(otpfield == otp && otp.length > 0 && otpfield.length > 0) ? 'bg-red-800' : 'bg-gray-500 cursor-not-allowed'} text-white pt-1 pb-1 rounded-full text-lg`}>Confirm</button>
                <div onClick={() => { navigate('/index/user/login.html') }} className='cursor-pointer text-center bg-white text-black mt-2 p-2 mb-2 border-2 border-gray-100 rounded-full'>
                    Already have an account, log in
                </div>
            </div>
        </div>
    )
}

export default ForgotPassword