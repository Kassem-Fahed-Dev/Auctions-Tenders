import Star from '../star.jpg';
import '../profile.css';
import Footer from '../../../privacy policy/Footer';
import Tender from '../../../Tenders/Tender';
import { useState } from 'react';
import Profile from './Profile';
import { useNavigate } from 'react-router-dom';

import '../profile.css';
// import "../../Auc-Folder/Auc.css";
import Side from '../componants/Side';
import ButtonSortTen from '../../../Tenders/ButtonSortten';
import CardTen from '../../../Tenders/CardTen';
import Search from '../../../Auctions/Serach';
// import Card from "../../Auc-Folder/Card";
// >>>>>>> 2b43e7c895dec329841e8800521ec7636eedf246
export default function TenderParticiped() {
  // function handel_Fav(e) {
  //   let hh = e.target;
  //   if (hh.style.color === 'red') {
  //     hh.style.cssText = 'color: none;';
  //   } else {
  //     hh.style.cssText = 'color: red;';
  //   }
  // }
  // const [value, setValue] = useState('فرز حسب');
  // const [value1, setValue1] = useState('فرز حسب');
  // const [value2, setValue2] = useState('');
  // const [test, setTest] = useState('');
  // const [hover, setHover] = useState(false);
  // const navegate = useNavigate();
  // const handleClick = () => {
  //   if (value2 == 'فرز حسب' && value == 'فرز حسب') {
  //     setTest(' ');
  //     setValue2('');
  //   } else if (value == 'فرز حسب' && test == 'فرز حسب') {
  //     setTest(' ');
  //     setValue1('فرز حسب');
  //     setValue(value1);
  //   } else if (value2 == 'فرز حسب') {
  //     setValue1('فرز حسب');
  //     setTest(value1);
  //     setValue(value1);
  //   } else {
  //     setTest(value1);
  //     setValue(value1);
  //   }
  // };
  // const handleClick2 = (item) => {
  //   setValue(item);
  //   setTest(item);
  //   if (item === ' جاري' || item === ' منتهي' || item === ' قادم') {
  //     setValue1(' الوقت');
  //     setValue2('فرز حسب');
  //   }
  //   if (value == ' الوقت' || value === ' مجموعات') {
  //     setValue2('فرز حسب');
  //   }
  //   if (
  //     item === 'بناء و إعمار' ||
  //     item === ' خدمات لأماكن عامة ' ||
  //     item === ' خدمات منوعة' ||
  //     item === ' مركبات و آليات' ||
  //     item === ' أخرى'
  //   ) {
  //     setValue1(' مجموعات');
  //     setValue2('فرز حسب');
  //   }
  // };
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
            المناقصات التي شاركت بها
          </h3>
          <div className="test-con">
            <Search page="participped"/>
            <ButtonSortTen test2={'sharep'} position={"profile"}/>
            {/* <button
              className="sort21 sort-ten"
              type="text"
              onMouseEnter={() => {
                setHover(true);
              }}
              onMouseLeave={() => {
                setHover(false);
              }}
              onClick={handleClick}
              value={value}
            >
              <div>{value}</div>
              <i
                className={`fas fa-chevron-left fas1 ${
                  hover == true ? 'white' : 'black'
                } ${
                  value.includes(' مجموعات') ||
                  value.includes(' الوقت') ||
                  value.includes('فرز حسب')
                    ? 'sort1'
                    : 'sort2'
                }`}
                onclick={handleClick}
              ></i>
            </button>
            <div
              className={`listSort  ${
                test.includes('فرز حسب') ? 'visable21' : ''
              }`}
            >
              <div className="buttonSort">
                <button
                  className="button1"
                  onClick={() => {
                    handleClick2(' مجموعات');
                  }}
                >
                  المجموعة
                </button>
                <button
                  className="button2"
                  onClick={() => {
                    handleClick2(' الوقت');
                  }}
                >
                  الوقت
                </button>{' '}
              </div>
            </div>

            <div
              className={`listSort  ${
                test.includes(' مجموعات') ? 'visable21' : ''
              }`}
            >
              <div className="buttonSort">
                <button
                  className="button1"
                  onClick={() => {
                    handleClick2('بناء و إعمار');
                  }}
                >
                  بناء و إعمار
                </button>
                <button
                  onClick={() => {
                    handleClick2(' خدمات لأماكن عامة ');
                  }}
                >
                  خدمات لأماكن عامة{' '}
                </button>
                <button
                  onClick={() => {
                    handleClick2(' خدمات منوعة');
                  }}
                >
                  خدمات منوعة
                </button>
                <button
                  onClick={() => {
                    handleClick2(' مركبات و آليات');
                  }}
                >
                  مركبات و آليات
                </button>
                <button
                  className="button2"
                  onClick={() => {
                    handleClick2(' أخرى');
                  }}
                >
                  أخرى
                </button>
              </div>
            </div>
            <div
              className={`listSort  ${
                test.includes(' الوقت') ? 'visable21' : ''
              }`}
            >
              <div className="buttonSort">
                <button
                  className="button1"
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
            </div> */}
          </div>
        </div>
      </div>
   
    <CardTen page={'sharep'}/>

      <Footer />
    </>
  );
}
