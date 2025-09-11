import Footer from '../privacy policy/Footer';
import Tender from './Tender';

import TendersNavbar from './TendersNavbar';

import Navbar from '../Home/Navbar';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CardTen from './CardTen';
import ButtonSortTen from './ButtonSortten';
import Search from '../Auctions/Serach';

export default function ShareTenders() {

  const [hover, setHover] = useState(false);
  const navegate = useNavigate();
 
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
        <ButtonSortTen test2='share'/>
      
       <CardTen page={'share'}/>
        <Footer />
      </div>
    </>
  );
}
