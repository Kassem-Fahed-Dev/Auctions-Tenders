import img from '../../image/logo.png';
import './Navbar.css';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Confirm from '../Account/Confirm';
import ConfirmLogout from '../Account/ConfirmLogout';

export default function Navbar({ wordBlod }) {
  const [bold, setBold] = useState('home');
  const hoverItems = (items) => {
    //console.log("kk")
    setBold(items);
  };
  const navegate2 = useNavigate();
  const goToHome = () => {
    navegate2('/');
  };
  //   const tok = localStorage.getItem('jwt');
  const tok = localStorage.getItem('jwt');
  const name = localStorage.getItem('name');
  const [show, setshow] = useState(false);
  function hh() {
    if (show == false) {
      setshow(true);
    } else {
      setshow(false);
    }
  }
  return (
    <>
      <div className="Nav">
        {/* ال لوغو و الجملة تحته */}
        <button onClick={goToHome} className="logo">
          <img src={img} alt="No-image" className="logo1" />
        </button>
        {/* القاىمة الاولى تحوي الرئيسية و المزادات و المناقصات */}
        <ul className="Navul ul1">
          <li
            className={wordBlod === 'home' ? 'bold' : ''}
            onClick={() => hoverItems('home')}
          >
            <Link to="/"> الرئيسية</Link>
          </li>
          <li
            className={wordBlod === 'auctions' ? 'bold' : ''}
            onClick={() => hoverItems('auctions')}
          >
            <Link to="/auctions">مزادات</Link>
          </li>
          <li
            className={wordBlod === 'tenders' ? 'bold' : ''}
            onClick={() => hoverItems('tenders')}
          >
            <Link to="/tenders">مناقصات</Link>
          </li>
          {/* القاىمة الثانية الحساب و الكل */}
        </ul>
        <ul className="Navul ul2">
          {console.log(typeof tok)}
          {tok == 'null' ? (
            <li onClick={() => hoverItems('user')}>
              <Link to="/acount">
                <div className="icon">
                  <i className="fas fa-user-circle"></i>
                </div>
                <p className="account">حساب الدخول</p>
              </Link>
            </li>
          ) : (
            <li onClick={() => hoverItems('user')}>
              <div className="c_2">
                <div className="icon">
                  <i className="fas fa-user-circle"></i>
                </div>
                <div className="conLogOut">
                  <Link to="/profile">
                    <p className="account">{name}</p>
                  </Link>
                  <Link to="/logout1" id="logout">
                    تسجيل خروج
                  </Link>
                </div>
              </div>
            </li>
          )}
          <li onClick={() => hoverItems('alluser')}>
            <div className="icon">
              <i className="fas fa-users"></i>
            </div>
            <Link to="/users">
              <p className="users"> المستخدمين</p>
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
}
