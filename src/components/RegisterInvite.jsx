import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import referralCodeGenerator from 'referral-code-generator'
import db from '../firebase/config.js';
import { setDoc, doc, updateDoc, query, collection, where, getDocs, getDoc, arrayUnion, increment } from "firebase/firestore";
import { useContext } from 'react';
import { AmountContext } from '../App';
import close_eye from '../images/close_eye.png';
import { RotatingLines } from 'react-loader-spinner';
import apache_logo from '../images/apache_logo.png';
import BASE_URL from '../api_url.js';
import axios from 'axios';
import amaz_logi from '../images/amaz_logi.png';
import { PhoneAndroid, VerifiedUserOutlined, LockOutlined } from '@material-ui/icons';
import { Typography } from '@material-ui/core';
import wind_login from '../images/wind_login.jpg'
import lenskart_logo from '../images/lenskart_logo.png';
import tuborg_logo from '../images/tuborg_logo.svg';
import jio from '../images/asml/jio.png';
import logo from '../images/dew/logo.webp';
import register_logo from '../images/vbharat/register_logo.png';


const Register = () => {

    const navigate = useNavigate();
    const auth = getAuth();
    const {invite_code} = useParams();
    const [otp, setOtp] = useState('');
    const [otpfield, setOTPfield] = useState('');
    const [mobno, setMobno] = useState('');
    const [pwd, setpwd] = useState('');
    const [cpwd, setCpwd] = useState('');
    const [wpwd, setwpwd] = useState('');
    const [invt, setInvt] = useState(invite_code);
    const amountDetails = useContext(AmountContext);
    const [loading, setLoading] = useState(false);
    const [text, setText] = useState('Loading');
    const [toasterShow, setToasterShow] = useState(false);
    const [toasterText, setToasterText] = useState('');

    const toaster = (text) => {
        setToasterText(text);
        setToasterShow(true);
        setTimeout(() => {
            setToasterShow(false);
            //navigate('/index/my/index.html');
        }, 5000);
    }

    useEffect(() => {
        document.body.style.backgroundColor = "white";
        setInvt(invite_code.replaceAll('.html',''));
    }, []);

    const handleRegister = async () => {

        if (mobno.length != 10) {
            toaster('Invalid Mobile Number');
            return;
        }

        if (pwd !== cpwd) {
            toaster('Passwords do not match!');
            return;
        }

        if (pwd.length < 6) {
            toaster('Password must contain at least 6 characters!');
            return;
        }

        // if (otp !== otpfield) {
        //     toaster('Wrong OTP entered!');
        //     return;
        // }
        //console.log({ mobno, pwd, cpwd, wpwd, invt });
        setLoading(true);
        await axios.post(`${BASE_URL}/register`, { mobno, pwd, wpwd, invt })
            .then(({ data }) => {
                if (data.message === 'Mobile Number already registered!') {
                    setText('Mobile Number already registered!');
                    setTimeout(() => {
                        setLoading(false);
                    }, 2000);
                } else {
                    setText('Registration Successful!');
                    localStorage.setItem('uid', data.user_id);
                    setMobno('');
                    setpwd('');
                    setCpwd('');
                    setwpwd('');
                    setInvt('');
                    setTimeout(() => {
                        navigate('/index/user/login.html');
                        setLoading(false);
                    }, 2000);
                }
            })
            .catch((error) => {
                toaster('Something went wrong');
                console.error(error);
            });
    }

    const handleOTPSend = (otpGenerated) => {
        //console.log(referralCodeGenerator.alpha('lowercase', 6));
        if (mobno.length !== 10) {
            toaster('Invalid Mobile Number');
            return;
        }
        setOTPfield(otpGenerated)
        fetch(`https://www.fast2sms.com/dev/bulkV2?authorization=27b58V4YOqBDMgWvNjapz1k9IHlrJfynC6w0hceRAZGoLimK3PuJC7OoiV4N2B6DjfwWKzb0lhgEetPH&variables_values=${otpGenerated}&route=otp&numbers=${mobno}`)
            .then((response) => {
                //console.log(response);
                toaster('OTP sent successfully');
            })
            .catch(error => toaster('Something went wrong'));
    }
    //[#0096D5]
    return (
        <div className='relative bg-white'>
        {toasterShow ? <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
            <div className='flex gap-2 bg-black opacity-80 text-white px-2 py-1 rounded-md'>
                <div>{toasterText}</div>
            </div>
        </div> : null}
        {loading ? <div className='flex gap-2 bg-black text-white py-2 px-2  rounded-md opacity-100 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
            {text === 'Loading' ? <div>
                <RotatingLines strokeColor='white' width='20' />
            </div> : null}
            <div className='text-sm'>{text}</div>
        </div> : null}
        <div className='flex items-center text-center bg-[#e1e2e4] font-sans text-white pt-2 text-lg pb-2'> 
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="black" className="w-6 h-6 absolute left-2 opacity-50 cursor-pointer hover:bg-white hover:stroke-black hover:rounded-full transition rounded-full ease-in-out delay-150 duration-200">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
            <div className='flex-grow font-[400]'>Register</div>
        </div>
        <div className='text-center'>
            <img src={register_logo} alt="hp_logo" className='m-auto md:w-2/6 sm:w-1/6 mt-5 mb-4 w-[157px]' />
        </div>
        <div style={{ boxShadow: "0 0.053333rem 0.533333rem 0.053333rem #dfdfdf" }} className="box mb-20   gap-2 m-auto  rounded-xl lg:w-2/5 w-[88%]  p-4 w-50% flex flex-col">
            <div className='outline-none flex items-center justify-between mb-2  rounded-full border border-gray-200'>
                <div className='w-full cstm_b rounded-full px-2'>
                    <input value={mobno} onChange={e => setMobno(e.target.value)} type="text"
                        className=' p-[7px] w-full  outline-none rounded-full rounded-tr-full placeholder-gray-600 placeholder:text-[14px]' placeholder='Phone number' name="phoneno" id="phoneno" />
                </div>
            </div>
            {/* <div className='flex border-b-2 border-gray-300 rounded-full mb-2 px-2 bg-white'>
            <input type="text" onChange={e => setOtp(e.target.value)} className='p-2 w-[90%] outline-none rounded-full' placeholder='Please enter the OTP' name="otp" id="otp" />
            <button className='bg-red-800 text-white text-xs mr-1 px-4 my-1  rounded-full' onClick={() => handleOTPSend(String(Math.floor(100000 + Math.random() * 900000)))}>OTP</button>
        </div> */}
            <div className=' flex justify-between bg-white items-center mb-2 outline-none cstm_b  rounded-full px-2 border border-gray-200'>
                <input value={pwd} onChange={e => setpwd(e.target.value)} type="password"
                    className='p-[7px] outline-none  rounded-full w-[90%] placeholder-gray-600 placeholder:text-[14px]' placeholder='Please enter login password' name="passowrd" id="pass" />
                <img src={close_eye} alt="close_eye" width={30} className="p-1" />
            </div>

            <div className='flex justify-between bg-white items-center mb-2 outline-none cstm_b rounded-full px-2 border border-gray-200'>
                <input value={cpwd} onChange={e => setCpwd(e.target.value)} type="password"
                    className='p-[7px] outline-none  rounded-full w-[90%] placeholder-gray-600 placeholder:text-[14px]' placeholder='Please confirm the login password' name="cnfpass" id="cnfpass" />
                <img src={close_eye} alt="close_eye" width={30} className="p-1" />
            </div>

            <div className='flex justify-between bg-white items-center mb-2 outline-none cstm_b rounded-full px-2 border border-gray-200'>
                <input value={wpwd} onChange={e => setwpwd(e.target.value)} type="password"
                    className='p-[7px] outline-none  rounded-full w-[90%] placeholder-gray-600 placeholder:text-[14px]' placeholder="Please enter the Withdrawal password" name="withpassword" id="wthpass" />
                <img src={close_eye} alt="close_eye" width={30} className="p-1" />
            </div>

            <div className='flex justify-between bg-white items-center mb-2 outline-none cstm_b rounded-full px-2 border border-gray-200'>
                <input value={invt} onChange={e => setInvt(e.target.value)} type="text"
                    className='p-[7px] outline-none  rounded-full w-[90%] placeholder-gray-600 placeholder:text-[14px]' placeholder='Invitation code' name="invite_code" id="inv_code" />
            </div>


            <button onClick={handleRegister} className='bg-red-800 text-white text-center py-[7px]   rounded-full text-lg'>REGISTER</button>
            <div onClick={() => navigate('/index/user/login.html')} className='cursor-pointer text-center text-black  p-[7px] mb-2 bg-white  rounded-full border border-gray-200'>
                Already have an account, log in
            </div>
        </div>
    </div>
    )
}

export default Register