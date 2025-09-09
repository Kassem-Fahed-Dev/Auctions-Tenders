import '../Admin.css';
import imag from '../../../image/logo.png';
import { Link } from 'react-router-dom';
import SortDropdown from '../SortDropdown';
import Auction from '../../Auctions/Auction';
import axiosInstance from '../../AxiosInterceptors';
import { useState } from 'react';
import { useEffect } from 'react';
import fat from '../../../image/tend.jpg';
import fat2 from '../../../image/tend2.jpg';
import fat3 from '../../../image/tend3.jpg';
export default function AuctionAdmin() {
  const [all, setAll] = useState([]);
  const [yes, setYes] = useState(true);

  const [yes1, setYes1] = useState(true);
  const [type, setType] = useState('مرفوعة للطلب');

  let sort;
  const token = localStorage.getItem('jwt');
  const [errorMessage, setErrorMessage] = useState({});
  useEffect(() => {
    axiosInstance
      .get(
        `/api/v1/auctions?status=قيد الانتظار `,

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
  const sortAu = async (e, type1) => {
    const { value } = e.target;
    setType(value);
    if (type1 == 'قيد الانتظار') {
      console.log('o');
      setYes(true);
      setYes1(true);
      console.log(yes);
      console.log(yes1);
    } else {
      console.log('o1');
      setYes(null);
      setYes1(null);
      console.log(yes);
      console.log(yes1);
    }
    await new Promise((resolve) => setTimeout(resolve, 0));
    console.log(yes);
    console.log(yes1);
    console.log(type1);
    // console.log(yes)
    // console.log(yes1)
    axiosInstance
      .get(
        `/api/v1/auctions?status=${type1} `,

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
  };
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
              <i class="fa-solid fa-gavel"></i> مدير المزادات{' '}
            </h1>
            <div className="ten_ptn_control">
              <button
                className="ptn_Gr1"
                value={'مرفوعة للطلب'}
                onClick={(e) => {
                  sortAu(e, 'قيد الانتظار');
                }}
              >
                {' '}
                مرفوعة للطلب{' '}
              </button>
              <button
                className="ptn_Gr1"
                value={'مقبولة'}
                onClick={(e) => {
                  sortAu(e, 'مقبول');
                }}
              >
                مقبول{' '}
              </button>
              <button
                className="ptn_Gr1"
                value={'مرفوضة'}
                onClick={(e) => {
                  sortAu(e, 'مرفوض');
                }}
              >
                مرفوض{' '}
              </button>
            </div>
            <p
              className="t2"
              style={{
                color:
                  type === 'مرفوعة للطلب'
                    ? '#000000ff'
                    : type === 'مقبولة'
                    ? '#27ae60' // أخضر
                    : '#e74c3c', // أحمر
              }}
            >
              {' '}
              {type === 'مرفوعة للطلب' && (
                <img
                  src={fat}
                  alt=" err"
                  style={{ color: '#000000', width: '40px', marginLeft: '5px' }}
                />
              )}
              {type === 'مقبولة' && (
                <img
                  src={fat3}
                  alt=" err"
                  style={{ color: 'green', width: '40px', marginLeft: '5px' }}
                />
              )}
              {type === 'مرفوضة' && (
                <img
                  src={fat2}
                  alt="err"
                  style={{ color: 'red', width: '40px', marginLeft: '5px' }}
                />
              )}
              مزادات {type}
            </p>
            <div className="con_Adminsort">
              {/* <SortDropdown />
              <div className="sdsd">
                <i className="fas fa-search icon "></i>
                <input type="serach" className="searchptnAdmin" />
              </div> */}
            </div>
          </div>
        </div>
        <div className="fflex">
          {all.map((auc) => (
            <Auction data={auc} showAccept={yes} showReject={yes1} />
          ))}
          {/* <Auction showAccept="true" showReject="true" /> */}
        </div>
      </div>
    </>
  );
}
