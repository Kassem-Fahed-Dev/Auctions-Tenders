import './Confirm.css';
import ll from '../../image/user2.jpg';
import imag from '../../image/logo.png';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Home/Navbar';
import Confirm from './Confirm';
import { useState } from 'react';
import axiosInstance from '../AxiosInterceptors';
export default function ConfirmLogout({}) {
  const navegate=useNavigate()
   const token = localStorage.getItem('jwt'); 
   const [errorMessage, setErrorMessage] = useState({});
  const [show, setshow] = useState(false);
  function handelaccept() {
    localStorage.setItem('jwt', null);
    localStorage.setItem('name', 'حساب الدخول');
    localStorage.setItem('img', ll);
    setshow(true);
    axiosInstance
          .get(
            `/api/v1/users/logout`,
            {
              headers: {
                'Content-Type': 'application/json',
                'Accept-Language': 'ar',
                'credentials': 'include',
                'Authorization': `Bearer ${token}`,
              },
            }
          )
          .then((res) => {
           navegate('/')
            console.log(res)
           console.log('lllogout')
          })
          .catch((error) => {
            if (error.response) {
              const validationErrors = {};
              validationErrors.messageBackend = error.response.data.message;
              setErrorMessage(validationErrors);
            } else {
              console.log('An unexpected error occurred:', error.message);
              setErrorMessage({
                messageBackend: 'An unexpected error occurred.',
              });
            }
          });
      };
     
 
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
