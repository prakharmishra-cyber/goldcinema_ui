import './App.css';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import Register from './components/Register';
import Login from './components/Login';
import ForgotPassword from './components/ForgotPassword';
import Home from './components/Home'
import Company from './components/Company';
import Team from './components/Team';
import Mine from './components/Mine';
import Recharge from './components/Recharge';
import Invite from './components/Invite';
import Record from './components/Record';
import Project from './components/Project';
import { Routes, Route } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Fallback from './components/Fallback';
import Withdrawal from './components/Withdrawal';
import Settings from './components/Settings';
import Bank from './components/Bank';
import ChangeLoginPassword from './components/ChangeLoginPassword';
import ChangeWithdrawalPassword from './components/ChangeWithdrawalPassword';
import RechargeWindow from './components/RechargeWindow';
import Approval from './components/Approval';
import WithdrawalApproval from './components/WithdrawalApproval';
import RegisterInvite from './components/RegisterInvite';
import Withdrawals from './components/Withdrawals';
import User from './components/User';
import Transactions from './components/Transactions';
import Access from './components/Access';
import Feedback from './components/Feedback';
import AmountSetup from './components/AmountSetup';
import DashboardLogin from './components/DashboardLogin';
import AdminLogout from './components/AdminLogout';
import ClientFeedback from './components/ClientFeedback';
import UserDetails from './components/UserDetails';
import { createContext, useState, useLayoutEffect } from 'react';
import axios from 'axios';
import BASE_URL from './api_url';
import ShorPlans from './components/ShortPlans';
import Rewards from './components/Rewards';


export const AmountContext = createContext();

function App() {

  const [amounts, setAmounsts] = useState({});

  useLayoutEffect(() => {
    getData();
  }, [])

  const getData = async () => {

    //console.log('hello');
    const dataRes = await axios.get(`${BASE_URL}/amounts`).then(({ data }) => data);
    //console.log(dataRes);
    if (dataRes) {
      //console.log(dataRes.data());
      setAmounsts(dataRes.data);
    }

  }

  return (
    <AmountContext.Provider value={amounts}>
      <div className="app relative ">
        <Routes>
          <Route path="/" element={<Fallback />} />
          <Route path="/index/user/register" element={<Register />} />
          <Route path="/index/user/register/invite_code/:invite_code" element={<RegisterInvite />} />
          <Route path="/index/user/login.html" element={<Login />} />
          <Route path="/forgot" element={<ForgotPassword />} />
          <Route path="/financial" element={<ShorPlans />} />
          <Route path="/index/index/home.html" element={<Home />} />
          <Route path="/index/my/msg" element={<Company />} />
          <Route path="/index/ctrl/junior" element={<Team />} />
          <Route path="/index/my/index.html" element={<Mine />} />
          <Route path="/index/ctrl/recharge" element={<Recharge />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/index/my/invite.html" element={<Invite />} />
          <Route path="/index/my/caiwu" element={<Record />} />
          <Route path="/index/order/lixibao_list" element={<Project />} />
          <Route path="/index/ctrl/withdrawal" element={<Withdrawal />} />
          <Route path="/index/ctrl/set" element={<Settings />} />
          <Route path="/index/my/bind_bank.html" element={<Bank />} />
          <Route path="/user_feedback" element={<ClientFeedback />} />
          <Route path="/index/ctrl/edit_pwd.html" element={< ChangeLoginPassword />} />
          <Route path="/index/ctrl/edit_deposit_pwd.html" element={< ChangeWithdrawalPassword />} />
          <Route path="/recharge_window/:recharge_value" element={<RechargeWindow />} />
          
          <Route path="/recharge_approval" element={<Approval />} />
          <Route path="/withdrawal_approval" element={<WithdrawalApproval />} />
          <Route path="/dummyUser/Login" element={<DashboardLogin />} />
          <Route path="/dummyUser/Dashboard" element={<Dashboard />} />
          <Route path="/dummyUser/Withdrawals" element={<Withdrawals />} />
          <Route path="/dummyUser/Amount Setup" element={<AmountSetup />} />
          <Route path="/dummyUser/User" element={<User />} />
          <Route path="/dummyUser/Transactions" element={<Transactions />} />
          <Route path="/dummyUser/Access" element={<Access />} />
          <Route path="/dummyUser/Feedback" element={<Feedback />} />
          <Route path="/dummyUser/Logout" element={<AdminLogout />} />
          <Route path="/dummyUser/user_details" element={<UserDetails />} />
          <Route path="/rewards" element={<Rewards />} />
        </Routes>
        {/* <div className='fixed top-[400px] right-0 p-2 bg-cyan-600 rounded-l-full transform  -translate-y-1/2 flex items-center justify-center'>
          <a href="https://t.me/WindHarvester" className='no-underline text-white cursor-pointer'>
            <img src={telephone} alt="telephone_icon" className='w-5 h-5 p-1 bg-white rounded-full shadow-2xl' />
          </a>
        </div> */}
        <ToastContainer />

      </div>
    </AmountContext.Provider>
  );
}

export default App;
