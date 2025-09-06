import './Admin.css';
import imag from '../../image/logo.png';
import { Link } from 'react-router-dom';

import ControChart from './ControChart';

import { useEffect } from 'react';
import axiosInstance from '../AxiosInterceptors';
import { useState } from 'react';
export default function ControlAdmin() {
  const token = localStorage.getItem('jwt');
  const [numAu, setNumAu] = useState([]);
  const [numTn, setNumTn] = useState([]);
  const [numUser, setNumUser] = useState([]);
  const [errorMessage, setErrorMessage] = useState({});
  useEffect(() => {
    axiosInstance
      .get('/api/v1/auctions', {
        headers: {
          'Content-Type': 'application/json',
          'Accept-Language': 'ar',
          credentials: 'include',
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setNumAu(res.data.result);
        console.log(res.data.result);
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

    axiosInstance
      .get('/api/v1/tenders', {
        headers: {
          'Content-Type': 'application/json',
          'Accept-Language': 'ar',
          credentials: 'include',
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setNumTn(res.data.result);
        console.log(res.data.result);
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

    axiosInstance
      .get('/api/v1/users', {
        headers: {
          'Content-Type': 'application/json',
          'Accept-Language': 'ar',
          credentials: 'include',
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setNumUser(res.data.results);
        console.log(res.data.result);
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
              <i class="fas fa-chart-line"></i>لوحة التحكم{' '}
            </h1>
            <div className="con_Admin_control">
              <div>
                <p>
                  <i class="fa-solid fa-gavel"></i>{' '}
                </p>
                <p>عدد المزادات </p>
                <p>{numAu}</p>
              </div>
              <div>
                <p>
                  <i class="far fa-handshake"></i>{' '}
                </p>
                <p>عدد المناقصات</p>
                <p>{numTn}</p>
              </div>
              <div>
                <p>
                  {' '}
                  <i class="fa-solid fa-user-large"></i>
                </p>
                <p>عدد المستخدمين </p>
                <p>{numUser}</p>
              </div>
            </div>
          </div>
        </div>
        <ControChart />
      </div>
    </>
  );
}
