import './Admin.css';
import imag from '../../image/logo.png';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axiosInstance from '../AxiosInterceptors';
import { id } from '../Account/Profile/store/Redux';
export default function WalletAdmin() {
  const [walletActivity, setWalletActivity] = useState([]);
  const token = localStorage.getItem('jwt');
  const [errorMessage, setErrorMessage] = useState({});
  const status = 'pending';
  // /api/v1/payment/walletActivities?descriptionTransaction=Deposit requested&status=completed
  useEffect(() => {
    axiosInstance
      .get(`/api/v1/payments/walletActivities?status=${status}`, {
        headers: {
          'Content-Type': 'application/json',
          'Accept-Language': 'ar',
          credentials: 'include',
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setWalletActivity(res.data.data);
        console.log(res.data.data);
        console.log(walletActivity);
      })
      .catch((error) => {
        console.log('error');
        // setHover('spinner');
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

  const accept = (id, discription) => {
    console.log('lllllllllllllllllll');
    const valdition = {};
    console.log(id);
    console.log(discription);
    axiosInstance
      .patch(
        `${
          discription == 'Deposit requested'
            ? `/api/v1/payments/deposit/approve/${id}`
            : `/api/v1/payments/withdraw/complete/${id}`
        }`,
        {},
        {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
            'Accept-Language': 'ar',
            credentials: 'include',
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        //  alert('تم تغيير كلمة المرور بنجاح')
        // setHoverAuction('spinner');
        window.location.reload();

        console.log(res);
      })
      .catch((error) => {
        // setHoverAuction('spinner');
        if (error.response) {
          valdition.messageBackend = error.response.data.message;
          // setErrorMessageupdate(valdition);
          console.log('p3');
        } else {
          console.log('An unexpected error occurred:', error.message);
          // setErrorMessageupdate({
          //   messageBackend: 'An unexpected error occurred.',
          // });
        }
      });
  };
  const reject = (id, discription) => {
    console.log('pppppppppppppppppppp');
    const valdition = {};
    axiosInstance
      .patch(
        `${
          discription == 'Deposit requested'
            ? `/api/v1/payments/deposit/reject/${id}`
            : `/api/v1/payments/withdraw/fail/${id}`
        }`,
        {},
        {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
            'Accept-Language': 'ar',
            credentials: 'include',
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        //  alert('تم تغيير كلمة المرور بنجاح')
        // setHoverAuction('spinner');
        window.location.reload();

        console.log(res);
      })
      .catch((error) => {
        // setHoverAuction('spinner');
        if (error.response) {
          valdition.messageBackend = error.response.data.message;
          // setErrorMessageupdate(valdition);
          console.log('p3');
        } else {
          console.log('An unexpected error occurred:', error.message);
          // setErrorMessageupdate({
          //   messageBackend: 'An unexpected error occurred.',
          // });
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
              <Link to="/Pay">
                <span>
                  <i class="fa-solid fa-sack-dollar"></i>{' '}
                </span>{' '}
                الدفع{' '}
              </Link>
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
              <i className="fa-solid fa-wallet"></i>مدير المحفظة{' '}
            </h1>
            <h1 className="titdet">عرض كل النشاطات الحديثة </h1>
          </div>
        </div>

        <div>
          <table className="table2">
            <thead>
              <tr>
                <th>النوع</th>
                <th>الاسم الكامل</th>
                <th>المبلغ</th>
                <th>التاريخ</th>
                <th>الحالة</th>
              </tr>
            </thead>
            <tbody>
              {walletActivity.map((activity) => (
                <tr>
                  <td>{activity?.descriptionTransaction}</td>
                  <td>{activity?.partner?.name}</td>
                  <td>{activity?.amount} مليون ل.س</td>
                  <td> {activity.date?.slice(0, 10).replaceAll('-', '/')}</td>
                  <td>
                    <div className="con_table">
                      <button
                        
                        className="pttable"
                        onClick={()=>{accept(
                          activity?._id,
                          activity?.descriptionTransaction
                        )}}
                      >
                        قبول{' '}
                      </button>
                      <button
                        className="pttable2"
                       
                        
                        onClick={()=>{reject(
                          activity?._id,
                          activity?.descriptionTransaction
                        )}}
                      >
                        {' '}
                        رفض{' '}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {/* <tr>
                <td>مراد</td>
                <td>فادي الأحمد</td>
                <td>500 مليون ل.س</td>
                <td>2025/5/15</td>
                <td>
                  <div className="con_table">
                    <button className="pttable">قبول </button>
                    <button className="pttable2"> رفض </button>
                  </div>
                </td>
              </tr>
              <tr>
                <td>مراد</td>
                <td>فادي الأحمد</td>
                <td>500 مليون ل.س</td>
                <td>2025/5/15</td>
                <td>
                  <div className="con_table">
                    <button className="pttable">قبول </button>
                    <button className="pttable2"> رفض </button>
                  </div>
                </td>
              </tr>
              <tr>
                <td>مراد</td>
                <td>فادي الأحمد</td>
                <td>500 مليون ل.س</td>
                <td>2025/5/15</td>
                <td>
                  <div className="con_table">
                    <button className="pttable">قبول </button>
                    <button className="pttable2"> رفض </button>
                  </div>
                </td>
              </tr>
              <tr>
                <td>مراد</td>
                <td>فادي الأحمد</td>
                <td>500 مليون ل.س</td>
                <td>2025/5/15</td>
                <td>
                  <div className="con_table">
                    <button className="pttable">قبول </button>
                    <button className="pttable2"> رفض </button>
                  </div>
                </td>
              </tr>
              <tr>
                <td>مراد</td>
                <td>فادي الأحمد</td>
                <td>500 مليون ل.س</td>
                <td>2025/5/15</td>
                <td>
                  <div className="con_table">
                    <button className="pttable">قبول </button>
                    <button className="pttable2"> رفض </button>
                  </div>
                </td>
              </tr> */}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
