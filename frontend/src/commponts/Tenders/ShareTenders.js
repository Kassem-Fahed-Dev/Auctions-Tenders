import Footer from '../privacy policy/Footer';
import Tender from './Tender';

import TendersNavbar from './TendersNavbar';

import Navbar from '../Home/Navbar';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function ShareTenders() {
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
    if (item == ' جاري' || item == ' منتهي' || item == ' قادم') {
      setValue1(' الوقت');
      setValue2('فرز حسب');
    }
    if (value == ' الوقت' || value == ' مجموعات') {
      setValue2('فرز حسب');
    }
    if (
      item == ' عقارات' ||
      item == ' إلكترونيات' ||
      item == ' سيارات' ||
      item == ' أثاث' ||
      item == ' إكسسوار' ||
      item == ' ملابس' ||
      item == ' أخرى'
    ) {
      setValue1(' مجموعات');
      setValue2('فرز حسب');
    }
  };
  return (
    <>
      <div>
        <Navbar wordBlod={'tenders'} />
        <TendersNavbar wordBlod={'Auctions1'} />
        <button
          className="createauction"
          onClick={() => {
            navegate('/Create_Tender');
          }}
        >
          <p>إنشاء مناقصة</p>
          <i className="fas fa-plus"></i>
        </button>
        <button
          className="sort"
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
          className={`listSort  ${test.includes('فرز حسب') ? 'visable' : ''}`}
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
            </button>
          </div>
        </div>
        <div
          className={`listSort  ${test.includes(' مجموعات') ? 'visable' : ''}`}
        >
          <div className="buttonSort">
            <button
              className="button1"
              onClick={() => {
                handleClick2('بناء واعمار');
              }}
            >
              بناء واعمار
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
                handleClick2(' مركبات و اليات');
              }}
            >
              مركبات و اليات
            </button>
            <button
              onClick={() => {
                handleClick2(' أخرى');
              }}
            >
              أخرى
            </button>
          </div>
        </div>
        <div
          className={`listSort  ${test.includes(' الوقت') ? 'visable' : ''}`}
        >
          <div className="buttonSort">
            <button
              className="button1"
              onClick={() => {
                handleClick2(' الجاري');
              }}
            >
              الجاري
            </button>
            <button
              onClick={() => {
                handleClick2(' القادم');
              }}
            >
              القادم
            </button>
            <button
              className="button2"
              onClick={() => {
                handleClick2(' المنتهي');
              }}
            >
              المنتهي
            </button>
          </div>
        </div>
        <div className="alotofAuction">
          <Tender />
          <Tender />
          <Tender />
        </div>
        <Footer />
      </div>
    </>
  );
}
