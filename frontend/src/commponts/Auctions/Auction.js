import im4 from '../../image/car.jpg';
import im5 from '../../image/alarm.png';
import { Link } from 'react-router-dom';
export default function Auction({data}) {
  const x = 'جاري';
    const calculateDateDifference = (start, end) => {
      const startDate = new Date(start);
      const endDate = new Date(end);
      const timeDifference = endDate - startDate; // الفرق بالمللي ثانية
      const dayDifference = timeDifference / (1000 * 3600 * 24); // تحويل المللي ثانية إلى أيام
      return dayDifference;
    };
  
    const differenceInDays = calculateDateDifference(data?.startTime, data?.endTime);
    const extractDateTime = (dateString) => {
      const date = new Date(dateString);
      
      const day = date.toLocaleDateString('ar-EG', { weekday: 'long' }); // اليوم باللغة العربية
    // الحصول على الساعة
    let hours = date.getUTCHours();
    const minutes = date.getUTCMinutes().toString().padStart(2, '0'); // يمكن استخدام getMinutes() إذا كنت تريد التوقيت المحلي

    // تحديد AM أو PM
    const ampm = hours >= 12 ? 'م' : 'ص';
    hours = hours % 12; // تحويل الصيغة من 24 إلى 12
    hours = hours ? hours : 12; // إذا كانت الساعة 0، جعله 12

    return { day, hours, minutes, ampm };
  };

  const { day, hours, minutes, ampm } = extractDateTime(data?.
createdAt);
  return (
    <div className="oneAuction">
      <p className={data?.activeStatus === 'جاري' ? 'time' :data?.activeStatus === 'قادم'? 'time2':"time1"}>{data?.
activeStatus
}</p>
      <button className="far fa-heart"></button>
      <img className="imageAuction" src={im4} alt="Error" />
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
      <Link to={`/det`} state={{ data }} className="ditales">
        التفاصيل
      </Link>

    </div>
  );
}
