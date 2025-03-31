import img from "../../image/logo.png";
import "./Navbar.css";
import { Link } from "react-router-dom";
import { useState } from "react";
export default function Navbar({wordBlod}) {
	const [bold,setBold]=useState('home');
	const hoverItems=(items)=>{
		setBold(items);
	}
	return (
		<div className="Nav">
            {/* ال لوغو و الجملة تحته */}
			<div className="logo">
				<img src={img} alt="No image" className="logo1" />
			</div>
            {/* القاىمة الاولى تحوي الرئيسية و المزادات و المناقصات */}
			<ul className="Navul ul1">
				<li className={wordBlod==='home'?'bold':''} onClick={()=>hoverItems('home')} >
					<Link to="/">الرئيسية</Link>
				</li>
				<li className={wordBlod==='auctions'?'bold':''} onClick={()=>hoverItems('auctions')}>
					<Link to="/auctions">مزادات</Link>
				</li>
				<li className={wordBlod==='tenders'?'bold':''} onClick={()=>hoverItems('tenders')} >
					<Link to="/tenders">مناقصات</Link>
				</li>
                {/* القاىمة الثانية الحساب و الكل */}
			</ul>
			<ul className="Navul ul2">
				<li   onClick={()=>hoverItems('user')}>
					<Link to="/acount">
						<div className="icon">
							<i className="fas fa-user-circle"></i>
						</div>
						<p className="account">حساب الدخول</p>
					</Link>
				</li>
				<li onClick={()=>hoverItems('alluser')}>
					<Link to="users">
						<div className="icon">
							<i className="fas fa-users"></i>
						</div>
						<p className="users">كل المستخدمين</p>
					</Link>
				</li>
			</ul>
		</div>
	);
}
