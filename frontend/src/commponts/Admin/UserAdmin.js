import './Admin.css';
import imag from '../../image/logo.png';
import { Link } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import axiosInstance from '../AxiosInterceptors';
import grgr from '../../image/group.jpg';

export default function UserAdmin() {
  const [userToEdit, setUserToEdit] = useState(null);
  const [showDeleteUser, setShowDeleteUser] = useState(false);
  const [showDeleteAdmin, setShowDeleteAdmin] = useState(false);
  const [showAddAdmin, setShowAddAdmin] = useState(false);
  const [show, setshow] = useState(null);
  const deleteUserRef = useRef(null);
  const deleteAdminRef = useRef(null);
  const addAdminRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        showDeleteUser &&
        deleteUserRef.current &&
        !deleteUserRef.current.contains(event.target)
      ) {
        setShowDeleteUser(false);
      }

      if (
        showDeleteAdmin &&
        deleteAdminRef.current &&
        !deleteAdminRef.current.contains(event.target)
      ) {
        setShowDeleteAdmin(false);
      }

      if (
        showAddAdmin &&
        addAdminRef.current &&
        !addAdminRef.current.contains(event.target)
      ) {
        setShowAddAdmin(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showDeleteUser, showDeleteAdmin, showAddAdmin]);

  const [userToDelete, setUserToDelete] = useState(null);
  const [all, setAll] = useState([]);
  const [errorMessage, setErrorMessage] = useState({});
  const token = localStorage.getItem('jwt');
  useEffect(() => {
    axiosInstance
      .get(`/api/v1/users`, {
        headers: {
          'Content-Type': 'application/json',
          'Accept-Language': 'ar',
          credentials: 'include',
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setAll(res.data.data.data);
        console.log(res.data.data.data);
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
  }, []);
  // /api/v1/users/67d7b0f4cd667d344c9fb910
  const deleteUser = (e, id) => {
    console.log('del');
    axiosInstance
      .delete(`/api/v1/users/${id}`, {
        headers: {
          'Content-Type': 'application/json',
          'Accept-Language': 'ar',
          credentials: 'include',
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log('تم الحذف:', userToDelete);
        setUserToDelete(null);
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
  const [formData2, setFormData2] = useState({
    name: '',
  });
  const handleChange2 = (e) => {
    const { value } = e.target;
    setFormData2({ name: value.trim() });
    console.log(formData2);
  };
  const edit = (e, id, role) => {
    console.log('iiiiiiiiiiiii');
    const valdition = {};
    // if (role=='admin'){
    //   role='user'
    // }else{
    //   role='user'
    // }
    console.log(role);
    axiosInstance
      .patch(`/api/v1/users/${id}`, JSON.stringify({ role: role }), {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
          'Accept-Language': 'ar',
          credentials: 'include',
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        // alert('تم تغيير الرقم بنجاح')
        // setHoverAuction('spinner');
        window.location.reload();
        setUserToEdit(null);
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
                  <img src={grgr} alt="err" />
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
              <i className="fa-solid fa-people-group"></i>مدير المستخدمين{' '}
            </h1>
            <div className="test">
              <div className="con_AdminGroup">
                {/* <div className="action-wrapper" ref={deleteUserRef}>
                  <button
                    className={`ptn_Gr1 ${show === 'user' ? 'activeBtn' : ''}`}
                    onClick={() => {
                      setShowDeleteUser(!showDeleteUser);
                      setShowDeleteAdmin(false);
                      setShowAddAdmin(false);
                      setshow('user');
                    }}
                  >
                    <i className="fa-regular fa-trash-can"></i> حذف مستخدم
                  </button>
                  {showDeleteUser && (
                    <div className="action-box">
                      <p className="p_title">
                        ادخل اسم المستخدم الذي تود حذفه <br />
                        علماً بأنه لن يعود بإمكانه المشاركة بالموقع حتى يقوم
                        بالتسجيل من جديد
                      </p>
                      <div className="search_input">
                        <input type="text" />
                        <button className="search_btn">
                          <i className="fa-solid fa-magnifying-glass"></i>
                        </button>
                      </div>
                    </div>
                  )}
                </div> */}
                {/* <div className="action-wrapper" ref={deleteAdminRef}>
                  <button
                    className={`ptn_Gr1 ${show === 'admin' ? 'activeBtn' : ''}`}
                    onClick={() => {
                      setshow('admin');

                      setShowDeleteAdmin(!showDeleteAdmin);
                      setShowDeleteUser(false);
                      setShowAddAdmin(false);
                    }}
                  >
                    <i class="fa-regular fa-trash-can"></i> حذف مدير
                  </button>
                  {showDeleteAdmin && (
                    <div className="action-box">
                      <p className="p_title">
                        ادخل اسم المدير الذي تود حذفه
                        <br />
                        علماً بأنه لن يعود بإمكانه المشاركة بالموقع حتى يقوم
                        بالتسجيل من جديد
                      </p>
                      <div className="search_input">
                        <input type="text" />
                        <button className="search_btn">
                          <i className="fa-solid fa-magnifying-glass"></i>
                        </button>
                      </div>
                    </div>
                  )}
                </div> */}
                <div className="action-wrapper" ref={addAdminRef}>
                  {/* <button
                    className={`ptn_Gr1 ${
                      show === 'deladmin' ? 'activeBtn' : ''
                    }`}
                    onClick={() => {
                      setshow('deladmin');
                      setShowAddAdmin(!showAddAdmin);
                      setShowDeleteUser(false);
                      setShowDeleteAdmin(false);
                    }}
                  >
                    <i className="fas fa-plus"></i> إضافة مدير
                  </button> */}
                  {/* {showAddAdmin && (
                    <div className="action-box">
                      <p className="p_title">
                        ادخل اسم المدير الذي تود ترقيته الى مدير
                        <br />
                        علماً بأنه سوفف يتمتع بصلاحية المدير التي تعطيه اياها
                      </p>
                      <div className="search_input">
                        <input type="text" onChange={(e)=>{handleChange2(e)}}/>
                        <button className="search_btn">
                          <i className="fa-solid fa-magnifying-glass"></i>
                        </button>
                      </div>
                    </div>
                  )} */}
                </div>
              </div>
            </div>
          </div>{' '}
        </div>
        <table className="table2">
          <thead>
            <tr>
              <th>الصلاحية</th>
              <th>البريد الالكتروني </th>
              <th>الاسم الكامل</th>
              <th>حذف </th>
              <th>تعديل الصلاحية </th>
            </tr>
          </thead>
          <tbody>
            {all.map((user) => (
              <tr className="delee">
                <td>{user?.role}</td>
                <td>{user?.email}</td>
                <td> {user?.name} </td>
                <td>
                  <button
                    className="ptn_delete_admin"
                    onClick={() =>
                      setUserToDelete({
                        role: `${user?.role}`,
                        name: `${user?.name}`,
                        id: `${user?._id}`,
                      })
                    }
                  >
                    <i class="fa-regular fa-trash-can"></i>
                  </button>
                </td>

                <td>
                  <button
                    className="ptn_delete_admin fa-can1"
                    // onClick={() =>
                    //   setUserToDelete({
                    //     role: `${user?.role}`,
                    //     name: `${user?.name}`,
                    //     id: `${user?._id}`,
                    //   })
                    // }
                    onClick={() =>
                      setUserToEdit({
                        role: user?.role,
                        name: user?.name,
                        id: user?._id,
                      })
                    }
                  >
                    <i class="fas fa-user fa-can1"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {userToDelete && (
          <div className="confirm-modal">
            <div className="modal-content">
              {userToDelete.role === 'admin' ? (
                <p>
                  هل أنت متأكد أنك تريد حذف <b>المدير "{userToDelete.name}"</b>{' '}
                  ؟<br />
                  علماً بأنه لن يعود بإمكانه المشاركة بالموقع بصلاحية مدير وانما
                  يبقى بصفة مستخدم عادي
                </p>
              ) : (
                <p>
                  هل أنت متأكد أنك تريد حذف{' '}
                  <b>المستخدم "{userToDelete.name}"</b> ؟<br />
                  علماً بأنه لن يعود بإمكانه المشاركة بالموقع حتى يقوم بالتسجيل
                  من جديد.
                </p>
              )}

              <button
                className="btn-confirm"
                onClick={(e) => {
                  deleteUser(e, userToDelete?.id);
                }}
              >
                نعم
              </button>
              <button
                className="btn-cancel"
                onClick={() => setUserToDelete(null)}
              >
                لا
              </button>
            </div>
          </div>
        )}

        {userToEdit && (
          <div className="confirm-modal">
            <div className="modal-content">
              {userToEdit.role === 'user' ? (
                <p>
                  هل تريد ترقية المستخدم <b>"{userToEdit.name}"</b> إلى مدير؟
                </p>
              ) : (
                <p>
                  هل تريد إزالة صلاحية المدير من <b>"{userToEdit.name}"</b>
                  وجعله مستخدم عادي؟
                </p>
              )}

              <button
                className="btn-confirm"
                onClick={(e) => {
                  edit(
                    e,
                    userToEdit?.id,
                    userToEdit?.role == 'admin' ? 'user' : 'admin'
                  );
                }}
              >
                نعم
              </button>
              <button
                className="btn-cancel"
                onClick={() => setUserToEdit(null)}
              >
                لا
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
