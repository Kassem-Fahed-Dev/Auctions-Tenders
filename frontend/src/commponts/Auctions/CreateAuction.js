import Navbar from '../Home/Navbar';
import { useState } from 'react';
import axios from 'axios';
export default function CreateAuction() {
  const [formData, setFormData] = useState('');
  const [hover, setHover] = useState('بيانات');
  const [namePass, setNamePase] = useState(['list1']);
  const [namePass1, setNamePase1] = useState('');
  const [errorMessage, setErrorMessage] = useState({});
  const [formData1, setFormData1] = useState({
    auction: {
      auctionTtile: '',
      startTime: '',
      endTime: '',
      minimumIncrement: '',
      startingPrice: '',
    },
    item: {
      category: '',
      name: '',
      description: '',
      status: '',
      properties: [{}],
    },
  });
  function goback() {
    window.history.go(-1);
  }

  //   تطبيق الحركة على مربع الادخال
  const hoverItems1 = (items) => {
    if (namePass1.includes(items) == false) {
      setNamePase1(items);
    }
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
  //الصور
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
        const updatedImages = [...prevImages]; // إنشاء نسخة من القائمة الأصلية
        updatedImages[index] = newImage; // استبدال الصورة في موقع الـ index المحدد
        return updatedImages; // إرجاع القائمة المحدثة
      });
    }
  };
  //الفيديو
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
  // المجموعة
  const [keyList, setKeyList] = useState([]);
  const hoverItems2 = (items) => {
    setNamePase1(' ');
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
        const properties = res.data.data.data[0].properties;
        console.log(res);
        setKeyList(properties.map((property) => property.key)); // إضافة المفتاح إلى القائمة
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
      });
  };
  const handleSubmit = () => {};
  const handleChange1 = (e) => {
    const { name, value } = e.target;
    setFormData1({ ...formData1, [name]: value });
  };
  return (
    <div className="create-auction-button">
      <Navbar wordBlod={'auctions'} />
      <p className="createp">إنشاء مزاد</p>
      <button className="	fas fa-chevron-left" onClick={goback}></button>
      <form  onSubmit={handleSubmit}>
      <div className="create-auction-data">
        <div className="create-auction-data1">
          <div className="create-auction-form">
            <div className="group1">
              {/* <div>حدد المجموعة</div> */}
              <label className="group-label"  title='بعد اختيار المجموعة ستظهر معلومات أخرى تحتاج إلى ملأها'>حدد المجموعة</label>
              <div
                className={`triangle tri3  ${
                  formData === 'سيارات' ||
                  formData === 'عقارات' ||
                  formData === 'إلكترونيات' ||
                  formData === 'أثاث' ||
                  formData === 'إكسسوارات' ||
                  formData === 'ملابس' ||
                  formData === 'أخرى'
                    ? 'triangle1'
                    : ''
                } `}
                onClick={() => hoverItems1('list2')}
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
                title='بعد اختيار المجموعة ستظهر معلومات أخرى تحتاج إلى ملأها'
              />
              <div
                className={`list-group-m  ${
                  namePass1.includes('list2') ? 'list-group1 ' : ''
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
                  onClick={() => hoverItems2('إكسسوارات')}
                >
                  إكسسوارات
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

              <div className="product-name">
                <label className="product-name-label">اسم المنتج</label>
                <input type="text"     
                name="name"
                  value={formData1.item.name}
                  onChange={handleChange1} />
              </div>
              <div>
                {keyList.length > 0 &&
                  keyList.map((key) => (
                    <div className="product-name" key={key}>
                      <label className="product-name-label">{key}</label>
                      <input type="text" />
                    </div>
                  ))}
                {/* {errorMessage && <p>{errorMessage.messageBackend}</p>} */}
              </div>
              <div className="auction3">
                <label className="product-name-label">حالة المنتج: </label>
                <div className="status">
                  <div>
                    <label>مستعمل </label>
                    <input type="radio" name="status" />
                  </div>
                  <div>
                    <label>جديد </label>
                    <input type="radio" name="status" />
                  </div>
                </div>
              </div>
            </div>
            {/* ------ */}
            <div className="auction2">
              <div className="product-name">
                <label className="product-name-label">اسم المزاد</label>
                <input
                  type="text"
                  name="auctionTtile"
                  value={formData1.auction.auctionTtile}
                  onChange={handleChange1}
                />
              </div>

              <div className="product-name">
                <label className="product-name-label"> تاريخ البدء</label>
                <input
                  type="date"
                  onKeyDown={handleKeyDown}
                  name="startTime"
                  value={formData1.auction.startTime}
                  onChange={handleChange1}
                />
              </div>
              <div className="product-name">
                <label className="product-name-label"> تاريخ الانتهاء</label>
                <input
                  type="date"
                  onKeyDown={handleKeyDown}
                  name="endTime"
                  value={formData1.auction.endTime}
                  onChange={handleChange1}
                />
              </div>

              <div className="product-name">
                <label className="product-name-label">سعر الافتتاح </label>
                <input
                  type="text"
                  name="startingPrice"
                  value={formData1.auction.startingPrice}
                  onChange={handleChange1}
                />
              </div>
              <div className="product-name">
                <label className="product-name-label"> مقدار الزيادة </label>
                <input type="text" />
              </div>
              <button className="send-auction">إرسال</button>
            </div>
          </div>
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
                      {/* <label for="replace">
                        <i className="rep fa fa-exchange-alt"></i>
                      </label>
                      <input
                        type="file"
                        accept="image/*"
                        id="replace"
                        className="replace"
                        onChange={(e) => handleReplaceImage(index, e)}
                      /> */}
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
      </form>
    </div>
  );
}
