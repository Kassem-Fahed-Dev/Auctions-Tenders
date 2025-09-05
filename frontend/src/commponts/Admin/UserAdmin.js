import './Admin.css';
import imag from '../../image/logo.png';
import { Link } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
export default function UserAdmin() {
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
                  <button
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
                  </button>
                  {showAddAdmin && (
                    <div className="action-box">
                      <p className="p_title">
                        ادخل اسم المدير الذي تود ترقيته الى مدير
                        <br />
                        علماً بأنه سوفف يتمتع بصلاحية المدير التي تعطيه اياها
                      </p>
                      <div className="search_input">
                        <input type="text" />
                        <button className="search_btn">
                          <i className="fa-solid fa-magnifying-glass"></i>
                        </button>
                      </div>
                    </div>
                  )}
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
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>مدير</td>
              <td>fadi@gmail.com </td>
              <td>فادي الاحمد </td>
              <td>
                <button
                  className="ptn_delete_admin"
                  onClick={() =>
                    setUserToDelete({ role: 'مدير', name: 'فادي الأحمد' })
                  }
                >
                  <i class="fa-regular fa-trash-can"></i>
                </button>
              </td>
            </tr>

            <tr>
              <td>مستخدم</td>
              <td>fadi@gmail.com </td>
              <td>فادي الاحمد </td>
              <td>
                <button
                  className="ptn_delete_admin"
                  onClick={() =>
                    setUserToDelete({ role: 'مستخدم', name: 'فادي الأحمد' })
                  }
                >
                  <i class="fa-regular fa-trash-can"></i>
                </button>
              </td>
            </tr>
            <tr>
              <td>مدير</td>
              <td>fadi@gmail.com </td>
              <td>فادي الاحمد </td>
              <td>
                <button
                  className="ptn_delete_admin"
                  onClick={() =>
                    setUserToDelete({ role: 'مدير', name: 'فادي الأحمد' })
                  }
                >
                  <i class="fa-regular fa-trash-can"></i>
                </button>
              </td>
            </tr>

            <tr>
              <td>مستخدم</td>
              <td>fadi@gmail.com </td>
              <td>فادي الاحمد </td>
              <td>
                <button
                  className="ptn_delete_admin"
                  onClick={() =>
                    setUserToDelete({ role: 'مستخدم', name: 'فادي الأحمد' })
                  }
                >
                  <i class="fa-regular fa-trash-can"></i>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
        {userToDelete && (
          <div className="confirm-modal">
            <div className="modal-content">
              {userToDelete.role === 'مدير' ? (
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
                onClick={() => {
                  console.log('تم الحذف:', userToDelete);
                  setUserToDelete(null);
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
      </div>
    </>
  );
}
