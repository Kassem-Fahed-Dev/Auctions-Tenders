import Star from '../star.jpg';
import '../profile.css';
import Auction from '../../../Auctions/Auction';
import Footer from '../../../privacy policy/Footer';
import  Cards from '../../../Auctions/Cards'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Profile from './Profile';

// import Star from "../star.jpg";
import '../profile.css';
// import "../../Auc-Folder/Auc.css";
import Side from '../componants/Side';
import Search from '../../../Auctions/Serach';
// import Card from "../../Auc-Folder/Card";

export default function Create() {
  // function handel_Fav(e) {
  //   let hh = e.target;
  //   if (hh.style.color === 'red') {
  //     hh.style.cssText = 'color: none;';
  //   } else {
  //     hh.style.cssText = 'color: red;';
  //   }
  // }
   let sort=localStorage.getItem('status2')
   if(sort==' الوقت'||sort==' مجموعات'){
sort=localStorage.setItem('status2','فرز حسب')
   }
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
            <img
              className="img-icon"
              src={Star}
              alt="Error"
              width={'45px'}
              height={'45px'}
            />
            المزادات التي أنشأتها
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
            className={`fas fa-chevron-left ${
              hover == true ? 'white' : 'black'
            } ${
              value.includes('فرز حسب') || value.includes(' مقبول')
                ? 'sort1'
                : 'sort2'
            }`}
          ></i>
        </button>

        <div
          className={`listSort  ${test.includes('فرز حسب') ? 'visable' : ''}`}
        >
          <div className="buttonSort so11">
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
        </div></div>
      </div>
     
      <Cards page="create"/>
      <Footer />
    </>
  );
}
