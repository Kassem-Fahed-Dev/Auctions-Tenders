import '../profile.css';
import { useLocation } from 'react-router-dom';

import Side from '../componants/Side';
import Alert from './Alert';
import ll from '../../../../image/user2.jpg';
import { useState, useEffect } from 'react';
import { toggleShow, labelName } from '../store/Redux';
import { useSelector, useDispatch } from 'react-redux';
import Navbar from '../../../Home/Navbar';
import '../profile.css';
import axiosInstance from '../../../AxiosInterceptors';
// 55555555555555555555555555
import { fetchUserFromAPI } from '../store/Redux';

// 55555555555555555555555555
export default function Account() {
  const location = useLocation();

  const currentPath = location.pathname;

  const [imageLoaded, setImageLoaded] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');
  const [isActive, setIsActive] = useState(false);
  const [showXButton, setShowXButton] = useState(false);
  const [errorMessage, setErrorMessage] = useState({});
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchUserFromAPI());
  }, [dispatch]);
  const [DataUser, setDataUser] = useState('');
  const token = localStorage.getItem('jwt');
  // localStorage.setItem('status', 'فرز حسب');
  useEffect(() => {
    axiosInstance
      .get('/api/v1/users/me', {
        headers: {
          'Content-Type': 'application/json',
          'Accept-Language': 'ar',
          credentials: 'include',
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setDataUser(res.data.data.data);
        console.log(res.data.data.data)
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
  // 4444444444444444444444444444444444444444444
  // 55555555555555555555555555
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
  const nn = useSelector((state) => state.ptn_edit);
  useEffect(() => {
    const img = new Image();
    img.src = ll;
    img.onload = () => setImageLoaded(true);
    img.onerror = () => setImageLoaded(false);
  }, []);
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        localStorage.setItem('img', reader.result); // تخزين الصورة بصيغة Data URL
        setSelectedImage(reader.result); // عرض الصورة بعد الاختيار
      };
      reader.readAsDataURL(file);
    }
  };

  // لعرض الصورة عند تحميل الصفحة أو عند الحاجة
  useEffect(() => {
    const imgDataUrl = localStorage.getItem('img');
    if (imgDataUrl) {
      setSelectedImage(imgDataUrl);
    }
  }, []);
  return (
    <>
      <Navbar />
      <div className="al">
        <div id={nn.show === true ? 'focus' : ''} className="con-flex">
          <Side />
          <div className="con-prof">
            {currentPath === '/create' && (
              <div className="PersonalData">
                <span className="far fa-edit"></span>
                <div>البيانات الشخصية</div>
              </div>
            )}
            <div className="con-img-info">
              <div className="con-img-ptn">
                <div className={`img-profile ${isActive ? 'active' : ''}`}>
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
                  <span>/</span>
                  <button
                    className="ptn-show"
                    onClick={() => {
                      document.getElementById('fileInput').click();
                    }}
                  >
                    تغيير
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
                    stroke-width="2"
                  ></path>
                </svg>
                <div className="welcome">
                  <h2>أهلا بك !</h2>
                  <p className="data1">بياناتك محمية بكل صدق وشفافية</p>
                </div>
                <h3>{nn.name}</h3>

                <p className="par-info">
                  اسم المستخدم :<div className="name">{nn.name}</div>{' '}
                </p>
                <button
                  className="ptn-1"
                  onClick={() => {
                    dispatch(toggleShow());

                    dispatch(labelName('اسم المستخدم'));
                  }}
                >
                  <span className="	fas fa-pen"></span>
                </button>

                {/* <p className="par-info">
                  الاسم الكامل :<div className="full-name">{dataUser.name}</div>{' '}
                </p>
                <button
                  className="ptn-2"
                  onClick={() => {
                    dispatch(toggleShow());
                    dispatch(labelName('الاسم الكامل'));
                  }}
                >
                  <span className="	fas fa-pen"></span>
                </button> */}
                <p className="par-info">
                  البريد الالكتروني :<div className="email">{nn.email}</div>
                </p>
                <button
                  className="ptn-3"
                  onClick={() => {
                    dispatch(toggleShow());
                    dispatch(labelName('البريد الإلكتروني'));
                  }}
                >
                  <span className="	fas fa-pen"></span>
                </button>
                <p className="par-info">
                  رقم الهاتف:
                  <div className="number">{nn.phone}</div>{' '}
                </p>
                <button
                  className="ptn-4"
                  onClick={() => {
                    dispatch(toggleShow());
                    dispatch(labelName('رقم الهاتف'));
                  }}
                >
                  <span className="	fas fa-pen"></span>
                </button>
                {/* <p className="par-info">
                  {' '}
                  الموقع: <div className="location">{nn.location}</div>
                </p>
                <button
                  className="ptn-5"
                  onClick={() => {
                    dispatch(toggleShow());
                    dispatch(labelName('الموقع الجديد'));
                  }}
                >
                  <span className="	fas fa-pen"></span>
                </button> */}
                <p className="par-info">
                  كلمة المرور:
                  <div className="pass">{nn.pass.replace(/./g, '●')}</div>
                </p>
                <button
                  className="ptn-6"
                  onClick={() => {
                    dispatch(toggleShow());
                    dispatch(labelName('  كلمة المرور الحالية '));
                  }}
                >
                  <span className="	fas fa-pen"></span>
                </button>
                <Alert test={nn.show} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
