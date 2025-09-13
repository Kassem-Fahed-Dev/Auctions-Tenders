import './Admin.css';
import imag from '../../image/logo.png';
import { Link } from 'react-router-dom';
import SortDropdown from './SortDropdown';
import Tender from '../Tenders/Tender';
import axiosInstance from '../AxiosInterceptors';
import { useState } from 'react';
import { useEffect } from 'react';
import fat from '../.././image/tend.jpg';
import fat2 from '../.././image/tend2.jpg';
import fat3 from '../.././image/tend3.jpg';
import grgr from '../../image/group.jpg';
import { usePagination } from '../Auctions/PaginationContext';
import Pagination from '../Auctions/Pagination';
export default function TenderAdmin() {
  const [all, setAll] = useState([]);
  const [yes, setYes] = useState(true);
   const [type1, setType1] = useState('قيد الانتظار')
  const [yes1, setYes1] = useState(true);
  const [type, setType] = useState('مرفوعة للطلب');
  const { currentPage,setCurrentPage, itemsPerPage } = usePagination();
  let sort;
  const token = localStorage.getItem('jwt');
  const [errorMessage, setErrorMessage] = useState({});
  useEffect(() => {
    axiosInstance
      .get(
        `/api/v1/tenders?status=${type1}&page=${currentPage}&limit=3`,

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
if (res.data.data.data.length === 0 && currentPage > 1) {
          setCurrentPage((prev) => prev - 1);
          return;
        }
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
  }, [type1,currentPage]);
  const sortTen = async (e, type1) => {
     setCurrentPage(1)
    const { value } = e.target;
    setType(value);
    if (type1 == 'قيد الانتظار') {
      setYes(true);
      setYes1(true);
    } else {
      setYes(null);
      setYes1(null);
    }
    await new Promise((resolve) => setTimeout(resolve, 0));
    console.log(type1);
    // axiosInstance
    //   .get(
    //     `/api/v1/tenders?status=${type1} `,

    //     {
    //       headers: {
    //         'Content-Type': 'application/json',
    //         'Accept-Language': 'ar',
    //         credentials: 'include',
    //         Authorization: `Bearer ${token}`,
    //       },
    //     }
    //   )
    //   .then((res) => {
    //     setAll(res.data.data.data);
    //     console.log(res.data.data.data);
    //   })
    //   .catch((error) => {
    //     if (error.response) {
    //       const validationErrors = {};
    //       validationErrors.messageBackend = error.response.data.message;
    //       setErrorMessage(validationErrors);
    //     } else {
    //       console.log('An unexpected error occurred:', error.message);
    //       setErrorMessage({
    //         messageBackend: 'An unexpected error occurred.',
    //       });
    //     }
    //   });
     setType1(type1)
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
                  <img src={grgr} alt="err" />
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
              <button
                className="ptn_Gr1"
                value={'مرفوعة للطلب'}
                onClick={(e) => {
                  sortTen(e, 'قيد الانتظار');
                }}
              >
                مرفوع للطلب{' '}
              </button>
              <button
                className="ptn_Gr1"
                value={'مقبولة'}
                onClick={(e) => {
                  sortTen(e, 'مقبول');
                }}
              >
                مقبول{' '}
              </button>
              <button
                className="ptn_Gr1"
                value={'مرفوضة'}
                onClick={(e) => {
                  sortTen(e, 'مرفوض');
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
              مناقصات {type}
            </p>
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
          {all.map((auc) => (
            <Tender data={auc} showAccept={yes} showReject={yes1} />
          ))}
          {/* <Tender />
          <Tender showAccept="true" showReject="true" /> */}
        </div>
        <Pagination pos={'wallet'}/>
      </div>
    </>
  );
}
