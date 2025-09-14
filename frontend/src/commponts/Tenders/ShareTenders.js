import Footer from '../privacy policy/Footer';
import Tender from './Tender';

import TendersNavbar from './TendersNavbar';

import Navbar from '../Home/Navbar';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CardTen from './CardTen';
import ButtonSortTen from './ButtonSortten';
import Search from '../Auctions/Serach';
import Pagination from '../Auctions/Pagination';
export default function ShareTenders() {

  const [hover, setHover] = useState(false);
  const navegate = useNavigate();
    const [sort1,setSort]=useState(localStorage.getItem("status3tn"))
const handle=(newsort)=>{
setSort(newsort)
// localStorage.setItem("status",)
}
  return (
    <>
      <div>
          {/* <Search page={"all"}/> */}
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
        <ButtonSortTen test2='share' onSortChange={handle}/>
      
       <CardTen page={'share'} sort1={sort1}/>
       <Pagination/>
        <Footer />
      </div>
    </>
  );
}
