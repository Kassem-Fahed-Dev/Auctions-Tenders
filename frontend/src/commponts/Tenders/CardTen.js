import { useEffect, useState } from 'react';
import axiosInstance from '../AxiosInterceptors';
import Tender from './Tender';
import { usePagination } from '../Auctions/PaginationContext';
export default function CardTen({page,item,id,showDelete}) {
  // console.log(id)
  const [all, setAll] = useState([]);
  let sort;
    const token = localStorage.getItem('jwt'); 
  const [errorMessage, setErrorMessage] = useState({});
  const { currentPage,setCurrentPage, itemsPerPage } = usePagination();

     if(page=="fav"){
        sort=localStorage.getItem('status1tn')

   }else if(page=="create"){
        sort=localStorage.getItem('status2tn')

   }else if(page=="createp"){
        sort=localStorage.getItem('status2ptn')

   }else if (page == 'group') {
    sort = localStorage.getItem(`group${item}`);
  } else if(page=="id"){
        sort=localStorage.getItem('statusallTe')

   }else if(page=="favp"){
        sort=localStorage.getItem('status1tnp')

   }else if(page=="favh"){
        sort=localStorage.getItem('status1tnh')

   }else if(page=="sharep"){
        sort=localStorage.getItem('status3tnp')

   }else if(page=="share"){
        sort=localStorage.getItem('status3tn')

   }else{
    sort=localStorage.getItem('statustn')
   }
   console.log(sort)
   useEffect(()=>{
    if(page=="all"){
          console.log(sort)
    axiosInstance
    .get(
      `${
      sort=='فرز حسب'||sort==' الوقت'||sort==' مجموعات'
          ?
           `/api/v1/tenders?page=${currentPage}&limit=3&status=مقبول`
          : sort == ' جاري' || sort == ' منتهي' || sort == ' قادم'
          ? `/api/v1/tenders?page=${currentPage}&limit=3&status=مقبول&activeStatus=${sort.trim()}`
          : `/api/v1/tenders?page=${currentPage}&limit=3&status=مقبول&categoryName=${sort.trim()}`
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
          if (res.data.data.data.length === 0 && currentPage > 1) {
          setCurrentPage((prev) => prev - 1);
          return;
        }
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
           `/api/v1/tenders?user=${id}&page=${currentPage}&limit=3&status=مقبول`
          : sort == ' جاري' || sort == ' منتهي' || sort == ' قادم'
          ? `/api/v1/tenders?user=${id}&page=${currentPage}&limit=3&status=مقبول&activeStatus=${sort.trim()}`
          : `/api/v1/tenders?user=${id}&page=${currentPage}&limit=3&status=${sort.trim()}`
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
          if (res.data.data.data.length === 0 && currentPage > 1) {
          setCurrentPage((prev) => prev - 1);
          return;
        }
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

    else if(page=="create"||page=='createp'){
  
    console.log(sort)
    axiosInstance
    .get(
      `${
      sort=='فرز حسب'||sort==' الوقت'||sort==' مجموعات'
          ? 
          `/api/v1/tenders/myTenders?page=${currentPage}&limit=3&status=مقبول`
          : sort == ' جاري' || sort == ' منتهي' || sort == ' قادم'
          ? `/api/v1/tenders/myTenders?page=${currentPage}&limit=3&activeStatus=${sort.trim()}`
          : `/api/v1/tenders/myTenders?page=${currentPage}&limit=3&status=${sort.trim()}`
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
          if (res.data.data.data.length === 0 && currentPage > 1) {
          setCurrentPage((prev) => prev - 1);
          return;
        }
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
          `/api/v1/tenders?status=مقبول&page=${currentPage}&limit=3&categoryName=${item}`
          : `/api/v1/tenders?status=مقبول&page=${currentPage}&limit=3&categoryName=${item}&activeStatus=${sort.trim()}`
          
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
          if (res.data.data.data.length === 0 && currentPage > 1) {
          setCurrentPage((prev) => prev - 1);
          return;
        }
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
   else if(page=="fav"||page=='favh'){
  
    console.log(sort)
    axiosInstance
    .get(
      `${
      sort=='فرز حسب'||sort==' الوقت'||sort==' مجموعات'
          ? 
          `/api/v1/tenders?page=${currentPage}&limit=3&status=مقبول`
          : sort == ' جاري' || sort == ' منتهي' || sort == ' قادم'
          ? `/api/v1/tenders?status=مقبول&page=${currentPage}&limit=3&activeStatus=${sort.trim()}`
          : `/api/v1/tenders?status=مقبول&page=${currentPage}&limit=3&categoryName=${sort.trim()}`
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
      
          if (res.data.data.data.length === 0 && currentPage > 1) {
          setCurrentPage((prev) => prev - 1);
          return;
        }
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
  
   else if(page=="favp"){
  
    console.log(sort)
    axiosInstance
    .get(
      `${
      sort=='فرز حسب'||sort==' الوقت'||sort==' مجموعات'
          ? 
          `/api/v1/tenders?page=${currentPage}&limit=3&status=مقبول`
          : sort == ' جاري' || sort == ' منتهي' || sort == ' قادم'
          ? `/api/v1/tenders?page=${currentPage}&limit=3&status=مقبول&activeStatus=${sort.trim()}`
          : `/api/v1/tenders?page=${currentPage}&limit=3&status=مقبول&categoryName=${sort.trim()}`
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
        if (res.data.data.data.length === 0 && currentPage > 1) {
          setCurrentPage((prev) => prev - 1);
          return;
        }
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
  } else if(page=="share"||page=="sharep"){
  
    console.log(sort)
    axiosInstance
    .get(
      `${
      sort=='فرز حسب'||sort==' الوقت'||sort==' مجموعات'
          ? 
          `/api/v1/tenders/participateTenders?page=${currentPage}&limit=3&status=مقبول`
          : sort == ' جاري' || sort == ' منتهي' || sort == ' قادم'
          ? `/api/v1/tenders/participateTenders?page=${currentPage}&limit=3&status=مقبول&activeStatus=${sort.trim()}`
          : `/api/v1/tenders/participateTenders?page=${currentPage}&limit=3&status=مقبول&categoryName=${sort.trim()}`
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
          if (res.data.data.data.length === 0 && currentPage > 1) {
          setCurrentPage((prev) => prev - 1);
          return;
        }
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

},[sort,currentPage])
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
