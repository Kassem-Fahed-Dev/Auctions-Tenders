import { useState } from 'react';
import '../profile.css';
import { Link } from 'react-router-dom';
export default function Side() {
  const [activeLink, setActiveLink] = useState('');

  function handleClick(e) {
    setActiveLink(e);
  }
  return (
    <>
      {' '}
      <div className="con-info">
        <Link
          to="/create"
          className={`info ${activeLink === '/create' ? 'active' : ''}`}
          onClick={() => handleClick('/create')}
        >
          {' '}
          المزادات التي أنشأتها
        </Link>
        <div className="line-info">
          <span className="fas fa-stop"></span>
        </div>
        <Link
          to="/Aucparticep"
          className={`info ${activeLink === '/Aucparticep' ? 'active' : ''}`}
          onClick={() => handleClick('/Aucparticep')}
        >
          {' '}
          المزادات التي شاركت بها
        </Link>
        <div className="line-info">
          <span className="fas fa-stop"></span>
        </div>
        <Link
          to="/TenderCreate"
          className={`info ${activeLink === '/TenderCreate' ? 'active' : ''}`}
          onClick={() => handleClick('/TenderCreate')}
        >
          {' '}
          المناقصات التي أنشأتها
        </Link>
        <div className="line-info">
          <span className="fas fa-stop"></span>
        </div>
        <Link
          to="/TenderParticiped"
          className={`info ${
            activeLink === '/TenderParticiped' ? 'active' : ''
          }`}
          onClick={() => handleClick('/TenderParticiped')}
        >
          {' '}
          المناقصات التي شاركت بها
        </Link>
        <div className="line-info">
          <span className="fas fa-stop"></span>
        </div>
        <Link
          to="/FavAuction"
          className={`info ${activeLink === '/FavAuction' ? 'active' : ''}`}
          onClick={() => handleClick('/FavAuction')}
        >
          {' '}
          المزادات المفضلة{' '}
        </Link>
        <div className="line-info">
          <span className="fas fa-stop"></span>
        </div>
        <Link
          to="/FavTender"
          className={`info ${activeLink === '/FavTender' ? 'active' : ''}`}
          onClick={() => handleClick('/FavTender')}
        >
          {' '}
          المناقصات المفضلة{' '}
        </Link>
        <div className="line-info">
          <span className="fas fa-stop"></span>
        </div>
      </div>
    </>
  );
}
