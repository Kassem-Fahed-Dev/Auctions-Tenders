// hadollee  @123AAAaaa@
import './Home.css';
import Navbar from './Navbar';
import image from '../../image/image1.png';
import image1 from '../../image/image2.png';
import im from '../../image/img.png';
import im2 from '../../image/lab.png';
import im3 from '../../image/bil.jpg';
import im4 from '../../image/car.jpg';
import Footer from '../privacy policy/Footer';
import { Link } from 'react-router-dom';
export default function Home() {
  const tok = localStorage.getItem('jwt'); 
  localStorage.setItem('status','فرز حسب');
  return (
    <div>
      <div className="header">
        {' '}
        {/*الجزء العلوي من الصفحة  */}
        <div className="smart-serach">
          {' '}
          {/*العنوان و مربع البحث  */}
          <p className="smart-world">Smart World</p>
          <form>
            <div className="serach-container">
              <i className="fas fa-search icon"></i>
              <input type="serach" />
            </div>
          </form>
        </div>
        <div className="side-left">
          {/*ايقونة الاشعارات و المفضلة و الرقم */}
          <Link to="/fav" className="heart">
            <i className="fas fa-heart icon1"></i>
          </Link>
          <button className="bell">
            <div className="num-message">
              <p>90</p>
            </div>
            <i className="fas fa-bell icon2"></i>
          </button>
          <div>
            <button className="button-tell">
              <i className="fas fa-phone icon-phone"></i>
              <p className="tell">123-456-789</p>
            </button>
          </div>
        </div>
      </div>
      <Navbar wordBlod={'home'} />
      <div className="firsthome">
        <img className="homeimg" src={image} alt="no photo" />
        <div className="title-text">
          <h1 className="title1">
            نسعى لتطوير المزادات و المناقصات <br />
            إلكترونياً و تحقيق رؤية مستقبلية
          </h1>
          <h2 className="text">
            منصة Smart World منصة إلكترونية متخصصة في إدارة و تنظيم
            <br />
            المزايدات و المناقصات. تهدف إلى ربط الجهات البائعة و المشترية
            <br />
            بشكل مباشر و فعّال.توفر بيئة رقمية آمنة و متطورة تتيح عرض
            <br />و تقديم العروض بسهولة و شفافية.سواء للمزايدات العلنية أو
            <br />
            المناقصات التنافسية.تساهم المنصة في تبسيط العمليات.تعزيز
            <br />
            المنافسة.وضمات أعلى معايير الجودة و الموثوقية لجميع الأطراف.
          </h2>
        </div>
      </div>
      <div className="adv">
        <h1>مزايا منصة Smart World</h1>
        <ul>
          <li>
            <h2>
              تتيح المشاركة بسهولة دون الحاجة للتواجد الجغرافي ، مما يعزز الوصول
              من أي مكان.
            </h2>
          </li>
          <li>
            <h2>
              متوافقة مع انظمة الدفع الإلكتروني لتسهيل العمليات المالية بأمان و
              موثوقية.
            </h2>
          </li>
          <li>
            <h2>
              تعتمد نظام تحقق متكامل عبر منصة نفاذ لضمان مصداقة جميع الأطراف.
            </h2>
          </li>
          <li>
            <h2>
              قادرة على معالجة أعداد كبيرة من العروض و المزادات في نفس اللحظة
              بفعالية.
            </h2>
          </li>
          <li>
            <h2>
              سرعة استجابة علية في تسجيل و تأكيد العروض، مما يضمن تجربة سلسة و
              دقيقة.
            </h2>
          </li>
        </ul>
      </div>
      {/* الموجة و يلي جواتها */}
      <div className="wave">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 10 1440 200">
          <path
            fill="#fff"
            fill-opacity="1"
            d="M0,32L48,37.3C96,43,192,53,288,69.3C384,85,480,107,576,112C672,117,768,107,864,96C960,85,1056,75,1152,90.7C1248,107,1344,149,1392,170.7L1440,192L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
          ></path>
        </svg>

        <div className="auction">
          <div className="auction-img">
            <img className="homeimg " src={image1} alt="no photo" />
          </div>
          <div className="auction1">
            <h1>آلية عمل المزادات الإلكترونية</h1>
            <ol>
              <li>
                <h2>
                  1. تسجيل المستخدمين: البائع و المشترون يسجلون على منصة
                  المزايدة
                </h2>
              </li>
              <li>
                <h2>
                  2. عرض السلعة:البائع يحدد السلعة،وصفها،السعر الابتدائي،ومدة
                  المزايدة.
                </h2>
              </li>
              <li>
                <h2>
                  3. تقديم العروض: المشترون يقدمون عروضهم بأسعار أعلى من السعر
                  الحالي.
                </h2>
              </li>
              <li>
                <h2>
                  4. التحديث الفوري: يتم عرض أعلى سعر بشكل مباشر لكل المشتركين.
                </h2>
              </li>
              <li>
                <h2>
                  5. انتهاء المزاد: عند انتهاء الوقت، يتم إعلان الفائز (صاحب
                  أعلى عرض).
                </h2>
              </li>
              <li>
                <h2>
                  6. الدفع و التسليم: الفائز يدفع ثمن السلعة و يتم ترتيب عملية
                  التسليم.
                </h2>
              </li>
            </ol>
          </div>
        </div>

        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
          <path
            fill="#fff"
            fill-opacity="1"
            d="M0,96L60,117.3C120,139,240,181,360,192C480,203,600,181,720,170.7C840,160,960,160,1080,165.3C1200,171,1320,181,1380,186.7L1440,192L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"
          ></path>
        </svg>
      </div>
      {/*المناقصات  */}
      <div className="tenders">
        <div>
          <h1>آلية عمل المناقصات الإلكترونية</h1>
          <ol>
            <li>
              <h2>
                1. الإعلان عن المناقصة : الجهة الطالبة تنشر تفاصيل المشروع أو
                الاحتياجات على منصتنا الإلكترونية.
              </h2>
            </li>
            <li>
              <h2>
                2. تحميل الوثائق : الموردون المهتمون ينزلون كراسة الشروط
                والمواصفات.
              </h2>
            </li>

            <li>
              <h2>
                3. تقديم العروض : الموردون يرفعون عروضهم الفنية والمالية ضمن
                المهلة المحددة.
              </h2>
            </li>
            <li>
              <h2>
                4. تقييم العروض : يتم تقييم العروض الفنية أولاً ، ثم المالية
                للمؤهلين.
              </h2>
            </li>
            <li>
              <h2>
                5. اختيار الفائز : الجهة الطالبة تختار العرض الأفضل بناءً على
                معايير محددة مسبقاً.
              </h2>
            </li>
            <li>
              <h2>6. إبرام العقد: يتم توقيع العقد مع المورد الفائز.</h2>
            </li>
          </ol>
        </div>
        <div>
          <img className="tenders-img" src={im} alt="Error" />
        </div>
      </div>
      {/* المربع الازرق مع الصور يلي فيه */}
      <div className="box-blue">
        <div className="box-blue1">
          <h1>لديك غرض ما ؟ </h1>
          <h2>
            يمكنك إضافة عقارك أو سيارتك أو شيء من ممتلكاتك للبيع بالمزاد أو
            للتطوير بالمناقصة على منصتنا بكل سهولة ، و فريق الدعم لدينا جاهز
            لمساعدتك في أي وقت .
          </h2>
        </div>
        <div className="photo-box-blue">
          <img className="bil" src={im3} alt="error" />
          <div className="photo-box-blue1">
            <img className="lab-car" src={im4} alt="error" />
            <img className="lab-car" src={im2} alt="error" />
          </div>
        </div>
      </div>

      <div> </div>

      <Footer />
    </div>
  );
}
