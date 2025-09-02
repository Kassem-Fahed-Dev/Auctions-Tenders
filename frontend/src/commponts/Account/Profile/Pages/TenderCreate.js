import Star from '../star.jpg';

// <<<<<<< HEAD
import '../profile.css';
// import "../../Auc-Folder/Auc.css";
import Side from '../componants/Side';
// import Card from "../../Auc-Folder/Card";
import Navbar from '../../../Home/Navbar';
import Footer from '../../../privacy policy/Footer';
import Profile from './Profile';
import Tender from '../../../Tenders/Tender';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// =======
import '../profile.css';
import CardTen from '../../../Tenders/CardTen';
import Search from '../../../Auctions/Serach';
// import "../../Auc-Folder/Auc.css";
// import Side from "../componants/Side";
// import Card from "../../Auc-Folder/Card";
// >>>>>>> 2b43e7c895dec329841e8800521ec7636eedf246
export default function TenderCreate() {
  const [value, setValue] = useState('فرز حسب');
  const [value1, setValue1] = useState('فرز حسب');
  const [value2, setValue2] = useState('');
  const [test, setTest] = useState('');
  const [hover, setHover] = useState(false);
  const navegate = useNavigate();
  const handleClick = () => {
    if (value2 == 'فرز حسب' && value == 'فرز حسب') {
      setTest(' ');
      setValue2('');
    } else if (value == 'فرز حسب' && test == 'فرز حسب') {
      setTest(' ');
      setValue1('فرز حسب');
      setValue(value1);
    } else if (value2 == 'فرز حسب') {
      setValue1('فرز حسب');
      setTest(value1);
      setValue(value1);
    } else {
      setTest(value1);
      setValue(value1);
    }
  };
  const handleClick2 = (item) => {
    setValue(item);
    setTest(item);
    // if(value==' مقبول'){
    //   setTest(' مقبول')
    // }
    if (
      item == ' جاري' ||
      item == ' منتهي' ||
      item == ' قادم' ||
      item == 'الكل'
    ) {
      setValue1(' مقبول');
      setValue2('فرز حسب');
    }
    if (value == ' مقبول' || value == ' مرفوض' || value == ' قيد الانتظار') {
      setValue2('فرز حسب');
    }
  };
  return (
    <>
      <Profile />
      <div className="con-flex">
        <div className="nn">
          <h3>
            {' '}
            <img
              className="img-icon"
              src={Star}
              alt="Error"
              width={'45px'}
              height={'45px'}
            />
            المناقصات التي أنشأتها
          </h3>
          <div className="test-con">
            <Search/>
            
        <button
          className="sort sort-share"
          onMouseEnter={() => {
            setHover(true);
          }}
          onMouseLeave={() => {
            setHover(false);
          }}
          onClick={handleClick}
        >
          <div>{value}</div>
          <i
            className={`fas fa-chevron-left fas1 ${
              hover == true ? 'white' : 'black'
            } ${
              value.includes('فرز حسب') || value.includes(' مقبول')
                ? 'sort1'
                : 'sort2'
            }`}
          ></i>
        </button>

        <div
          className={`listSort ${test.includes('فرز حسب') ? 'visable' : ''}`}
        >
          <div className="buttonSort so11 ">
            <button
              className="button1"
              onClick={() => {
                handleClick2(' مقبول');
              }}
            >
              مقبول
            </button>

            <button
              onClick={() => {
                handleClick2(' مرفوض');
              }}
            >
              مرفوض
            </button>
            <button
              className="button2"
              onClick={() => {
                handleClick2(' قيد الانتظار');
              }}
            >
              قيد الانتظار
            </button>
          </div>
        </div>
        <div
          className={`listSort  ${test.includes(' مقبول') ? 'visable' : ''}`}
        >
          <div className="buttonSort so11">
            <button
              className="button1"
              onClick={() => {
                handleClick2('الكل');
              }}
            >
              الكل
            </button>
            <button
              onClick={() => {
                handleClick2(' جاري');
              }}
            >
              جاري
            </button>
            <button
              onClick={() => {
                handleClick2(' قادم');
              }}
            >
              قادم
            </button>
            <button
              className="button2"
              onClick={() => {
                handleClick2(' منتهي');
              }}
            >
              منتهي
            </button>
          </div>
        </div>
          </div>
        </div>
      </div>
      
      <CardTen page={'create'}/>

      <Footer />
    </>
  );
}
