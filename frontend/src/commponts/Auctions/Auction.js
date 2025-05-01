import im4 from '../../image/car.jpg';
import im5 from '../../image/alarm.png';
import { Link } from 'react-router-dom';
export default function Auction({data}) {
  const x = 'جاري';
  return (
    <div className="oneAuction">
      <p className={x === 'جاري' ? 'time' : 'time1'}>{data.
activeStatus
}</p>
      <button className="far fa-heart"></button>
      <img className="imageAuction" src={im4} alt="Error" />
      <p className="nameCube">{data.auctionTtile}</p>

      <div className="userName">
        <i className="fas fa-user userAuction"></i>
        <div>الناشر: هديل</div>
      </div>
      <div className="product">
        <div className="product1">
          <div> منتج {data.number0fItems}</div>
          <i className="fas fa-table tableAuction"></i>
        </div>
        <div className="product1 product2">
          <div>المدة 4 يوم</div>
          {/* <i className="fa fa-clock clockAuction"></i> */}
          <div className="clockAuction">
            <img src={im5} alt="Error" />
          </div>
        </div>

        <div className="product1">
          <div>
            <div>بدأ الأربعاء</div>
            <div>ص09:00 </div>{' '}
          </div>
          <i className="far fa-clock clockAuction"></i>
        </div>

        <div className="product1">
          <div>
            <div>{data.startTime.slice(0,10).replaceAll('-','/')} </div>
            <div>{data.endTime.slice(0,10).replaceAll('-','/')} </div>{' '}
          </div>
          <i className="far fa-calendar-alt clockAuction"></i>
        </div>
      </div>
      <hr></hr>
      <div className="many">
        سعر الافتتاح : <span>{data.startingPrice
        }</span>
      </div>
      <Link to="/det" className="ditales">
        التفاصيل
      </Link>

    </div>
  );
}
