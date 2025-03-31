import './AuctionNavbar.css';
import { Link } from "react-router-dom";
import { useState } from "react";
export default function AuctionsNavbar({wordBlod}){
    const [bold,setBold]=useState('home');
        const hoverItems=(items)=>{
            setBold(items);
        }
    return(
        <div className="Nav auctionNav">
            <ul className="Navul navul1 ">
                            <li className={wordBlod==='all'?'bold':''} onClick={()=>hoverItems('all')} >
                                <Link to="/auctions">الكل</Link>
                            </li>
                            <li className={`group ${wordBlod==='group'?'bold':''}`} onClick={()=>hoverItems('group')}>
                                <Link to="/auctionsgroup">مجموعات</Link>
                            </li>
                            <li className={`p1 ${wordBlod==='Auctions1'?'bold':''}`} onClick={()=>hoverItems('Auctions1')} >
                                <Link to="/share-auction">المزادات المشارك بها</Link>
                            </li>
                        
                            <li className={`p2 ${wordBlod==='Auctions2'?'bold':''}`} onClick={()=>hoverItems('Auctions2')}>
                                <Link to="/createAuctions">
                                    <p >المزادات المنشأة </p>
                                </Link>
                            </li>
                            <li className={wordBlod==='Auctions3'?'bold':''} onClick={()=>hoverItems('Auctions3')}>
                                <Link to="/favorite">
                                    <p >المفضلة </p>
                                </Link>
                            </li>
                        </ul>
        </div>
    )
}