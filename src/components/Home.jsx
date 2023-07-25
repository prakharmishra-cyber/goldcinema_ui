import React, { useEffect, useLayoutEffect, useState } from 'react';
import Slider from './Slider';
import Card from './Card';
import { useNavigate } from 'react-router-dom';
import ReactModal from 'react-modal';

import { useContext } from 'react';
import { AmountContext } from '../App.js';
import axios from 'axios';
import BASE_URL from '../api_url';
import { VolumeUpOutlined } from '@material-ui/icons';
import asset0 from '../images/asml/asset 0.png';
import asset1 from '../images/asml/asset 1.png';
import asset2 from '../images/asml/asset 2.png';
import asset5 from '../images/asml/asset 5.png';
import asset6 from '../images/asml/asset 6.png';
import asset7 from '../images/asml/asset 7.png';
import asset8 from '../images/asml/asset 8.png';
import jlogo from '../images/asml/jlogo.jpg';

import p1 from '../images/vbharat/p1.jpg';
import p2 from '../images/vbharat/p2.jpg';
import p3 from '../images/vbharat/p3.jpg';
import p4 from '../images/vbharat/p4.jpg';
import p5 from '../images/vbharat/p5.jpg';
import p6 from '../images/vbharat/p6.jpg';
import p7 from '../images/vbharat/p7.jpg';
import p8 from '../images/vbharat/p8.jpg';
import p9 from '../images/dew/p9.jpg';

import recharge from '../images/vbharat/recharge.png';
import invite from '../images/vbharat/invite.png';
import online from '../images/vbharat/online.png';
import withdraw from '../images/vbharat/withdraw.png';
import home from '../images/vbharat/home.png';
import company from '../images/vbharat/company.png';
import my from '../images/vbharat/my.png';
import download from '../images/vbharat/download.png';



const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: 'white',
        overflow: 'hidden',
        position: 'relative',
        width: '95%',
        border: 'none',
        backgroundColor: 'transparent'

    },
};

const customStyles2 = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        position: 'relative',
        border: 'none',
        padding: 0,
        width: '97%',
        borderRadius: '16px'
    },
};


