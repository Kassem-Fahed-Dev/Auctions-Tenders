import Footer from "../privacy policy/Footer";
import Auction from "./Auction";
import Navbar from "../Home/Navbar";
import AuctionsNavbar from "./AuctionsNavbar";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import Cards from "./Cards";
import ButtonSort from "../Home/ButtonSort";
export default function AuctionNew(){
  let sort=localStorage.getItem('status2')
   if(sort==' الوقت'||sort==' مجموعات'){
sort=localStorage.setItem('status2','فرز حسب')
   }
        const [hover,setHover]=useState(false)
        const navegate=useNavigate()
        
    return(
        <div>
            <Navbar wordBlod={'auctions'}/>
            <AuctionsNavbar wordBlod={'Auctions2'}/>
            <button className="createauction" onClick={()=>{navegate('/CreateAuction')}}>
             <p>إنشاء مزاد</p>
             <i className="fas fa-plus"></i>
            </button>
           
           <ButtonSort test2="create"/>
           <Cards page="create" />
                        <Footer/>
        </div>
    )
}