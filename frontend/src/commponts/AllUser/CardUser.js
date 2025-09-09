import './AllUsers.css';
import im from '../../image/user2.jpg';
import { Link } from 'react-router-dom';
export default function CardUser({da}) {
  return (
    <>
      <div className="containerCard">
        <img className="pic1" src={da.profileImg?da.profileImg:im} alt="Error" />
        <p className="userNamee"> {da?.name}</p>
        <Link to="/usersdetails" state={da} id="lin">
          {' '}
          عرض الحساب{' '}
        </Link>
        <svg
          className="ssvg"
          width="800"
          height="600"
          viewBox="0 0 750 600"
          xmlns="http://www.w3.org/2000/svg"
        >
          {' '}
          <path
            d="M 100 400 L 100 150 L 300 150 L 404 148 C 189 193 294 318 100 400    "
            fill="#003366"
            stroke="none"
            stroke-width="2"
          ></path>
        </svg>
      </div>
    </>
  );
}
