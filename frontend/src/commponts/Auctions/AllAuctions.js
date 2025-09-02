import Navbar from '../Home/Navbar';
import AuctionsNavbar from './AuctionsNavbar';
import './allauction.css';
import Footer from '../privacy policy/Footer';
import Auction from './Auction';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../AxiosInterceptors';
import Cards from './Cards';
import ButtonSort from '../Home/ButtonSort';
import Search from './Serach';
export default function AllAuctions() {
  const [value, setValue] = useState('فرز حسب');
  const [value1, setValue1] = useState('فرز حسب');
  const [value2, setValue2] = useState('');
  const [test, setTest] = useState('');
  const [test1, setTest1] = useState('');
  const [hover, setHover] = useState(false);
  let sort = localStorage.getItem('status');
  const navegate = useNavigate();
  if (sort == ' الوقت' || sort == ' مجموعات') {
    sort = localStorage.setItem('status', 'فرز حسب');
  }
  const handleClick = () => {
    if (value2 == 'فرز حسب' && value == 'فرز حسب') {
      setTest(' ');
      setValue2('');
      localStorage.setItem('status', value2);
      console.log(value2);
    } else if (value == 'فرز حسب' && test == 'فرز حسب') {
      setTest(' ');
      setValue1('فرز حسب');

      setValue(value1);
    } else if (value2 == 'فرز حسب') {
      setValue1('فرز حسب');
      setTest(value1);
      console.log(value1);
      setValue(value1);
      localStorage.setItem('status', value1);
    } else {
      setTest(value1);
      setValue(value1);
    }
  };
  const handleClick2 = (item) => {
    setValue(item);
    setTest(item);

    if (item == ' جاري' || item == ' منتهي' || item == ' قادم') {
      setTest1(item);
      localStorage.setItem('status', item);
      setValue1(' الوقت');
      setValue2('فرز حسب');
    }
    if (value == ' الوقت' || value == ' مجموعات') {
      setValue2('فرز حسب');
    }
    if (item == ' الوقت' || item == ' مجموعات') {
      localStorage.setItem('status', item);
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
      setTest1(item);
      localStorage.setItem('status', item);
    }
  };

  return (
    <div className="allauctions">
      <Navbar wordBlod={'auctions'} />
      <AuctionsNavbar wordBlod={'all'} />
      <button
        className="createauction"
        onClick={() => {
          navegate('/CreateAuction');
        }}
      >
        <p>إنشاء مزاد</p>
        <i className="fas fa-plus"></i>
      </button>
      <div className="vv">
        <ButtonSort test2="all" />
       <Search page={"all"}/>
      </div>
      <Cards page="all" />

      <Footer />
    </div>
  );
}
