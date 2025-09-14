import { useState } from 'react';
import './details.css';
import im from './Boxing.webp';
import im2 from './boxing.jpg';
import im3 from './im3.jpg';
// import vid from './ggg.mp4';
import { useLocation } from 'react-router-dom';

function Data({ state1 }) {
  // const location = useLocation();
  // const { data } = location.state;
  // console.log(state)

  return (
    <div>
      <pre className="information-auction">{state1?.item?.description}</pre>
    </div>
  );
}

function Image({state1}) {
   console.log(state1?.item?.photo)
  return (
    <>
      <div id="carouselExample" class="carousel slide" data-bs-ride="false">
        <div class="carousel-indicators">
          <button
            type="button"
            data-bs-target="#carouselExample"
            data-bs-slide-to="0"
            class="active"
            aria-current="true"
            aria-label="Slide 1"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExample"
            data-bs-slide-to="1"
            aria-label="Slide 2"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExample"
            data-bs-slide-to="2"
            aria-label="Slide 3"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExample"
            data-bs-slide-to="3"
            aria-label="Slide 4"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExample"
            data-bs-slide-to="4"
            aria-label="Slide 5"
          ></button>
        </div>
        <div class="carousel-inner">
          <div class="carousel-item active">
            <img src={state1?.item?.photo[0]} class="d-block w-100" alt="لا يوجد صور أكثر" height={'380px'} />
          </div>
          <div class="carousel-item">
            <img src={state1?.item?.photo[1]} class="d-block w-100" alt="لا يوجد صور أكثر" height={'380px'} />
          </div>
          <div class="carousel-item">
            <img src={state1?.item?.photo[2]} class="d-block w-100" alt="لا يوجد صور أكثر" height={'380px'} />
          </div>
          <div class="carousel-item">
            <img src={state1?.item?.photo[3]} class="d-block w-100" alt="لا يوجد صور أكثر" height={'380px'} />
          </div>
          <div class="carousel-item">
            <img src={state1?.item?.photo[4]} class="d-block w-100" alt="لا يوجد صور أكثر" height={'380px'} />
          </div>
        </div>
        
        <button
          class="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExample"
          data-bs-slide="prev"
        >
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Previous</span>
        </button>
        <button
          class="carousel-control-next"
          type="button"
          data-bs-target="#carouselExample"
          data-bs-slide="next"
        >
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Next</span>
        </button>
      </div>
      {/* -------------- */}
     
      {/* {state1.item?.photo
.map((pic)=>{
        <div class="carousel-inner">
          <div class="carousel-item active">
            <img src={pic} class="d-block w-100" alt="..." height={'380px'} />
          </div>
          </div>

      })} */}
    
      {/* for (let index = 0 ; index < x ; index++) {
       <div class="carousel-inner">
          <div class="carousel-item active">
            <img src={pic} class="d-block w-100" alt="..." height={'380px'} />
          </div>
          </div>
        
      } */}
    </>
  );
}

function Vidio() {
  return (
    <div>
      <video width="600" height="390" controls>
        {/* <source src={vid} type="video/mp4" /> */}
      </video>
    </div>
  );
}
export default function Navdata({ state }) {
  const [content, setContent] = useState('data');
  const [activeClick, setActiveClick] = useState('data');

  const renderContent = () => {
    if (content === 'data') {
      return <Data state1={state} />;
    } else if (content === 'image') {
      return <Image state1={state}/>;
    } else if (content === 'vidio') {
      return <Vidio />;
    }
  };

  return (
    <div className="con-details">
      <div className="con-Link">
        <button
          onClick={() => {
            setContent('data');
            setActiveClick('data');
          }}
          className={`normal ${activeClick === 'data' ? 'ptn-clicked' : ''}`}
        >
          البيانات
        </button>
        <button
          onClick={() => {
            setContent('image');
            setActiveClick('image');
          }}
          className={`normal ${activeClick === 'image' ? 'ptn-clicked' : ''}`}
        >
          الصور
        </button>
        <button
          onClick={() => {
            setContent('vidio');
            setActiveClick('vidio');
          }}
          className={`normal ${activeClick === 'vidio' ? 'ptn-clicked' : ''}`}
        >
          الفيديو
        </button>
      </div>

      <hr id="lineee" />
      <div>{renderContent()}</div>
    </div>
  );
}
