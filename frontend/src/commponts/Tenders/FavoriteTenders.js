// }
import Footer from '../privacy policy/Footer';
import Tender from './Tender';

import TendersNavbar from './TendersNavbar';

import Navbar from '../Home/Navbar';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CardTen from './CardTen';
import Search from '../Auctions/Serach';
import ButtonSortTen from './ButtonSortten';
import Pagination from '../Auctions/Pagination';
export default function FavoriteTenders() {
    const navegate = useNavigate();

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
  //   if (item == ' جاري' || item == ' منتهي' || item == ' قادم') {
  //     setValue1(' الوقت');
  //     setValue2('فرز حسب');
  //   }
  //   if (value == ' الوقت' || value == ' مجموعات') {
  //     setValue2('فرز حسب');
  //   }
  //   if (
  //     item === 'بناء و إعمار'||
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
      <div>
         {/* <Search page={"all"}/> */}
        <Navbar wordBlod={'tenders'} />
        <TendersNavbar wordBlod={'Auctions3'} />
        <button
        className="createauction"
        onClick={() => {
          navegate('/Create_Tender');
        }}
      >
        <p>إنشاء مناقصة</p>
        <i className="fas fa-plus"></i>
      </button>
       
      
<ButtonSortTen test2={"fav"} position={"profile2"}/>
      
     <div className='margin'>
        <CardTen page={'fav'}/>
        </div>
        <Pagination/>
        <Footer />
      </div>
    </>
  );
}
