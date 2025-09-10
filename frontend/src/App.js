import logo from './logo.svg';
import './App.css';
import Result from './commponts/Home/Result';
import Home from './commponts/Home/Home';
import Favorite from './commponts/Home/Favorite';
import { Routes, Route } from 'react-router-dom';
import Privacy from './commponts/privacy policy/Privacy';
import Privacy1 from './commponts/privacy policy/Privacy1';
import CreateAcount from './commponts/Account/CreateAcount';
import Confirm from './commponts/Account/Confirm';
import AuctionsNavbar from './commponts/Auctions/AuctionsNavbar';
import AllAuctions from './commponts/Auctions/AllAuctions';
import ShareAuctions from './commponts/Auctions/ShareAuction';
import CreateAuction from './commponts/Auctions/CreateAuction';
import FavoriteAuction from './commponts/Auctions/FavoriteAuction';
import AuctionNew from './commponts/Auctions/AuctionNew';
import AuctionGroups from './commponts/Auctions/AuctionGroups';
import AuctionGroup from './commponts/Auctions/AuctionGroup';
import Modify from './commponts/Account/Modify';
import Details from './commponts/Account/details/Details';

import Create from './commponts/Account/Profile/Pages/Create';
import AucParticiped from './commponts/Account/Profile/Pages/AucParticiped';
import TenderCreate from './commponts/Account/Profile/Pages/TenderCreate';
import TenderParticiped from './commponts/Account/Profile/Pages/TenderParticiped';
import FavAuction from './commponts/Account/Profile/Pages/FavAuction';
import FavTender from './commponts/Account/Profile/Pages/FavTender';
import Profile from './commponts/Account/Profile/Pages/Profile';
// <<<<<<< Updated upstream
// tenders
import AllTenders from './commponts/Tenders/AllTenders';
import ShareTenders from './commponts/Tenders/ShareTenders';
import FavoriteTenders from './commponts/Tenders/FavoriteTenders';
import CreateTender from './commponts/Tenders/CreateTender';
import TenderGroups from './commponts/Tenders/TenderGroups';
import Details_Tender from './commponts/Tenders/details/Details_Tender';
// import Profile from './commponts/Account/Profile/Pages/Profile'
// =======
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import TenderGroup from './commponts/Tenders/TenderGroup';
import Create_Tender from './commponts/Tenders/Create_Tender';
import Cards from './commponts/Auctions/Cards';
import ConfirmLogout from './commponts/Account/ConfirmLogout';
import AllUsers from './commponts/AllUser/AllUsers';
import All from './commponts/AllUser/All';
import Wallet from './commponts/Account/Profile/Pages/Wallet';
// import WalletManger from './commponts/Admin/WalletManger';
import WalletManger from './commponts/Admin/WalletManger';
import Control from './commponts/Admin/Control';
import AuctionAdmin from './commponts/Admin/Auct/AuctionAdmin';
import TenderAdmin from './commponts/Admin/TenderAdmin';
import UserAdmin from './commponts/Admin/UserAdmin';
import GroupAdmin from './commponts/Admin/GroupAdmin';
import PayAdmin from './commponts/Admin/PayAdmin';
import WalletAdmin from './commponts/Admin/WalletAdmin';
import EditGroup from './commponts/Admin/EditGroup';
import AddGroup from './commponts/Admin/AddGroup';
import Notification from './commponts/Home/Notifiction/Notification';
import UnReadnotification from './commponts/Home/Notifiction/UnReadnotification';
import Readnotification from './commponts/Home/Notifiction/Readnotification';
// <<<<<<< HEAD
// import Group from './commponts/Group'
// =======
// import Group from './commponts/Group';
// >>>>>>> c9cd868c13e655ef233463f5ebb7c81e546d1fa3

