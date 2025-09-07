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
import { useNavigate } from 'react-router-dom';
import Serach from '../../commponts/Auctions/Serach';
import { fetchUserFromAPI } from '../Account/Profile/store/Redux';
import CardTen from '../Tenders/CardTen';
import ButtonSortTen from '../../commponts/Tenders/ButtonSortten';
export default function AllUsers() {
  const [change, setChange] = useState('personal');
  let sort;
  let st;
  if (change == 'creat_A') {
    sort = localStorage.getItem('statusallAu');
    st = 'statusallAu';
  } else {
    sort = localStorage.getItem('statusallTe');
    st = 'statusallTe';
  }

  const dispatch = useDispatch();
  const [selectedImage, setSelectedImage] = useState('');
  const [isActive, setIsActive] = useState(false);
  const [showXButton, setShowXButton] = useState(false);
  const location = useLocation();
  localStorage.setItem('status', 'فرز حسب');
  const da = location.state || {};
  console.log(da);
  console.log(da._id);
  const [value, setValue] = useState('فرز حسب');
  const [value1, setValue1] = useState('فرز حسب');
  const [value2, setValue2] = useState('');
  const [test, setTest] = useState('');
  const [hover, setHover] = useState(false);
  const navegate = useNavigate();
  const handleClick = () => {
    if (value2 == 'فرز حسب' && value == 'فرز حسب') {
      setTest(' ');
      console.log('1');
      localStorage.setItem(st, value2);
      setValue2('');
    } else if (value == 'فرز حسب' && test == 'فرز حسب') {
      setTest(' ');
      console.log('2');
      localStorage.setItem(st, value);
      setValue1('فرز حسب');
      setValue(value1);
    } else if (value2 == 'فرز حسب') {
      setValue1('فرز حسب');
      console.log('3');
      setTest(value1);
      localStorage.setItem(st, value1);
      setValue(value1);
    } else {
      setTest(value1);
      console.log('4');
      localStorage.setItem(st, value1);
      setValue(value1);
    }
  };
  const handleClick2 = (item) => {
    setValue(item);
    setTest(item);
    localStorage.setItem(st, item);
    console.log('6');
    // if(value==' مقبول'){
    //   setTest(' مقبول')
    // }
    if (
      item == ' جاري' ||
      item == ' منتهي' ||
      item == ' قادم' ||
      item == 'الكل'
    ) {
      console.log('5');
      localStorage.setItem(st, item);
      setValue1(' مقبول');
      setValue2('فرز حسب');
      console.log('7');
    }
    if (value == ' مقبول' || value == ' مرفوض' || value == ' قيد الانتظار') {
      // localStorage.setItem(st,value)
      setValue2('فرز حسب');
      console.log('8');
    }
  };
  // =============================
  const [value5, setValue5] = useState('فرز حسب');
  const [value6, setValue6] = useState('فرز حسب');
  const [value7, setValue7] = useState('');
  const [test2, setTest2] = useState('');
  const handleClick1 = () => {
    if (value7 == 'فرز حسب' && value5 == 'فرز حسب') {
      setTest2(' ');
      console.log('1');
      localStorage.setItem(st, value7);
      setValue7('');
    } else if (value5 == 'فرز حسب' && test2 == 'فرز حسب') {
      setTest2(' ');
      console.log('2');
      localStorage.setItem(st, value5);
      setValue6('فرز حسب');
      setValue5(value6);
    } else if (value7 == 'فرز حسب') {
      setValue6('فرز حسب');
      console.log('3');
      setTest2(value6);
      localStorage.setItem(st, value6);
      setValue5(value6);
    } else {
      setTest2(value6);
      console.log('4');
      localStorage.setItem(st, value6);
      setValue5(value6);
    }
  };
  const handleClick4 = (item) => {
    setValue5(item);
    setTest2(item);
    localStorage.setItem(st, item);
    console.log('6');
    // if(value==' مقبول'){
    //   setTest(' مقبول')
    // }
    if (
      item == ' جاري' ||
      item == ' منتهي' ||
      item == ' قادم' ||
      item == 'الكل'
    ) {
      console.log('5');
      localStorage.setItem(st, item);
      setValue6(' مقبول');
      setValue7('فرز حسب');
      console.log('7');
    }
    if (value5 == ' مقبول' || value5 == ' مرفوض' || value5 == ' قيد الانتظار') {
      // localStorage.setItem(st,value)
      setValue7('فرز حسب');
      console.log('8');
    }
  };
  // ==============================
  useEffect(() => {
    dispatch(fetchUserFromAPI());
  }, [dispatch]);

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
              {/* <Serach page="alluser"/> */}
              <div className="but-sor"></div>
              <p className="par">المزادات المنشأة</p>
              <img
                className="pic"
                src={im4}
                alt="Profile"
                width="50px"
                height="40px"
              />

              <div className="dec">
                <button
                  className="sort sort-share poscre"
                  onMouseEnter={() => {
                    setHover(true);
                  }}
                  onMouseLeave={() => {
                    setHover(false);
                  }}
                  onClick={handleClick}
                  value={sort}
                >
                  <div>{sort}</div>
                  <i
                    className={`fas fa-chevron-left ${
                      hover == true ? 'white' : 'black'
                    } ${
                      value.includes('فرز حسب') || value.includes(' مقبول')
                        ? 'sort1'
                        : 'sort2'
                    }`}
                  ></i>
                </button>

                <div
                  className={`listSort  ${
                    test.includes('فرز حسب') ? 'visable' : ''
                  }`}
                >
                  <div className="buttonSort so11">
                    <button
                      className="button1 buttonpos1cre"
                      onClick={() => {
                        handleClick2(' مقبول');
                      }}
                    >
                      مقبول
                    </button>

                    <button
                      className="buttonpos1cre"
                      onClick={() => {
                        handleClick2(' مرفوض');
                      }}
                    >
                      مرفوض
                    </button>
                    <button
                      className="button2 buttonpos1cre"
                      onClick={() => {
                        handleClick2(' قيد الانتظار');
                      }}
                    >
                      قيد الانتظار
                    </button>
                  </div>
                </div>
                <div
                  className={`listSort  ${
                    test.includes(' مقبول') ? 'visable' : ''
                  }`}
                >
                  <div className="buttonSort so11 poscre">
                    <button
                      className="button1 buttonpos1cre"
                      onClick={() => {
                        handleClick2('الكل');
                      }}
                    >
                      الكل
                    </button>
                    <button
                      className="buttonpos1cre"
                      onClick={() => {
                        handleClick2(' جاري');
                      }}
                    >
                      جاري
                    </button>
                    <button
                      className="buttonpos1cre"
                      onClick={() => {
                        handleClick2(' قادم');
                      }}
                    >
                      قادم
                    </button>
                    <button
                      className="button2 buttonpos1cre"
                      onClick={() => {
                        handleClick2(' منتهي');
                      }}
                    >
                      منتهي
                    </button>
                  </div>
                </div>
                {/* <ButtonSort test2={'alluserAuFav'} position={"profile1"}/>  */}
                <div className="alotof">
                  <Cards id={da?._id} page={'id'} />
                </div>
              </div>
            </div>
          )}
          {change === 'creat_T' && (
            <div>
              {/* <Serach page="alluser"/> */}
              <div className="but-sor"></div>
              <p className="par">المناقصات المنشأة</p>
              <img
                className="pic"
                src={im4}
                alt="Profile"
                width="50px"
                height="40px"
              />

              <div className="dec">
                <div className="dec">
                  <button
                    className="sort sort-share poscre"
                    onMouseEnter={() => {
                      setHover(true);
                    }}
                    onMouseLeave={() => {
                      setHover(false);
                    }}
                    onClick={handleClick1}
                    value={sort}
                  >
                    <div>{sort}</div>
                    <i
                      className={`fas fa-chevron-left ${
                        hover == true ? 'white' : 'black'
                      } ${
                        value5.includes('فرز حسب') || value5.includes(' مقبول')
                          ? 'sort1'
                          : 'sort2'
                      }`}
                    ></i>
                  </button>

                  <div
                    className={`listSort  ${
                      test2.includes('فرز حسب') ? 'visable' : ''
                    }`}
                  >
                    <div className="buttonSort so11">
                      <button
                        className="button1 buttonpos1cre"
                        onClick={() => {
                          handleClick4(' مقبول');
                        }}
                      >
                        مقبول
                      </button>

                      <button
                        className="buttonpos1cre"
                        onClick={() => {
                          handleClick4(' مرفوض');
                        }}
                      >
                        مرفوض
                      </button>
                      <button
                        className="button2 buttonpos1cre"
                        onClick={() => {
                          handleClick4(' قيد الانتظار');
                        }}
                      >
                        قيد الانتظار
                      </button>
                    </div>
                  </div>
                  <div
                    className={`listSort  ${
                      test2.includes(' مقبول') ? 'visable' : ''
                    }`}
                  >
                    <div className="buttonSort so11 poscre">
                      <button
                        className="button1 buttonpos1cre"
                        onClick={() => {
                          handleClick4('الكل');
                        }}
                      >
                        الكل
                      </button>
                      <button
                        className="buttonpos1cre"
                        onClick={() => {
                          handleClick4(' جاري');
                        }}
                      >
                        جاري
                      </button>
                      <button
                        className="buttonpos1cre"
                        onClick={() => {
                          handleClick4(' قادم');
                        }}
                      >
                        قادم
                      </button>
                      <button
                        className="button2 buttonpos1cre"
                        onClick={() => {
                          handleClick4(' منتهي');
                        }}
                      >
                        منتهي
                      </button>
                    </div>
                  </div>
                  {/* <ButtonSort test2={'alluserAuFav'} position={"profile1"}/>  */}
                  <div className="alotof">
                    <Cards id={da?._id} page={'id'} />
                  </div>
                </div>
                <CardTen id={da?._id} page={'id'} />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
