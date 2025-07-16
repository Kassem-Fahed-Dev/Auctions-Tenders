import './Confirm.css';
import ll from '../../image/user2.jpg';
import imag from '../../image/logo.png';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Home/Navbar';
import Confirm from './Confirm';
import { useState } from 'react';
export default function ConfirmLogout({}) {

  const [show, setshow] = useState(false);
  function handelaccept() {
    localStorage.setItem('jwt', null);
    localStorage.setItem('name', 'حساب الدخول');
    localStorage.setItem('img', ll);
    setshow(true);
  }
  function handereject() {
    window.history.go(-1);
  }
  return (
    <>
      {!show && <Navbar />}
      {show ? (
        <Confirm message="تم تسجيل الخروج بنجاح" />
      ) : (
        <div className="con-msg2">
          <div className="message2">
            <p className="tit">هل أنت متأكد من أنك تريد تسجيل الخروج؟</p>
            <p className="description">
              عند قيامك بالضغط على موافق، هذا يعني أنك لن تستطيع النشر أو
              المشاركة بأي مزاد أو مناقصة قبل أن تقوم بإنشاء حساب جديد.
            </p>

            <div className="con-button">
              <button
                className="accept"
                onClick={() => {
                  handelaccept();
                }}
              >
                موافق
              </button>
              <button
                className="reject"
                onClick={() => {
                  handereject();
                }}
              >
                تراجع
              </button>
            </div>
          </div>

          <div className="side-right">
            <div>
              <img className="footer-logo" src={imag} alt="logo" />
            </div>
            <h1 className="side-right-h1">منصة Smart World</h1>
            <h6 className="side-right-h6">
              منصة تفاعلية رائدة في تقديم المزادات والمناقصات الإلكترونية
            </h6>
          </div>
        </div>
      )}
    </>
  );
}
