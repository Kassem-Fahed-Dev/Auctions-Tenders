import "./Confirm.css";
import imag from "../../image/logo.png";
import { Link } from "react-router-dom";
export default function Confirm({message}) {
  function goback(){
    window.history.go(-2)
  }
	return (
		<>
			<div className="con-msg">
				<div className="message">
					         
                      <button className="	fas fa-chevron-left" onClick={goback}></button>
                 
					<div className="title">
            {message}
						 <i className="	far fa-check-circle"></i>
					</div>
					<p title className="title2">
						!شكراً لثقتك بنا وتعاملك معنا
					</p>
				</div>
				<div className="side-right">
					<div>
						<img className="footer-logo" src={imag} alt="error" />
					</div>
					<h1 className="side-right-h1">smart world منصة</h1>
					<h6 className="side-right-h6">
						منصة تفاعلية رائدة في تقديم المزادات والمناقصات الالكترونية
					</h6>
				</div>
			</div>
		</>
	);
}
