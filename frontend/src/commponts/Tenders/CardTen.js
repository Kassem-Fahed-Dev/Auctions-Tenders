import { useEffect, useState } from 'react';
import axiosInstance from '../AxiosInterceptors';
import Tender from './Tender';

export default function CardTen({page,item,id,showDelete}) {
  console.log(id)
  const [all, setAll] = useState([]);
  let sort;
    const token = localStorage.getItem('jwt'); 
  const [errorMessage, setErrorMessage] = useState({});
     if(item=="سيارات"){
        sort=localStorage.getItem('status4tn')
     
   }
   else if(item=="عقارات"){
        sort=localStorage.getItem('status5tn')
      
   }else if(item=="إلكترونيات"){
        sort=localStorage.getItem('status6tn')
     
   }else if(item=="أثاث"){
        sort=localStorage.getItem('status7tn')
     
   }else if(item=="ملابس"){
        sort=localStorage.getItem('status8tn')
 
   }else if(item=="إكسسوار"){
        sort=localStorage.getItem('status9tn')
    
   }else if(item=="أخرى"){
        sort=localStorage.getItem('status10tn')

   }else{
    sort=localStorage.getItem('statustn')
   }
   useEffect(()=>{
    if(page=="all"){
          console.log(sort)
    axiosInstance
    .get(
      `${
      sort=='فرز حسب'||sort==' الوقت'||sort==' مجموعات'
          ?
           '/api/v1/tenders'
          : sort == ' جاري' || sort == ' منتهي' || sort == ' قادم'
          ? `/api/v1/tenders?activeStatus=${sort.trim()}`
          : `/api/v1/tenders?categoryName=${sort.trim()}`
      }`
      ,
      {
        headers: {
          'Content-Type': 'application/json',
          'Accept-Language': 'ar',
           'credentials': 'include',
            'Authorization': `Bearer ${token}`,
        },
      }
    )
    .then((res) => {
      setAll(res.data.data.data);
      console.log(all);
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
     if(page=="id"){
          console.log(id)
    axiosInstance
    .get(
      `${
      sort=='فرز حسب'||sort==' الوقت'||sort==' مجموعات'
          ?
           `/api/v1/tenders?user=${id}`
          : sort == ' جاري' || sort == ' منتهي' || sort == ' قادم'
          ? `/api/v1/tenders?user=${id}&activeStatus=${sort.trim()}`
          : `/api/v1/tenders?user=${id}&categoryName=${sort.trim()}`
      }`
      ,
      {
        headers: {
          'Content-Type': 'application/json',
          'Accept-Language': 'ar',
           'credentials': 'include',
            'Authorization': `Bearer ${token}`,
        },
      }
    )
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
  }
  // /api/v1/auctions

    else if(page=="create"){
  
    console.log(sort)
    axiosInstance
    .get(
      `${
      sort=='فرز حسب'||sort==' الوقت'||sort==' مجموعات'
          ? 
          '/api/v1/tenders/myTenders'
          : sort == ' جاري' || sort == ' منتهي' || sort == ' قادم'
          ? `/api/v1/tenders/myTenders?activeStatus=${sort.trim()}`
          : `/api/v1/tenders/myTenders?categoryName=${sort.trim()}`
      }`
      ,
      {
        headers: {
          'Content-Type': 'application/json',
          'Accept-Language': 'ar',
           'credentials': 'include',
            'Authorization': `Bearer ${token}`,
        },
      }
    )
    .then((res) => {
      setAll(res.data.data.data);
      console.log('create')
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
 else if(page=="group"){
  
    console.log('g')
    axiosInstance
    .get(
      `${
      sort=='فرز حسب'
          ? 
          `/api/v1/tenders?categoryName=${item}`
          : `/api/v1/auctions?categoryName=${item}&activeStatus=${sort.trim()}`
          
      }`
      ,
      {
        headers: {
          'Content-Type': 'application/json',
          'Accept-Language': 'ar',
           'credentials': 'include',
            'Authorization': `Bearer ${token}`,
        },
      }
    )
    .then((res) => {
      setAll(res.data.data.data);
      console.log('create')
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
   else if(page=="fav"){
  
    console.log(sort)
    axiosInstance
    .get(
      `${
      sort=='فرز حسب'||sort==' الوقت'||sort==' مجموعات'
          ? 
          `/api/v1/tenders`
          : sort == ' جاري' || sort == ' منتهي' || sort == ' قادم'
          ? `/api/v1/tenders?activeStatus=${sort.trim()}`
          : `/api/v1/tenders?categoryName=${sort.trim()}`
      }`
      ,
      {
        headers: {
          'Content-Type': 'application/json',
          'Accept-Language': 'ar',
           'credentials': 'include',
            'Authorization': `Bearer ${token}`,
        },
      }
    )
    .then((res) => {
      const favorites = res.data.data.data.filter(item => item.favorite === true);
    
      // تعيين العناصر المفلترة إلى الحالة
      setAll(favorites);
      
      
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
  }  else if(page=="share"){
  
    console.log(sort)
    axiosInstance
    .get(
      `${
      sort=='فرز حسب'||sort==' الوقت'||sort==' مجموعات'
          ? 
          `/api/v1/tenders/participateTenders`
          : sort == ' جاري' || sort == ' منتهي' || sort == ' قادم'
          ? `/api/v1/tenders/participateTenders?activeStatus=${sort.trim()}`
          : `/api/v1/tenders/participateTenders?categoryName=${sort.trim()}`
      }`
      ,
      {
        headers: {
          'Content-Type': 'application/json',
          'Accept-Language': 'ar',
           'credentials': 'include',
            'Authorization': `Bearer ${token}`,
        },
      }
    )
    .then((res) => {
      setAll(res.data.data.data);
      console.log('create')
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
},[sort])
  return (
    <>
      <div className="alotofAuction">
    
        {all.map((auc) => (
          <Tender data={auc} showDelete={showDelete} />
        ))}
      </div>
    </>
  );
}
