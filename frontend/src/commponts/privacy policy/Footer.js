import './Footer.css';
import imag from '../../image/logo.png';
import { Link } from 'react-router-dom';
import { useState } from 'react';
export default function Footer({ black }) {
  const [bold1, setBold1] = useState(' ');
  const hoverItems1 = (items) => {
    setBold1(items);
  };
  return (
    <>
      <div className="footer">
        <div>
          <img className="footer-logo" src={imag} alt="error" />
        </div>
        <h1 className="SW">منصة Smart World</h1>
        <h6>منصة تفاعلية رائدة في تقديم المزادات والمناقصات الالكترونية</h6>
        <div className="footer-list">
          <h1 className="hov1 hov2">التواصل:</h1>
          <div className="email-phone">
            <div>
              <button className="footer-button-tell">
                <i className="fas fa-phone footer-phone"></i>
                <p className={`hov3 tell-email`}>123-456-789</p>
              </button>
            </div>
            <div>
              <a className="footer-email" href="mailto:smart-world@gmail.com">
                <i className="fas fa-envelope footer-phone"></i>
                <p className={`hov3 tell-email`}>smart-world@gmail.com</p>
              </a>
            </div>
          </div>
          <Link to="/privacy">
            <h1
              className={`hov1 hov privacy ${
                black === 'privacy' ? 'bold1 ' : ''
              }`}
              onClick={() => hoverItems1('privacy1')}
            >
              سياسة الخصوصية{' '}
            </h1>
          </Link>
          <Link to="/privacy1">
            <h1
              className={`hov1 hov ${black === 'privacy1' ? 'bold1' : ' '}`}
              onClick={() => hoverItems1('privacy2')}
            >
              الشروط والأحكام
            </h1>
          </Link>
        </div>
        <div className="copy">
          <p className="num">&copy; 2025</p>
          <h2>Smart world.</h2>
          <p>جميع الحقوق محفوظة. </p>
        </div>
      </div>
    </>
  );
}
