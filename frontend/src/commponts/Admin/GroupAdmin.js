import './Admin.css';
import imag from '../../image/logo.png';
import { Link } from 'react-router-dom';
import { useState } from 'react';
export default function GroupAdmin() {
  const [showDiv, setShowDiv] = useState(null);
  const [cover, setCover] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCover(URL.createObjectURL(file));
    }
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
              <i className="fa-solid fa-people-group"></i>مدير المجموعات{' '}
            </h1>
            <div className="con_AdminGroup">
              <button
                className={`ptn_Gr1 ${showDiv === 'search' ? 'activeBtn' : ''}`}
                onClick={() => setShowDiv('search')}
              >
                <i class="fa-solid fa-wallet"></i> بحث عن مجموعة{' '}
              </button>
              <button
                className={`ptn_Gr1 ${showDiv === 'add' ? 'activeBtn' : ''}`}
                onClick={() => setShowDiv('add')}
              >
                <i class="fa-solid fa-wallet"></i> اضافة مجموعة{' '}
              </button>
            </div>
            <div>
              {showDiv === 'search' && (
                <div className="boxContent">
                  <h3>🔍 ابحث عن مجموعة</h3>
                  <input type="text" placeholder="اكتب اسم المجموعة..." />
                </div>
              )}

              {showDiv === 'add' && (
                <div className="con_AddGroup1">
                  <h3 className="h3inconGroup">
                    <i className="fa-solid fa-pen-to-square"></i>
                    اضافة مجموعة{' '}
                  </h3>
                  <div className="con_flextowside">
                    <div className="rightsidegroup">
                      <div>
                        <div className="name_input">
                          <p>اسم المجموعة</p>
                          <input type="text" />
                        </div>
                        <div className="name_input">
                          <p>نوع المجموعة</p>
                          <input type="text" />
                          {/* مممم */}
                          {/* مممم */}
                        </div>
                        <div className="name_input">
                          <p>صورة غلاف المجموعة</p>

                          <input
                            type="file"
                            id="coverUpload"
                            accept="image/*"
                            style={{ display: 'none' }}
                            onChange={handleImageChange}
                          />
                          <label htmlFor="coverUpload" className="uploadBtn">
                            📷 رفع صورة
                          </label>
                          {cover && (
                            <img
                              src={cover}
                              alt="cover"
                              className="coverImagePreview"
                            />
                          )}
                          {/* {cover && (
                            <div className="previewCover">
                              <img
                                src={cover}
                                alt="cover"
                                className="coverImagePreview"
                              />
                            </div>
                          )} */}
                        </div>
                        <div className="ptn_group2">
                          <button>حفظ</button>
                          <button className="reject">تراجع</button>
                        </div>
                      </div>
                    </div>
                    <div className="leftsideGroup">
                      <div className="buttom_side">
                        <p className="qustion1">?</p>
                      </div>
                      <div className="circlediv">
                        <p className="qustion">?</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
