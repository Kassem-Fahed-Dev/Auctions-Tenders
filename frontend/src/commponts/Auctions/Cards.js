import { useEffect, useState } from 'react';
import axiosInstance from '../AxiosInterceptors';
import Auction from './Auction';
export default function Cards({ page, item, id, showDelete }) {
  const [all, setAll] = useState([]);
  const [errorMessage, setErrorMessage] = useState({});
  let sort;
  if (item == 'سيارات') {
    sort = localStorage.getItem('status4');
  } else if (item == 'عقارات') {
    sort = localStorage.getItem('status5');
  } else if (item == 'إلكترونيات') {
    sort = localStorage.getItem('status6');
  } else if (item == 'أثاث') {
    sort = localStorage.getItem('status7');
  } else if (item == 'ملابس') {
    sort = localStorage.getItem('status8');
  } else if (item == 'إكسسوار') {
    sort = localStorage.getItem('status9');
  } else if (item == 'أخرى') {
    sort = localStorage.getItem('status10');
  } else if ((page == 'favp')) {
    sort = localStorage.getItem('status1p');
  } else if ((page == 'sharep')) {
    sort = localStorage.getItem('status3p');
    console.log('lllllllllllllll');
  } else {
    sort = localStorage.getItem('status');
  }
  const token = localStorage.getItem('jwt');
  // if(page=="all"){
  useEffect(() => {
    if (page == 'all') {
      console.log('all');
      axiosInstance
        .get(
          `${
            sort == 'فرز حسب' || sort == ' الوقت' || sort == ' مجموعات'
              ? '/api/v1/auctions?status=مقبول'
              : sort == ' جاري' || sort == ' منتهي' || sort == ' قادم'
              ? `/api/v1/auctions?status=مقبول&activeStatus=${sort.trim()}`
              : `/api/v1/auctions?status=مقبول&categoryName=${sort.trim()}`
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
          // window.location.reload()
          console.log(res.data);
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
    if (page == 'id') {
      console.log('id');
      axiosInstance
        .get(
          `${
            sort == 'فرز حسب' || sort == ' الوقت' || sort == ' مجموعات'
              ? `/api/v1/auctions?user=${id}`
              : sort == ' جاري' || sort == ' منتهي' || sort == ' قادم'
              ? `/api/v1/auctions?user=${id}&activeStatus=${sort.trim()}`
              : `/api/v1/auctions?user=${id}&categoryName=${sort.trim()}`
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
    else if (page == 'create') {
      console.log(sort);
      axiosInstance
        .get(
          `${
            sort == 'فرز حسب' || sort == ' الوقت' || sort == ' مجموعات'
              ? '/api/v1/auctions/myAuctions'
              : sort == ' جاري' || sort == ' منتهي' || sort == ' قادم'
              ? `/api/v1/auctions/myAuctions?activeStatus=${sort.trim()}`
              : `/api/v1/auctions/myAuctions?categoryName=${sort.trim()}`
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
    } else if (page == 'group') {
      console.log('g');
      axiosInstance
        .get(
          `${
            sort == 'فرز حسب'
              ? `/api/v1/auctions?status=مقبول&categoryName=${item}`
              : `/api/v1/auctions?status=مقبول&categoryName=${item}&activeStatus=${sort.trim()}`
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
    } else if (page == 'fav') {
      console.log('fav');
      axiosInstance
        .get(
          `${
            sort == 'فرز حسب' || sort == ' الوقت' || sort == ' مجموعات'
              ? `/api/v1/auctions?status=مقبول`
              : sort == ' جاري' || sort == ' منتهي' || sort == ' قادم'
              ? `/api/v1/auctions?status=مقبول&activeStatus=${sort.trim()}`
              : `/api/v1/auctions?status=مقبول&categoryName=${sort.trim()}`
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
          const favorites = res.data.data.data.filter(
            (item) => item.favorite === true
          );

          // تعيين العناصر المفلترة إلى الحالة
          setAll(favorites);

          console.log(res.data.data.data[0].favorite);
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
    } else if (page == 'favp') {
      console.log('favppppppp');
      axiosInstance
        .get(
          `${
            sort == 'فرز حسب' || sort == ' الوقت' || sort == ' مجموعات'
              ? `/api/v1/auctions?status=مقبول`
              : sort == ' جاري' || sort == ' منتهي' || sort == ' قادم'
              ? `/api/v1/auctions?status=مقبول&activeStatus=${sort.trim()}`
              : `/api/v1/auctions?status=مقبول&categoryName=${sort.trim()}`
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
          const favorites = res.data.data.data.filter(
            (item) => item.favorite === true
          );

          // تعيين العناصر المفلترة إلى الحالة
          setAll(favorites);

          console.log(res.data.data.data[0].favorite);
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
    } else if (page == 'share') {
      console.log(sort);
      axiosInstance
        .get(
          `${
            sort == 'فرز حسب' || sort == ' الوقت' || sort == ' مجموعات'
              ? `/api/v1/auctions/participateAuctions?status=مقبول`
              : sort == ' جاري' || sort == ' منتهي' || sort == ' قادم'
              ? `/api/v1/auctions/participateAuctions?status=مقبول&activeStatus=${sort.trim()}`
              : `/api/v1/auctions/participateAuctions?status=مقبول&categoryName=${sort.trim()}`
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
    } else if (page == 'sharep') {
      console.log(sort);
      console.log('fpppp');
      axiosInstance
        .get(
          `${
            sort == 'فرز حسب' || sort == ' الوقت' || sort == ' مجموعات'
              ? `/api/v1/auctions/participateAuctions?status=مقبول`
              : sort == ' جاري' || sort == ' منتهي' || sort == ' قادم'
              ? `/api/v1/auctions/participateAuctions?status=مقبول&activeStatus=${sort.trim()}`
              : `/api/v1/auctions/participateAuctions?status=مقبول&categoryName=${sort.trim()}`
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
  }, [sort]);
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
