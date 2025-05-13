import { useEffect, useState } from 'react';
import axiosInstance from '../AxiosInterceptors';
import Auction from './Auction';
export default function Cards() {
  const [all, setAll] = useState([]);
  const [errorMessage, setErrorMessage] = useState({});
    const sort=localStorage.getItem('status')
  useEffect(()=>{
    axiosInstance
    .get(
      `${
      sort=='فرز حسب'||sort==' الوقت'||sort==' مجموعات'
          ? '/api/v1/auctions'
          : sort == ' جاري' || sort == ' منتهي' || sort == ' قادم'
          ? `/api/v1/auctions?activeStatus=${sort.trim()}`
          : `/api/v1/auctions?categoryName=${sort.trim()}`
      }`,
      {
        headers: {
          'Content-Type': 'application/json',
          'Accept-Language': 'ar',
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
  },[sort])
  return (
    <>
      <div className="alotofAuction">
        {all.map((auc) => (
          <Auction data={auc} />
        ))}
      </div>
    </>
  );
}
