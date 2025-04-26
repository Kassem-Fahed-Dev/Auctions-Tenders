import { useNavigate } from 'react-router-dom';
import Navbar from '../Home/Navbar';
import { useState } from 'react';
import axios from 'axios';
export default function Create_Tender() {
  const [formData, setFormData] = useState('');
  const [hover, setHover] = useState('بيانات');
  const [namePass, setNamePase] = useState([]);
  const [errorMessage, setErrorMessage] = useState({});
  const [length, setLength] = '';
  const [key, setKey] = [];
  const navegaet = useNavigate();
  function goback() {
    window.history.go(-1);
  }
  const hoverItems1 = (items) => {
    if (namePass.includes(items) == false) {
      setNamePase([...namePass, items]);
    }
  };
  const hoverItems2 = (items) => {
    setFormData(items);
    if (namePass.includes('list1')) {
      setNamePase(namePass.filter((i) => i !== 'list1'));
    }

    axios
      .get(
        `https://auctions-tenders-38sx.onrender.com/api/v1/categories?name=${items}`,
        {
          headers: {
            'Content-Type': 'application/json',
            'Accept-Language': 'ar',
          },
        }
      )
      .then((res) => {
        // setHover('spinner');
        console.log(res.data.data);
        console.log(res.data.data.data[0].properties);
        console.log(res.data.data.data[0].properties.length);
        setLength(res.data.data.data[0].properties.length);
        while (length > 0) {
          // setKey([...key,res])
        }
      })
      .catch((error) => {
        // setHover('spinner');
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
      });
  };
  const handleChange = (e) => {
    const { value } = e.target;
    setFormData(value);
  };
  const handleKeyDown = (e) => {
    e.preventDefault();
  };
  const handleHover = (item) => {
    setHover(item);
  };
  const [images, setImages] = useState([]);
  const [fileInputKey, setFileInputKey] = useState(Date.now());
  const handleImageChange = (event) => {
    const selectedFiles = Array.from(event.target.files);
    if (selectedFiles.length > 5) {
      alert('يرجى اختيار 5 صور أو أقل.');
      setFileInputKey(Date.now());
      setImages([]);
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
        updatedImages[index] = newImage; 
        return updatedImages; 
      });
    }
  };
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
      <Navbar wordBlod={'tenders'} />
      <p className="createp">إنشاء مناقصة</p>
      <button className="	fas fa-chevron-left" onClick={goback}></button>
      <div className="create-auction-data">
        <div className="create-auction-data1">
          <form className="create-auction-form2">
            <div className="auction22">
              <label className="group-label">حدد المجموعة</label>
              <div
                className={`triangle tri33  ${
                  formData === 'بناءواعمار' ||
                  formData === 'خدمات لأماكن عامة' ||
                  formData === 'خدمات منوعة' ||
                  formData === 'مركبات واليات' ||
                  formData === 'أخرى'
                    ? 'triangle1'
                    : ''
                } `}
                onClick={() => hoverItems1('list1')}
              >
                <div className="tri tri1"></div>
                <div className="tri tri2"></div>
              </div>
              <input
                className="group22"
                type="text"
                name="group"
                value={formData}
                onChange={handleChange}
              />
              <div
                className={`list-group-m2  ${
                  namePass == 'list1' ? 'list-group1 ' : ''
                }`}
              >
                <p
                  className="group-hover p1"
                  onClick={() => hoverItems2('بناءواعمار')}
                >
                  بناءواعمار
                </p>
                <div></div>
                <p
                  className="group-hover p2"
                  onClick={() => hoverItems2('خدمات لأماكن عامة')}
                >
                  خدمات لأماكن عامة
                </p>
                <div></div>
                <p
                  className="group-hover p2"
                  onClick={() => hoverItems2('خدمات منوعة')}
                >
                  خدمات منوعة
                </p>
                <div></div>
                <p
                  className="group-hover p2"
                  onClick={() => hoverItems2('مركبات واليات')}
                >
                  مركبات واليات
                </p>
                <div></div>

                <p
                  className="group-hover p3"
                  onClick={() => hoverItems2('أخرى')}
                >
                  أخرى
                </p>
              </div>
              <div className="product-name">
                <label className="product-name-label">اسم المنتج</label>
                <input type="text" />
              </div>
              <div className="product-name">
                <label className="product-name-label"> تاريخ البدء</label>
                <input
                  type="date"
                  placeholder="kkkk"
                  onKeyDown={handleKeyDown}
                />
              </div>
              <div className="product-name">
                <label className="product-name-label"> تاريخ الانتهاء</label>
                <input type="date" placeholder="" onKeyDown={handleKeyDown} />
              </div>
              <div className="product-name">
                <label className="product-name-label">عدد المنتجات</label>
                <input type="text" />
              </div>

              <button className="send-auction">إرسال</button>
            </div>
          </form>
        </div>
        <div className="create-auction-data2">
          <div className="list-data">
            <button
              onClick={() => handleHover('بيانات')}
              className={hover == 'بيانات' ? 'back' : ''}
            >
              البيانات
            </button>
            <button
              onClick={() => handleHover('الصور')}
              className={hover == 'الصور' ? 'back' : ''}
            >
              الصور
            </button>
            <button
              onClick={() => handleHover('الفيديو')}
              className={hover == 'الفيديو' ? 'back' : ''}
            >
              الفيديو
            </button>
          </div>
          {hover == 'بيانات' && (
            <div>
              <textarea
                className="textarea"
                placeholder="اكتب ما تود إضافتهُ من معلومات توضيحية اكثر هنا"
              />
            </div>
          )}
          <div>
            {hover == 'الصور' && (
              <div>
                <label for="file">
                  <i className="upload fa fa-upload"></i>
                  <p className="upload">تحميل صور من جهازك</p>
                </label>
                <input
                  id="file"
                  type="file"
                  className="image-input"
                  placeholder=" "
                  onChange={handleImageChange}
                  accept="image/*"
                  key={fileInputKey}
                  multiple
                />
                <div
                  style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    marginTop: '30px',
                  }}
                >
                  {images.map((image, index) => (
                    <div className="div-choose">
                      <img
                        key={index}
                        src={image}
                        alt={`preview-${index}`}
                        className="img-choose"
                      />
                      <button
                        className="choose"
                        onClick={() => removeImage(index)}
                      >
                        x
                      </button>
                      <label htmlFor={`replace-${index}`}>
                        <i className="rep fa fa-exchange-alt"></i>
                      </label>
                      <input
                        type="file"
                        accept="image/*"
                        id={`replace-${index}`} // تأكد من استخدام معرف فريد لكل عنصر
                        className="replace"
                        onChange={(e) => handleReplaceImage(index, e)}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          <div>
            {hover == 'الفيديو' && (
              <div>
                <label for="file">
                  <i className="upload fa fa-upload"></i>
                  <p className="upload">تحميل فيديو من جهازك</p>
                </label>
                <input
                  type="file"
                  id="file"
                  className="image-input"
                  onChange={handleVideoChange}
                  accept="video/*"
                />
                {videoSrc && (
                  <div>
                    <video className="video" controls>
                      <source src={videoSrc} type="video/mp4" />
                      متصفحك لا يدعم تشغيل الفيديو.
                    </video>
                    <button
                      onClick={handleDeleteVideo}
                      className="choose choose1"
                    >
                      x
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
