// import { useEffect, useState } from 'react';
// import Profile from './Profile';
// import axiosInstance from '../../../AxiosInterceptors';
// import { submit } from '../store/Redux';
// export default function Wallet() {
//   const token = localStorage.getItem('jwt');
//   const [wallet, setWallet] = useState('');
//   const [walletActivity, setWalletActivity] = useState([]);
//   const [timeh, setTimeh] = useState([]);
//   const [timem, setTimem] = useState([]);
//   const [timeap, setTimeap] = useState([]);
//   const [isDisabled, setIsDisabled] = useState(true);
//   const [isDisabled1, setIsDisabled1] = useState(true);
//   const [deposit, setDeposit] = useState({ amount: '' });
//   const [errorMessage5, setErrorMessage5] = useState({});
//   const [withdraw, setWithdraw] = useState({ amount: '' });
//   const [errorMessage, setErrorMessage] = useState({});
//   useEffect(() => {
//     axiosInstance
//       .get('/api/v1/payments/wallet', {
//         headers: {
//           'Content-Type': 'application/json',
//           'Accept-Language': 'ar',
//           credentials: 'include',
//           Authorization: `Bearer ${token}`,
//         },
//       })
//       .then((res) => {
//         setWallet(res.data.data);
//         console.log(res.data.data);
//       })
//       .catch((error) => {
//         console.log('error');
//         // setHover('spinner');
//         if (error.response) {
//           const validationErrors = {};
//           validationErrors.messageBackend = error.response.data.message;
//           setErrorMessage(validationErrors);
//         } else {
//           console.log('An unexpected error occurred:', error.message);
//           setErrorMessage({
//             messageBackend: 'An unexpected error occurred.',
//           });
//         }
//       });
//   }, []);
//   useEffect(() => {
//     axiosInstance
//       .get('/api/v1/payments/myWalletActivities', {
//         headers: {
//           'Content-Type': 'application/json',
//           'Accept-Language': 'ar',
//           credentials: 'include',
//           Authorization: `Bearer ${token}`,
//         },
//       })
//       .then((res) => {
//         setWalletActivity(res.data.data);
//         console.log(res.data.data);
//         console.log(walletActivity);
//       })
//       .catch((error) => {
//         console.log('error');
//         // setHover('spinner');
//         if (error.response) {
//           const validationErrors = {};
//           validationErrors.messageBackend = error.response.data.message;
//           setErrorMessage(validationErrors);
//         } else {
//           console.log('An unexpected error occurred:', error.message);
//           setErrorMessage({
//             messageBackend: 'An unexpected error occurred.',
//           });
//         }
//       });
//   }, []);
//   const handleChange1 = (e) => {
//     const { name, value } = e.target;
//     setIsDisabled(false);
//     setDeposit({ ...deposit, [name]: Number(value.trim()) });
//     console.log(deposit);
//   };

//   const handleChange2 = (e) => {
//     const { name, value } = e.target;
//     setIsDisabled1(false);
//     setWithdraw({ ...withdraw, [name]: Number(value.trim()) });
//     console.log(withdraw);
//   };

//   const submitdep = (e) => {
//     // e.preventDefault();
//     console.log('ppp');
//     axiosInstance
//       .post('/api/v1/payments/deposit', JSON.stringify(deposit), {
//         headers: {
//           'Content-Type': 'application/json',
//           'Accept-Language': 'ar',
//           credentials: 'include',
//           Authorization: `Bearer ${token}`,
//         },
//       })
//       .then((res) => {
//         console.log(res);
//         setDeposit({ amount: '' });
//         window.location.reload();
//       })
//       .catch((error) => {
//         if (error.response) {
//           const validationErrors4 = {};
//           validationErrors4.messageBackend = error.response.data.message;
//           setErrorMessage5(validationErrors4);
//         } else {
//           console.log('An unexpected error occurred:', error.message);
//           setErrorMessage5({
//             messageBackend: 'An unexpected error occurred.',
//           });
//         }
//       });
//   };
//   const submitWith = () => {
//     axiosInstance
//       .post('/api/v1/payments/withdraw', JSON.stringify(withdraw), {
//         headers: {
//           'Content-Type': 'application/json',
//           'Accept-Language': 'ar',
//           credentials: 'include',
//           Authorization: `Bearer ${token}`,
//         },
//       })
//       .then((res) => {
//         console.log(res);
//         setWithdraw({ amount: '' });
//         window.location.reload();
//       })
//       .catch((error) => {
//         if (error.response) {
//           const validationErrors4 = {};
//           validationErrors4.messageBackend = error.response.data.message;
//           setErrorMessage5(validationErrors4);
//         } else {
//           console.log('An unexpected error occurred:', error.message);
//           setErrorMessage5({
//             messageBackend: 'An unexpected error occurred.',
//           });
//         }
//       });
//   };

