import { useEffect, useState } from 'react';
import axiosInstance from '../AxiosInterceptors';
import Pagination from './Pagination';
import { useLocation } from 'react-router-dom';
import Auction from './Auction';
import { usePagination } from './PaginationContext';
import { current } from '@reduxjs/toolkit';
export default function Cards({ page, item, id, showDelete }) {
  const [all, setAll] = useState([]);
  const [count, setCount] = useState([]);
  const n = localStorage.getItem('current');
  const [errorMessage, setErrorMessage] = useState({});
  let sort;
  if (page == 'favp') {
    sort = localStorage.getItem('status1p');
    console.log('1');
  } else if (page == 'fav') {
    sort = localStorage.getItem('status1');
    console.log('2');
  } else if (page == 'create') {
    sort = localStorage.getItem('status2');
    console.log('3');
  } else if (page == 'createp') {
    sort = localStorage.getItem('status2p');
    console.log('4');
  } else if (page == 'group') {
    sort = localStorage.getItem(`group${item}`);
    console.log('5');
  } else if (page == 'favh') {
    sort = localStorage.getItem('status1h');
    console.log('6');
  } else if (page == 'sharep') {
    sort = localStorage.getItem('status3p');
    console.log('7');
  } else if (page == 'share') {
    sort = localStorage.getItem('status3');
    console.log('8');
  } else if (page == 'id') {
    sort = localStorage.getItem('statusallAu');
    console.log('9');
  } else if(page=='all'){
  
    sort = localStorage.getItem('status');
    
  }
  const { currentPage, setCurrentPage, itemsPerPage } = usePagination();
  console.log(currentPage);
  console.log(itemsPerPage);
  const location = useLocation();
  const token = localStorage.getItem('jwt');
  // if(page=="all"){
  useEffect(() => {
    if (page == 'all') {
      console.log('gggggggllggg');
      axiosInstance
        .get(
          `${
            sort == 'فرز حسب' || sort == ' الوقت' || sort == ' مجموعات'
              ? `/api/v1/auctions?status=مقبول&page=${currentPage}&limit=3`
              : sort == ' جاري' || sort == ' منتهي' || sort == ' قادم'
              ? `/api/v1/auctions?status=مقبول&activeStatus=${sort.trim()}&page=${currentPage}&limit=3`
              : `/api/v1/auctions?status=مقبول&categoryName=${sort.trim()}&page=${currentPage}&limit=3`
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
          setCount(res.data.result);
          // window.location.reload()
          if (res.data.data.data.length === 0 && currentPage > 1) {
            setCurrentPage((prev) => prev - 1);
            return;
          }

          console.log(sort);
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
    } else if (page == 'id') {
      console.log('id');
      axiosInstance
        .get(
          `${
            sort == 'فرز حسب' || sort == 'الكل'
              ? `/api/v1/auctions?user=${id}&status=مقبول&page=${currentPage}&limit=3`
              : sort == ' جاري' || sort == ' منتهي' || sort == ' قادم'
              ? `/api/v1/auctions?user=${id}&status=مقبول&activeStatus=${sort.trim()}&page=${currentPage}&limit=3`
              : `/api/v1/auctions?user=${id}&status=${sort.trim()}&page=${currentPage}&limit=3`
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
    else if (page == 'create' || page == 'createp') {
      console.log('create');
      axiosInstance
        .get(
          `${
            sort == 'فرز حسب' || sort == 'الكل'
              ? `/api/v1/auctions/myAuctions?status=مقبول&page=${currentPage}&limit=3`
              : sort == ' جاري' || sort == ' منتهي' || sort == ' قادم'
              ? `/api/v1/auctions/myAuctions?status=مقبول&activeStatus=${sort.trim()}&page=${currentPage}&limit=3`
              : `/api/v1/auctions/myAuctions?&status=${sort.trim()}&page=${currentPage}&limit=3`
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
    } else if (page == 'group') {
      console.log('group');
      axiosInstance
        .get(
          `${
            sort == 'فرز حسب'
              ? `/api/v1/auctions?status=مقبول&categoryName=${item}&page=${currentPage}&limit=3`
              : `/api/v1/auctions?status=مقبول&categoryName=${item}&activeStatus=${sort.trim()}&page=${currentPage}&limit=3`
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
    } else if (page == 'fav' || page == 'favh' || page == 'favp') {
      console.log('fallllllllllllllllllllv');
      axiosInstance
        .get(
          `${
            sort == 'فرز حسب' || sort == ' الوقت' || sort == ' مجموعات'
              ? `/api/v1/favorites?type=auction&page=${currentPage}&limit=3`
              : sort == ' جاري' || sort == ' منتهي' || sort == ' قادم'
              ? `/api/v1/favorites?type=auction&activeStatus=${sort.trim()}&page=${currentPage}&limit=3`
              : `/api/v1/favorites?type=auction&categoryName=${sort.trim()}&page=${currentPage}&limit=3`
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
          // const favorites = res.data.data.data.filter(
          //   (item) => item.favorite === true
          // );

          // تعيين العناصر المفلترة إلى الحالة
          setAll(res.data.data.data);
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
    } else if (page == 'share' || page == 'sharep') {
      console.log('share');
      axiosInstance
        .get(
          `${
            sort == 'فرز حسب' || sort == ' الوقت' || sort == ' مجموعات'
              ? `/api/v1/auctions/participateAuctions?status=مقبول&page=${currentPage}&limit=3`
              : sort == ' جاري' || sort == ' منتهي' || sort == ' قادم'
              ? `/api/v1/auctions/participateAuctions?status=مقبول&activeStatus=${sort.trim()}&page=${currentPage}&limit=3`
              : `/api/v1/auctions/participateAuctions?status=مقبول&categoryName=${sort.trim()}&page=${currentPage}&limit=3`
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
  }, [sort, currentPage]);
  // }

  return (
    <>
      <div className="alotofAuction">
        {all.map((auc) => (
          <Auction data={auc} showDelete={showDelete} />
        ))}
      </div>
    </>
  );
}
