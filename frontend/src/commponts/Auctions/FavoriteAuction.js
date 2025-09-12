import Footer from '../privacy policy/Footer';
import Auction from './Auction';
import AuctionsNavbar from './AuctionsNavbar';
import Navbar from '../Home/Navbar';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cards from './Cards';
import ButtonSort from '../Home/ButtonSort';
import Search from './Serach';
import Pagination from './Pagination';
export default function FavoriteAuction() {
   let sort=localStorage.getItem('status1')
   if(sort==' الوقت'||sort==' مجموعات'){
sort=localStorage.setItem('status1','فرز حسب')
   }
  const navegate = useNavigate();
   
  return (
    <div>
      {/* <Search page={"all"}/> */}
      <Navbar wordBlod={'auctions'} />
      <AuctionsNavbar wordBlod={'Auctions3'} />
      <button
        className="createauction"
        onClick={() => {
          navegate('/CreateAuction');
        }}
      >
        <p>إنشاء مزاد</p>
        <i className="fas fa-plus"></i>
      </button>
    <ButtonSort test2={'fav'}/>
    
       <Cards page={'fav'}/>
       <Pagination/>
      <Footer />
    </div>
  );
}
