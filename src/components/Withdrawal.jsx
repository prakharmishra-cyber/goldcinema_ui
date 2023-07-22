import React from 'react';
import { useState, useEffect } from 'react';
import { getAuth } from 'firebase/auth';
import { doc, getDoc, collection, addDoc, Timestamp, updateDoc } from 'firebase/firestore';
import db from '../firebase/config.js';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useContext } from 'react';
import { AmountContext } from '../App.js';
import DateDifference from '../utility/DateDifference.js';
import ReactModal from 'react-modal';
import axios from 'axios';
import BASE_URL from '../api_url.js';


const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};


const Withdrawal = () => {

    const navigate = useNavigate();
    const loc = useLocation();
    const auth = getAuth();
    const amountDetails = useContext(AmountContext)
    const [otp, setOtp] = useState('');
    const [otpfield, setOTPfield] = useState('');
    const [balance, setBalance] = useState();
    const [wpassword, setWpassword] = useState('');
    const [wamount, setWamount] = useState(0);
    const [diffDays, setDiffDays] = useState(0);
    // const [btnActive, setBtnActive] = useState(true);
    const [details, setDetails] = useState({
        fullName: '',
        phoneNo: '',
        bankAccount: '',
        bankName: '',
        ifsc: '',
    });
    const [toasterShow, setToasterShow] = useState(false);
    const [toasterText, setToasterText] = useState('');
    const [modalIsOpen, setIsOpen] = useState(false);

    const toaster = (text, arg='') => {
        setToasterText(text);
        setToasterShow(true);
        setTimeout(()=>{
            setToasterShow(false);
            if(arg==='/index/my/caiwu') {
                setIsOpen(false);
                navigate('/index/my/caiwu');
            }
            if(arg==='/index/my/bind_bank.html') {
                navigate('/index/my/bind_bank.html', { state: { withdrawalPassword: loc.state.withdrawalPassword, loginPassword: loc.state.loginPassword } });
            }
        },2000);
    }

    useEffect(() => {
        const getDetails = async () => {
            const docRef = await axios.post(`${BASE_URL}/get_user`, {user_id: localStorage.getItem('uid')}).then(({data})=>data);
            if (docRef) {
                if (docRef.bank_details.bankAccount.length===0) {
                    toaster('Unbound bank card, go to bind!', '/index/my/bind_bank.html');
                } else {
                    setDetails(docRef.bank_details);
                    docRef.balance ? setBalance(docRef.balance) : setBalance(0);
                    setDiffDays(DateDifference(new Date(docRef.lastWithdrawal), new Date()));
                }
            } else {
                console.log('Something went wrong');
            }
        }
        getDetails();
        document.body.style.backgroundColor = "#f2f2f2";
        
    }, []);


    const handleWithdrawalAmount = (e) => {
        setWamount(e.target.value);
    }

    const openModal = () => {
        setIsOpen(true);
    }

    const handleWithdrawal = async () => {

        if (Number(wamount) === false || Number(wamount) <= 0) {
            toaster('Enter a valid number');
            return;
        }

        if ((Number(wamount)) < Number(amountDetails.mwamount)) {
            //console.log((Number(wamount)+Number(amountDetails.withdrawal_fee)), Number(amountDetails.mwamount));
            toaster(`Amount should be greater than ${amountDetails.mwamount}`);
            //console.log(wamount, amountDetails.amount);
            return;
        }

        if ((Number(wamount) > 50000)) {
            toaster('Amount should not be greatr than Rs 50,000');
            return;
        }

        if (((Number(wamount)) > Number(balance))) {
            toaster('You dont have enough balance');
            return;
        }
//&& otp === otpfield
        if (wpassword === loc.state.withdrawalPassword ) {
            try {
                //const docRef1 = 
                var temp_details = details;
                delete temp_details._id;
                await axios.post(`${BASE_URL}/place_withdrawal`, { 
                    withdrawalAmount: (Number(wamount)), 
                    ...temp_details, 
                    afterDeduction: (Number(wamount) - (Number(amountDetails.withdrawal_fee) * Number(wamount) / 100)), 
                    user_id: localStorage.getItem('uid'), 
                    time:new Date(),
                    balance: balance,
                    status: 'pending' 
                }).then(()=>{
                toaster('Withdrawal request placed successfully!', '/index/my/caiwu');
                setIsOpen(false);
                }).catch(e=>{
                    console.log(e);
                })
                
            } catch (e) {
                console.error("Error adding document: ", e);
                
            }
        } else {
            toaster('Withdrawal Password is incorrect');
            //console.log(wpassword, loc.state.withdrawalPassword);
        }

    }

    const handleOTPSend = (otpGenerated) => {


        setOTPfield(otpGenerated);
        //console.log(otpGenerated);
        fetch(`https://www.fast2sms.com/dev/bulkV2?authorization=27b58V4YOqBDMgWvNjapz1k9IHlrJfynC6w0hceRAZGoLimK3PuJC7OoiV4N2B6DjfwWKzb0lhgEetPH&variables_values=${otpGenerated}&route=otp&numbers=${details.phoneNo}`)
            .then((response) => {
                //console.log(response);
                toaster('OTP sent successfully');
            })
            .catch(error => toaster('Something went wrong'));
    }

    const handleWithdrawalAll = () => {
        document.getElementById('withdrawal_field').value = balance;
        setWamount(balance);
    }

    const isBetween = () => {
        var startTime = '9:00:00';
        var endTime = '18:00:00';

        var currentDate = new Date()

        var startDate = new Date(currentDate.getTime());
        startDate.setHours(startTime.split(":")[0]);
        startDate.setMinutes(startTime.split(":")[1]);
        startDate.setSeconds(startTime.split(":")[2]);

        var endDate = new Date(currentDate.getTime());
        endDate.setHours(endTime.split(":")[0]);
        endDate.setMinutes(endTime.split(":")[1]);
        endDate.setSeconds(endTime.split(":")[2]);


        var valid = startDate < currentDate && endDate > currentDate;
        //console.log(valid);
        return valid;
    }

    const handleLastButton = () => {
        openModal();
    }
    //[#2e9afe]
    return (
        <div className='bg-withdraw flex flex-col  sm:h-[1000px] md:h-[950px] relative'>
            {toasterShow?<div className='absolute top-1/2 w-full left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
                <div className='flex gap-2 bg-black w-[80%] mx-auto  opacity-100 text-white px-2 py-1 rounded-md'>
                    <div className='text-center'>{toasterText}</div>
                </div>
            </div>:null}
            <div>
                <ReactModal
                    isOpen={modalIsOpen}
                    style={customStyles}
                    contentLabel="Are You Sure"
                    ariaHideApp={false}

                >
                    <h1 className='text-gray-600 mb-3 text-xl'>Are you Sure?</h1>
                    <div>
                        <button onClick={() => handleWithdrawal()} className='bg-red-800 text-white px-2 py-1 rounded-lg shadow-md w-[64px]'>Yes</button>
                        <button onClick={() => setIsOpen(false)} className='bg-red-800 text-white px-2 py-1 rounded-lg shadow-md w-[64px] ml-2'>cancel</button>
                    </div>
                </ReactModal>
            </div>
            <div className="options flex bg-cstGray items-center text-center text-white text-lg py-2 px-1 font-normal">
            <svg xmlns="http://www.w3.org/2000/svg"
                    onClick={() => navigate('/index/index/home.html')} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"
                    className="w-5 h-5   storke-white  cursor-pointer stroke-black">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                </svg>
                <div className='flex-grow text-black'>Withdraw</div>
            </div>
{/*| After Deduction} | Rs.{(Number(wamount) - (Number(amountDetails.withdrawal_fee) * Number(wamount) / 100))}*/}
            <div className="part1 bg-white p-3 rounded-lg mx-3 mt-2">
                <div className='text-cstGray px-2 my-1 text-xs rounded-full border border-cstGray inline'>Tax {amountDetails.withdrawal_fee}% </div>
                <div className='flex items-center justify-start gap-2 my-1'>
                    <div className='text-cstGray text-xl'>&#8377;</div>
                    <div className="value"> <input type="number" id="withdrawal_field" onChange={handleWithdrawalAmount} className='w-full text-xl placeholder-gray-400 outline-none bg-white py-2' placeholder='Amount' /></div>
                </div>
                <div className='flex items-center justify-start gap-4 mt-4 mb-1'>
                    <div className="balance text-gray-400  text-xs">Assets: &#8377;{Math.floor(balance)}</div>
                    <div onClick={handleWithdrawalAll} className="withdraw font-medium text-cstGray text-sm cursor-pointer">Withdraw all</div>
                </div>
            </div>

            <div className="part1 bg-white p-2 rounded-lg mx-3 mt-2">
                {/* #87a1c3  border-[#87a1c3]*/}
                <div className="balance flex items-center justify-between text-gray-400 text-sm p-3 border-b border-gray-200">
                    <div className="phoneno">Phone Number:</div>
                    <div className='text-black text-sm'>{details.phoneNo.substring(0,3)+"****"+details.phoneNo.substring(7)}</div>
                </div>

                <div className="balance flex items-center justify-between text-gray-400 text-sm p-3 border-b border-gray-200">
                    <div className="bnkac">Bank Account:</div>
                    <div className='text-black text-sm'>{details.bankAccount}</div>
                </div>

                {/* <div className="balance flex items-center justify-between text-gray-600 text-md p-3 border-b border-gray-200">
                    <div className="fullname">Full Name:</div>
                    <div className='text-black text-sm'>{details.fullName}</div>
                </div>

                <div className="balance flex items-center justify-between text-gray-600 text-md p-3 border-b border-gray-200">
                    <div className="ifsc">IFSC:</div>
                    <div className='text-black text-sm'>{details.ifsc}</div>
                </div> */}

                <div className="balance flex justify-between items-center text-gray-400 text-sm p-3">
                    <div className="wpwd w-2/3">Withdrawal Password:</div>
                    <input type="password" onChange={e => setWpassword(e.target.value)} placeholder='Enter Password' className='placeholder:text-xs outline-none bg-white w-1/3' />
                </div>

                {/* <div className="balance flex justify-between text-gray-600 sm:text-md md:text-xl p-3">
                    <div className="wpwd w-2/3">OTP: <span className='text-sm bg-red-800 text-white px-3 py-1 hover:cursor-pointer rounded-full' onClick={() => handleOTPSend(String(Math.floor(100000 + Math.random() * 900000)))}>Send OTP</span></div>
                    <input type="password" onChange={e => setOtp(e.target.value)} placeholder='Enter OTP' className='placeholder:text-xs outline-none bg-[#d3d6fe] w-1/3' />
                </div> */}

            </div>

            <div className="part1 bg-white p-3 rounded-lg mx-3 mt-2 flex flex-col gap-6 text-[10px]">
                <div className='text-red-800 font-medium'>* Withdrawal time 09:00 - 18:00</div>
                <div className='text-red-800 font-medium'>* Minimum withdrawal amount: {amountDetails.mwamount}.</div>
                <div className='text-red-800 font-medium'>* Correctly fill in the bank information IFSC code, payee name, bank card number, otherwise the withdrawal will fail.</div>
                <div className='text-red-800 font-medium'>* The actual arrival time of all withdrawals is subject to the processing time of the local bank.</div>
            </div>
            
            {/* [#2e9afe] */}
            {
                isBetween() ?
                <button onClick={handleLastButton} className='bg-red-800 rounded-md text-white text-lg mt-5 mx-auto  mb-20  shadow-md block w-[95%] py-2 shadow-slate-400'>Confirm</button>
                :
                <button onClick={()=>toaster('You can withdraw only between 09:00 AM to 06:00 PM')}  className='bg-red-800 rounded-md text-white text-lg mt-5 mx-auto  mb-20  shadow-md block w-[95%] py-2 shadow-slate-400'>Confirm</button>
            }
            
        </div>
    )
}

export default Withdrawal