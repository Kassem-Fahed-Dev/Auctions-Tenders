import { useLocation, Link } from 'react-router-dom';
import '../profile.css';

export default function Side() {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <>
      <div className="con-info">
        <Link
          to="/create"
          className={`info ${
            currentPath === '/create' 
              ? 'active'
              : ''
          }`}
        >
          المزادات التي أنشأتها
        </Link>
        <div className="line-info">
          <span className="fas fa-stop"></span>
        </div>

        <Link
          to="/Aucparticep"
          className={`info ${currentPath === '/Aucparticep' ? 'active' : ''}`}
        >
          المزادات التي شاركت بها
        </Link>
        <div className="line-info">
          <span className="fas fa-stop"></span>
        </div>

        <Link
          to="/TenderCreate"
          className={`info ${currentPath === '/TenderCreate' ? 'active' : ''}`}
        >
          المناقصات التي أنشأتها
        </Link>
        <div className="line-info">
          <span className="fas fa-stop"></span>
        </div>

        <Link
          to="/TenderParticiped"
          className={`info ${
            currentPath === '/TenderParticiped' ? 'active' : ''
          }`}
        >
          المناقصات التي شاركت بها
        </Link>
        <div className="line-info">
          <span className="fas fa-stop"></span>
        </div>

        <Link
          to="/FavAuction"
          className={`info ${currentPath === '/FavAuction' ? 'active' : ''}`}
        >
          المزادات المفضلة
        </Link>
        <div className="line-info">
          <span className="fas fa-stop"></span>
        </div>

        <Link
          to="/FavTender"
          className={`info ${currentPath === '/FavTender' ? 'active' : ''}`}
        >
          المناقصات المفضلة
        </Link>
        <div className="line-info">
          <span className="fas fa-stop"></span>
        </div>
      </div>
    </>
  );
}
