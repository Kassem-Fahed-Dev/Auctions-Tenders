import './Admin.css';
import imag from '../../image/logo.png';
import { Link } from 'react-router-dom';
import SortDropdown from './SortDropdown';
import Tender from '../Tenders/Tender';
import axiosInstance from '../AxiosInterceptors';
import { useState } from 'react';
import { useEffect } from 'react';
export default function TenderAdmin() {
  const [all, setAll] = useState([]);
  let sort;
  const token = localStorage.getItem('jwt');
  const [errorMessage, setErrorMessage] = useState({});
  useEffect(() => {
    axiosInstance
      .get(
        `/api/v1/tenders?status=قيد الانتظار`,

        {
          headers: {
            'Content-Type': 'application/json',
            'Accept-Language': 'ar',
            credentials: 'include',
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        setAll(res.data.data.data);
        console.log(res.data.data.data);
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
  }, []);
  return (
    <>
      <div className="con-admin">
        <div className="con_sides">
          <div className="sideAdmin">
            <img className="logAdmin" src={imag} alt="logo" />
            <h1 className="side_Admin_h1">منصة Smart World</h1>
            <h6 className="side_Admin_h6">
              منصة تفاعلية رائدة في تقديم المزادات والمناقصات الإلكترونية
            </h6>
            <div className="linksAdmin">
              <Link to="/con">
                <span>
                  <i class="fa-solid fa-house"></i>{' '}
                </span>
                لوحة التحكم{' '}
              </Link>
              <Link to="/use">
                <span>
                  <i class="fa-solid fa-user-large"></i>
                </span>
                مدير المستخدمين{' '}
              </Link>
              <Link to="/Auc">
                <span>
                  <i class="fa-solid fa-gavel"></i>{' '}
                </span>
                مدير المزادات{' '}
              </Link>
              <Link to="/Ten">
                <span>
                  <i class="far fa-handshake"></i>{' '}
                </span>
                مدير المناقصات{' '}
              </Link>
              <Link to="/Gr">
                <span>
                  <i class="fa-solid fa-users"></i>{' '}
                </span>
                مدير المجموعات{' '}
              </Link>
              {/* <Link to="/Pay">
                <span>
                  <i class="fa-solid fa-sack-dollar"></i>{' '}
                </span>{' '}
                الدفع{' '}
              </Link> */}
              <Link to="/Wal">
                <span>
                  <i class="fa-solid fa-wallet"></i>{' '}
                </span>
                مدير المحفظة{' '}
              </Link>
            </div>
          </div>
          <div className="side2">
            <h1 className="h1tit">
              {' '}
              <i class="far fa-handshake"></i> مدير المناقصات{' '}
            </h1>
            <div className="ten_ptn_control">
              <button className="ptn_Gr1">مرفوع للطلب </button>
              <button className="ptn_Gr1">مقبول </button>
              <button className="ptn_Gr1">مرفوض </button>
            </div>
            <p className="t2">المناقصات المرفوعة للطلب </p>
            <div className="con_Adminsort">
              {/* <SortDropdown /> */}
              {/* <div className="sdsd">
                <i className="fas fa-search icon "></i>
                <input type="serach" className="searchptnAdmin" />
              </div> */}
            </div>
          </div>
        </div>
        <div className="fflex">
          {/* {all.map((auc) => (
            <Tender data={auc} />
          ))} */}
          <Tender />
          <Tender showAccept="true" showReject="true" />
        </div>
      </div>
    </>
  );
}
