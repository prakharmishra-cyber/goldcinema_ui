import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { getAuth } from 'firebase/auth';
import axios from 'axios';
import BASE_URL from '../api_url';

const Bank = () => {
    const navigate = useNavigate();
    const loc = useLocation();
    //console.log(loc);
    const auth = getAuth();
    const [details, setDetails] = useState({
        fullName: '',
        phoneNo: '',
        bankAccount: '',
        bankName: '',
        ifsc: '',
    });
    const [wpwd, setPwd] = useState('');
    const [toasterShow, setToasterShow] = useState(false);
    const [toasterText, setToasterText] = useState('');

    const getUserData = async() => {
        const docRef = await axios.post(`${BASE_URL}/get_user`, { user_id: localStorage.getItem('uid') }).then(({ data }) => data);
        if(docRef) {
            setDetails(docRef.bank_details);
            //console.log(docRef.bank_details);
        }
    }
    useEffect(()=>{
        getUserData();
    },[]);



    const toaster = (text) => {
        setToasterText(text);
        setToasterShow(true);
        setTimeout(() => {
            setToasterShow(false);
            navigate('/index/my/index.html');
        }, 5000);
    }



    const handleChange = (e) => {
        setDetails({
            ...details,
            [e.target.name]: e.target.value
        });
        //console.log(details);
    }

    const handleSubmit = async () => {
        if (loc.state.withdrawalPassword === wpwd) {
            await axios.post(`${BASE_URL}/bank_details`, { user_id: localStorage.getItem('uid'), bank_details: details })
                .then(() => {
                    toaster('Bank details added successfully!');
                })
                .catch(() => console.log('Some error Occured')
                );
        } else {
            toaster('Incorrect withdrawal password!');
        }
    }
    //[#2e9afe]
    return (
        <div className='bg-white h-screen  sm:h-[700px] md:h-[950px] relative'>
           {toasterShow?<div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
                <div className='flex gap-2 bg-black opacity-100 text-white px-2 py-1 rounded-md'>
                    <div>{toasterText}</div>
                </div>
            </div>:null}
            <div className="options text-center flex bg-cstGray p-3 border-b border-white text-white text-lg items-center font-medium">
                <svg xmlns="http://www.w3.org/2000/svg" onClick={() => navigate('/index/ctrl/set', { state: { withdrawalPassword: loc.state.withdrawalPassword, loginPassword: loc.state.loginPassword } })} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 storke-white  cursor-pointer">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                </svg>
                <div className=' flex-grow text-center'>My Bank</div>
            </div>
            {/* #757575 */}
            <div className="box mx-4 bg-white text-black p-2  mt-4 gap-2 flex flex-col">
                <div className='flex gap-2 items-center bg-recharge-bg rounded-sm  text-md p-3 m-1  cursor-pointer'>
                    <input type="text" onChange={handleChange} name='fullName' value={details.fullName} 
                    className='outline-none  w-full bg-inherit placeholder-gray-500' placeholder='Full Name' />
                </div>

                <div className='flex gap-2 items-center bg-recharge-bg text-md p-3 m-1  cursor-pointer'>
                    <input type="text" onChange={handleChange} name='phoneNo' value={details.phoneNo} className='outline-none w-full bg-inherit placeholder-gray-500' placeholder='Phone Number' />
                </div>

                <div className='flex gap-2 items-center bg-recharge-bg text-md p-3 m-1  cursor-pointer'>
                    <input type="text" onChange={handleChange} name='bankAccount' value={details.bankAccount} className='outline-none w-full bg-inherit placeholder-gray-500' placeholder='Bank Account' />
                </div>

                <div className='flex gap-2 items-center bg-recharge-bg text-md p-3 m-1  cursor-pointer'>
                    <input type="text" onChange={handleChange} name='bankName' value={details.bankName} className='outline-none w-full bg-inherit placeholder-gray-500' placeholder='Bank Name' />
                </div>

                <div className='flex gap-2 items-center bg-recharge-bg text-md p-3 m-1  cursor-pointer'>
                    <input type="text" onChange={handleChange} name='ifsc' value={details.ifsc} className='outline-none w-full bg-inherit placeholder-gray-500' placeholder='IFSC' />
                </div>

                <div className='flex gap-2 items-center bg-recharge-bg text-md p-3 m-1  cursor-pointer'>
                    <input type="text" onChange={(e) => setPwd(e.target.value)} name='wpwd' value={wpwd} className='outline-none w-full bg-inherit placeholder-gray-500' placeholder='Withdrawal Password' />
                </div>
            </div>

            <div className='mb-[1000px] mx-4'>
                <button onClick={handleSubmit} className='bg-cstGray text-white text-lg mt-5 mb-20 rounded-sm shadow-md block w-full py-2 shadow-gray-200'>Confirm</button>
            </div>
        </div>
    )
}

export default Bank