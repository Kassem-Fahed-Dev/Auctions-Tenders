import Navbar from '../Home/Navbar';
import CardUser from './CardUser';
import { useEffect, useState } from 'react';
import axiosInstance from '../AxiosInterceptors';
export default function All() {
const [all, setAll] = useState([]);
  const [errorMessage, setErrorMessage] = useState({});
       const token = localStorage.getItem('jwt'); 
useEffect(()=>{  axiosInstance
    .get(
      `/api/v1/users`
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
  },[])
  return (
    <>
      <Navbar />
      <div className="conCards">
         {all.map((auc) => (
      
                  <CardUser da={auc} />
                ))}
      </div>
    </>
  );
}