//   const extractDateTime = (dateString) => {
//     const date = new Date(dateString);

//     let day = date.toLocaleDateString('ar-EG', { weekday: 'long' }); // اليوم باللغة العربية

//     // تعديل اليوم
//     if (day == 'السبت') {
//       day = 'الأحد';
//     } else if (day == 'الجمعة') {
//       day = 'السبت';
//     } else if (day == 'الأحد') {
//       day = 'الاثنين';
//     } else if (day == 'الاثنين') {
//       day = 'الثلاثاء';
//     } else if (day == 'الثلاثاء') {
//       day = 'الأربعاء';
//     } else if (day == 'الأربعاء') {
//       day = 'الخميس';
//     } else if (day == 'الخميس') {
//       day = 'الجمعة';
//     }

//     // الحصول على الوقت بالتوقيت المحلي
//     let hours = date.getHours(); // استخدم getHours للحصول على الوقت المحلي
//     const minutes = date.getMinutes().toString().padStart(2, '0'); // استخدم getMinutes للحصول على الدقائق المحلية

//     // تحديد AM أو PM
//     const ampm = hours >= 12 ? 'م' : 'ص';
//     hours = hours % 12; // تحويل الصيغة من 24 إلى 12
//     hours = hours ? hours : 12; // إذا كانت الساعة 0، جعله 12

//     return { day, hours, minutes, ampm };
//   };

//   // مثال للاستخدام
//   // const dateTimeInfo = extractDateTime("2025-08-31T20:39:09.672Z");
//   // console.log(walletActivity[0]?.date);
//   for (let index = 0; index < walletActivity.length; index++) {
//     const { day, hours, minutes, ampm } = extractDateTime(
//       walletActivity[index]?.createdAt
//     );
//     //  setTimeh([...timeh,hours])
//     //   setTimem([...timem,minutes])
//     //    setTimeap([...timeap,ampm])
//   }
//   const rows = [];

//   for (let index = 0; index < walletActivity.length; index++) {
//     const activity = walletActivity[index];
//     const { day, hours, minutes, ampm } = extractDateTime(
//       walletActivity[index]?.date
//     );
//     rows.push(
//       <tr key={index}>
//         <td>{activity.descriptionTransaction}</td>
//         <td>{activity.amount} ل.س</td>
//         <td>
//           {activity.date?.slice(0, 10).replaceAll('-', '/')} <br />
//           {hours}:{minutes}
//           {ampm}
//         </td>
//         <td>
//           <span className="status done">
//             {activity.status === 'pending'
//               ? 'انتظار⏳'
//               : activity.status === 'completed'
//               ? 'مكتمل✅'
//               : 'فشل❌'}
//           </span>
//         </td>
//       </tr>
//     );
//   }