const Home = () => {

    const navigate = useNavigate();
    const [modalIsOpen, setIsOpen] = React.useState(false);
    const [quantity, setQuantity] = React.useState(1);
    const [currPlan, setCurrPlan] = React.useState(null);
    const [currentVisible, setCurrentVisible] = React.useState('big');
    const [userDetails, setUserDetails] = React.useState(null);
    const amountDetails = useContext(AmountContext);
    const [toasterShow, setToasterShow] = useState(false);
    const [welcomeShow, setWelcomeShow] = useState(false);
    const [toasterText, setToasterText] = useState('');
    const [originalwpwd, setOriginalwpwd] = useState(null);
    const [originalpwd, setOriginalpwd] = useState(null);
    const [planPurchaseShow, setPlanPurchaseShow] = useState(false);
    const [balanceIndicator, setBalanceIndicator] = useState(false);

    const toaster = (text, arg = '') => {
        // document.body.scrollTop = 0;
        // document.documentElement.scrollTop = 0;
        if (text === 'Plan purchased!') {
            setTimeout(() => {
                navigate('/index/order/lixibao_list');
            }, 2000);
        } else {
            setToasterText(text);
            setToasterShow(true);
            setTimeout(() => {
                setToasterShow(false);
                //navigate('/index/my/index.html');
                if (arg !== '') {
                    navigate('/index/order/lixibao_list');
                }
            }, 2000);
        }
    }

    const openModal = () => {
        setIsOpen(true);
    }

    const getUserDetails = async () => {
        await axios.post(`${BASE_URL}/get_user`, { user_id: localStorage.getItem('uid') }).then(({ data }) => {
            if (data) {
                setUserDetails(data);
                setOriginalwpwd(data.wpwd);
                setOriginalpwd(data.pwd);
                localStorage.setItem('user_invite', data.user_invite);
            } else {
                //console.log('Data not found');
            }
        }).catch(error => console.log('Some error occured', error));
    }

    useEffect(() => {
        if (localStorage.getItem('pop_up_closed') === null) {
            setWelcomeShow(false);
        }
    }, []);

    useLayoutEffect(() => {
        document.body.style.backgroundColor = "white";
        getUserDetails();
    }, []);

    const closeModal = async (action) => {
        if (action === 'cancel') {
            setIsOpen(false);
        } else if (quantity <= 0) {
            toaster('Please a positive value!');
        } else {
            if ((Number(quantity) * Number(currPlan.plan_amount)) > Number(userDetails.balance)) {
                //toaster("The available balance is insufficient, please recharge");
                setBalanceIndicator(true);
                setTimeout(() => {
                    setBalanceIndicator(false);
                }, 3000);
            } else {
                await axios.post(`${BASE_URL}/purchase`, {
                    balance: Number(userDetails.balance) - Number(Number(quantity) * Number(currPlan.plan_amount)),
                    boughtLong: (currPlan.product_type === 'long' ? 1 : 0),
                    boughtShort: (currPlan.product_type === 'short' ? 1 : 0),
                    user_id: localStorage.getItem('uid'),
                    plans_purchased: {
                        ...currPlan,
                        quantity: quantity,
                        date_purchased: new Date().toDateString(),
                        date_till_rewarded: new Date().toDateString(),
                        time: new Date().toDateString(),
                        ddmmyy: new Date().getMilliseconds()
                    }
                }).then(() => {
                    console.log('Product successfully purchased');
                    toaster('Plan purchased!', '/index/order/lixibao_list');
                    setPlanPurchaseShow(true);
                }).catch((error) => {
                    console.log('Some error occured', error);
                    toaster('Some error occured, try again after some time');
                })
            }
            setIsOpen(false);
        }
    }

    const isBetween = () => {
        var startTime = '8:00:00';
        var endTime = '17:00:00';

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

    const handleClick = (product_type, plan_name, plan_type, plan_amount, plan_daily_earning, plan_cycle) => {
        setCurrPlan({ product_type, plan_name, plan_type, plan_amount, plan_daily_earning, plan_cycle });
        openModal();
    }



    return (
        <div className='relative bg-white'>
            {toasterShow ? <div className='w-[90%] absolute z-50 top-[500px] left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
                <div className='flex gap-2 text-center bg-black opacity-100 text-white px-4 py-1 rounded-md'>
                    <div>{toasterText}</div>
                </div>
            </div> : null}

            {planPurchaseShow ? <div className='absolute w-[65%]  top-[450px] rounded-lg shadow-xl  z-10 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
                <div className='flex flex-col justify-center gap-3 h-[180px] shadow-2xl border border-gray-300 items-center bg-white w-full text-red-800 rounded-xl'>
                    <div>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-16 h-16">
                            <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" />
                        </svg>
                    </div>
                    <div className='text-2xl font-extrabold'>Successful Purchase</div>
                </div>
            </div> : null}

            <div >
                <ReactModal
                    isOpen={balanceIndicator}
                    style={customStyles2}
                    contentLabel="Not enough balance"
                    ariaHideApp={false}
                >
                    <div className='relative bg-black text-center text-white opacity-90 p-2 w-full rounded-md '>
                        The available balance is insufficient, please recharge
                    </div>
                </ReactModal>
            </div>



            <Slider />
            <div >
                <ReactModal
                    isOpen={modalIsOpen}
                    style={customStyles}
                    contentLabel="Enter Project Quantity"
                    ariaHideApp={false}
                >

                    <div className='relative bg-white p-2 w-full rounded-sm '>
                        <div
                            onClick={() => closeModal('cancel')}
                            className='absolute  right-[-10px] top-[-10px] bg-white font-extrabold  w-10 h-10 text-white  flex justify-center items-center rounded-full'>
                            <div className='bg-slate-500 w-7 h-7 rounded-full text-center text-xl'>
                                X
                            </div>
                        </div>
                        <div>
                            <h1 className='text-gray-600 mb-3 mt-2 text-md mr-5 font-semibold'>Are you sure you want to buy this plan?</h1>

                            <div className='flex justify-end pt-4'>
                                <button onClick={() => closeModal('ok')} className='bg-red-800 text-white px-2 py-1   w-[64px]'>Yes</button>
                                <button onClick={() => closeModal('cancel')} className='border border-gray-300  px-2 py-1   w-[64px] ml-2'>No</button>
                            </div>
                        </div>
                    </div>
                </ReactModal>
            </div>

            <div>
                <ReactModal
                    isOpen={welcomeShow && false}
                    style={customStyles2}
                    contentLabel="Notice"
                    ariaHideApp={false}>
                    <div className='w-full rounded-lg shadow-xl z-10 border border-gray-200'>
                        <div className='flex  flex-col bg-white w-full text-white rounded-md'>
                            <div className='flex flex-col p-2 text-sm gap-2 font-normal bg-white text-red-600 text-semibold pt-4 mb-[5px]'>
                                Withdrawal time: 09:00—20:00 <br />
                                Register to send 100rs

                                <img src={jlogo} alt="jio" width={240} className='p-2' />

                                <span className="text-red-800">Reliance Jio Infocomm Limited, doing business as Jio, is an Indian
                                    telecommunications company and a subsidiary of Jio Platforms,
                                    headquartered in Navi Mumbai, Maharashtra, India. It operates
                                    a national LTE network with coverage across all 22 telecom circles.
                                    <br />
                                    (Each user is able to receive additional rewards through invitations)
                                </span>

                                Invitation Commission: <br />
                                Level 1 {amountDetails.level1_percent}% <br />
                                Level 2 {amountDetails.level2_percent}% <br />
                                Level 3 {amountDetails.level3_percent}%
                            </div>

                            <div className='border-t border-gray-300 my-1'></div>

                        </div>
                        <div className='flex justify-end'>
                            <button className='text-center w-16 mx-2 border border-blue-400 mt-1 text-white font-semibold p-1 mb-2 bg-gray-800'
                                onClick={(e) => {
                                    setWelcomeShow(false);
                                    localStorage.setItem('pop_up_closed', 1);
                                }}>
                                Ok
                            </button>
                        </div>
                    </div>
                </ReactModal>
            </div>


            {/*Navigation bar */}
            <div className="bg-red-800 mt-2 rounded-[5px]  text-white font-[400] relative flex overflow-x-hidden  mx-2 py-1  sm:w-3/5 lg:w-3/5 overflow-y-hidden">
                <div className="flex flex-row justify-around text-xs items-center w-full py-1 px-1">
                    <div className='cursor-pointer mx-2 flex flex-col justify-center items-center'>
                        <img src={recharge} alt="recharge" className='w-10' onClick={() => navigate('/index/ctrl/recharge')} />
                        <div className='text-sm text-black'>Recharge</div>
                    </div>

                    <div className='cursor-pointer mx-2 flex flex-col justify-center items-center'>
                        <img src={invite} alt="online" className='w-10' onClick={() => navigate('/index/my/invite.html')} />
                        <div className='text-sm text-black'>Invite</div>
                    </div>

                    <a href="https://telegram.me/mountaindewofficial" className=' no-underline  cursor-pointer'>
                        <div className='cursor-pointer mx-2 flex flex-col justify-center items-center'>
                            <img src={online} alt="online" className='w-10' />
                            <div className='text-sm text-black '>Online</div>
                        </div>
                    </a>

                    <div className='cursor-pointer mx-2 flex flex-col justify-center items-center'>
                        <img src={withdraw} alt="invite" className='w-10' onClick={() => isBetween() || true ?
                            navigate('/index/ctrl/withdrawal', { state: { withdrawalPassword: originalwpwd, loginPassword: originalpwd } }) : toaster('You can withdraw only between 08:00 AM to 05:00 PM')
                        } />
                        <div className='text-sm text-black '>Withdrawal</div>
                    </div>
                </div>
            </div>

            {/*Marquee Implementation*/}
            <div className="bg-red-800 rounded-md items-center px-2 text-white relative flex overflow-x-hidden h-12 mx-[6px] mt-2 border-2 border-gray-100 sm:w-3/5 lg:w-3/5 overflow-y-hidden">
                {/* <div>
                    <VolumeUpOutlined />
                </div> */}
                <div className="py-16 animate-marquee flex flex-col whitespace-nowrap">
                    <span className="mx-4 text-sm mt-4">91915***05 Member withdrawl 100000 Rs</span>
                    <span className="mx-4 text-sm mt-4">91702***84 Member withdrawl 30000 Rs</span>
                    <span className="mx-4 text sm mt-4">91827***42 Member withdrawl 2000 Rs</span>
                    <span className="mx-4 text sm mt-4">91770***28 Member withdrawl 500 Rs</span>
                    <span className="mx-4 text sm mt-4">91983***17 Member withdrawl 100000 Rs</span>
                </div>
            </div>

            <div className="bg-red-800 text-center justify-center items-center px-2 text-white text-[20px]
                            relative flex overflow-x-hidden h-12  mt-2 border-2
                            border-gray-100 sm:w-3/5 lg:w-3/5 overflow-y-hidden font-[400]">
                <div>Britannia</div>
            </div>

            <div className='bg-red-800 text-md text-white flex mt-2 items-center  mb-2  mx-1'>
                <div className={`w-1/2 text-center  py-4 ${currentVisible === 'big' ? ' text-white font-medium bg-red-800' : ' bg-nselected text-black'}`} onClick={() => setCurrentVisible('big')}>Daily Income</div>
                <div className={`w-1/2 text-center  py-4 ${currentVisible === 'short' ? ' text-white font-medium bg-red-800' : ' bg-nselected text-black'}`} onClick={() => setCurrentVisible('short')}>VIP Plan</div>
            </div>

            {/*Plans Cards*/}
            <div className={`card_grid grid grid-cols-1 sm:w-3/5 lg:w-3/5 w-[100%] mx-auto mt-2 ${currentVisible === 'big' ? 'mb-20' : ''}`}>

                {currentVisible === 'big' && (
                    <div className='grid grid-cols-1 '>
                        {userDetails && amountDetails?.plan_state && (
                            <div className='grid grid-cols-1 gap-4'>
                                

                                {userDetails && (amountDetails.plan_state[0] === 0) ? (
                                    <span className='pointer-events-none'>
                                        <Card pre_sale={amountDetails.plan_state[0] === 0} long_plan_state={userDetails.boughtLong < 1} product_type={"long"} product_image={p1} handleClick={handleClick} plan_name={"Britannia 1"} plan_cycle={45} plan_daily_earning={180} plan_amount={700} plan_type={'Big Plan'} />
                                    </span>
                                ) : (
                                    <span>
                                        <Card pre_sale={amountDetails.plan_state[0] === 0} long_plan_state={userDetails.boughtLong < 1} product_type={"long"} product_image={p1} handleClick={handleClick} plan_name={"Britannia 1"} plan_cycle={45} plan_daily_earning={180} plan_amount={700} plan_type={'Big Plan'} />
                                    </span>
                                )}

                                {userDetails && (amountDetails.plan_state[1] === 0) ? (
                                    <span className='pointer-events-none'>
                                        <Card pre_sale={amountDetails.plan_state[1] === 0} long_plan_state={userDetails.boughtLong < 1} product_type={"long"} product_image={p2} handleClick={handleClick} plan_name={"Britannia 2"} plan_cycle={45} plan_daily_earning={550} plan_amount={2000} plan_type={'Big Plan'} />
                                    </span>
                                ) : (
                                    <span>
                                        <Card pre_sale={amountDetails.plan_state[1] === 0} long_plan_state={userDetails.boughtLong < 1} product_type={"long"} product_image={p2} handleClick={handleClick} plan_name={"Britannia 2"} plan_cycle={45} plan_daily_earning={550} plan_amount={2000} plan_type={'Big Plan'} />
                                    </span>
                                )}

                                {userDetails && (amountDetails.plan_state[2] === 0) ? (
                                    <span className='pointer-events-none'>
                                        <Card pre_sale={amountDetails.plan_state[2] === 0} long_plan_state={userDetails.boughtLong < 1} product_type={"long"} product_image={p3} handleClick={handleClick} plan_name={"Britannia 3"} plan_cycle={45} plan_daily_earning={1000} plan_amount={4000} plan_type={'Big Plan'} />
                                    </span>
                                ) : (
                                    <span>
                                        <Card pre_sale={amountDetails.plan_state[2] === 0} long_plan_state={userDetails.boughtLong < 1} product_type={"long"} product_image={p3} handleClick={handleClick} plan_name={"Britannia 3"} plan_cycle={45} plan_daily_earning={1000} plan_amount={4000} plan_type={'Big Plan'} />
                                    </span>
                                )}

                                {userDetails && (amountDetails.plan_state[3] === 0) ? (
                                    <span className='pointer-events-none'>
                                        <Card pre_sale={amountDetails.plan_state[3] === 0} long_plan_state={userDetails.boughtLong < 1} product_type={"long"} product_image={p4} handleClick={handleClick} plan_name={"Britannia 4"} plan_cycle={45} plan_daily_earning={1500} plan_amount={6000} plan_type={'Big Plan'} />
                                    </span>
                                ) : (
                                    <span>
                                        <Card pre_sale={amountDetails.plan_state[3] === 0} long_plan_state={userDetails.boughtLong < 1} product_type={"long"} product_image={p4} handleClick={handleClick} plan_name={"Britannia 4"} plan_cycle={45} plan_daily_earning={1500} plan_amount={6000} plan_type={'Big Plan'} />
                                    </span>
                                )}

                                {userDetails && (amountDetails.plan_state[4] === 0) ? (
                                    <span className='pointer-events-none'>
                                        <Card pre_sale={amountDetails.plan_state[4] === 0} long_plan_state={userDetails.boughtLong < 1} product_type={"long"} product_image={p5} handleClick={handleClick} plan_name={"Britannia 5"} plan_cycle={45} plan_daily_earning={2500} plan_amount={10000} plan_type={'Big Plan'} />
                                    </span>
                                ) : (
                                    <span>
                                        <Card pre_sale={amountDetails.plan_state[4] === 0} long_plan_state={userDetails.boughtLong < 1} product_type={"long"} product_image={p5} handleClick={handleClick} plan_name={"Britannia 5"} plan_cycle={45} plan_daily_earning={2500} plan_amount={10000} plan_type={'Big Plan'} />
                                    </span>
                                )}

                                {userDetails && (amountDetails.plan_state[5] === 0) ? (
                                    <span className='pointer-events-none'>
                                        <Card pre_sale={amountDetails.plan_state[5] === 0} long_plan_state={userDetails.boughtLong < 1} product_type={"long"} product_image={p6} handleClick={handleClick} plan_name={"Britannia 6"} plan_cycle={45} plan_daily_earning={6500} plan_amount={25000} plan_type={'Big Plan'} />
                                    </span>
                                ) : (
                                    <span>
                                        <Card pre_sale={amountDetails.plan_state[5] === 0} long_plan_state={userDetails.boughtLong < 1} product_type={"long"} product_image={p6} handleClick={handleClick} plan_name={"Britannia 6"} plan_cycle={45} plan_daily_earning={6500} plan_amount={25000} plan_type={'Big Plan'} />
                                    </span>
                                )}


                                {userDetails && (amountDetails.plan_state[6] === 0) ? (
                                    <span className='pointer-events-none'>
                                        <Card pre_sale={amountDetails.plan_state[6] === 0} long_plan_state={userDetails.boughtLong < 1} product_type={"long"} product_image={p1} handleClick={handleClick} plan_name={"Britannia 7"} plan_cycle={45} plan_daily_earning={10000} plan_amount={40000} plan_type={'Big Plan'} />
                                    </span>
                                ) : (
                                    <span>
                                        <Card pre_sale={amountDetails.plan_state[6] === 0} long_plan_state={userDetails.boughtLong < 1} product_type={"long"} product_image={p1} handleClick={handleClick} plan_name={"Britannia 7"} plan_cycle={45} plan_daily_earning={10000} plan_amount={40000} plan_type={'Big Plan'} />
                                    </span>
                                )}

                                {userDetails && (amountDetails.plan_state[7] === 0) ? (
                                    <span className='pointer-events-none'>
                                        <Card pre_sale={amountDetails.plan_state[7] === 0} long_plan_state={userDetails.boughtLong < 1} product_type={"long"} product_image={p2} handleClick={handleClick} plan_name={"Britannia 8"} plan_cycle={45} plan_daily_earning={18000} plan_amount={60000} plan_type={'Big Plan'} />
                                    </span>
                                ) : (
                                    <span>
                                        <Card pre_sale={amountDetails.plan_state[7] === 0} long_plan_state={userDetails.boughtLong < 1} product_type={"long"} product_image={p2} handleClick={handleClick} plan_name={"Britannia 8"} plan_cycle={45} plan_daily_earning={18000} plan_amount={60000} plan_type={'Big Plan'} />
                                    </span>
                                )}

                                {/* {userDetails && (amountDetails.plan_state[6] === 0) ? (
                                    <span className='pointer-events-none'>
                                        <Card product_type={"long"} product_image={lenskart7} handleClick={handleClick} plan_name={"Lenskart 7"} plan_cycle={60} plan_daily_earning={33000} plan_amount={76000} plan_type={'Big Plan'} />
                                    </span>
                                ) : (
                                    <span>
                                        <Card product_type={"long"} product_image={lenskart7} handleClick={handleClick} plan_name={"Lenskart 7"} plan_cycle={60} plan_daily_earning={33000} plan_amount={76000} plan_type={'Big Plan'} />
                                    </span>
                                )} */}

                                {/* {userDetails && (amountDetails.plan_state[7] === 0) ? (
                                    <span className='pointer-events-none'>
                                        <Card product_type={"long"} product_image={tuborg4} handleClick={handleClick} plan_name={"Windharvester 8"} plan_cycle={365} plan_daily_earning={2500} plan_amount={35000} plan_type={'Big Plan'} />
                                    </span>
                                ) : (
                                    <span>
                                        <Card product_type={"long"} product_image={tuborg4} handleClick={handleClick} plan_name={"Windharvester 8"} plan_cycle={365} plan_daily_earning={2500} plan_amount={35000} plan_type={'Big Plan'} />
                                    </span>
                                )} */}

                                {/* {userDetails && (amountDetails.plan_state[8] === 0) ? (
                                    <span className='pointer-events-none'>
                                        <Card product_type={"long"} product_image={tuborg5} handleClick={handleClick} plan_name={"Windharvester 9"} plan_cycle={365} plan_daily_earning={4000} plan_amount={60000} plan_type={'Big Plan'} />
                                    </span>
                                ) : (
                                    <span>
                                        <Card product_type={"long"} product_image={tuborg5} handleClick={handleClick} plan_name={"Windharvester 9"} plan_cycle={365} plan_daily_earning={4000} plan_amount={60000} plan_type={'Big Plan'} />
                                    </span>
                                )} */}
                            </div>)}
                    </div>)}

            </div>

            {/*short plans */}
            <div className={`card_grid grid grid-cols-1 sm:w-3/5 lg:w-3/5 w-[97%] mx-auto mt-2 ${currentVisible === 'short' ? 'mb-20' : ''}`}>

                {currentVisible === 'short' && amountDetails?.plan_state && userDetails && (
                    <div className={`grid grid-cols-1 gap-4`}>
                        {(amountDetails.plan_state[8] === 0) ?
                            (
                                <span className='pointer-events-none'>
                                    {/* <span>hi</span> */}
                                    <Card pre_sale={amountDetails.plan_state[8] === 0} long_plan_state={userDetails.boughtLong < 1} product_type={"short"} product_image={p7} handleClick={handleClick} plan_name={"Britannia 9"} plan_cycle={4} plan_daily_earning={1210} plan_amount={3500} plan_type={'Short Plan'} />
                                </span>
                            ) :
                            <span>
                                <Card pre_sale={amountDetails.plan_state[8] === 0} long_plan_state={userDetails.boughtLong < 1} product_type={"short"} product_image={p7} handleClick={handleClick} plan_name={"Britannia 9"} plan_cycle={4} plan_daily_earning={1210} plan_amount={3500} plan_type={'Short Plan'} />
                            </span>
                        }

                        {(amountDetails.plan_state[9] === 0) ?
                            (<span className='pointer-events-none'>
                                <Card pre_sale={amountDetails.plan_state[9] === 0} long_plan_state={userDetails.boughtLong < 1} product_type={"short"} product_image={p8} handleClick={handleClick} plan_name={"Britannia 10"} plan_cycle={4} plan_daily_earning={1650} plan_amount={5000} plan_type={'Short Plan'} />
                            </span>) :
                            (<span className=''>
                                <Card pre_sale={amountDetails.plan_state[9] === 0} long_plan_state={userDetails.boughtLong < 1} product_type={"short"} product_image={p8} handleClick={handleClick} plan_name={"Britannia 10"} plan_cycle={4} plan_daily_earning={1650} plan_amount={5000} plan_type={'Short Plan'} />
                            </span>
                            )}

                        {(amountDetails.plan_state[10] === 0) ?
                            (<span className='pointer-events-none'>
                                <Card pre_sale={amountDetails.plan_state[10] === 0} long_plan_state={userDetails.boughtLong < 1} product_type={"short"} product_image={p3} handleClick={handleClick} plan_name={"Britannia 11"} plan_cycle={3} plan_daily_earning={2100} plan_amount={5000} plan_type={'Short Plan'} />
                            </span>) :
                            (<span className=''>
                                <Card pre_sale={amountDetails.plan_state[10] === 0} long_plan_state={userDetails.boughtLong < 1} product_type={"short"} product_image={p3} handleClick={handleClick} plan_name={"Britannia 11"} plan_cycle={3} plan_daily_earning={2100} plan_amount={5000} plan_type={'Short Plan'} />
                            </span>
                            )}

                        {(amountDetails.plan_state[11] === 0) ?
                            (<span className='pointer-events-none'>
                                <Card pre_sale={amountDetails.plan_state[11] === 0} long_plan_state={userDetails.boughtLong < 1} product_type={"short"} product_image={p4} handleClick={handleClick} plan_name={"Britannia 12"} plan_cycle={3} plan_daily_earning={2600} plan_amount={7000} plan_type={'Short Plan'} />
                            </span>) :
                            (<span className=''>
                                <Card pre_sale={amountDetails.plan_state[11] === 0} long_plan_state={userDetails.boughtLong < 1} product_type={"short"} product_image={p4} handleClick={handleClick} plan_name={"Britannia 12"} plan_cycle={3} plan_daily_earning={2600} plan_amount={7000} plan_type={'Short Plan'} />
                            </span>
                            )}

                        {/* {(amountDetails.plan_state[10] === 0) ?
                            (<span className='pointer-events-none'>
                                <Card pre_sale={amountDetails.plan_state[10] === 0} long_plan_state={userDetails.boughtLong < 1} product_type={"short"} product_image={p2} handleClick={handleClick} plan_name={"Britannia 11"} plan_cycle={3} plan_daily_earning={10000} plan_amount={20000} plan_type={'Short Plan'} />
                            </span>) :
                            (<span className=''>
                                <Card pre_sale={amountDetails.plan_state[10] === 0} long_plan_state={userDetails.boughtLong < 1} product_type={"short"} product_image={p2} handleClick={handleClick} plan_name={"Britannia 11"} plan_cycle={3} plan_daily_earning={10000} plan_amount={20000} plan_type={'Short Plan'} />
                            </span>
                            )} */}

                        {/* {(userDetails.boughtLong < 1 || amountDetails.plan_state[12] === 0) ?
                            (<span className='pointer-events-none'>
                                <Card product_type={"short"} product_image={lenskart1} handleClick={handleClick} plan_name={"Lenskart 12"} plan_cycle={5} plan_daily_earning={120000} plan_amount={60000} plan_type={'Short Plan'} />
                            </span>) :
                            (<span className=''>
                                <Card product_type={"short"} product_image={lenskart1} handleClick={handleClick} plan_name={"Lenskart 12"} plan_cycle={5} plan_daily_earning={120000} plan_amount={60000} plan_type={'Short Plan'} />
                            </span>
                            )} */}

                        {/* {(userDetails.boughtLong < 1 || amountDetails.plan_state[15] === 0) ?
                            (<span className='pointer-events-none'>
                                <Card product_type={"short"} product_image={wind4} handleClick={handleClick} plan_name={"Windharvester 16"} plan_cycle={18} plan_daily_earning={1400} plan_amount={10000} plan_type={'Short Plan'} />
                            </span>) :
                            (<span className=''>
                                <Card product_type={"short"} product_image={wind4} handleClick={handleClick} plan_name={"Windharvester 16"} plan_cycle={18} plan_daily_earning={1400} plan_amount={10000} plan_type={'Short Plan'} />
                            </span>
                            )} */}
                    </div>)}
            </div>



            {/*Navigation Bar 2 bg-[#1cb5b2]*/}
            {welcomeShow ? (
                <div className="fixed bottom-0 z-10 bg-gray-50 rounded-none text-red-800 flex overflow-x-hidden  mx-auto mt-2 border-2 border-gray-100 w-full overflow-y-hidden">
                    <div className="flex flex-row justify-around items-center w-full py-1 text-sm font-normal">
                        <div className='cursor-pointer mx-2 flex flex-col justify-center items-center'>
                            <img src={home} alt="online" className='w-7' />
                            <div>Home</div>
                        </div>

                        <div className='cursor-pointer mx-2 flex flex-col justify-center items-center'>
                            <img src={company} alt="recharge" className='w-7' />
                            <div>Company</div>
                        </div>
                        <div className='cursor-pointer mx-2 flex flex-col justify-center items-center '>
                            <img src={download} alt="app_dwd" className='w-7' />
                            <div>Download</div>
                        </div>


                        <div className='cursor-pointer mx-2 flex flex-col justify-center items-center'>
                            <img src={my} alt="invite" className='w-7' />
                            <div>My</div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="fixed bottom-0 z-10 bg-gray-50 rounded-none text-gray-700  flex overflow-x-hidden  mx-auto mt-2 border-2 border-gray-100 w-full overflow-y-hidden">
                    <div className="flex flex-row justify-around font-normal text-sm items-center w-full py-1">
                        <div className=' cursor-pointer mx-2 flex flex-col justify-center items-center'>
                            <img src={home} alt="online" className='w-7' />
                            <div>Home</div>
                        </div>

                        <div className='cursor-pointer mx-2 flex flex-col justify-center items-center' onClick={() => navigate('/index/my/msg')}>
                            <img src={company} alt="recharge" className='w-7' />
                            <div>Company</div>
                        </div>
                        <div className='cursor-pointer mx-2 flex flex-col justify-center items-center ' >
                            <img src={download} alt="app_dwd" className='w-7' />
                            <div>Download</div>
                        </div>


                        <div className='cursor-pointer mx-2 flex flex-col justify-center items-center' onClick={() => navigate('/index/my/index.html')}>
                            <img src={my} alt="invite" className='w-7' />
                            <div>My</div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Home