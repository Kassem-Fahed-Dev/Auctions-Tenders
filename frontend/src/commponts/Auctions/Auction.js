import im4 from '../../image/car.jpg';
import im1 from '../../image/bil.jpg';
import im2 from '../../image/question.jpeg';
import im3 from '../../image/clothes.jpeg';
import im6 from '../../image/jewelery.jpeg';
import im7 from '../../image/furniture.jpeg';
import im8 from '../../image/elctron.jpeg';
import im5 from '../../image/alarm.png';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import axiosInstance from '../AxiosInterceptors';
export default function Auction({data}) {
  
    const [errorMessage, setErrorMessage] = useState({});
  const x = 'جاري';
    const calculateDateDifference = (start, end) => {
      const startDate = new Date(start);
      const endDate = new Date(end);
      const timeDifference = endDate - startDate; // الفرق بالمللي ثانية
      const dayDifference = timeDifference / (1000 * 3600 * 24); // تحويل المللي ثانية إلى أيام
      return dayDifference;
    };
   const[color,setColor]=useState('black')
    const differenceInDays = calculateDateDifference(data?.startTime, data?.endTime);
    const extractDateTime = (dateString,dateString1) => {
      const date = new Date(dateString);
      const date1 = new Date(dateString1);
      let day = date1.toLocaleDateString('ar-EG', { weekday: 'long' }); // اليوم باللغة العربية
    // الحصول على الساعة
    if(day=="السبت"){
      day="الأحد"
    }else if(day=="الجمعة"){
      day="السبت"
    }else if(day=="الأحد"){
      day="الاثنين"
    }else if(day=="الاثنين"){
      day="الثلاثاء"
    }else if(day=="الثلاثاء"){
      day="الأربعاء"
    }else if(day=="الأربعاء"){
      day="الخميس"
    }else if(day=="الخميس"){
      day="الجمعة"
    }
    let hours = date.getUTCHours();
    const minutes = date.getUTCMinutes().toString().padStart(2, '0'); // يمكن استخدام getMinutes() إذا كنت تريد التوقيت المحلي

    // تحديد AM أو PM
    const ampm = hours >= 12 ? 'م' : 'ص';
    hours = hours % 12; // تحويل الصيغة من 24 إلى 12
    hours = hours ? hours : 12; // إذا كانت الساعة 0، جعله 12

    return { day, hours, minutes, ampm };
  };

  const { day, hours, minutes, ampm } = extractDateTime(data?.
createdAt,data?.startTime );
// function Fav(fav){
//   if(fav){
//    setColor('red')
//   }
//   else{
//     setColor('black')
//   }
// }
const [col,setcol]=useState(data?.favorite==true?'red':'black')
 const token = localStorage.getItem('jwt'); 
function handel_Fav(e,da) {
   e.preventDefault();
  let hh = e.target;
  console.log(token)
  if (da?.favorite==true) {
    hh.style.cssText = 'color: black;';
    setcol('black')
  } else {
    hh.style.cssText = 'color: red;';
    setcol('red')
  }
  const o= axiosInstance
        .post(`/api/v1/favorites/auction/${da?._id}`, {}, {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
          'Accept-Language': 'ar',
          credentials: 'include',
          Authorization: `Bearer ${token}`,
          
        },
        })
        .then((res) => {
        
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
        console.log(o)
  
}
// 6800cdb36e155b2e04089fbd

  return (
    <div className="oneAuction">
      <p className={data?.activeStatus === 'جاري' ? 'time' :data?.activeStatus === 'قادم'? 'time2':"time1"}>{data?.
activeStatus
}</p>
      <button className={`fas fa-heart ${data?.favorite==false?'black1':'red1'}`}
    onClick={(e) => handel_Fav(e, data)}>
        
      </button>
      <img className="imageAuction" src={data?.item?.category=="6800c48bc5246f1b240fa3c8"?im4:data?.item?.category=="6800c4ccc5246f1b240fa3cd"?im1:data?.item?.category=="6800d4090c7d9514e40218f0"?im2:data?.item?.category=="6800cf48bdccd52594f29573"?im3:data?.item?.category=="6800ce86aec6df25ccc63ff5"?im6:data?.item?.category=="6800cdb36e155b2e04089fbd"?im7:im8} alt="Error" />
      <p className="nameCube">{data?.auctionTtile}</p>

      <div className="userName">
        <i className="fas fa-user userAuction"></i>
        <div>{data?.user.name}:الناشر</div>
      </div>
      <div className="product">
        <div className="product1">
          <div> منتج {data?.numberOfItems
          }</div>
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
            <div>{hours}:{minutes}{ampm}</div>{' '}
          </div>
          <i className="far fa-clock clockAuction"></i>
        </div>

        <div className="product1">
          <div>
            <div>{data?.startTime?.slice(0,10).replaceAll('-','/')} </div>
            <div>{data?.endTime?.slice(0,10).replaceAll('-','/')} </div>{' '}
          </div>
          <i className="far fa-calendar-alt clockAuction"></i>
        </div>
      </div>
      <hr></hr>
      <div className="many">
        سعر الافتتاح : <span>{data?.startingPrice
        }</span>
      </div>
      <Link to={`/det`}  state={{ data,heart:col }} className="ditales">
        التفاصيل
      </Link>

    </div>
  );
}
