import AuctionsNavbar from './AuctionsNavbar';
import Navbar from '../Home/Navbar';
import { Link, useNavigate } from 'react-router-dom';
import Footer from '../privacy policy/Footer';
import ButtonSort from '../Home/ButtonSort';
import { useEffect, useState } from 'react';
import axiosInstance from '../AxiosInterceptors';
export default function AuctionGroups() {
  const navegate = useNavigate();
   const token = localStorage.getItem('jwt');
   const [all,setAll]=useState([])
    const [errorMessage, setErrorMessage] = useState({});
 useEffect(()=>{axiosInstance
        .get(
          `${
            '/api/v1/categories?type=auction'
             
          }`,
          {
            headers: {
              'Content-Type': 'application/json',
              'Accept-Language': 'ar',
              credentials: 'include',
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((res) => {
          setAll(res.data.data.data);
          console.log('create');
          console.log(res.data.data.data);
        })
        .catch((error) => {
          if (error.response) {
            const validationErrors = {};
            validationErrors.messageBackend = error.response.data.message;
            setErrorMessage(validationErrors);
          } else {
            console.log('An unexpected error occurred:', error.message);
            setErrorMessage({
              messageBackend: 'An unexpected error occurred.',
            });
          }
        });},[])
  return (
    <div>
      <Navbar wordBlod={'auctions'} />
      <AuctionsNavbar wordBlod={'group'} />
      <button
        className="createauction"
        onClick={() => {
          navegate('/CreateAuction');
        }}
      >
        <p>إنشاء مزاد</p>
        <i className="fas fa-plus"></i>
      </button>
     
      <div className="group-con">
        {/* <div className="group-div div1">
          <Link className="link" to="/car">
            سيارات
          </Link>
        </div>
        <div className="group-div div2">
          <Link className="link" to="/bilding">
            عقارات
          </Link>
        </div>
        <div className="group-div div3">
          <Link className="link" to="/elctron">
            إلكترونيات
          </Link>
        </div>
        <div className="group-div div4">
          <Link className="link" to="/fir">
            أثاث
          </Link>
        </div>
        <div className="group-div div5">
          <Link className="link" to="/clothe">
            ملابس
          </Link>
        </div>
        <div className="group-div div6">
          <Link className="link" to="/jel">
            إكسسوار
          </Link>
        </div>
        <div className="group-div div7">
          <Link className="link" to="/other">
            أخرى
          </Link>
        </div> */}
        {all.map((auc) => (
             <div className="group-div div7" style={{backgroundImage:`url(${auc?.image})`}}>
          <Link className="link" state={{data:auc.name}} to="/other">
            {auc.name}
          </Link>
        </div>
                ))}
      </div>
      <Footer />
    </div>
  );
}
