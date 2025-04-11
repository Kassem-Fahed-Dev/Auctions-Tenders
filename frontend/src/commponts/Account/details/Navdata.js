import { useState } from 'react';
import './details.css';
import im from './Boxing.webp';
import im2 from './boxing.jpg';
import im3 from './im3.jpg';
import vid from './ggg.mp4';

function Data() {
  return (
    <div>
      <pre className="information-auction">{`الشقة الدور الاول :
  مساحتها تقريبا122 متر تحتوي على :
  3غرف نوم واحدة منها ماستر
  كل غرفة نوم حمام خارجي خاص
  4 حمامات
  المجلس مفتوح على الصالة
  المطبخ راكب
  المكيف راكب
  دخول ذكي`}</pre>
    </div>
  );
}

function Image() {
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
            <img src={im} class="d-block w-100" alt="..." height={'380px'} />
          </div>
          <div class="carousel-item">
            <img src={im2} class="d-block w-100" alt="..." height={'380px'} />
          </div>
          <div class="carousel-item">
            <img src={im3} class="d-block w-100" alt="..." height={'380px'} />
          </div>
          <div class="carousel-item">
            <img src={im} class="d-block w-100" alt="..." height={'380px'} />
          </div>
          <div class="carousel-item">
            <img src={im2} class="d-block w-100" alt="..." height={'380px'} />
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
    </>
  );
}

function Vidio() {
  return (
    <div>
      <video width="600" height="390" controls>
        <source src={vid} type="video/mp4" />
      </video>
    </div>
  );
}
export default function Navdata() {
  const [content, setContent] = useState('data');
  const [activeClick, setActiveClick] = useState('data');

  const renderContent = () => {
    if (content === 'data') {
      return <Data />;
    } else if (content === 'image') {
      return <Image />;
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