//   return (
//     <>
//       <Profile />
//       <div className="walletCon">
//         <div className="titleWallet">
//           <i class="fa-solid fa-wallet"></i>{' '}
//           <span className="span">محفطتك الالكترونية</span>
//         </div>
//         <div>
//           <p className="titleWallet">
//             <i
//               className="fas fa-sack-dollar"
//               style={{ fontSize: '33px', color: '#ffe34f' }}
//             ></i>
//             <span className="span">الرصيد في المحفظة </span>
//           </p>
//           <div className="aval">
//             المتوفر :<span>{wallet?.availableAmount} ل س</span>
//           </div>
//           <div className="aval">
//             المحجوز :<span>{wallet?.blockedAmount} ل س</span>{' '}
//           </div>
//         </div>
//         <div className="con_ed_sa">
//           <div className="con_ed">
//             <p className="tit_ed">
//               <div className="ico">
//                 <i class="fa fa-plus "></i>
//               </div>
//               <span className="span">ايداع مبلغ</span>
//             </p>
//             <p className="det_ed">أدخل المبلغ الذي تريد ايداعه</p>
//             <input
//               className="inp_ed"
//               type="number"
//               name="amount"
//               value={deposit.amount}
//               onChange={handleChange1}
//               autoComplete="off"
//             />
//             <button
//               className={`ptn_ed ${isDisabled == true ? 'color' : ''}`}
//               onClick={submitdep}
//               disabled={isDisabled}
//             >
//               {' '}
//               ايداع
//             </button>
//           </div>
//           <div className="con_sa">
//             <p className="tit_sa">
//               <div className="ico">
//                 <i class="fa-solid fa-minus minus"></i>
//               </div>
//               <span className="span">سحب مبلغ</span>
//             </p>
//             <p className="det_sa">أدخل المبلغ الذي تريد سحبه</p>
//             <input
//               className="inp_ed"
//               type="number"
//               name="amount"
//               value={withdraw.amount}
//               onChange={handleChange2}
//               autoComplete="off"
//             />
//             <button
//               className={`ptn_ed  ${isDisabled1 == true ? 'color' : ''}`}
//               disabled={isDisabled1}
//               onClick={submitWith}
//             >
//               سحب
//             </button>
//           </div>
//         </div>
//         <div>
//           <p className="titleWallet">
//             <i className="fab fa-elementor"></i>
//             <span className="span">نشاط المحفظة</span>
//           </p>

//           <table className="table1">
//             <thead>
//               <tr>
//                 <th>النوع</th>
//                 <th>المبلغ</th>
//                 <th>التاريخ</th>
//                 <th>الحالة</th>
//               </tr>
//             </thead>
//             <tbody>
//               {/* {walletActivity.map((walletActivity) => (
//                     <tr>
//                 <td>{walletActivity?.descriptionTransaction}</td>
//                 <td>{walletActivity?.amount} ل.س</td>
//                 <td>   {walletActivity?.createdAt?.slice(0, 10).replaceAll('-', '/')} <br />
//                   </td>

//                 <td>
//                   <span class="status done">{walletActivity?.status=="pending"?"انتظار⏳":walletActivity?.status=="complete"?"مكتمل✅":"فشل❌"} </span>
//                 </td>
//               </tr>
//                       ))} */}
//               {rows}

//               {/*
//               <tr>
//                 <td>سحب</td>
//                 <td>500 ل.س</td>
//                 <td>
//                   2025/07/15
//                   <br />
//                   10:06 مساءً
//                 </td>
//                 <td>
//                   <span class="status fail">فشل ❌</span>
//                 </td>
//               </tr> */}
//               {/* <tr>
//                 <td>دفع مزاد</td>
//                 <td>500 ل.س</td>
//                 <td>
//                   2025/07/15
//                   <br />
//                   10:06 مساءً
//                 </td>
//                 <td>
//                   <span class="status done">مكتمل </span>
//                 </td>
//               </tr> */}
//               {/* <tr>
//                 <td>سحب</td>
//                 <td>500 ل.س</td>
//                 <td>
//                   2025/07/15
//                   <br />
//                   10:06 مساءً
//                 </td>
//                 <td>
//                   <span class="status wait">انتظار ⏳</span>
//                 </td>
//               </tr> */}
//               {/* <tr>
//                 <td>دفع مناقصة</td>
//                 <td>500 ل.س</td>
//                 <td>
//                   2025/07/15
//                   <br />
//                   10:06 مساءً
//                 </td>
//                 <td>
//                   <span class="status done">مكتمل ✅</span>
//                 </td>
//               </tr> */}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </>
//   );
// }
import { useEffect, useState } from 'react';
import Profile from './Profile';
import axiosInstance from '../../../AxiosInterceptors';
import { submit } from '../store/Redux';

