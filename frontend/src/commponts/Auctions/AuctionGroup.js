import AuctionsNavbar from './AuctionsNavbar';
import Navbar from '../Home/Navbar';
import { useNavigate } from 'react-router-dom';
import Auction from './Auction';
import Footer from '../privacy policy/Footer';
import { useState } from 'react';

export default function AuctionGroup({ paragraph }) {
  const navegaet = useNavigate();
  function goback() {
    // window.history.go(-1);
    navegaet('/auctionsgroup');
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
    if (value == ' جاري' || value == ' منتهي' || value == ' قادم') {
      setValue2('فرز حسب');
    }
  };
  return (
    <div>
      <Navbar wordBlod={'auctions'} />
      <AuctionsNavbar wordBlod={'group'} />
      <div className="create-auction-button">
        <p className="createp createp1 ">مزادات {paragraph}</p>
        <button className="fas fa-chevron-left fas1 " onClick={goback}></button>
      </div>
      <button
        className="createauction createauction-group "
        onClick={() => {
          navegate('/CreateAuction');
        }}
      >
        <p>إنشاء مزاد</p>
        <i className="fas fa-plus"></i>
      </button>

      <button
        className="sort so"
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
          className={`fas fa-chevron-left fas2 ${
            hover == true ? 'white' : 'black'
          } ${
            value.includes(' جاري') ||
            value.includes(' قادم') ||
            value.includes(' منتهي') ||
            value.includes('فرز حسب')
              ? 'sort1'
              : 'sort2'
          }`}
        ></i>
      </button>

      <div className={`listSort  ${test.includes('فرز حسب') ? 'visable' : ''}`}>
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
        <Auction />
        <Auction />
        <Auction />
        <Auction />
        <Auction />
        <Auction />
      </div>
      <Footer />
    </div>
  );
}
