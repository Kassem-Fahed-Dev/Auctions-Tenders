import './details.css';
import Navdata from './Navdata';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import Navbar from '../../Home/Navbar';
import AuctionsNavbar from '../../Auctions/AuctionsNavbar';
import Footer from '../../privacy policy/Footer';
function handel_Fav(e) {
  let hh = e.target;
  if (hh.style.color === 'red') {
    hh.style.cssText = 'color: black;';
  } else {
    hh.style.cssText = 'color: red;';
  }
}
export default function Details() {
  const [amount, setAmount] = useState('');
  function back() {
    window.history.go(-1);
  }
  function handleInputChange(e) {
    const value = e.target.value;

    if (!/^\d+$/.test(value)) {
      return;
    }

    setAmount(value);
  }
  const [showParticipation, setShowParticipation] = useState(false);

  const [state, setState] = useState('قادم');
  function getcolor() {
    if (state === 'جاري') {
      return { color: 'green', paddingRight: '6px', fontSize: '19px' };
    } else if (state === 'قادم') {
      return { color: 'blue', paddingRight: '6px', fontSize: '19px' };
    } else if (state === 'منتهي') {
      return { color: 'red', paddingRight: '6px', fontSize: '19px' };
    }
    return {};
  }

  return (
    <div className="All-con-det">
      <Navbar wordBlod={'auctions'} />
      <AuctionsNavbar />
      <div className="all">
        <div className="title-1">
          <h1>مزادات السيارات</h1>
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
                <p>اسم المزاد : </p>
                <h4> سيارة افالون للبيع </h4>
              </div>
              <button
                id="ptn-fav"
                onClick={(e) => {
                  handel_Fav(e);
                }}
              >
                <i className="fas fa-heart"></i>
              </button>
            </div>
            <hr />
            <div className="div-con">
              <h6>تفاصيل المزاد </h6>

              <div>
                حالة المزاد :
                <span id="stateauction" style={getcolor()}>
                  {state}
                </span>
              </div>
            </div>
            <div className="condivs">
              <div>
                تاريخ البدء :<span>12/2/2025</span>
              </div>
              <div>
                تاريخ الانتهاء :<span>12/2/2025</span>
              </div>
              <div>
                السعر الابتدائي:
                <span>150 مليون ليرة سورية</span>
              </div>
              <div>
                السعر الحالي:
                <span>250 مليون ليرة سورية</span>
              </div>
              <div>
                خطوة المزايدة :<span> 50 مليون ليرة سورية</span>
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
                  المدينة : <span> حمص</span>
                </div>
              </div>
              <div>
                <button
                  className="ptn-particip"
                  onClick={() => setShowParticipation(true)}
                >
                  <div className="fas fa-hand-point-up"></div>
                  شارك بالمزاد
                </button>
              </div>
            </div>
            {showParticipation && (
              <div className="model-particip">
                <div className="con-poop">
                  <div className="gg">
                    <h3> أدخل الرقم الذي تود المشاركة به</h3>

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

          <Navdata />
        </div>
      </div>{' '}
      <div style={{ marginTop: '80px' }}>
        <Footer />
      </div>
    </div>
  );
}
