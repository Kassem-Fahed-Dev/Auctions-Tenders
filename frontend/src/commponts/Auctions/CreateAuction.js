import { useNavigate } from 'react-router-dom';
import Navbar from '../Home/Navbar';
import { useState } from 'react';
export default function CreateAuction() {
  const [formData, setFormData] = useState('');
  const [hover, setHover] = useState('بيانات');
  const [namePass, setNamePase] = useState([]);
  const navegaet=useNavigate()
  function goback() {
    // window.history.go(-1);
    navegaet('/auctions')
  }
  
  //   تطبيق الحركة على مربع الادخال
  const hoverItems1 = (items) => {
    if (namePass.includes(items) == false) {
      setNamePase([...namePass, items]);
    }
  };
  //   اختيار الموقع

  const hoverItems2 = (items) => {
    setFormData( items );
    if (namePass.includes('list1')) {
      setNamePase(namePass.filter((i) => i !== 'list1'));
    }
  };
  const handleChange = (e) => {
    const {  value } = e.target;
    setFormData(value);
  };
  const handleKeyDown=(e)=>{
    e.preventDefault()
  }
  const handleHover=(item)=>{
    setHover(item)
  }
  // const [images, setImages] = useState([]);
  // const [video, setVideo] = useState([]);

  // const handleChange4 = (event) => {
  //     const files = Array.from(event.target.files);
  //     if (files.length< 5) {
  //       alert("يمكنك تحميل 5 صور كحد أقصى.");
  //       return;
  //   }
  //     const objectURLs = files.map(file => URL.createObjectURL(file));
  //     setImages(objectURLs);
  // };
//  const dis=images.slice(0,5)
//  --------------
// const handleChange5 = (event) => {
//   const files = Array.from(event.target.files);

//   const objectURLs = files.map(file => URL.createObjectURL(file));
//   setImages(objectURLs);
// };
// const dis1=images.slice(0,1)

  const [images, setImages] = useState([]);
  const [fileInputKey, setFileInputKey] = useState(Date.now());
  const handleImageChange = (event) => {
    const selectedFiles = Array.from(event.target.files);
    // setImages([])
    if (selectedFiles.length > 5) {
      alert('يرجى اختيار 5 صور أو أقل.');
      setFileInputKey(Date.now());
      setImages([])
      return;
    }

    const newImages = selectedFiles.map((file) => URL.createObjectURL(file));
    setImages(newImages);
  };


  const removeImage = (index) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  const handleReplaceImage = (index, event) => {
    const file = event.target.files[0];
    if (file) {
      const newImage = URL.createObjectURL(file);
      setImages((prevImages) => {
        const updatedImages = [...prevImages];
        updatedImages[index] = newImage; // استبدال الصورة في الفهرس المحدد
        return updatedImages;
      });
    }
  };
// ==============
// const [videoSrc, setVideoSrc] = useState(null);

// const handleVideoChange = (event) => {
//   const file = event.target.files[0];
//   if (file) {
//     const videoUrl = URL.createObjectURL(file);
//     setVideoSrc(videoUrl);
//   }
// };
// const [videoSrc, setVideoSrc] = useState(null);

//   const handleVideoChange = (event) => {
  
//     const files = event.target.files; 
//     if (files.length === 0) {
//       setVideoSrc(null); 
//       return;
//     }

//     if (files.length > 1) {
//       alert('يرجى اختيار فيديو واحد فقط.'); 
//       setVideoSrc(null);
//     } else
//      {
//       const file = files[0];
//       const videoUrl = URL.createObjectURL(file);
//       setVideoSrc(videoUrl);
//     }
//   };

  const handleDeleteVideo = () => {
    setVideoSrc(null); 
  };
const [videoSrc, setVideoSrc] = useState(null);
  const handleVideoChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setVideoSrc(null);
      const vid1 = URL.createObjectURL(file);
      setTimeout(() => {
        setVideoSrc(vid1);
      }, 0);
    }
  };
  return (
    <div className="create-auction-button">
      <Navbar wordBlod={'auctions'} />
      <p className="createp">إنشاء مزاد</p>
      <button className="	fas fa-chevron-left" onClick={goback}></button>
      <div className="create-auction-data">
        <div className="create-auction-data1">
          <form className="create-auction-form">
            <div className='group1'>
              {/* <div>حدد المجموعة</div> */}
              <label className="group-label">حدد المجموعة</label>
                <div
                  className={`triangle tri3  ${
                    formData==='سيارات' ||
                    formData==='عقارات'||
                    formData==='إلكترونيات'||
                    formData==='أثاث'||
                    formData==='إكسسوار'||
                    formData==='ملابس'||
                    formData==='أخرى'
                      ? 'triangle1'
                      : ''
                  } `}
                  onClick={() => hoverItems1('list1')}
                >
                  <div className="tri tri1"></div>
                  <div className="tri tri2"></div>
                </div>

                <input
                  className="group2"
                  type="text"
                  name="group"
                  value={formData}
                  onChange={handleChange}
                />
                <div
                  className={`list-group-m  ${
                    namePass=='list1' ? 'list-group1 ' : ''
                  }`}
                >
                  <p
                    className="group-hover p1"
                    onClick={() => hoverItems2('سيارات')}
                  >
                     سيارات
                  </p>
                  <div></div>
                  <p
                    className="group-hover p2"
                    onClick={() => hoverItems2('عقارات')}
                  >
                     عقارات
                  </p>
                  <div></div>
                  <p
                    className="group-hover p2"
                    onClick={() => hoverItems2('إلكترونيات')}
                  >
                    إلكترونيات
                  </p>
                  <div></div>
                  <p
                    className="group-hover p2"
                    onClick={() => hoverItems2('أثاث')}
                  >
                     أثاث
                  </p>
                  <div></div>
                  <p
                    className="group-hover p2"
                    onClick={() => hoverItems2('إكسسوار')}
                  >
                     إكسسوار
                  </p>
                  <div></div>
                  <p
                    className="group-hover p2"
                    onClick={() => hoverItems2('ملابس')}
                  >
                     ملابس
                  </p>
                  <div></div>
                  <p
                    className="group-hover p3"
                    onClick={() => hoverItems2('أخرى')}
                  >
                     أخرى
                  </p>
                </div>
                
            <div className='product-name'>
              <label className='product-name-label'>اسم المنتج</label>
              <input type='text'/>
            </div>
          
            <div className='auction3'>
            <label className='product-name-label'>حالة المنتج:  </label>
            <div className='status'>
            <div  >
              <label >مستعمل </label>
              <input type='radio' name='status'/>
            </div>
            <div >
              <label >جديد </label>
              <input type="radio" name='status'/>
            </div>
            </div>
            </div>
            </div>
            {/* ------ */}
            <div className='auction2'>
            <div className='product-name'>
              <label className='product-name-label'>اسم المزاد</label>
              <input type='text' />
            </div>
        
            <div className='product-name'>
            <label className='product-name-label'> تاريخ البدء</label>
            <input type='date' placeholder='kkkk' onKeyDown={handleKeyDown}/>
            </div>
            <div className='product-name'>
            <label className='product-name-label'> تاريخ الانتهاء</label>
            <input type='date' placeholder='' onKeyDown={handleKeyDown}/>
            </div>
          
            <div className='product-name'>
            <label className='product-name-label'>سعر الافتتاح </label>
            <input type='text'/>
            </div>
            <div className='product-name'>
            <label className='product-name-label'> مقدار الزيادة </label>
            <input type='text'/>
            </div>
            <button className='send-auction'>إرسال</button>
            </div>
            
            
          </form>
        </div>
        <div className="create-auction-data2">
          <div className='list-data'>
            <button onClick={()=>handleHover('بيانات')} className={hover=='بيانات'?'back':''}>البيانات</button>
            <button onClick={()=>handleHover('الصور')}  className={hover=='الصور'?'back':''}>الصور</button>
            <button onClick={()=>handleHover('الفيديو')}  className={hover=='الفيديو'?'back':''}>الفيديو</button>
            
          </div>
          {hover=='بيانات'&&<div>
            <textarea className='textarea' placeholder='اكتب ما تود إضافتهُ من معلومات توضيحية اكثر هنا'/></div>}
                <div>
 
      {hover=='الصور'&&<div>
        <label for='file'><i className='upload fa fa-upload'></i><p className='upload'>تحميل صور من جهازك</p></label>
        <input
        id='file'
        type="file"
        className='image-input'
        placeholder=' '
        onChange={handleImageChange}
        accept="image/*"
        key={fileInputKey}
        multiple
      />
      <div style={{ display: 'flex', flexWrap: 'wrap', marginTop: '30px' }}>
        {images.map((image, index) => (
          
          <div className='div-choose'>
            <img
            key={index}
            src={image}
            alt={`preview-${index}`}
            className='img-choose'
  
          />
             <button
             className='choose'
              onClick={() => removeImage(index)}
              
            >
              x
            </button>
            <label for='replace'><i className='rep fa fa-exchange-alt'></i></label>
            <input type='file' accept='image/*' id='replace' className='replace' onChange={(e)=>handleReplaceImage(index,e)}/>
          </div>
          
        ))}   
      </div></div>}
    </div>
    <div>
    {hover=='الفيديو'&&<div>
      <label for='file'><i className='upload fa fa-upload'></i><p className='upload'>تحميل فيديو من جهازك</p></label>
      <input
        type="file"
        id='file'
         className='image-input'
        onChange={handleVideoChange}
        accept="video/*"
      />
      {videoSrc && (
        <div >
          <video className='video' controls>
            <source src={videoSrc} type="video/mp4" />
            متصفحك لا يدعم تشغيل الفيديو.
          </video>
          <button onClick={handleDeleteVideo} className='choose choose1'>x</button>
        </div>
      )}</div>}
    </div>  



        </div>
      </div>
    </div>
  );
}
