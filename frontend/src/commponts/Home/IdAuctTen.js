import { useLocation } from "react-router-dom";
import axiosInstance from "../AxiosInterceptors";
import { useState } from "react";
import { useEffect } from "react";
import Navbar from "./Navbar";
import Details_Tender from '../Tenders/details/Details_Tender'
import Details from "../Account/details/Details";
export default function IdAuctTen(){
     const location = useLocation();
    const { id,type } = location.state || {}; 
      const [all, setAll] = useState([]);
   const token = localStorage.getItem('jwt');
  const [errorMessage, setErrorMessage] = useState({});// التأكد من وجود البيانات
 useEffect(()=>{ if(type=='auction'){
      axiosInstance
        .get(
          `${
              `/api/v1/auctions/${id}?`
          
          }`,
          {
            headers: {
              'Content-Type': 'application/json',
              'Accept-Language': 'ar',
              credentials: 'include',
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((res) => {
          setAll(res.data.data.data);
          console.log('create');
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
  }
  else{
  axiosInstance
        .get(
          `${
              `/api/v1/tenders/${id}?status=مقبول`
          
          }`,
          {
            headers: {
              'Content-Type': 'application/json',
              'Accept-Language': 'ar',
              credentials: 'include',
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((res) => {
          setAll(res.data.data.data);
          console.log('create');
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
  }},[])
    return(
        <>
        {type=='auction'? <Details da={all}/>:<Details_Tender da={all}/>}
       
        </>
    )
}