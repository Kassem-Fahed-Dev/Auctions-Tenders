import AuctionsNavbar from './AuctionsNavbar';
import Navbar from '../Home/Navbar';
import { Link, useNavigate } from 'react-router-dom';
import Footer from '../privacy policy/Footer';
export default function AuctionGroups() {
  const navegate = useNavigate();
  function go1() {}
  return (
    <div>
      <Navbar wordBlod={'auctions'} />
      <AuctionsNavbar wordBlod={'group'} />
      <button
        className="createauction"
        onClick={() => {
          navegate('/CreateAuction');
        }}
      >
        <p>إنشاء مزاد</p>
        <i className="fas fa-plus"></i>
      </button>
      <div className="group-con">
        <div className="group-div div1">
          <Link className="link" to="/car">
            سيارات
          </Link>
        </div>
        <div className="group-div div2">
          <Link className="link" to="/bilding">
            عقارات
          </Link>
        </div>
        <div className="group-div div3">
          <Link className="link" to="/elctron">
            إلكترونيات
          </Link>
        </div>
        <div className="group-div div4">
          <Link className="link" to="/fir">
            أثاث
          </Link>
        </div>
        <div className="group-div div5">
          <Link className="link" to="/clothe">
            ملابس
          </Link>
        </div>
        <div className="group-div div6">
          <Link className="link" to="/jel">
            إكسسوار
          </Link>
        </div>
        <div className="group-div div7">
          <Link className="link" to="/other">
            أخرى
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
}
