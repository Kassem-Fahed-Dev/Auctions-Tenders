import AuctionsNavbar from './AuctionsNavbar';
import Navbar from '../Home/Navbar';
import { useNavigate } from 'react-router-dom';
import Auction from './Auction';
import Footer from '../privacy policy/Footer';
import { useState } from 'react';
import Cards from './Cards';
import ButtonSort from '../Home/ButtonSort';
import Search from './Serach';
import { useLocation } from 'react-router-dom';
export default function AuctionGroup() {
  const navegaet = useNavigate();
  // let sort;
  // let st;
  function goback() {
 
    navegaet('/auctionsgroup');
  }
  //  if(paragraph=="سيارات"){
  //       sort=localStorage.getItem('status4')
  //     st='status4'
  //  }
  //  else if(paragraph=="عقارات"){
  //       sort=localStorage.getItem('status5')
  //     st='status5'
  //  }else if(paragraph=="إلكترونيات"){
  //       sort=localStorage.getItem('status6')
  //     st='status6'
  //  }else if(paragraph=="أثاث"){
  //       sort=localStorage.getItem('status7')
  //     st='status7'
  //  }else if(paragraph=="ملابس"){
  //       sort=localStorage.getItem('status8')
  //     st='status8'
  //  }else if(paragraph=="إكسسوار"){
  //       sort=localStorage.getItem('status9')
  //     st='status9'
  //  }else if(paragraph=="أخرى"){
  //       sort=localStorage.getItem('status10')
  //     st='status10'
  //  }
 
  const location = useLocation();
  const { data} = location.state || {};
   let sort=localStorage.getItem(`group${data}`)
   let st=`group${data}`
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
      console.log('1')
       localStorage.setItem(st, value2);

    } else if (value == 'فرز حسب' && test == 'فرز حسب') {
      setTest(' ');
      setValue1('فرز حسب');
      setValue(value1);
       console.log('2')
       localStorage.setItem(st, value);
    } else if (value2 == 'فرز حسب') {
      setValue1('فرز حسب');
      setTest(value1);
      localStorage.setItem(st, value1);
      setValue(value1);
       console.log('3')
        
    } else {
      setTest(value1);
      setValue(value1);
        localStorage.setItem(st, value1);
       console.log('4')
    }
  };
  const handleClick2 = (item) => {
    setValue(item);
    setTest(item);
      localStorage.setItem(st, item);
     console.log('5')
    if (value == ' جاري' || value == ' منتهي' || value == ' قادم') {
      setValue2('فرز حسب');
      localStorage.setItem(st, item);
        console.log('6')
    }
  };


  return (
    <div>
      {/* <Search page={"group"}/> */}
      <Navbar wordBlod={'auctions'} />
      <AuctionsNavbar wordBlod={'group'} />
      <div className="create-auction-button">
        <p className="createp createp1 ">مزادات {data}</p>
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
        <div>{sort}</div>
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
        <div className="buttonSort but">
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
      
      <Cards page="group" item={data} />
      <Footer />
    </div>
  );
}
