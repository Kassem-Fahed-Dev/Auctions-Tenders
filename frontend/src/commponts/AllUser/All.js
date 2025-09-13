import Navbar from '../Home/Navbar';
import CardUser from './CardUser';
import { useEffect, useState } from 'react';
import axiosInstance from '../AxiosInterceptors';
import { usePagination } from '../Auctions/PaginationContext';
import Pagination from '../Auctions/Pagination';
export default function All() {
const [all, setAll] = useState([]);
  const [errorMessage, setErrorMessage] = useState({});
       const token = localStorage.getItem('jwt'); 
         const { currentPage,setCurrentPage, itemsPerPage } = usePagination();
useEffect(()=>{  axiosInstance
    .get(
      `/api/v1/users?page=${currentPage}&limit=6`
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
        if (res.data.data.data.length === 0 && currentPage > 1) {
          setCurrentPage((prev) => prev - 1);
          return;
        }
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
  },[currentPage])
  return (
    <div className='high'>
      <Navbar />
      <div className="conCards">
         {all.map((auc) => (
      
                  <CardUser da={auc} />
                ))}
               
      </div>
    {/* <div> */}
         <Pagination pos={'alluser'}/>
    {/* </div> */}
    </div>
  );
}
