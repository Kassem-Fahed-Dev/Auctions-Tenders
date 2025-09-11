import Navbar from '../Home/Navbar';
import './Home.css';
import Pic from '../../commponts/Account/Profile/pic.jpg';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../commponts/Account/Profile/profile.css';
import { useLocation, Link } from 'react-router-dom';
import Cards from '../Auctions/Cards';
import ButtonSort from './ButtonSort';
import Search from '../Auctions/Serach';
import ButtonSortTen from '../../commponts/Tenders/ButtonSortten'
import CardTen from '../Tenders/CardTen';
export default function Favorite() {
  const location = useLocation();
  const currentPath = location.pathname;
  const [change, setChange] = useState('fav-act');
  function handel_Fav(e) {
    let hh = e.target;
    if (hh.style.color === 'red') {
      hh.style.cssText = 'color: none;';
    } else {
      hh.style.cssText = 'color: red;';
    }
  }

  return (
    <div>
      <Navbar />
      <div className="side">
        <div>
          <div className="but">
            <button
              className={`fav-act ${change === 'fav-act' ? 'active' : ''}`}
              onClick={() => {
                setChange('fav-act');
              }}
            >
              المزادات المفضلة
            </button>
            <button
              className={`fav-act ${change === 'fav-ten' ? 'active' : ''}`}
              onClick={() => {
                setChange('fav-ten');
              }}
            >
              المناقصات المفضلة
            </button>
          </div>
          <div className="ff">
            {
              <div
                className={`${
                  change === 'fav-act' || change === 'fav-ten' ? 'vis' : 'hid'
                }`}
              >
                <img
                  className="pic"
                  src={Pic}
                  alt="Error"
                  width={'50px'}
                  height={'40px'}
                />
                <div className={`${change === 'fav-act' ? 'vis' : 'hid'}`}>
                  <div>
                      {/* <Search page={"alluser"}/> */}
                    <div className="but-sor">
                       <ButtonSort test2={'favh'} position={"profile1"}/> 
                      {/* <ButtonSort test2={'favh'} /> */}
                    </div>
                    <p className="par">المزادات المفضلة</p>
                  </div>
                  <div className="dec">
                    <Cards page={'favh'} />
                  </div>
                </div>
                <div className={`${change === 'fav-ten' ? 'vis' : 'hid'}`}>
                    {/* <Search page={"alluser"}/> */}
                  <div className="but-sor">
                  <ButtonSortTen   test2={'favh'} position={"profile1"}/> 
                  </div>
                  <p className="par">المناقصات المفضلة</p>

                  <div className="dec">
                    <CardTen page={'favh'}/>
                  </div>
                </div>
              </div>
            }
          </div>
        </div>
      </div>
    </div>
  );
}