export default function Wallet() {
  const token = localStorage.getItem('jwt');
  const [wallet, setWallet] = useState('');
  const [walletActivity, setWalletActivity] = useState([]);
  const [timeh, setTimeh] = useState([]);
  const [timem, setTimem] = useState([]);
  const [timeap, setTimeap] = useState([]);
  const [isDisabled, setIsDisabled] = useState(true);
  const [isDisabled1, setIsDisabled1] = useState(true);
  const [deposit, setDeposit] = useState({ amount: '' });
  const [errorMessage5, setErrorMessage5] = useState({});
  const [withdraw, setWithdraw] = useState({ amount: '' });
  const [errorMessage, setErrorMessage] = useState({});

  // ✅ حالات جديدة للأزرار
  const [loadingDeposit, setLoadingDeposit] = useState(false);
  const [loadingWithdraw, setLoadingWithdraw] = useState(false);
  const [successDeposit, setSuccessDeposit] = useState(false);
  const [successWithdraw, setSuccessWithdraw] = useState(false);

  useEffect(() => {
    axiosInstance
      .get('/api/v1/payments/wallet', {
        headers: {
          'Content-Type': 'application/json',
          'Accept-Language': 'ar',
          credentials: 'include',
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setWallet(res.data.data);
        console.log(res.data.data);
      })
      .catch((error) => {
        console.log('error');
        if (error.response) {
          const validationErrors = {};
          validationErrors.messageBackend = error.response.data.message;
          setErrorMessage(validationErrors);
        } else {
          console.log('An unexpected error occurred:', error.message);
          setErrorMessage({ messageBackend: 'An unexpected error occurred.' });
        }
      });
  }, []);

  useEffect(() => {
    axiosInstance
      .get('/api/v1/payments/myWalletActivities', {
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
        if (error.response) {
          const validationErrors = {};
          validationErrors.messageBackend = error.response.data.message;
          setErrorMessage(validationErrors);
        } else {
          console.log('An unexpected error occurred:', error.message);
          setErrorMessage({ messageBackend: 'An unexpected error occurred.' });
        }
      });
  }, []);

  const handleChange1 = (e) => {
    const { name, value } = e.target;
    setIsDisabled(false);
    setDeposit({ ...deposit, [name]: Number(value.trim()) });
    console.log(deposit);
  };

  const handleChange2 = (e) => {
    const { name, value } = e.target;
    setIsDisabled1(false);
    setWithdraw({ ...withdraw, [name]: Number(value.trim()) });
    console.log(withdraw);
  };

  const submitdep = (e) => {
    console.log('ppp');
    setLoadingDeposit(true);
    axiosInstance
      .post('/api/v1/payments/deposit', JSON.stringify(deposit), {
        headers: {
          'Content-Type': 'application/json',
          'Accept-Language': 'ar',
          credentials: 'include',
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res);
        setDeposit({ amount: '' });
        setSuccessDeposit(true);
        setTimeout(() => setSuccessDeposit(false), 2000);
        window.location.reload();
      })
      .catch((error) => {
        if (error.response) {
          const validationErrors4 = {};
          validationErrors4.messageBackend = error.response.data.message;
          setErrorMessage5(validationErrors4);
        } else {
          console.log('An unexpected error occurred:', error.message);
          setErrorMessage5({ messageBackend: 'An unexpected error occurred.' });
        }
      })
      .finally(() => setLoadingDeposit(false));
  };

  const submitWith = () => {
    setLoadingWithdraw(true);
    axiosInstance
      .post('/api/v1/payments/withdraw', JSON.stringify(withdraw), {
        headers: {
          'Content-Type': 'application/json',
          'Accept-Language': 'ar',
          credentials: 'include',
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res);
        setWithdraw({ amount: '' });
        setSuccessWithdraw(true);
        setTimeout(() => setSuccessWithdraw(false), 2000);
        window.location.reload();
      })
      .catch((error) => {
        if (error.response) {
          const validationErrors4 = {};
          validationErrors4.messageBackend = error.response.data.message;
          setErrorMessage5(validationErrors4);
        } else {
          console.log('An unexpected error occurred:', error.message);
          setErrorMessage5({ messageBackend: 'An unexpected error occurred.' });
        }
      })
      .finally(() => setLoadingWithdraw(false));
  };

  const extractDateTime = (dateString) => {
    const date = new Date(dateString);
    let day = date.toLocaleDateString('ar-EG', { weekday: 'long' });
    if (day == 'السبت') {
      day = 'الأحد';
    } else if (day == 'الجمعة') {
      day = 'السبت';
    } else if (day == 'الأحد') {
      day = 'الاثنين';
    } else if (day == 'الاثنين') {
      day = 'الثلاثاء';
    } else if (day == 'الثلاثاء') {
      day = 'الأربعاء';
    } else if (day == 'الأربعاء') {
      day = 'الخميس';
    } else if (day == 'الخميس') {
      day = 'الجمعة';
    }
    let hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const ampm = hours >= 12 ? 'م' : 'ص';
    hours = hours % 12;
    hours = hours ? hours : 12;
    return { day, hours, minutes, ampm };
  };

  for (let index = 0; index < walletActivity.length; index++) {
    const { day, hours, minutes, ampm } = extractDateTime(
      walletActivity[index]?.createdAt
    );
  }

  const rows = [];
  for (let index = 0; index < walletActivity.length; index++) {
    const activity = walletActivity[index];
    const { day, hours, minutes, ampm } = extractDateTime(
      walletActivity[index]?.date
    );
    rows.push(
      <tr key={index}>
        <td>{activity.descriptionTransaction}</td>
        <td>{activity.amount} ل.س</td>
        <td>
          {activity.date?.slice(0, 10).replaceAll('-', '/')}
          <br />
          {hours}:{minutes} {ampm}
        </td>
        <td>
          <span className="status done">
            {activity.status === 'pending'
              ? 'انتظار⏳'
              : activity.status === 'completed'
              ? 'مكتمل✅'
              : 'فشل❌'}
          </span>
        </td>
      </tr>
    );
  }

  return (
    <>
      <Profile />
      <div className="walletCon">
        <div className="titleWallet">
          <i class="fa-solid fa-wallet"></i>{' '}
          <span className="span">محفطتك الالكترونية</span>
        </div>
        <div>
          <p className="titleWallet">
            <i
              className="fas fa-sack-dollar"
              style={{ fontSize: '33px', color: '#ffe34f' }}
            ></i>
            <span className="span">الرصيد في المحفظة </span>
          </p>
          <div className="aval">
            المتوفر :<span>{wallet?.availableAmount} ل س</span>
          </div>
          <div className="aval">
            المحجوز :<span>{wallet?.blockedAmount} ل س</span>{' '}
          </div>
        </div>

        <div className="con_ed_sa">
          <div className="con_ed">
            <p className="tit_ed">
              <div className="ico">
                <i class="fa fa-plus "></i>
              </div>
              <span className="span">ايداع مبلغ</span>
            </p>
            <p className="det_ed">أدخل المبلغ الذي تريد ايداعه</p>
            <input
              className="inp_ed"
              type="number"
              name="amount"
              value={deposit.amount}
              onChange={handleChange1}
              autoComplete="off"
            />
            <button
              className={`ptn_ed ${isDisabled == true ? 'color' : ''} ${
                successDeposit ? 'bg-green-500' : ''
              }`}
              onClick={submitdep}
              disabled={isDisabled || loadingDeposit}
            >
              {loadingDeposit ? (
                <div className="spinner-border " role="status"></div>
              ) : successDeposit ? (
                'تم الايداع بنجاح'
              ) : (
                'ايداع'
              )}
            </button>
          </div>

          <div className="con_sa">
            <p className="tit_sa">
              <div className="ico">
                <i class="fa-solid fa-minus minus"></i>
              </div>
              <span className="span">سحب مبلغ</span>
            </p>
            <p className="det_sa">أدخل المبلغ الذي تريد سحبه</p>
            <input
              className="inp_ed"
              type="number"
              name="amount"
              value={withdraw.amount}
              onChange={handleChange2}
              autoComplete="off"
            />
            <button
              className={`ptn_ed ${isDisabled1 == true ? 'color' : ''} ${
                successWithdraw ? 'bg-green-500' : ''
              }`}
              disabled={isDisabled1 || loadingWithdraw}
              onClick={submitWith}
            >
              {loadingWithdraw ? (
                <div className="spinner-border " role="status"></div>
              ) : successWithdraw ? (
                'تم السحب بنجاح'
              ) : (
                'سحب'
              )}
            </button>
          </div>
        </div>

        <div>
          <p className="titleWallet">
            <i className="fab fa-elementor"></i>
            <span className="span">نشاط المحفظة</span>
          </p>
          <table className="table1">
            <thead>
              <tr>
                <th>النوع</th>
                <th>المبلغ</th>
                <th>التاريخ</th>
                <th>الحالة</th>
              </tr>
            </thead>
            <tbody>{rows}</tbody>
          </table>
        </div>
      </div>
    </>
  );
}
