import Footer from "../privacy policy/Footer";
import Auction from "./Auction";
import AuctionsNavbar from "./AuctionsNavbar";
import Navbar from "../Home/Navbar";
import { useState } from "react";
import Cards from "./Cards";
import { useNavigate } from 'react-router-dom';
import ButtonSort from "../Home/ButtonSort";
import Search from "./Serach";
export default function ShareAuction(){
     let sort=localStorage.getItem('status3')
   if(sort==' الوقت'||sort==' مجموعات'){
sort=localStorage.setItem('status3','فرز حسب')
   }
        const [hover,setHover]=useState(false)
        const navegate=useNavigate()
 
    return(
        <div>
             {/* <Search page={"all"}/> */}
            <Navbar wordBlod={'auctions'}/>
            <AuctionsNavbar wordBlod={'Auctions1'}/>
            <button className="createauction" onClick={()=>{navegate('/CreateAuction')}}>
             <p>إنشاء مزاد</p>
             <i className="fas fa-plus"></i>
            </button>
            <ButtonSort test2={'share'}/>
          
         <Cards page="share"/>
          
                        <Footer/>
        </div>
    )
}