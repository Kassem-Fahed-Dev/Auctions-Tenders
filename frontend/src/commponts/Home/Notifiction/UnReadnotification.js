import { Link, useLocation } from 'react-router-dom';
import Navbar from '../Navbar';
import './Notification.css';
import immm from '../../../image/car.jpg';
import { useState } from 'react';
import Footer from '../../privacy policy/Footer';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../AxiosInterceptors';
export default function UnReadnotification() {
  const location = useLocation();
  const currentPath = location.pathname;
  const navigate=useNavigate()
    const [all, setAll] = useState([]);
  const [errorMessage, setErrorMessage] = useState({});
  // const [col, setcol] = useState('unread');
  const token = localStorage.getItem('jwt');
  useEffect(() => {
    axiosInstance
      .get('/api/v1/notifications/my', {
        headers: {
          'Content-Type': 'application/json',
          'Accept-Language': 'ar',
          credentials: 'include',
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        //   if(res.data.data.data?.read=="false"){
        // setAll(res.data.data.data);
        // console.log('create');
        // console.log(res.data.data.data);}
       const unread= res.data.data.data.filter(
            (item) => item.read==false
          );
          setAll(unread)
          console.log(unread)
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
   function handel_Fav(e, da) {
              e.preventDefault(); 
            // let parentElement = e.target.closest('.unread');
            // if (parentElement) {
            //     parentElement.style.display = 'none'; 
            // }
            navigate('/det-nof', { state: { id:da?.referenceId,type:da?.type } });
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
  // ===========
      const deletenot=(e,da)=>{
        
      console.log('del')
      axiosInstance
      .delete(
        `/api/v1/notifications/${da._id}`
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
        
         e.preventDefault(); 
              let parentElement = e.target.closest('.unread') || e.target.closest('.read');
              if (parentElement) {
                  parentElement.style.display = 'none'; }
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
         {
          all.map((notification)=>(
           
          <div className={'unread'} onClick={(e) => handel_Fav(e, notification)}>
            {/* <img src={immm} alt="err" className="imgnot" /> */}
            <div className='fas fa-bell icon2 icon_bell imgnot'></div>
             <button
              onClick={(e) => deletenot(e, notification)}
                // className="ptndelgroup"
               className='deletNotification'
              >
                <span>x</span>
              </button>
            <p className="p111">{notification?.title}</p>
            <p className="p222">
              {' '}
              {notification?.message}
            </p>
          </div> 
     
          ))
         }
         {/* <div className={'unread'} onClick={(e) => handel_Fav(e)}>
            <img src={immm} alt="err" className="imgnot" />
            <p className="p111">سيارة افالون للبيع</p>
            <p className="p222">مزايدة جديدة</p>
          </div>
          <div className={'unread'} onClick={(e) => handel_Fav(e)}>
            <img src={immm} alt="err" className="imgnot" />
            <p className="p111">سيارة افالuuون للبيع</p>
            <p className="p222">مزايدة جديدة</p>
          </div>
          <div className={'unread'} onClick={(e) => handel_Fav(e)}>
            <img src={immm} alt="err" className="imgnot" />
            <p className="p111">سيارة افllالون للبيع</p>
            <p className="p222">مزايدة جديدة</p>
          </div>
          <div></div> */}
            </div>
        <Footer />
      </div>
    </>
  );
}
