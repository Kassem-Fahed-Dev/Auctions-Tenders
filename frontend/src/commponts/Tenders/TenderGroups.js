import TendersNavbar from './TendersNavbar';
import Navbar from '../Home/Navbar';
import { Link, useNavigate } from 'react-router-dom';
import Footer from '../privacy policy/Footer';
import { useEffect, useState } from 'react';
import { usePagination } from '../Auctions/PaginationContext';
import axiosInstance from '../AxiosInterceptors';
import Pagination from '../Auctions/Pagination';
export default function TenderGroups() {
  const navegate = useNavigate();
     const token = localStorage.getItem('jwt');
     const [all,setAll]=useState([])
      const [errorMessage, setErrorMessage] = useState({});
      const { currentPage,setCurrentPage, itemsPerPage } = usePagination();
   useEffect(()=>{axiosInstance
          .get(
            `${
              `/api/v1/categories?type=tender&page=${currentPage}&limit=6`
               
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
          });},[currentPage])
  return (
    <div>
      <Navbar wordBlod={'tenders'} />
      <TendersNavbar wordBlod={'group'} />
      <button
        className="createauction"
        onClick={() => {
          navegate('/Create_Tender');
        }}
      >
        <p>إنشاء مناقصة</p>
        <i className="fas fa-plus"></i>
      </button>
      <div className="group-con">
        {/* <div className="group-div div11">
          <Link className="link" to="/bild">
            بناءواعمار
          </Link>
        </div>
        <div className="group-div div22">
          <Link className="link" to="/public">
            خدمات لأماكن عامة
          </Link>
        </div>
        <div className="group-div div33">
          <Link className="link" to="/varios">
            خدمات منوعة
          </Link>
        </div>
        <div className="group-div div44">
          <Link className="link" to="/cars">
            مركبات واليات
          </Link>
        </div>
        <div className="group-div div55">
          <Link className="link" to="/other_tender">
            أخرى
          </Link>
        </div> */}
         {all.map((ten) => (
             <div className="group-div div7" style={{backgroundImage:`url(${ten?.image})`}}>
          <Link className="link" state={{data:ten.name}} to="/other_tender">
            {ten.name}
          </Link>
        </div>
                ))}
      </div>
      <Pagination/>
      <Footer />
    </div>
  );
}
