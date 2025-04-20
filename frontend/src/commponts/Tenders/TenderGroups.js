import TendersNavbar from './TendersNavbar';
import Navbar from '../Home/Navbar';
import { Link, useNavigate } from 'react-router-dom';
import Footer from '../privacy policy/Footer';

export default function TenderGroups() {
  const navegate = useNavigate();
  return (
    <div>
      <Navbar wordBlod={'tenders'} />
      <TendersNavbar wordBlod={'group'} />
      <button
        className="createauction"
        onClick={() => {
          navegate('/Create_Tender');
        }}
      >
        <p>إنشاء مناقصة</p>
        <i className="fas fa-plus"></i>
      </button>
      <div className="group-con">
        <div className="group-div div11">
          <Link className="link" to="/bild">
            بناءواعمار
          </Link>
        </div>
        <div className="group-div div22">
          <Link className="link" to="/public">
            خدمات لأماكن عامة
          </Link>
        </div>
        <div className="group-div div33">
          <Link className="link" to="/varios">
            خدمات منوعة
          </Link>
        </div>
        <div className="group-div div44">
          <Link className="link" to="/cars">
            مركبات واليات
          </Link>
        </div>
        <div className="group-div div55">
          <Link className="link" to="/other_tender">
            أخرى
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
}
