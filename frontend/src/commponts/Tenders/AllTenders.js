import Navbar from '../Home/Navbar';
import '../Auctions/allauction.css';
import Footer from '../privacy policy/Footer';
import AuctionsNavbar from '../Auctions/AuctionsNavbar';
import Auction from '../Auctions/Auction';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TendersNavbar from './TendersNavbar';
import Tender from './Tender';
import ButtonSortTen from './ButtonSortten';
import CardTen from './CardTen';
import Search from '../Auctions/Serach';
import Pagination from '../Auctions/Pagination';
export default function AllTenders() {
  const [hover, setHover] = useState(false);
  const navegate = useNavigate();

  return (
    <>
      <Search page={"all"} type={"tenders"}/>
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

      <ButtonSortTen test2={'all'} />
     
      <CardTen page={'all'} />
<Pagination/>
      <Footer />
    </>
  );
}
