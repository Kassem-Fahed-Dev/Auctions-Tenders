import Navbar from '../Home/Navbar';
import '../Auctions/allauction.css';
import Footer from '../privacy policy/Footer';
import AuctionsNavbar from '../Auctions/AuctionsNavbar';
import Auction from '../Auctions/Auction';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TendersNavbar from './TendersNavbar';
import Tender from './Tender';
export default function AllTenders() {
  const [value, setValue] = useState('فرز حسب');
  const [value1, setValue1] = useState('فرز حسب');
  const [value2, setValue2] = useState('');
  const [test, setTest] = useState('');
  const [hover, setHover] = useState(false);
  const navegate = useNavigate();
    localStorage.setItem('status','فرز حسب');
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
    if (item === ' جاري' || item === ' منتهي' || item === ' قادم') {
      setValue1(' الوقت');
      setValue2('فرز حسب');
    }
    if (value == ' الوقت' || value === ' مجموعات') {
      setValue2('فرز حسب');
    }
    if (
      item === 'بناء و إعمار'||
      item === ' خدمات لأماكن عامة ' ||
      item === ' خدمات منوعة' ||
      item === ' مركبات و آليات' ||
      item === ' أخرى' 
      
    ) {
      setValue1(' مجموعات');
      setValue2('فرز حسب');
    }
  };
  return (
    <>
      <Navbar wordBlod={'tenders'} />
      <TendersNavbar wordBlod={'all'} />
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
        className="sort sort-ten"
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
      <div className={`listSort  ${test.includes('فرز حسب') ? 'visable' : ''}`}>
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
      <div className={`listSort  ${test.includes(' الوقت') ? 'visable' : ''}`}>
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
      </div>
      <div className="alotofAuction">
        <Tender />
        <Tender />
        <Tender />
        <Tender />
        <Tender />
        <Tender />
        <Tender />
        <Tender />
      </div>

      <Footer />
    </>
  );
}