function App() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const tok = localStorage.getItem('jwt');

  return (
    <div className="App">
      <Routes>
{/* <<<<<<< HEAD */}
       
// =======
        {/* <Route path="/group" element={<Group />} /> */}
{/* >>>>>>> c9cd868c13e655ef233463f5ebb7c81e546d1fa3 */}
        <Route path="/" element={<Home />} />
        <Route path="/fav" element={<Favorite />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/privacy1" element={<Privacy1 />} />
        <Route path="/acount" element={<CreateAcount />} />
        {/* <Route path="/profile" element={<Profile />} /> */}
        <Route path="/auctions" element={<AllAuctions />} />
        {/* <Route path="/auctions/a" element={<Cards />}/> */}
        {/* <Route path="/auctions" element={<AllAuctions />} /> */}
        <Route path="/share-auction" element={<ShareAuctions />} />
        <Route path="/favorite" element={<FavoriteAuction />} />
        <Route path="/auctionsgroup" element={<AuctionGroups />} />
        <Route path="/CreateAuction" element={<CreateAuction />} />
        <Route path="/createAuctions" element={<AuctionNew />} />
        {/* <Route path="/Modify" element={<Modify />} /> */}
        <Route
          path="/confirm"
          element={<Confirm message={'تم إنشاء حساب بنجاح'} />}
        />
        <Route
          path="/confirm1"
          element={<Confirm message={'تم تسجيل الدخول بنجاح'} />}
        />
        <Route path="/car" element={<AuctionGroup paragraph="سيارات" />} />
        <Route path="/bilding" element={<AuctionGroup paragraph="عقارات" />} />
        <Route
          path="/elctron"
          element={<AuctionGroup paragraph="إلكترونيات" />}
        />
        <Route path="/fir" element={<AuctionGroup paragraph="أثاث" />} />
        <Route path="/clothe" element={<AuctionGroup paragraph="ملابس" />} />
        <Route path="/jel" element={<AuctionGroup paragraph="إكسسوار" />} />
        <Route path="/other" element={<AuctionGroup paragraph="أخرى" />} />
        <Route path="/det" element={<Details />} />
        {/* tenders */}
        <Route path="/bild" element={<TenderGroup paragraph="بناءواعمار" />} />
        <Route
          path="/public"
          element={<TenderGroup paragraph="خدمات لأماكن عامة" />}
        />
        <Route
          path="/varios"
          element={<TenderGroup paragraph="خدمات منوعة" />}
        />
        <Route
          path="/cars"
          element={<TenderGroup paragraph="مركبات واليات" />}
        />
        <Route
          path="/other_tender"
          element={<TenderGroup paragraph="أخرى" />}
        />
        <Route path="/tenders" element={<AllTenders />} />
        <Route path="/share-tenders" element={<ShareTenders />} />
        <Route path="/favorite-tender" element={<FavoriteTenders />} />
        <Route path="/createTender" element={<CreateTender />} />
        <Route path="/Create_Tender" element={<Create_Tender />} />
        <Route path="/tendersgroup" element={<TenderGroups />} />
        <Route path="/det-tender" element={<Details_Tender />} />
        {/* <Route path='/profile' element={<Profile/>}/> */}
        <Route path="/create" element={<Create />} />
        <Route path="/Aucparticep" element={<AucParticiped />} />
        <Route path="/TenderCreate" element={<TenderCreate />} />
        <Route path="/TenderParticiped" element={<TenderParticiped />} />
        <Route path="/FavAuction" element={<FavAuction />} />
        <Route path="/FavTender" element={<FavTender />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/wallet" element={<Wallet />} />
        {/* logout */}
        <Route path="/logout1" element={<ConfirmLogout />} />
        <Route path="/users" element={<All />} />
        <Route path="/usersdetails" element={<AllUsers />} />
        {/* Admin */}
        <Route path="/ad" element={<WalletManger />} />
        <Route path="/con" element={<Control />} />
        <Route path="/Auc" element={<AuctionAdmin />} />
        <Route path="/Ten" element={<TenderAdmin />} />
        <Route path="/use" element={<UserAdmin />} />
        <Route path="/Gr" element={<GroupAdmin />} />
        <Route path="/Pay" element={<PayAdmin />} />
        <Route path="/Wal" element={<WalletAdmin />} />
        <Route path="/edit" element={<EditGroup />} />
        <Route path="/ADD" element={<AddGroup />} />
        <Route path="/not" element={<Notification />} />
        <Route path="/notread" element={<UnReadnotification />} />
        <Route path="/read" element={<Readnotification />} />
{/* <<<<<<< HEAD */}
        <Route path="/result" element={<Result />} />

 {/* ======= */}

        {/* <Route path="/group" element={<Group/>}/> */}

        {/* <Route path="/result" element={<Result />} /> */}
{/* >>>>>>> c9cd868c13e655ef233463f5ebb7c81e546d1fa3  */}
      </Routes>
    </div>
  );
}

export default App;
