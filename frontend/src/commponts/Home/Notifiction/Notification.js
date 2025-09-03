import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Navbar from '../Navbar';
import './Notification.css';
import immm from '../../../image/car.jpg';
import Footer from '../../privacy policy/Footer';

export default function Notification() {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <>
      <Navbar />
      <div className="allll">
        <div className="con_link_noti">
          <Link to="/not" className={currentPath === '/not' ? 'active' : ''}>
            الكل
          </Link>

          <Link
            to="/notread"
            className={currentPath === '/notread' ? 'active' : ''}
          >
            غير المقروءة
          </Link>

          <Link to="/read" className={currentPath === '/read' ? 'active' : ''}>
            المقروءة
          </Link>
        </div>

        <div className="con_notif">
          <div>
            <img src={immm} alt="err" className="imgnot" />
            <p className="p111">سيارة افالون للبيع</p>
            <p className="p222">
              {' '}
              مزايدة جديدة : قام شخص ما بالمزايدة على ......
            </p>
          </div>
          <div>
            <img src={immm} alt="err" className="imgnot" />
            <p className="p111">سيارة افالون للبيع</p>
            <p className="p222">مزايدة جديدة</p>
          </div>
          <div>
            <img src={immm} alt="err" className="imgnot" />
            <p className="p111">سيارة افالون للبيع</p>
            <p className="p222">مزايدة جديدة</p>
          </div>
          <div>
            <img src={immm} alt="err" className="imgnot" />
            <p className="p111">سيارة افالون للبيع</p>
            <p className="p222">مزايدة جديدة</p>
          </div>
          <div>
            <img src={immm} alt="err" className="imgnot" />
            <p className="p111">سيارة افالون للبيع</p>
            <p className="p222">مزايدة جديدة</p>
          </div>
          <div>
            <img src={immm} alt="err" className="imgnot" />
            <p className="p111">سيارة افالون للبيع</p>
            <p className="p222">مزايدة جديدة</p>
          </div>
          <div>
            <img src={immm} alt="err" className="imgnot" />
            <p className="p111">سيارة افالون للبيع</p>
            <p className="p222">مزايدة جديدة</p>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}
