import Navbar from '../Home/Navbar';
import '../Home/Home.css';
import './AllUsers.css';
import im4 from '../Account/Profile/star.jpg';
import ll from '../../image/user2.jpg';
import '../../commponts/Account/Profile/profile.css';
import Cards from '../Auctions/Cards';
import ButtonSort from '../Home/ButtonSort';
import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { fetchUserFromAPI } from '../Account/Profile/store/Redux';
import CardTen from '../Tenders/CardTen';
export default function AllUsers() {
  const dispatch = useDispatch();
  const [selectedImage, setSelectedImage] = useState('');
  const [isActive, setIsActive] = useState(false);
  const [showXButton, setShowXButton] = useState(false);
     const location = useLocation();
       localStorage.setItem('status','فرز حسب');
  const da = location.state || {}; 
console.log(da)
console.log(da._id)
  useEffect(() => {
    dispatch(fetchUserFromAPI());
  }, [dispatch]);
  const [change, setChange] = useState('personal');
  function handel_Fav(e) {
    let hh = e.target;
    if (hh.style.color === 'red') {
      hh.style.cssText = 'color: none;';
    } else {
      hh.style.cssText = 'color: red;';
    }
  }
  const handleButtonClick = () => {
    setIsActive(!isActive);
    if (!isActive) {
      setTimeout(() => {
        setShowXButton(true);
      }, 200);
    } else {
      setShowXButton(false);
    }
  };
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setSelectedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  const nn = useSelector((state) => state.ptn_edit);
  return (
    <div>
      <Navbar />
      <div className="side">
        <div>
          <div className="but">
            <button
              className={`fav-act ${change === 'personal' ? 'active' : ''}`}
              onClick={() => {
                setChange('personal');
              }}
            >
              البيانات الشخصية
            </button>
            <button
              className={`fav-act ${change === 'creat_A' ? 'active' : ''}`}
              onClick={() => {
                setChange('creat_A');
              }}
            >
              المزادات المنشأة
            </button>
            <button
              className={`fav-act ${change === 'creat_T' ? 'active' : ''}`}
              // className="fav-act"
              onClick={() => {
                setChange('creat_T');
              }}
            >
              المناقصات المنشأة
            </button>
          </div>
          {change === 'personal' && (
            <div id="cccc">
              <div id="ccd"></div>
              <div className="con_con">
                <div className="con-prof">
                  <div className="con-img-info">
                    <div className="con-img-ptn">
                      <div
                        className={`img-profile ${isActive ? 'active' : ''}`}
                      >
                        {selectedImage ? (
                          <img
                            className="picture1"
                            src={selectedImage || ll}
                            alt="Error"
                            style={{
                              width: '100%',
                              height: '105%',
                              borderRadius: '50%',
                              border: 'none',
                            }}
                          />
                        ) : (
                          <div>
                            <img
                              className="picture1"
                              src={ll}
                              alt="Error"
                              style={{
                                position: 'absolute',
                                right: '-6px',
                                bottom: '-1px',
                                width: '163px',
                                height: '150px',
                                borderRadius: '50%',
                                border: 'none',
                              }}
                            />
                          </div>
                        )}
                      </div>
                      <div className="container-ptn">
                        <button
                          className="ptn-show"
                          onClick={() => handleButtonClick()}
                        >
                          عرض
                        </button>

                        <input
                          type="file"
                          id="fileInput"
                          style={{ display: 'none' }}
                          onChange={handleFileChange}
                        />
                      </div>
                      {isActive && showXButton && (
                        <button
                          className="exit2 animated"
                          onClick={() => handleButtonClick()}
                        >
                          X
                        </button>
                      )}
                    </div>

                    <div className="con-info2">
                      <svg
                        className="svg1"
                        width="800"
                        height="600"
                        viewBox="0 0 750 600"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        {' '}
                        <path
                          d="M 51 592 C 38 38 25  44 200 47 L 649 46 C 618 101 617 324 379 273 C 274 246 82 350 49 615    "
                          fill="#003366"
                          stroke="none"
                          strokeWidth="2"
                        ></path>
                      </svg>
                      <div className="welcome">
                        <h2>أهلا بك !</h2>
                        <p className="data1">بياناتك محمية بكل صدق وشفافية</p>
                      </div>
                      <h3>{da?.name}</h3>

                      <p className="par-info">
                        اسم المستخدم :<div className="name">{da?.name}</div>{' '}
                      </p>
                      <p className="par-info">
                        البريد الالكتروني :
                        <div className="email">{da?.email}</div>
                      </p>
                      <p className="par-info">
                        الرقم :<div className="number">{da?.phone}</div>{' '}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {change === 'creat_A' && (
            <div>
              <div className="but-sor">
            
              </div>
              <p className="par">المزادات المنشأة</p>
              <img
                className="pic"
                src={im4}
                alt="Profile"
                width="50px"
                height="40px"
              />
                <ButtonSort test2={'create'}/>
              <div className="dec">
                  
                <Cards id={da?._id} page={'id'} />
              </div>
            </div>
          )}
          {change === 'creat_T' && (
            <div>
              <div className="but-sor">
                
              </div>
              <p className="par">المناقصات المنشأة</p>
              <img
                className="pic"
                src={im4}
                alt="Profile"
                width="50px"
                height="40px"
              />
              
              <div className="dec">
                <CardTen id={da?._id} page={'id'} /> 
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
