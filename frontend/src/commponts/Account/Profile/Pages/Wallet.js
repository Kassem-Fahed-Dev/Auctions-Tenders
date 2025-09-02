import { useEffect, useState } from 'react';
import Profile from './Profile';
import axiosInstance from '../../../AxiosInterceptors';
import { submit } from '../store/Redux';
export default function Wallet() {
   const token = localStorage.getItem('jwt');
   const [wallet,setWallet]=useState('');
   const [walletActivity,setWalletActivity]=useState('');
   const [isDisabled,setIsDisabled]=useState(true);
    const [isDisabled1,setIsDisabled1]=useState(true);
   const [deposit,setDeposit]=useState({amount:''});
    const [errorMessage5, setErrorMessage5] = useState({});
   const [withdraw,setWithdraw]=useState({amount:''});
     const [errorMessage, setErrorMessage] = useState({});
  useEffect(()=>{
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
        console.log(res.data.data)
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

  },[])
  useEffect(()=>{
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
        console.log(res.data.data)
        console.log(walletActivity)
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

  },[])
    const handleChange1 = (e) => {
    const { name, value } = e.target;
    setIsDisabled(false)
    setDeposit({ ...deposit, [name]: Number(value.trim())  });
    console.log(deposit)
  };

    const handleChange2 = (e) => {
    const { name, value } = e.target;
     setIsDisabled1(false)
    setWithdraw({ ...withdraw, [name]: Number(value.trim()) });
    console.log(withdraw)
  };

  const submitdep=(e)=>{
    // e.preventDefault();
    console.log('ppp')
   axiosInstance
        .post(
          '/api/v1/payments/deposit',
          JSON.stringify(deposit),
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
        console.log(res)
        setDeposit({amount:''})
          window.location.reload();
        })
        .catch((error) => {
        
          if (error.response) {
            const validationErrors4 = {};
            validationErrors4.messageBackend = error.response.data.message;
            setErrorMessage5(validationErrors4);
          } else {
            console.log('An unexpected error occurred:', error.message);
            setErrorMessage5({
              messageBackend: 'An unexpected error occurred.',
            });
          }
        });
    
  }
  const submitWith=()=>{
     axiosInstance
        .post(
          '/api/v1/payments/withdraw',
          JSON.stringify(withdraw),
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
        console.log(res)
         setWithdraw({amount:''})
          window.location.reload();
        })
        .catch((error) => {
        
          if (error.response) {
            const validationErrors4 = {};
            validationErrors4.messageBackend = error.response.data.message;
            setErrorMessage5(validationErrors4);
          } else {
            console.log('An unexpected error occurred:', error.message);
            setErrorMessage5({
              messageBackend: 'An unexpected error occurred.',
            });
          }
        });
  }
  return (
    <>
      <Profile />
      <div className="walletCon">
        <div className="titleWallet">
          <i class="fa-solid fa-minus minus"></i>
          <span className="span">محفطتك الالكترونية</span>
        </div>
        <div>
          <p className="titleWallet">
            <i
              className="fas fa-sack-dollar"
              style={{ fontSize: '33px', color: 'rgba(221, 105, 10, 0.93)' }}
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
            <input className="inp_ed" 
              type="number"
                    name="amount"
                    value={deposit.amount}
                    onChange={handleChange1}
                    autoComplete="off"
            />
            <button className={`ptn_ed ${
                    isDisabled == true ? 'color' : ''
                  }` }
                   onClick={submitdep}
            disabled={isDisabled}> ايداع</button>
          </div>
          <div className="con_sa">
            <p className="tit_sa">
              <div className="ico">
                <i class="fa-solid fa-minus minus"></i>
              </div>
              <span className="span">سحب مبلغ</span>
            </p>
            <p className="det_sa">أدخل المبلغ الذي تريد سحبه</p>
            <input className="inp_ed"
            
            type="number"
                    name="amount"
                    value={withdraw.amount}
                    onChange={handleChange2}
                    autoComplete="off"/>
            <button className={`ptn_ed  ${
                    isDisabled1 == true ?  'color' : ''
                  }` }  disabled={isDisabled1} onClick={submitWith}>سحب</button>
          </div>
        </div>
        <div>
          <p className="titleWallet">
            <i class="fa-solid fa-minus minus"></i>
            <span className="span">نشاط المحفظة</span>
          </p>

          <table>
            <thead>
              <tr>
                <th>النوع</th>
                <th>المبلغ</th>
                <th>التاريخ</th>
                <th>الحالة</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>إيداع</td>
                {/* <td>500 ل.س</td> */}
                <td></td>
                <td>
                  2025/07/15
                  <br />
                  10:06 مساءً
                </td>

                <td>
                  <span class="status done">مكتمل ✅</span>
                </td>
              </tr>

              <tr>
                <td>سحب</td>
                <td>500 ل.س</td>
                <td>
                  2025/07/15
                  <br />
                  10:06 مساءً
                </td>
                <td>
                  <span class="status fail">فشل ❌</span>
                </td>
              </tr>
              <tr>
                <td>دفع مزاد</td>
                <td>500 ل.س</td>
                <td>
                  2025/07/15
                  <br />
                  10:06 مساءً
                </td>
                <td>
                  <span class="status done">مكتمل ✅</span>
                </td>
              </tr>
              <tr>
                <td>سحب</td>
                <td>500 ل.س</td>
                <td>
                  2025/07/15
                  <br />
                  10:06 مساءً
                </td>
                <td>
                  <span class="status wait">انتظار ⏳</span>
                </td>
              </tr>
              <tr>
                <td>دفع مناقصة</td>
                <td>500 ل.س</td>
                <td>
                  2025/07/15
                  <br />
                  10:06 مساءً
                </td>
                <td>
                  <span class="status done">مكتمل ✅</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
