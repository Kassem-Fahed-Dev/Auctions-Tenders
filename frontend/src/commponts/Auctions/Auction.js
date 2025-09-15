import im4 from '../../image/car.jpg';
import im1 from '../../image/bil.jpg';
import im2 from '../../image/question.jpeg';
import im3 from '../../image/clothes.jpeg';
import im6 from '../../image/jewelery.jpeg';
import im7 from '../../image/furniture.jpeg';
import im8 from '../../image/elctron.jpeg';
import im5 from '../../image/alarm.png';
import { Link } from 'react-router-dom';
import { usePagination } from './PaginationContext';
import { useState } from 'react';
import axiosInstance from '../AxiosInterceptors';
export default function Auction({
  data,
  showDelete = false,
  showAccept = false,
  showReject = false,
}) {
  const [errorMessage, setErrorMessage] = useState({});
   const { currentPage,setCurrentPage, itemsPerPage } = usePagination();
  const x = 'جاري';
  const calculateDateDifference = (start, end) => {
    const startDate = new Date(start);
    const endDate = new Date(end);
    const timeDifference = endDate - startDate; // الفرق بالمللي ثانية
    const dayDifference = timeDifference / (1000 * 3600 * 24); // تحويل المللي ثانية إلى أيام
    return dayDifference;
  };
  const deleteAuc = () => {
    console.log('del');
    axiosInstance
      .delete(`/api/v1/auctions/${data._id}`, {
        headers: {
          'Content-Type': 'application/json',
          'Accept-Language': 'ar',
          credentials: 'include',
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        window.location.reload();
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
  };
  const [color, setColor] = useState('black');
  const differenceInDays = calculateDateDifference(
    data?.startTime|| data?.referenceId?.startTime,
    data?.endTime|| data?.referenceId?.endTime
  );
  const extractDateTime = (dateString, dateString1) => {
    const date = new Date(dateString);
    const date1 = new Date(dateString1);
    let day = date1.toLocaleDateString('ar-EG', { weekday: 'long' }); // اليوم باللغة العربية
    // الحصول على الساعة
    // if (day == 'السبت') {
    //   day = 'الأحد';
    // } else if (day == 'الجمعة') {
    //   day = 'السبت';
    // } else if (day == 'الأحد') {
    //   day = 'الاثنين';
    // } else if (day == 'الاثنين') {
    //   day = 'الثلاثاء';
    // } else if (day == 'الثلاثاء') {
    //   day = 'الأربعاء';
    // } else if (day == 'الأربعاء') {
    //   day = 'الخميس';
    // } else if (day == 'الخميس') {
    //   day = 'الجمعة';
    // }
    let hours = date.getUTCHours() + 3;
    const minutes = date.getUTCMinutes().toString().padStart(2, '0'); // يمكن استخدام getMinutes() إذا كنت تريد التوقيت المحلي

    // تحديد AM أو PM
    const ampm = hours >= 12 ? 'م' : 'ص';
    hours = hours % 12; // تحويل الصيغة من 24 إلى 12
    hours = hours ? hours : 12; // إذا كانت الساعة 0، جعله 12

    return { day, hours, minutes, ampm };
  };

  const { day, hours, minutes, ampm } = extractDateTime(
    data?.createdAt||  data?.referenceId?.createdAt,
    data?.startTime|| data?.referenceId?.startTime
  );
  // function Fav(fav){
  //   if(fav){
  //    setColor('red')
  //   }
  //   else{
  //     setColor('black')
  //   }
  // }
  const [col, setcol] = useState(data?.favorite == true||data?.referenceId?.favorite == true ? 'red' : 'black');
  const token = localStorage.getItem('jwt');
  function handel_Fav(e, da) {
    e.preventDefault();
    let hh = e.target;
    console.log(token);
    if (col === 'red') {
      // hh.style.cssText = 'color: black;';
      setcol('black');
    } else if (col === 'black') {
      // hh.style.cssText = 'color: red;';
      setcol('red');
    }
    const o = axiosInstance
      .post(
        `/api/v1/favorites/auction/${da?.referenceId?._id||da?._id}`,
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
        window.location.reload()
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
  // 6800cdb36e155b2e04089fbd
  // =======================
  const acceptAu = () => {
    const token = localStorage.getItem('jwt');
    const valdition = {};
    axiosInstance
      .patch(
        `/api/v1/auctions/${data._id}`,
        JSON.stringify({ auction: { status: 'مقبول' } }),
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
        //  alert('تم تغيير كلمة المرور بنجاح')
        // setHoverAuction('spinner');
        window.location.reload();

        console.log(res);
      })
      .catch((error) => {
        // setHoverAuction('spinner');
        if (error.response) {
          valdition.messageBackend = error.response.data.message;
          // setErrorMessageupdate(valdition);
          console.log('p3');
        } else {
          console.log('An unexpected error occurred:', error.message);
          // setErrorMessageupdate({
          //   messageBackend: 'An unexpected error occurred.',
          // });
        }
      });
  };
  const regectAu = () => {
    const token = localStorage.getItem('jwt');
    const valdition = {};
    axiosInstance
      .patch(
        `/api/v1/auctions/${data._id}`,
        JSON.stringify({ auction: { status: 'مرفوض' } }),
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
        //  alert('تم تغيير كلمة المرور بنجاح')
        // setHoverAuction('spinner');
        window.location.reload();

        console.log(res);
      })
      .catch((error) => {
        // setHoverAuction('spinner');
        if (error.response) {
          valdition.messageBackend = error.response.data.message;
          // setErrorMessageupdate(valdition);
          console.log('p3');
        } else {
          console.log('An unexpected error occurred:', error.message);
          // setErrorMessageupdate({
          //   messageBackend: 'An unexpected error occurred.',
          // });
        }
      });
  };
  return (
    <div className="oneAuction">
      <p
        className={
          data?.activeStatus === 'جاري'|| data?.referenceId?.activeStatus === 'جاري'
            ? 'time'
            : data?.activeStatus === 'قادم'||data?.referenceId?.activeStatus === 'قادم'
            ? 'time2'
            : 'time1'
        }
      >
        {data?.activeStatus||data?.referenceId?.activeStatus}
      </p>
      <button
        className={`fas fa-heart ${col}`}
        onClick={(e) => handel_Fav(e, data)}
      ></button>
      <img className="imageAuction" src={data.item?.photo[0]||data?.referenceId?.item?.photo[0]} alt="Error" />
      <p className="nameCube">{data?.auctionTitle||data?.referenceId?.auctionTitle}</p>

      <div className="userName">
        <i className="fas fa-user userAuction"></i>
        <div>{data?.user?.name}:الناشر</div>
      </div>
      <div className="product">
        <div className="product1">
          <div> منتج {data?.numberOfItems||data?.referenceId?.numberOfItems}</div>
          <i className="fas fa-table tableAuction"></i>
        </div>
        <div className="product1 product2">
          <div>المدة {differenceInDays} يوم</div>
          {/* <i className="fa fa-clock clockAuction"></i> */}
          <div className="clockAuction">
            <img src={im5} alt="Error" />
          </div>
        </div>

        <div className="product1">
          <div>
            <div>بدأ {day}</div>
            <div>
              {hours}:{minutes}
              {ampm}
            </div>{' '}
          </div>
          <i className="far fa-clock clockAuction"></i>
        </div>

        <div className="product1">
          <div>
            <div>{data?.startTime?.slice(0, 10).replaceAll('-', '/')||data?.referenceId?.startTime?.slice(0, 10).replaceAll('-', '/')} </div>
            <div>{data?.endTime?.slice(0, 10).replaceAll('-', '/')||data?.referenceId?.endTime?.slice(0, 10).replaceAll('-', '/')} </div>{' '}
          </div>
          <i className="far fa-calendar-alt clockAuction"></i>
        </div>
      </div>
      <hr></hr>
      <div className="many">
        سعر الافتتاح : <span>{data?.startingPrice||data?.referenceId?.startingPrice}</span>
      </div>
      <div className="cotainerptn">
        <Link to={`/det`} state={{ data:data?.referenceId||data, heart: col,cu:currentPage }} className="ditales">
          التفاصيل
        </Link>
        {showDelete && (
          <button onClick={deleteAuc} className="deleteAuction">
            حذف
          </button>
        )}
        {showAccept && (
          <button
            className="acceptAuction"
            onClick={() => {
              acceptAu();
            }}
          >
            قبول
          </button>
        )}

        {showReject && (
          <button
            className="rejectAuction"
            onClick={() => {
              regectAu();
            }}
          >
            رفض
          </button>
        )}
      </div>
    </div>
  );
}
