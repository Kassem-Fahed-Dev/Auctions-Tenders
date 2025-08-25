import im4 from '../../image/alarm.png';
import im5 from './image-Tenders/qwe.jpeg';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import axiosInstance from '../AxiosInterceptors';
export default function Tender({ data, showDelete = false }) {
  console.log(data);
  const [errorMessage, setErrorMessage] = useState({});
  const x = 'جاري';
  const calculateDateDifference = (start, end) => {
    const startDate = new Date(start);
    const endDate = new Date(end);
    const timeDifference = endDate - startDate; // الفرق بالمللي ثانية
    const dayDifference = timeDifference / (1000 * 3600 * 24); // تحويل المللي ثانية إلى أيام
    return dayDifference;
  };
  const [color, setColor] = useState('black');
  const differenceInDays = calculateDateDifference(
    data?.startTime,
    data?.endTime
  );
  const extractDateTime = (dateString, dateString1) => {
    const date = new Date(dateString);
    const date1 = new Date(dateString1);
    let day = date1.toLocaleDateString('ar-EG', { weekday: 'long' }); // اليوم باللغة العربية
    // الحصول على الساعة
    if (day == 'السبت') {
      day = 'الأحد';
    } else if (day == 'الجمعة') {
      day = 'السبت';
    } else if (day == 'الأحد') {
      day = 'الاثنين';
    } else if (day == 'الاثنين') {
      day = 'الثلاثاء';
    } else if (day == 'الثلاثاء') {
      day = 'الأربعاء';
    } else if (day == 'الأربعاء') {
      day = 'الخميس';
    } else if (day == 'الخميس') {
      day = 'الجمعة';
    }
    let hours = date.getUTCHours();
    const minutes = date.getUTCMinutes().toString().padStart(2, '0'); // يمكن استخدام getMinutes() إذا كنت تريد التوقيت المحلي

    // تحديد AM أو PM
    const ampm = hours >= 12 ? 'م' : 'ص';
    hours = hours % 12; // تحويل الصيغة من 24 إلى 12
    hours = hours ? hours : 12; // إذا كانت الساعة 0، جعله 12

    return { day, hours, minutes, ampm };
  };

  const { day, hours, minutes, ampm } = extractDateTime(
    data?.createdAt,
    data?.startTime
  );
  // function Fav(fav){
  //   if(fav){
  //    setColor('red')
  //   }
  //   else{
  //     setColor('black')
  //   }
  // }
  const [col, setcol] = useState(data?.favorite == true ? 'red' : 'black');
  const token = localStorage.getItem('jwt');
  function handel_Fav(e, da) {
    e.preventDefault();
    let hh = e.target;
    console.log(token);
    if (hh.style.color === 'red') {
      hh.style.cssText = 'color: black;';
      setcol('black');
    } else {
      hh.style.cssText = 'color: red;';
      setcol('red');
    }
    const o = axiosInstance
      .post(
        `/api/v1/favorites/tender/${da?._id}`,
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
  return (
    <div className="oneAuction">
      <p
        className={
          data?.activeStatus === 'جاري'
            ? 'time'
            : data?.activeStatus === 'قادم'
            ? 'time2'
            : 'time1'
        }
      >
        {data?.activeStatus}
      </p>
      <button
        className={`fas fa-heart ${
          data?.favorite == false ? 'black1' : 'red1'
        }`}
        onClick={(e) => handel_Fav(e, data)}
      ></button>
      <img className="imageAuction" src={im5} alt="Error" />
      <p className="nameCube">{data?.tenderTitle}</p>

      <div className="userName">
        <i className="fas fa-user userAuction"></i>
        <div>{data?.user.name}:الناشر</div>
      </div>
      <div className="product">
        <div className="product1 product2">
          <div>المدة {differenceInDays} يوم</div>
          {/* <i className="fa fa-clock clockAuction"></i> */}
          <div className="clockAuction">
            <img src={im4} alt="Error" />
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
            <div>{data?.startTime?.slice(0, 10).replaceAll('-', '/')} </div>
            <div>{data?.endTime?.slice(0, 10).replaceAll('-', '/')} </div>{' '}
          </div>
          <i className="far fa-calendar-alt clockAuction"></i>
        </div>
      </div>
      <hr></hr>
      <div className="many">
        السعر الابتدائي : <span>{data?.startingPrice}</span>
      </div>
      <div className="cotainerptn">
        <Link to="/det-tender" state={{ data, heart: col }} className="ditales">
          التفاصيل
        </Link>

        {showDelete && <Link className="deleteAuction">حذف</Link>}
      </div>
    </div>
  );
}
