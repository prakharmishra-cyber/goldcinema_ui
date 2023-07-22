import React from 'react';
import setting_bank from '../images/setting_bank.png';
import setting_pwd from '../images/setting_pwd.png';
import { useNavigate, useLocation } from 'react-router-dom';


const Settings = () => {

    const navigate = useNavigate();
    const loc = useLocation();
    //console.log(loc);

    //[#2e9afe]
    return (
        <div className='bg-recharge-bg h-screen'>
            <div className="options flex items-center text-center text-black bg-cstGray text-lg p-2 ">
                <svg xmlns="http://www.w3.org/2000/svg"
                    onClick={() => navigate('/index/my/index.html')} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"
                    className="w-4 h-4   storke-white  cursor-pointer stroke-black">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                </svg>
                <div className='flex-grow'>Security center</div>
            </div>

            {/* [#4daaff] */}
            <div className="box mt-6 bg-white">
                <div
                    onClick={() => navigate('/index/my/bind_bank.html', {   state: { withdrawalPassword: loc.state.withdrawalPassword, loginPassword: loc.state.loginPassword } })} className='flex gap-2 items-center text-black  font-semibold text-md p-3 m-1 border-b border-gray-200 cursor-pointer'>
                    <div><img src={setting_bank} alt="bnk_img" width={24} /></div>
                    <div className='flex-grow flex justify-between items-center'>
                        <div className='font-normal'>My bank</div>
                        <div>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 stroke-gray-400">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                            </svg>
                        </div>
                    </div>
                </div>

                <div
                    onClick={() => navigate('/index/ctrl/edit_pwd.html', {  state: { withdrawalPassword: loc.state.withdrawalPassword, loginPassword: loc.state.loginPassword } })} className='flex gap-2 items-center text-black  font-semibold text-md p-3 m-1 border-b border-gray-200 cursor-pointer'>
                    <div><img src={setting_pwd} alt="bnk_pwd" width={24} /></div>
                    <div className='flex-grow flex justify-between items-center'>
                        <div className='font-normal'>Change login password</div>
                        <div>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 stroke-gray-400">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                            </svg>
                        </div>
                    </div>
                </div>

                <div
                    onClick={() => navigate('/index/ctrl/edit_deposit_pwd.html', { state: { withdrawalPassword: loc.state.withdrawalPassword, loginPassword: loc.state.loginPassword } })} className='flex gap-2 items-center text-black  font-semibold text-md p-3 m-1 border-b border-gray-200 cursor-pointer'>
                    <div><img src={setting_pwd} alt="bnk_pwd" width={24} /></div>
                    <div className='flex-grow flex justify-between items-center'>
                        <div className='font-normal'>Change withdrawal password</div>
                        <div>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 stroke-gray-400">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                            </svg>
                        </div>
                    </div>
                </div>
            </div>



        </div>
    )
}

export default Settings