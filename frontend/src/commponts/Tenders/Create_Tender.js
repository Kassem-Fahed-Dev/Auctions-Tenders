import { useNavigate } from 'react-router-dom';
import Navbar from '../Home/Navbar';
import { useState } from 'react';
import axiosInstance from '../AxiosInterceptors';
import axios from 'axios';
import { useEffect } from 'react';
export default function Create_Tender() {
  const [formData, setFormData] = useState('');
  const [hover, setHover] = useState('بيانات');

  const [errorMessage, setErrorMessage] = useState({});
  const [length, setLength] = '';
  const [key, setKey] = [];

  const [namePass, setNamePase] = useState([]);
  // const [namePass, setNamePase] = useState(['list1']);
  const [namePass1, setNamePase1] = useState('');
  const [hoverAuc, setHoverAuc] = useState('');
  const [hoverAuction, setHoverAuction] = useState('spinner');

  const [errorMessageAuc, setErrorMessageAuc] = useState({});
  const [formData1, setFormData1] = useState({
    tender: {
      tenderTitle: '',
      startTime: '',
      endTime: '',
      city: '',
      startingPrice: '',
    },
    item: {
      category: '',
      name: '',
      description: '',
    },
  });
    const token = localStorage.getItem('jwt');
    const [allTender, setAllTender] = useState([]);
      useEffect(() => {
      axiosInstance
        .get(`/api/v1/categories?type=tender`, {
          headers: {
            'Content-Type': 'application/json',
            'Accept-Language': 'ar',
            credentials: 'include',
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          // if (Array.isArray(res.data)) {
          const x=res.data.data.data
    const names = x.map((item) => item.name);
    setAllTender(names);
           console.log(names);
  // } else {
  //   console.error("Expected res.data to be an array");
  // }
          // setALLAuction(res.data.data.name);
          // setWalletActivity(res.data.data);
          
          // console.log(walletActivity);
        })
        .catch((error) => {
          console.log('error');
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
        });  }, []);
  const navegaet = useNavigate();
  function goback() {
    window.history.go(-1);
  }
  const hoverItems1 = (items) => {
    if (namePass.includes(items) == false) {
      setNamePase([...namePass, items]);
    }
  };
  const [keyList, setKeyList] = useState([]);
  const [len, setLen] = useState(0);
  const [border, setBorder] = useState('');
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const hoverItems2 = (items) => {
    setNamePase1(' ');
    const token = localStorage.getItem('jwt');
    setFormData(items.trim());
    if (namePass.includes('list1')) {
      setNamePase(namePass.filter((i) => i !== 'list1'));
    }

    axiosInstance
      .get(`/api/v1/categories?name=${items}`, {
        headers: {
          'Content-Type': 'application/json',
          'Accept-Language': 'ar',
          credentials: 'include',
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        const properties = res.data.data.data[0].properties;
        setLen(res.data.data.data[0].properties.length);
        setBorder('true');
        console.log(res);
        const auctionId = res.data.data.data[0]._id;
        setIsButtonDisabled(false);
        setKeyList(properties.map((property) => property.key));
        setFormData1((prevData) => ({
          ...prevData,
          item: {
            ...prevData.item,
            category: auctionId,
          },
        }));
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
  const [inputs, setInputs] = useState([]);
  const handleChange2 = (k) => (e) => {
    const { value } = e.target;

    // تحقق من وجود formData1 و item
    if (formData1 && formData1.item) {
      const properties = Array.isArray(formData1.item.properties)
        ? formData1.item.properties
        : []; // إذا لم تكن مصفوفة، استخدم مصفوفة فارغة

      if (properties.some((item) => item?.key === k)) {
        console.log('if');
        setFormData1((prevData) => ({
          ...prevData,
          item: {
            ...prevData.item,
            properties: properties.map((item1) =>
              item1.key === k
                ? { ...item1, value: value.trim() }
                : typeof item1 === 'string'
                ? item1.trim()
                : item1
            ),
          },
        }));
      } else {
        const newObject = { key: k, value: value.trim() };
        console.log('if1');
        setInputs((prevInputs) => {
          const newInputs = [...prevInputs, newObject];

          setFormData1((prevData) => ({
            ...prevData,
            item: {
              ...prevData.item,
              properties: [...properties, newObject], // استخدم properties هنا
            },
          }));

          return newInputs;
        });
      }
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
  const handleChange1 = (e) => {
    const { name, value } = e.target;
    setFormData1((prevData) => ({
      ...prevData,
      [name.includes('tender') ? 'tender' : 'item']: {
        ...prevData[name.includes('tender') ? 'tender' : 'item'],
        [name.includes('tender') ? name.split('.')[1] : name]: value.trim(),
      },
    }));
    console.log(formData1);
  };
  const navegate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();

    // باقي منطق التحقق من البيانات...
    setHoverAuction('spinner-Auction');
    const valditionErrerorsAuction = { item: {}, tender: {} };

    // استكمال التحقق من صحة البيانات هنا (كما في الكود السابق)
    // ...

    if (
      Object.keys(valditionErrerorsAuction.tender).length === 0 &&
      Object.keys(valditionErrerorsAuction.item).length === 0
    ) {
      const token = localStorage.getItem('jwt');
      setHoverAuction('spinner-Auction');

      axiosInstance
        .post('/api/v1/tenders', JSON.stringify(formData1), {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
            'Accept-Language': 'ar',
            credentials: 'include',
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          setHoverAuction('spinner');
          console.log(res);
          navegate('/createTender');
        })
        .catch((error) => {
          setHoverAuction('spinner');
          if (error.response) {
            valditionErrerorsAuction.messageBackend =
              error.response.data.message;
            setErrorMessageAuc(valditionErrerorsAuction);
            console.log('p3');
          } else {
            console.log('An unexpected error occurred:', error.message);
            setErrorMessageAuc({
              messageBackend: 'An unexpected error occurred.',
            });
          }
        });
    }
  };
const rows=[]
for(let i=1;i<allTender?.length-2;i++){
  rows.push( <>
  <div></div>
                  <p
                    className="group-hover p2"
                    onClick={() => hoverItems2(allTender[i])}
                  >
                   {allTender[i]}
                  </p>
                  <div></div></>)
}
  return (
    <div className="create-auction-button">
      <Navbar wordBlod={'tenders'} />
      <p className="createp">إنشاء مناقصة</p>
      <button className="	fas fa-chevron-left" onClick={goback}></button>
      <div className="create-auction-data">
        <div className="create-auction-data1">
          <form className="create-auction-form2" onSubmit={handleSubmit}>
            <div className="auction22">
              <div className="product-name">
                <label className="product-name-label">اسم المناقصة</label>
                <input
                  type="text"
                  name="tender.tenderTitle"
                  value={formData1.tender.tenderTtile}
                  onChange={handleChange1}
                  autoComplete="off"
                />
                {errorMessageAuc.tender?.tenderTtile && (
                  <span className="error0 error-title">
                    {' '}
                    <span className="fa fa-warning"></span>
                    {errorMessageAuc.tender.tenderTtile}
                  </span>
                )}
              </div>
              <label className="group-label">حدد المجموعة</label>
              <div
                className={`triangle tri33  ${
                  // formData === 'بناءواعمار' ||
                  // formData === 'خدمات لأماكن عامة' ||
                  // formData === 'خدمات منوعة' ||
                  // formData === 'مركبات واليات' ||
                  // formData === 'أخرى'
                   allTender?.includes(formData)
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
                  onClick={() => hoverItems2(allTender && allTender?.length > 0 ? allTender[0] : '')}
                >
                     {allTender && allTender?.length > 0 ? allTender[0] : 'لا توجد مجموعات'}
                </p>
                {/* <div></div>
                <p
                  className="group-hover p2"
                  onClick={() => hoverItems2('خدمات لاماكن عامة')}
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
                  مركبات وآليات
                </p>
                <div></div> */}
{rows}
                <p
                  className="group-hover p3"
                  onClick={() => hoverItems2(allTender && allTender?.length > 0 ? allTender[allTender?.length-1] : '')}
                >
                  {allTender && allTender?.length > 0 ? allTender[allTender?.length-1] : ''}
                </p>
              </div>

              <div className="product-name">
                <label className="product-name-label">الموقع</label>
                <input
                  type="text"
                  name="tender.city"
                  value={formData1.tender.city}
                  onChange={handleChange1}
                  autoComplete="off"
                />
                {errorMessageAuc.tender?.city && (
                  <span className="error0 error-title">
                    {' '}
                    <span className="fa fa-warning"></span>
                    {errorMessageAuc.tender.city}
                  </span>
                )}
              </div>
              <div className="product-name">
                <label className="product-name-label"> تاريخ البدء</label>
                <input
                  type="date"
                  onKeyDown={handleKeyDown}
                  name="tender.startTime"
                  value={formData1.tender.startTime}
                  onChange={handleChange1}
                  autoComplete="off"
                />
                {errorMessageAuc.tender?.startTime && (
                  <span className="error0 error-start-time">
                    {' '}
                    <span className="fa fa-warning"></span>
                    {errorMessageAuc.tender.startTime}
                  </span>
                )}
              </div>
              <div className="product-name">
                <label className="product-name-label"> تاريخ الانتهاء</label>
                <input
                  type="date"
                  onKeyDown={handleKeyDown}
                  name="tender.endTime"
                  value={formData1.tender.endTime}
                  onChange={handleChange1}
                  autoComplete="off"
                />
                {errorMessageAuc.tender?.endTime && (
                  <span className="error0 error-end-time">
                    {' '}
                    <span className="fa fa-warning"></span>
                    {errorMessageAuc.tender.endTime}
                  </span>
                )}
              </div>

              <button
                disabled={isButtonDisabled}
                className={`send-auction ${
                  hoverAuc.includes('no') ? 'hidden-send' : ''
                } ${
                  hoverAuction.includes('spinner-Auction') ? 'hidden-send' : ''
                } ${
                  isButtonDisabled == true ? 'send-auction1' : 'send-auction'
                }`}
              >
                إرسال
              </button>
            </div>
            <div className="group1">
              <div className="product-name">
                <label className="product-name-label">اسم المنتج</label>
                <input
                  type="text"
                  name="name"
                  value={formData1.item.name}
                  onChange={handleChange1}
                  autoComplete="off"
                />
                {errorMessageAuc.item?.name && (
                  <span className="error0 error-name">
                    {' '}
                    <span className="fa fa-warning"></span>
                    {errorMessageAuc.item.name}
                  </span>
                )}
              </div>

              <div className="gr">
                <p>بيانات خاصة بمجموعة {formData}:</p>
                <div className={`${border === 'true' ? 'bor' : ''}`}>
                  {keyList.length > 0 &&
                    keyList.map((key) => (
                      <div className="product-name" key={key}>
                        <label className="product-name-label">{key}</label>
                        <input
                          type={`${
                            key == 'لون السيارة' ||
                            key == 'الموقع' ||
                            key == 'لون الإكسسوار' ||
                            key == 'نوع الإكسسوار' ||
                            key == ' لون الجهاز' ||
                            key == 'النوع' ||
                            key == 'المادة' ||
                            key == 'اللون' ||
                            key == 'العلامة التجارية' ||
                            key == 'موديل الجهاز' ||
                            key == 'نوع القطعة' ||
                            key == 'لون الأثاث' ||
                            key == 'المقاس' ||
                            key == 'المجموعة التي ينتمي لها' ||
                            key == 'اسم العنصر'
                              ? 'text'
                              : 'number'
                          }`}
                          onChange={handleChange2(key)}
                          autoComplete="off"
                        />
                      </div>
                    ))}
                  {errorMessageAuc.item?.properties && (
                    <span className="error0 error-gr">
                      <span className="fa fa-warning"></span>
                      {errorMessageAuc.item.properties}
                    </span>
                  )}
                </div>
              </div>
              <div className="auction3">
                {errorMessageAuc.item?.status && (
                  <span className="error0 error-status">
                    {' '}
                    <span className="fa fa-warning"></span>
                  </span>
                )}
              </div>

              <div className="product-name">
                <label className="product-name-label">السعر الابتدائي</label>
                <input
                  type="number"
                  name="tender.startingPrice"
                  value={formData1.tender.startingPrice}
                  onChange={handleChange1}
                  autoComplete="off"
                />
                {errorMessageAuc.tender?.startingPrice && (
                  <span className="error0 error-name">
                    {' '}
                    <span className="fa fa-warning"></span>
                    {errorMessageAuc.tender.startingPrice}
                  </span>
                )}
              </div>
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
            {/* <button
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
            </button> */}
          </div>
          {hover == 'بيانات' && (
            <div>
              <textarea
                className="textarea"
                placeholder="اكتب ما تود إضافتهُ من معلومات توضيحية اكثر هنا"
                name="description"
                value={formData1.item?.description}
                onChange={handleChange1}
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
