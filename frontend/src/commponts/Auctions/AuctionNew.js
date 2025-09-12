import Footer from '../privacy policy/Footer';
import Auction from './Auction';
import Navbar from '../Home/Navbar';
import AuctionsNavbar from './AuctionsNavbar';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cards from './Cards';
import ButtonSort from '../Home/ButtonSort';
import Search from './Serach';
import Pagination from './Pagination';
export default function AuctionNew() {
  let st='status2'
  let sort=localStorage.getItem('status2')
  const [value, setValue] = useState('فرز حسب');
  const [value1, setValue1] = useState('فرز حسب');
  const [value2, setValue2] = useState('');
  const [test, setTest] = useState('');
  const [hover, setHover] = useState(false);
  const navegate = useNavigate();
  const handleClick = () => {
    if (value2 == 'فرز حسب' && value == 'فرز حسب') {
      setTest(' ');
      console.log('1');
      localStorage.setItem(st, value2);
      setValue2('');
    } else if (value == 'فرز حسب' && test == 'فرز حسب') {
      setTest(' ');
      console.log('2');
      localStorage.setItem(st, value);
      setValue1('فرز حسب');
      setValue(value1);
    } else if (value2 == 'فرز حسب') {
      setValue1('فرز حسب');
      console.log('3');
      setTest(value1);
      localStorage.setItem(st, value1);
      setValue(value1);
    } else {
      setTest(value1);
      console.log('4');
      localStorage.setItem(st, value1);
      setValue(value1);
    }
  };
  const handleClick2 = (item) => {
    setValue(item);
    setTest(item);
    localStorage.setItem(st, item);
    console.log('6');
    // if(value==' مقبول'){
    //   setTest(' مقبول')
    // }
    if (
      item == ' جاري' ||
      item == ' منتهي' ||
      item == ' قادم' ||
      item == 'الكل'
    ) {
      console.log('5');
      localStorage.setItem(st, item);
      setValue1(' مقبول');
      setValue2('فرز حسب');
      console.log('7');
    }
    if (value == ' مقبول' || value == ' مرفوض' || value == ' قيد الانتظار') {
      // localStorage.setItem(st,value)
      setValue2('فرز حسب');
      console.log('8');
    }
  };
  return (
    <div>
      {/* <Search page={"all"}/> */}
      <Navbar wordBlod={'auctions'} />
      <AuctionsNavbar wordBlod={'Auctions2'} />
      <button
        className="createauction"
        onClick={() => {
          navegate('/CreateAuction');
        }}
      >
        <p>إنشاء مزاد</p>
        <i className="fas fa-plus"></i>
      </button>

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
        <div>{sort}</div>
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

      <div className={`listSort  ${test.includes('فرز حسب') ? 'visable' : ''}`}>
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
      <div className={`listSort  ${test.includes(' مقبول') ? 'visable' : ''}`}>
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
      <Cards page="create"  showDelete={true}/>
<Pagination/>
      <Footer />
    </div>
  );
}
