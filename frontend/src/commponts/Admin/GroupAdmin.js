import './Admin.css';
import imag from '../../image/logo.png';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import axiosInstance from '../AxiosInterceptors';
import { useEffect } from 'react';
export default function GroupAdmin() {
  const [groupToDelete, setGroupToDelete] = useState(null);

  // const handleDeleteClick = (groupName,id) => {
    // setGroupToDelete(groupName);
  //   setGroupToDelete({name:groupName,id:id})
  
  // };
const deleteUser = (e, id) => {
    console.log('del');
    axiosInstance
      .delete(`/api/v1/categories/${id}`, {
        headers: {
          'Content-Type': 'application/json',
          'Accept-Language': 'ar',
          credentials: 'include',
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        // console.log('تم الحذف:', userToDelete);
        setGroupToDelete(null);
        window.location.reload();
        //  e.preventDefault();
        //       let parentElement = e.target.closest('.delee')
        //       if (parentElement) {
        //           parentElement.style.display = 'none'; }
        console.log(res);
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
  };
  // const confirmDelete = () => {
  //   console.log('تم حذف:', groupToDelete);
  //   setGroupToDelete(null);
  // };

  const cancelDelete = () => {
    setGroupToDelete(null);
  };

  // ةةةةةةةةةةةةةةة
  const [showDiv, setShowDiv] = useState(null);
  const [cover, setCover] = useState(null);
 const [all,setALL]=useState([])
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCover(URL.createObjectURL(file));
    }
  };
 const token = localStorage.getItem('jwt');
  const [errorMessage, setErrorMessage] = useState({});
    useEffect(() => {
      axiosInstance
        .get(`/api/v1/categories`, {
          headers: {
            'Content-Type': 'application/json',
            'Accept-Language': 'ar',
            credentials: 'include',
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          setALL(res.data.data.data)
          // setWalletActivity(res.data.data);
          console.log(res.data.data.data);
          // console.log(walletActivity);
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
              <i className="fa-solid fa-people-group"></i>مدير المجموعات{' '}
            </h1>
            <div className="con_AdminGroup2">
              {/* <button
                className={`ptn_Gr1 ${showDiv === 'search' ? 'activeBtn' : ''}`}
                onClick={() => setShowDiv('search')}
              >
                <i class="fas fa-search"></i> بحث عن مجموعة{' '}
              </button> */}
              <Link
                to="/ADD"
                className={`ptn_Gr2 ${showDiv === 'add' ? 'activeBtn' : ''}`}
                onClick={() => setShowDiv('add')}
              >
                <i class="fas fa-plus"></i> اضافة مجموعة{' '}
              </Link>
            </div>
            <div>
              {/* {showDiv === 'search' && (
                <div className="searchdiv2">
                  <h3>ادخل اسم المجموعة التي تود البحث عنها ثم خدد نوعها </h3>
                  <div className="name_input1">
                    <p>اسم المجموعة</p>
                    <input type="text" />
                  </div>
                  <div className="name_input1">
                    <p>نوع المجموعة</p>
                    <input type="text" />
                  </div>
                  <button
                    className="fffffff 
"
                  >
                    بحث
                  </button>
                </div>
              )} */}
            </div>
          </div>
        </div>
        <div>
          <p className="nametit">
            <i class="fa-solid fa-gavel"></i> مجموعة المزادات{' '}
          </p>
        </div>
        <div className="group-con2">
          {/* <div className="group-div div1">
            <span className="link">
              <button
                className="ptndelgroup"
                onClick={() => handleDeleteClick('سيارات')}
              >
                <span>x</span>
              </button>
              سيارات
              <Link to="/edit" className="ptneditgroup">
                <i className="fa-solid fa-pen-to-square"></i>
              </Link>
            </span>
          </div> */}
          {/* ممممم */}
          {/* {groupToDelete && (
            <div className="confirm-modal">
              <div className="modal-content">
                <p>
                  هل انت متاكد من انك تريد حذف مجموعة "{groupToDelete}" من
                  مجموعة المزادات علما انه سيتم حذف كل العناصر الموجودة فيها ؟
                </p>
                <button className="btn-confirm" onClick={confirmDelete}>
                  نعم
                </button>
                <button className="btn-cancel" onClick={cancelDelete}>
                  لا
                </button>
              </div>
            </div>
          )} */}
          {/* ممممم */}
          {/* <div className="group-div div2">
            <Link className="link">
              <button
                className="ptndelgroup"
                onClick={() => handleDeleteClick('عقارات')}
              >
                <span>x</span>
              </button>
              عقارات
              <Link to="/edit" className="ptneditgroup">
                <i className="fa-solid fa-pen-to-square"></i>
              </Link>
            </Link>
          </div>
          {groupToDelete && (
            <div className="confirm-modal">
              <div className="modal-content">
                <p>
                  هل انت متاكد من انك تريد حذف مجموعة "{groupToDelete}" من
                  مجموعة المزادات علما انه سيتم حذف كل العناصر الموجودة فيها ؟
                </p>
                <button className="btn-confirm" onClick={confirmDelete}>
                  نعم
                </button>
                <button className="btn-cancel" onClick={cancelDelete}>
                  لا
                </button>
              </div>
            </div>
          )}
          <div className="group-div div3">
            <Link className="link">
              <button
                className="ptndelgroup"
                onClick={() => handleDeleteClick('إلكترونيات')}
              >
                <span>x</span>
              </button>
              إلكترونيات
              <Link to="/edit" className="ptneditgroup">
                <i className="fa-solid fa-pen-to-square"></i>
              </Link>
            </Link>
          </div> */}
          {/* {groupToDelete && (
            <div className="confirm-modal">
              <div className="modal-content">
                <p>
                  هل انت متاكد من انك تريد حذف مجموعة "{groupToDelete}" من
                  مجموعة المزادات علما انه سيتم حذف كل العناصر الموجودة فيها ؟
                </p>
                <button className="btn-confirm" onClick={confirmDelete}>
                  نعم
                </button>
                <button className="btn-cancel" onClick={cancelDelete}>
                  لا
                </button>
              </div>
            </div>
          )}
          <div className="group-div div4">
            <Link className="link">
              <button
                className="ptndelgroup"
                onClick={() => handleDeleteClick('أثاث')}
              >
                <span>x</span>
              </button>
              أثاث
              <Link to="/edit" className="ptneditgroup">
                <i className="fa-solid fa-pen-to-square"></i>
              </Link>
            </Link>
          </div>
          {groupToDelete && (
            <div className="confirm-modal">
              <div className="modal-content">
                <p>
                  هل انت متاكد من انك تريد حذف مجموعة "{groupToDelete}" من
                  مجموعة المزادات علما انه سيتم حذف كل العناصر الموجودة فيها ؟
                </p>
                <button className="btn-confirm" onClick={confirmDelete}>
                  نعم
                </button>
                <button className="btn-cancel" onClick={cancelDelete}>
                  لا
                </button>
              </div>
            </div>
          )}
          <div className="group-div div5">
            <Link className="link">
              <button
                className="ptndelgroup"
                onClick={() => handleDeleteClick('ملابس')}
              >
                <span>x</span>
              </button>
              ملابس
              <Link to="/edit" className="ptneditgroup">
                <i className="fa-solid fa-pen-to-square"></i>
              </Link>
            </Link>
          </div> */}
          {/* {groupToDelete && (
            <div className="confirm-modal">
              <div className="modal-content">
                <p>
                  هل انت متاكد من انك تريد حذف مجموعة "{groupToDelete}" من
                  مجموعة المزادات علما انه سيتم حذف كل العناصر الموجودة فيها ؟
                </p>
                <button className="btn-confirm" onClick={confirmDelete}>
                  نعم
                </button>
                <button className="btn-cancel" onClick={cancelDelete}>
                  لا
                </button>
              </div>
            </div>
          )}
          <div className="group-div div6">
            <Link className="link">
              <button
                className="ptndelgroup"
                onClick={() => handleDeleteClick('إكسسوار')}
              >
                <span>x</span>
              </button>
              إكسسوار
              <Link to="/edit" className="ptneditgroup">
                <i className="fa-solid fa-pen-to-square"></i>
              </Link>
            </Link>
          </div> */}
          {/* {groupToDelete && (
            <div className="confirm-modal">
              <div className="modal-content">
                <p>
                  هل انت متاكد من انك تريد حذف مجموعة "{groupToDelete}" من
                  مجموعة المزادات علما انه سيتم حذف كل العناصر الموجودة فيها ؟
                </p>
                <button className="btn-confirm" onClick={confirmDelete}>
                  نعم
                </button>
                <button className="btn-cancel" onClick={cancelDelete}>
                  لا
                </button>
              </div>
            </div>
          )} */}
          {/* <div className="group-div div7">
            <Link className="link">
              <button
                className="ptndelgroup"
                onClick={() => handleDeleteClick('أخرى')}
              >
                <span>x</span>
              </button>
              أخرى
              <Link to="/edit" className="ptneditgroup">
                <i className="fa-solid fa-pen-to-square"></i>
              </Link>
            </Link>
          </div> */}
          {groupToDelete && (
            <div className="confirm-modal">
              <div className="modal-content">
                <p>
                  هل انت متاكد من انك تريد حذف مجموعة "{groupToDelete?.name}" من
                  مجموعة المزادات علما انه سيتم حذف كل العناصر الموجودة فيها ؟
                </p>
                <button className="btn-confirm" onClick={(e) => {
                  deleteUser(e, groupToDelete?.id);
                }}>
                  نعم
                </button>
                <button className="btn-cancel" onClick={cancelDelete}>
                  لا
                </button>
              </div>
            </div>
          )}
  
{/* ================================================ */}


{all.map((group)=>(  <div className="group-div div7" style={{backgroundImage:`url(${group.image})`}}>
            <Link className="link">
              <button
                className="ptndelgroup"
                // onClick={() => handleDeleteClick(group?.name)}
                //  onClick={() =>
                  // handleDeleteClick(group?.name,group?._id)}
                   onClick={() =>
                      setGroupToDelete({
                        name: group?.name,
                        id: group?._id,
                      })}
                    
              >
                <span>x</span>
              </button>
              {group?.name}
              <Link to="/edit" className="ptneditgroup">
                <i className="fa-solid fa-pen-to-square"></i>
              </Link>
            </Link>
          </div>))}
      </div>
{/* ================================================= */}
        <div>
          <p className="nametit">
            <i class="far fa-handshake"></i> مجموعة المناقصات{' '}
          </p>
{/* 
          <div className="group-con2">
            <div className="group-div div11">
              <div className="sss">
                <Link className="link">
                  <button
                    className="ptndelgroup"
                    onClick={() => handleDeleteClick('بناءواعمار')}
                  >
                    <span>x</span>
                  </button>
                  بناءواعمار
                  <Link to="/edit" className="ptneditgroup">
                    <i className="fa-solid fa-pen-to-square"></i>
                  </Link>
                </Link>
              </div>
            </div>
            {groupToDelete && (
              <div className="confirm-modal">
                <div className="modal-content">
                  <p>
                    هل انت متاكد من انك تريد حذف مجموعة "{groupToDelete}" من
                    مجموعة المناقصات علما انه سيتم حذف كل العناصر الموجودة فيها
                    ؟
                  </p>
                  <button className="btn-confirm" onClick={confirmDelete}>
                    نعم
                  </button>
                  <button className="btn-cancel" onClick={cancelDelete}>
                    لا
                  </button>
                </div>
              </div>
            )}
            <div className="group-div div22">
              <Link className="link">
                <button
                  className="ptndelgroup1"
                  onClick={() => handleDeleteClick('خدمات لأماكن عامة')}
                >
                  <span>x</span>
                </button>
                خدمات لأماكن عامة
                <Link to="/edit" className="ptneditgroup1">
                  <i className="fa-solid fa-pen-to-square"></i>
                </Link>
              </Link>
            </div>
            {groupToDelete && (
              <div className="confirm-modal">
                <div className="modal-content">
                  <p>
                    هل انت متاكد من انك تريد حذف مجموعة "{groupToDelete}" من
                    مجموعة المناقصات علما انه سيتم حذف كل العناصر الموجودة فيها
                    ؟
                  </p>
                  <button className="btn-confirm" onClick={confirmDelete}>
                    نعم
                  </button>
                  <button className="btn-cancel" onClick={cancelDelete}>
                    لا
                  </button>
                </div>
              </div>
            )}
            <div className="group-div div33">
              <Link className="link">
                <button
                  className="ptndelgroup"
                  onClick={() => handleDeleteClick('خدمات منوعة')}
                >
                  <span>x</span>
                </button>
                خدمات منوعة
                <Link to="/edit" className="ptneditgroup">
                  <i className="fa-solid fa-pen-to-square"></i>
                </Link>
              </Link>
            </div>{' '}
            {groupToDelete && (
              <div className="confirm-modal">
                <div className="modal-content">
                  <p>
                    هل انت متاكد من انك تريد حذف مجموعة "{groupToDelete}" من
                    مجموعة المناقصات علما انه سيتم حذف كل العناصر الموجودة فيها
                    ؟
                  </p>
                  <button className="btn-confirm" onClick={confirmDelete}>
                    نعم
                  </button>
                  <button className="btn-cancel" onClick={cancelDelete}>
                    لا
                  </button>
                </div>
              </div>
            )}
            <div className="group-div div44">
              <Link className="link">
                <button
                  className="ptndelgroup"
                  onClick={() => handleDeleteClick('مركبات واليات')}
                >
                  <span>x</span>
                </button>
                مركبات واليات
                <Link to="/edit" className="ptneditgroup">
                  <i className="fa-solid fa-pen-to-square"></i>
                </Link>
              </Link>
            </div>{' '}
            {groupToDelete && (
              <div className="confirm-modal">
                <div className="modal-content">
                  <p>
                    هل انت متاكد من انك تريد حذف مجموعة "{groupToDelete}" من
                    مجموعة المناقصات علما انه سيتم حذف كل العناصر الموجودة فيها
                    ؟
                  </p>
                  <button className="btn-confirm" onClick={confirmDelete}>
                    نعم
                  </button>
                  <button className="btn-cancel" onClick={cancelDelete}>
                    لا
                  </button>
                </div>
              </div>
            )}
            <div className="group-div div55">
              <Link className="link">
                <button
                  className="ptndelgroup"
                  onClick={() => handleDeleteClick('أخرى')}
                >
                  <span>x</span>
                </button>
                أخرى
                <Link to="/edit" className="ptneditgroup">
                  <i className="fa-solid fa-pen-to-square"></i>
                </Link>
              </Link>
            </div>{' '}
            {groupToDelete && (
              <div className="confirm-modal">
                <div className="modal-content">
                  <p>
                    هل انت متاكد من انك تريد حذف مجموعة "{groupToDelete}" من
                    مجموعة المناقصات علما انه سيتم حذف كل العناصر الموجودة فيها
                    ؟
                  </p>
                  <button className="btn-confirm" onClick={confirmDelete}>
                    نعم
                  </button>
                  <button className="btn-cancel" onClick={cancelDelete}>
                    لا
                  </button>
                </div>
              </div>
            )}
          </div> */}
        </div>
      </div>
    </>
  );
}
