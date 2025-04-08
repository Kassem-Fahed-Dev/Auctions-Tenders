import im4 from '../../image/car.jpg';
import im5 from '../../image/alarm.png';
export default function Auction() {
   const x='جاري'
  return (
   
    <div className="oneAuction">
      <p className={x=='جاري'?'time':'time1'}>جاري</p>
      <button className='far fa-heart'></button>
      <img className="imageAuction" src={im4} />
      <p className="nameCube">غسالة حوضين للبيع</p>
      
      <div className="userName">
        <i className="fas fa-user userAuction"></i>
        <div>الناشر: هديل</div>
      </div>
      <div className="product">
        <div className="product1">
          <div> منتج 1</div>
          <i className="fas fa-table tableAuction"></i>
        </div>
        <div className="product1 product2">
          <div>المدة 4 يوم</div>
          {/* <i className="fa fa-clock clockAuction"></i> */}
          <div className='clockAuction'><img  src={im5}/></div>
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
            <div>2025/03/10 </div>
            <div>2025/03/10  </div>{' '}
          </div>
          <i className="far fa-calendar-alt clockAuction"></i>
        </div>
        </div>
        <hr></hr>
        <div className="many">سعر الافتتاح : <span>250
            </span> مليون ليرة سورية.</div>
            <button className="ditales">التفاصيل</button>
    </div>
  );
}
