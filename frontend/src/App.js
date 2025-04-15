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
import ResetPassword from './commponts/Account/ResetPassword';
import Details from './commponts/Account/details/Details';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/privacy1" element={<Privacy1 />} />
        <Route path="/acount" element={<CreateAcount />} />
        <Route path="/auctions" element={<AllAuctions />} />
        <Route path="/share-auction" element={<ShareAuctions />} />
        <Route path="/favorite" element={<FavoriteAuction />} />
        <Route path="/auctionsgroup" element={<AuctionGroups />} />
        <Route path="/CreateAuction" element={<CreateAuction />} />
        <Route path="/createAuctions" element={<AuctionNew />} />
        <Route path="/Modify" element={<Modify />} />
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
      </Routes>
    </div>
  );
}

export default App;
