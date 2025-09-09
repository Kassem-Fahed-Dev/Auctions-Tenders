import Navbar from './Navbar';
import axiosInstance from '../AxiosInterceptors';
import { useState } from 'react';
import { useEffect } from 'react';
import Auction from '../Auctions/Auction';
import { useLocation } from 'react-router-dom';
import Tender from '../Tenders/Tender';
export default function Resut() {
     const location = useLocation();
    const { data,type } = location.state || {};
    console.log(data)
    const [all, setAll] = useState([]);
    const [all1, setAll1] = useState([]);
      const [errorMessage, setErrorMessage] = useState({});
  const token = localStorage.getItem('jwt');
  useEffect(() => {
      if (token != 'null') {
        if(type=='auctions'){
  axiosInstance
          .get(`/api/v1/search?q=${data}&type=${type}`, {
            headers: {
              'Content-Type': 'application/json',
              'Accept-Language': 'ar',
              credentials: 'include',
              Authorization: `Bearer ${token}`,
            },
          })
          .then((res) => {
            setAll(res.data.data.auctions);
setAll1(res.data.data.tenders)
            console.log('create');
            console.log(res.data.data.auctions);
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
        }else if(type=='tenders'){
  axiosInstance
          .get(`/api/v1/search?q=${data}&type=${type}`, {
            headers: {
              'Content-Type': 'application/json',
              'Accept-Language': 'ar',
              credentials: 'include',
              Authorization: `Bearer ${token}`,
            },
          })
          .then((res) => {
           
setAll1(res.data.data.tenders)
            console.log('create');
            console.log(res.data.data.tenders);
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
        }
      else{  axiosInstance
          .get(`/api/v1/search?q=${data}`, {
            headers: {
              'Content-Type': 'application/json',
              'Accept-Language': 'ar',
              credentials: 'include',
              Authorization: `Bearer ${token}`,
            },
          })
          .then((res) => {
            setAll(res.data.data.auctions);
setAll1(res.data.data.tenders)
            console.log('create');
            console.log(res.data.data.auctions);
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
          });}
      }
    }, []);
  return (
    <>
      <div
        style={{
          marginTop: '40px',
        }}
      >
        <Navbar />
        <p class="resultserach ">نتائج البحث بالمزادات</p>
        <div className="alotofAuction margin">
                {all.map((auc) => (
                  <Auction data={auc}  />
                ))}
              </div>
      </div>
      <p class="resultserach ">نتائج البحث بالمناقصات</p>
       <div className="alotofAuction">
          
              {all1.map((auc) => (
                <Tender data={auc}  />
              ))}
            </div>
    </>
  );
}
