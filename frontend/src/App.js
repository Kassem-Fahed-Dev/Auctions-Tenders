import logo from './logo.svg';
import './App.css';
import Home from './commponts/Home/Home';
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

// >>>>>>> Stashed changes
function App() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  // const tok="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3ZGJhZDAyYzc5NDU0MDA1YmQ0NmEwZiIsImlhdCI6MTc0NDk2ODA3OSwiZXhwIjoxNzUyNzQ0MDc5fQ.Y2jTAwwKl9aFmB56wX3CzluGi7E88T5Tsd8FIDMJRIU"
// <<<<<<< HEAD
  const tok = localStorage.getItem('jwt'); 
  // console.log(tok)
// =======
  // const tok = localStorage.getItem('jwt');
// >>>>>>> f84a1459e3c7971148b91fcd2fe9795a8b8ebddb
  // useEffect(() => {
  //   const checkLoginStatus = async () => {
  //     try {
  //       const response = await axios.get('https://auctions-tenders-38sx.onrender.com/api/v1/users/checkLogin', {
  //         withCredentials: true,  // تأكد من أن هذه هنا
  //         headers: {
  //             'Authorization': `Bearer ${tok}` // تأكد من وجود التوكن
  //         }
  // إضافة credentials إلى الكود
  // هذه السطر هنا
  // });

  // افترض أن الخادم يعيد حالة تسجيل الدخول في data
  //       if (response.data.loggedIn) {
  //         setIsLoggedIn(true);
  //         console.log('1')
  //       } else {
  //         navigate('/acount');
  //         console.log('2')
  //       }
  //     } catch (error) {
  //       console.error('Error checking login status:', error);
  //       navigate('/acount');
  //       console.log('3')
  //     } finally {
  //       setIsLoading(false);
  //       console.log('4')
  //     }
  //   };

  //   checkLoginStatus();
  // }, [navigate]);

  // if (isLoading) {
  //   return <div>Loading...</div>; // عرض شاشة تحميل أثناء التحقق من حالة تسجيل الدخول
  // }
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/privacy1" element={<Privacy1 />} />
        <Route path="/acount" element={<CreateAcount />} />
        {/* <Route path="/profile" element={<Profile />} /> */}
        <Route path="/auctions" element={<AllAuctions />} />
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
      </Routes>
    </div>
  );
}

export default App;
