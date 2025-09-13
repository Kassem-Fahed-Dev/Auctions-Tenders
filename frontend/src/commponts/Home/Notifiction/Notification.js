import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Navbar from '../Navbar';
import './Notification.css';
import immm from '../../../image/car.jpg';
import Footer from '../../privacy policy/Footer';
import axiosInstance from '../../AxiosInterceptors';
import { useEffect } from 'react';
import Pagination from '../../Auctions/Pagination';
import { usePagination } from '../../Auctions/PaginationContext';
export default function Notification() {
  const location = useLocation();
  const currentPath = location.pathname;
  const [all, setAll] = useState([]);
  const [errorMessage, setErrorMessage] = useState({});

  const { currentPage,setCurrentPage, itemsPerPage } = usePagination();
  const token = localStorage.getItem('jwt');
  useEffect(() => {
    axiosInstance
      .get(`/api/v1/notifications/my?page=${currentPage}&limit=5`, {
        headers: {
          'Content-Type': 'application/json',
          'Accept-Language': 'ar',
          credentials: 'include',
          Authorization: `Bearer ${token}`,
        },
      })
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
      });
  }, []);
  //  const [col, setcol] = useState(all.read == true ? 'read' : 'unread');
  function handel_Fav(e, da) {
    e.preventDefault();
    let hh = e.target;
    console.log(token);
    if (hh.style.backgroundColor === 'transparent') {
      hh.style.cssText = 'backgroundColor: transparent;';
      // setcol('read');
    } else {
      hh.style.cssText = 'backgroundColor: transparent;';
      // setcol('read');
    }
    const o = axiosInstance
      .patch(
        `/api/v1/notifications/${da?._id}/read`,
        {},
        {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
            'Accept-Language': 'ar',
            credentials: 'include',
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        console.log(res);
         setAll(prev =>
      prev.map(item =>
        item._id === da._id ? { ...item, read: true } : item
      )
    );
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
    console.log(o);
  }
  // =============
  const deletenot = (e, da) => {
    console.log('del');
    axiosInstance
      .delete(`/api/v1/notifications/${da._id}`, {
        headers: {
          'Content-Type': 'application/json',
          'Accept-Language': 'ar',
          credentials: 'include',
          Authorization: `Bearer ${token}`,
        },
// <<<<<<< HEAD
      }
    )
    .then((res) => {
       setAll(prev => prev.filter(item => item._id !== da._id));
      //  e.preventDefault(); 
      //       let parentElement = e.target.closest('.unread') || e.target.closest('.read');
      //       if (parentElement) {
      //           parentElement.style.display = 'none'; }
                console.log(res)
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
// =======
//       })
//       .then((res) => {
//         e.preventDefault();
//         let parentElement =
//           e.target.closest('.unread') || e.target.closest('.read');
//         if (parentElement) {
//           parentElement.style.display = 'none';
//         }
//         console.log(res);
//       })
//       .catch((error) => {
//         if (error.response) {
//           const validationErrors = {};
//           validationErrors.messageBackend = error.response.data.message;
//           setErrorMessage(validationErrors);
//         } else {
//           console.log('An unexpected error occurred:', error.message);
//           setErrorMessage({
//             messageBackend: 'An unexpected error occurred.',
//           });
//         }
//       });
//   };
// >>>>>>> c9cd868c13e655ef233463f5ebb7c81e546d1fa3
  return (
    <>
      <Navbar />
      <div className="allll">
        <div className="con_link_noti">
          <Link to="/not" className={currentPath === '/not' ? 'active' : ''}>
            الكل
          </Link>

          <Link
            to="/notread"
            className={currentPath === '/notread' ? 'active' : ''}
          >
            غير المقروءة
          </Link>

          {/* <Link to="/read" className={currentPath === '/read' ? 'active' : ''}>
            المقروءة
          </Link> */}
        </div>
        <div className="con_notif">
          {all.map((notification) => (
            <div
              className={notification?.read ? 'read' : 'unread'}
              onClick={(e) => handel_Fav(e, notification)}
            >
              {/* <img src={immm} alt="err" className="imgnot" /> */}
              <div className="fas fa-bell icon2 icon_bell imgnot"></div>
              <button
                onClick={(e) => deletenot(e, notification)}
                // className="ptndelgroup"
                className="deletNotification"
              >
                <span>x</span>
              </button>
              <p className="p111">{notification?.title}</p>
              <p className="p222"> {notification?.message}</p>
            </div>
          ))}
        </div>
        {/* <div>
            <img src={immm} alt="err" className="imgnot" />
            <p className="p111">سيارة افالون للبيع</p>
            <p className="p222">مزايدة جديدة</p>
          </div>
          <div>
            <img src={immm} alt="err" className="imgnot" />
            <p className="p111">سيارة افالون للبيع</p>
            <p className="p222">مزايدة جديدة</p>
          </div>
          <div>
            <img src={immm} alt="err" className="imgnot" />
            <p className="p111">سيارة افالون للبيع</p>
            <p className="p222">مزايدة جديدة</p>
          </div>
          <div>
            <img src={immm} alt="err" className="imgnot" />
            <p className="p111">سيارة افالون للبيع</p>
            <p className="p222">مزايدة جديدة</p>
          </div>
          <div>
            <img src={immm} alt="err" className="imgnot" />
            <p className="p111">سيارة افالون للبيع</p>
            <p className="p222">مزايدة جديدة</p>
          </div>
          <div>
            <img src={immm} alt="err" className="imgnot" />
            <p className="p111">سيارة افالون للبيع</p>
            <p className="p222">مزايدة جديدة</p>
          </div> */}
        {/* </div> */}
        <Pagination pos={'wallet'}/>
        <Footer />
      </div>
    </>
  );
}
