import AuctionsNavbar from './AuctionsNavbar';
import Navbar from '../Home/Navbar';
import { Link, useNavigate } from 'react-router-dom';
import Footer from '../privacy policy/Footer';
import ButtonSort from '../Home/ButtonSort';
import { useEffect, useState } from 'react';
import axiosInstance from '../AxiosInterceptors';
import { usePagination } from './PaginationContext';
import Pagination from './Pagination';
export default function AuctionGroups() {
  const navegate = useNavigate();
   const token = localStorage.getItem('jwt');
   const [all,setAll]=useState([])
    const { currentPage,setCurrentPage, itemsPerPage } = usePagination();
    const [errorMessage, setErrorMessage] = useState({});
 useEffect(()=>{axiosInstance
        .get(
          `${
            `/api/v1/categories?type=auction&page=${currentPage}&limit=6`
             
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
           if (res.data.data.data.length === 0 && currentPage > 1) {
          setCurrentPage((prev) => prev - 1);
          return;
        }
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
        });},[currentPage])
  return (
    <div>
      <Navbar wordBlod={'auctions'} />
      <AuctionsNavbar wordBlod={'group'} />
      <button
        className="createauction"
        onClick={() => {
          navegate('/CreateAuction');
        }}
      >
        <p>إنشاء مزاد</p>
        <i className="fas fa-plus"></i>
      </button>
     
      <div className="group-con">

        {all.map((auc) => (
             <div className="group-div div7" style={{backgroundImage:`url(${auc?.image})`}}>
          <Link className="link" state={{data:auc.name}} to="/other">
            {auc.name}
          </Link>
        </div>
                ))}
      </div>
      
      <div className='pag'><Pagination/></div>
      <Footer />
    </div>
  );
}
