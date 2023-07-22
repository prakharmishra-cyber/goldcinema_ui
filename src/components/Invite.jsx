import React from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth } from 'firebase/auth';
import { useState, useLayoutEffect } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import QRCode from "react-qr-code";
import { useContext } from 'react';
import { AmountContext } from '../App';
import axios from 'axios';
import BASE_URL from '../api_url';

//#df1f26
const Invite = () => {
    const navigate = useNavigate();
    const auth = getAuth();
    const [userDetails, setUserDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const amountDetails = useContext(AmountContext);
    const [cb, setCb] = useState({
        value: '',
        copied: false
    });
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

    const getUserDetails = async () => {
        const details = await axios.post(`${BASE_URL}/get_user`, { user_id: localStorage.getItem('uid') })
            .then(({ data }) => data);
        setUserDetails(details);
    }

    useLayoutEffect(() => {
        document.body.style.backgroundColor = "#e1e2e4";
        getUserDetails();
        setLoading(false);
    }, []);

    if (loading || userDetails === null) {
        return (
            <div className=' bg-red-800  flex flex-col text-white font-light p-5 relative'>
                <div className="top p-1 cursor-pointer flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" onClick={() => navigate(-1)} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4  storke-white  cursor-pointer">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                    </svg>
                    <span className='ml-1 text-lg text-center flex-grow font-semibold'>Invite</span>
                </div>

                <div className="info  sm:text-xs md:text-md flex flex-col gap-2 rounded-lg bg-white mt-5">
                    <div className='text-left bg-red-800 font-semibold rounded-t-lg text-white text-lg border-b pl-2 py-2 border-red-800'>Invitation Rewards:</div>
                    <span className='p-2 text-black font-semibold text-sm'>
                        Level 1 = <span className='text-red-600'> %</span>
                        <br />
                        Level 2 = <span className='text-red-600'> %</span>
                        <br />
                        Level 3 = <span className='text-red-600'> %</span>
                    </span>
                </div>

                <div className="flex gap-2 mt-[40px]">

                    <div className="info w-1/2 p-3 sm:text-xs md:text-md flex flex-col rounded-2xl bg-white text-black font-bold mt-5">
                        <div className='font-bold text-sm'>Invitation Link</div>
                        <div className='py-1 px-1 text-xs rounded-md border overflow-hidden border-gray-400 mt-2'>{` `}</div>
                        <CopyToClipboard text={` `} onCopy={() => toaster('copy success')}>
                            <span className='w-[80px] text-sm text-center bg-red-800 text-white p-2'>copy</span>
                        </CopyToClipboard>
                    </div>

                    <div className="info w-1/2 p-3 sm:text-xs md:text-md flex flex-col rounded-2xl bg-white text-black font-bold mt-5">
                        <div className='font-bold text-sm'>Invitation code</div>
                        <div className='py-1 px-1 text-xs rounded-md border border-gray-400 mt-2'>{' '}</div>
                        <CopyToClipboard text={' '} onCopy={() => toaster('copy success')}>
                            <span className='w-[80px] text-sm text-center bg-red-800 text-white p-2'>copy</span>
                        </CopyToClipboard>
                    </div>
                </div>
            </div>
        )
    }
    //[#2e9afe]
    return (
        <div className=' bg-[#e1e2e4]  flex flex-col text-white font-light p-5 relative'>
            {toasterShow ? <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
                <div className='flex gap-2 bg-black opacity-80 text-white px-2 py-1 rounded-md'>
                    <div>{toasterText}</div>
                </div>
            </div> : null}
            <div className="top p-1 cursor-pointer flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" onClick={() => navigate(-1)} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4  storke-white  cursor-pointer">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                </svg>
                <span className='ml-1 text-lg text-center flex-grow font-semibold'>Invite</span>
            </div>

            <div className="info  sm:text-xs md:text-md flex flex-col gap-2 rounded-lg bg-white mt-5">
                {/* <div className='text-left bg-red-800 font-semibold rounded-t-lg text-white text-lg border-b pl-2 py-2 border-red-800'>Invitation Rewards:</div> */}
                <span className='p-3 text-black font-semibold text-md'>
                  respected user. Hello, welcome to vandebharat company, where you
                  can experience the fastest withdrawal speed, the best service attitude,
                  the biggest rebate reward, and the safest fund guarantee. If you are A, 
                  and your subordinates are B, C, and D, invite friends to join, the product rebate rules are: 
                  B=20%, C=3%, D=2%
                             
                </span>
            </div>

            <div className="flex flex-col mt-1">

                <div className="info  p-3 sm:text-xs md:text-md flex flex-col rounded-2xl bg-white text-black font-bold mt-1">
                    <div className='font-bold text-sm'>Invitation Link</div>
                    <div className='py-2 px-1 text-xs rounded-md border overflow-hidden border-gray-400 mt-2'>{`https://goldcinema-ui.vercel.app/index/user/register/invite_code/${userDetails.user_invite+'.html'}`}</div>
                    <CopyToClipboard text={`https://goldcinema-ui.vercel.app/index/user/register/invite_code/${userDetails.user_invite+'.html'}`} onCopy={() => toaster('copy success')}>
                        <span className='w-[80px] text-sm text-center bg-red-800 text-white p-2'>copy</span>
                    </CopyToClipboard>
                </div>

                <div className="info  p-3 sm:text-xs md:text-md flex flex-col rounded-2xl bg-white text-black font-bold mt-1">
                    <div className='font-bold text-sm'>Invitation code</div>
                    <div className='py-2 px-1 text-xs rounded-md border border-gray-400 mt-2'>{userDetails.user_invite}</div>
                    <CopyToClipboard text={userDetails.user_invite} onCopy={() => toaster('copy success')}>
                        <span className='w-[80px] text-sm text-center bg-red-800 text-white p-2'>copy</span>
                    </CopyToClipboard>
                </div>
            </div>


            <div className="qr mx-auto flex flex-col justify-center items-center mt-1 p-1 bg-[#e1e2e4] rounded-md">
                <QRCode
                    size={140}
                    style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                    value={`https://goldcinema-ui.vercel.app/index/user/register/invite_code/${userDetails.user_invite+'.html'}`}
                    viewBox={`0 0 120 120`}
                />
                <div className='text-[#e1e2e4] font-extrabold text-center mt-1'>QR code</div>
            </div>
        </div>
    )
}

export default Invite