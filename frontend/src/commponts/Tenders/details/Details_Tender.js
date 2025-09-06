import './details.css';
import Navdata from './Navdata_Tender';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import Navbar from '../../Home/Navbar';
import AuctionsNavbar from '../../Auctions/AuctionsNavbar';
import Footer from '../../privacy policy/Footer';
import TendersNavbar from '../TendersNavbar';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axiosInstance from '../../AxiosInterceptors';
function back() {
  window.history.go(-1);
}

export default function Details_Tender() {
  const scroll1 = useEffect(() => window.scrollTo(0, 0));
  const [errorMessage5, setErrorMessage5] = useState({});
  const [errorMessage, setErrorMessage] = useState({});
  const [amount, setAmount] = useState({ amount: '' });

  // const [amount, setAmount] = useState('');
  const location = useLocation();
  const { data, heart } = location.state || {};
  function back() {
    window.history.go(-1);
  }
  function handleInputChange(e) {
    const { name, value } = e.target;
    //setAmount(false)
    setAmount({ ...amount, [name]: Number(value.trim()) });
    console.log(amount);
    // if (!/^\d+$/.test(value)) {
    //   return;
    // }

    // setAmount(value);
  }

  const [showParticipation, setShowParticipation] = useState(false);

  const token = localStorage.getItem('jwt');
  const submitAmount = (e) => {
    // e.preventDefault();
    setAmount('');
    setShowParticipation(false);

    console.log('ppp');
    axiosInstance
      .post(
        `/api/v1/tenders/submitOffer/${data?._id}`,
        JSON.stringify(amount),
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
        console.log(res);
        setAmount({ amount: '' });
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
  };

  function handleInputChange(e) {
    const value = e.target.value;

    if (!/^\d+$/.test(value)) {
      return;
    }

    setAmount(value);
  }
  let Allow;
  let TimeRun = false;

  function handelTesting() {
    setShowParticipation(true);
    if (state === 'قادم' && !TimeRun) {
      TimeRun = true;
      const neew = document.createElement('p');
      const icon = document.createElement('span');
      icon.classList.add('fas', 'fa-exclamation-circle');
      neew.textContent =
        'للمشاركة بالمناقصة يتوجب عليك الانتظار الى ان تصبح جاري وسوف نقوم بارسال اشعار لك ان كنت مهتم';
      neew.classList.add('neew-class');
      const hh = document.querySelector('.kk');
      hh.appendChild(icon);
      hh.appendChild(neew);
      Allow = setTimeout(() => {
        neew.remove();
        icon.remove();
        TimeRun = false;
      }, 1500);
    } else if (state === 'جاري') {
      if (!TimeRun) {
        setShowParticipation(true);
      }
    } else if (state === 'منتهي') {
    }
  }
  // const [showParticipation, setShowParticipation] = useState(false);

  const [state, setState] = useState('منتهي');
  // function getcolor() {
  //   if (state === 'جاري') {
  //     return { color: 'green', paddingRight: '6px', fontSize: '19px' };
  //   } else if (state === 'قادم') {
  //     return { color: 'blue', paddingRight: '6px', fontSize: '19px' };
  //   } else if (state === 'منتهي') {
  //     return { color: 'red', paddingRight: '6px', fontSize: '19px' };
  //   }
  //   return {};
  // }

  return (
    <div className="All-con-det">
      <Navbar wordBlod={'tenders'} />
      <TendersNavbar />
      <div className="all">
        <div className="title-1">
          <h1>مناقصة السيارات</h1>
          <button
            className="back"
            onClick={() => {
              back();
            }}
          >
            {' '}
            <span className="	fas fa-chevron-left"></span>
          </button>
        </div>
        <div className="con-nav-auction">
          <div className="container-card-details">
            <div className="con-title">
              <div className="div-title">
                <p>اسم المناقصة : </p>
                <h4>{data?.tenderTitle}</h4>
              </div>

              <i
                className={`fas fa-heart ${heart == 'red' ? 'red' : 'black'}`}
              ></i>
            </div>
            <hr />
            <div className="div-con11">
              <h6 className="tit">تفاصيل المناقصة </h6>
              <div>
                حالة المناقصة :
                <span
                  className={
                    data?.activeStatus === 'جاري'
                      ? 'timedet'
                      : data?.activeStatus === 'قادم'
                      ? 'time2det'
                      : 'time1det'
                  }
                >
                  {data?.activeStatus}
                </span>
              </div>
              {/* <div className="state_tender">
                حالة المناقصة :
                <span id="stateauction" style={getcolor()}>
                  {state}
                </span>
              </div> */}
            </div>
            <div className="condivs">
              <div className="dv1">
                تاريخ البدء :
                <span>
                  {data?.startTime?.slice(0, 10).replaceAll('-', '/')}
                </span>
              </div>
              <div className="dv2">
                تاريخ الانتهاء :
                <span>{data?.endTime?.slice(0, 10).replaceAll('-', '/')}</span>
              </div>
              <div>
                السعر الابتدائي:
                <span>{data.startingPrice}</span>
              </div>
            </div>
            <hr />
            <div className="cont-div">
              <div className="cont-det">
                <h6>الوصف</h6>

                <div>
                  التصنيف:
                  <span>الكترونيات </span>
                </div>
                <div>
                  البلد:
                  <span>سوريا </span>
                </div>
                <div>
                  المدينة : <span> {data?.city}</span>
                </div>
              </div>
              <div className="kk">
                <div>
                  <button
                    className="ptn-particip"
                    onClick={() => {
                      if (data?.activeStatus !== 'منتهي') {
                        setShowParticipation(true);
                        handelTesting();
                      }
                    }}
                    disabled={data?.activeStatus === 'منتهي'}
                    style={{
                      backgroundColor:
                        data?.activeStatus === 'منتهي' ? 'gray' : '',
                      cursor:
                        data?.activeStatus === 'منتهي'
                          ? 'not-allowed'
                          : 'pointer',
                    }}
                  >
                    <div className="fas fa-hand-point-up"></div>
                    شارك بالمناقصة
                  </button>

                  {/* <button
                    className="ptn-particip"
                    onClick={() => {
                      setShowParticipation(true);
                      handelTesting();
                    }}
                  >
                    <div className="fas fa-hand-point-up"></div>
                    شارك بالمناقصة
                  </button> */}
                </div>
              </div>
            </div>
            {showParticipation && (
              <div className="model-particip2">
                <div className="con-poop">
                  <div className="gg1">
                    <h3>
                      {' '}
                      أدخل ما تود اضافته من تفاصيل تملكها لتقديمها بالمناقصة
                    </h3>

                    <textarea type="text"></textarea>
                    <h3>ادخل المبلغ الذي تود المشاركة به</h3>
                    <input
                      type="number "
                      onChange={handleInputChange}
                      value={amount}
                      placeholder="أدخل أرقام فقط"
                    />

                    <button
                      onClick={() => {
                        setAmount('');
                        setShowParticipation(false);
                      }}
                      disabled={!amount}
                    >
                      إرسال
                    </button>
                    <button
                      id="exit_model"
                      onClick={() => setShowParticipation(false)}
                    >
                      X
                    </button>
                  </div>
                  <svg
                    className="sv"
                    width="800"
                    height="600"
                    viewBox="0 0 750 600"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    {' '}
                    <path
                      d="M 100 350 L 98 147 L 212 147 C 218 238 123 292 100 350  "
                      fill="rgb(72, 142, 246)"
                      stroke="none"
                      stroke-width="2"
                    >
                      {' '}
                    </path>
                  </svg>
                  <svg
                    className="sv2"
                    width="800"
                    height="600"
                    viewBox="0 0 750 600"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    {' '}
                    <path
                      d="M 348 356 L 348 148 L 234 148 C 224 227 326 308 348 356    "
                      fill="rgb(72, 142, 246)"
                      stroke="none"
                      stroke-width="2"
                    >
                      {' '}
                    </path>
                  </svg>
                </div>
              </div>
            )}
          </div>

          <Navdata state={data} />
        </div>
      </div>{' '}
      <div style={{ marginTop: '80px' }}>
        <Footer />
      </div>
    </div>
  );
}
