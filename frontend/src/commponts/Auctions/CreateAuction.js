import Navbar from '../Home/Navbar';
import { useState } from 'react';
import React from 'react';
import axios from 'axios';
import axiosInstance from '../AxiosInterceptors';
import { useNavigate } from 'react-router-dom';
export default function CreateAuction() {
  const [formData, setFormData] = useState('');
  const token = localStorage.getItem('jwt');
  const [hover, setHover] = useState('بيانات');
  const [namePass, setNamePase] = useState(['list1']);
  const [namePass1, setNamePase1] = useState('');
  const [hoverAuc, setHoverAuc] = useState('');
  const [hoverAuction, setHoverAuction] = useState('spinner');
  const [errorMessage, setErrorMessage] = useState({});
  const [errorMessageAuc, setErrorMessageAuc] = useState({});
  const navegate = useNavigate();
  const [formData1, setFormData1] = useState({
    auction: {
      auctionTitle: '',
      startTime: '',
      endTime: '',
      minimumIncrement: '',
      startingPrice: '',
      numberOfItems: '',
      city: '',
    },
    item: {
      category: '',
      name: '',
      status: '',
      description: '',
      properties: [],
      photo:[],
      video:''
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
    setFormData(value.trim());
  };
  const handleKeyDown = (e) => {
    e.preventDefault();
  };
  const handleHover = (item) => {
    setHover(item);
  };
  //الصور
  // const [images, setImages] = useState([]);
  // const [fileInputKey, setFileInputKey] = useState(Date.now());
   //const [ selectedFiles,  setselectedFiles] = useState([]);
//  const handleImageChange = (event) => {
//     const selectedFiles = Array.from(event.target?.files);
  
//     if (selectedFiles.length > 5) {
//       alert('يرجى اختيار 5 صور أو أقل.');
//       setFileInputKey(Date.now()); // لإعادة تعيين مدخل الملف
//       setImages([]);
//       return;
//     }

//     // تحديث الصور المصورة
//     const newImages = selectedFiles.map((file) => URL.createObjectURL(file));
//     setImages(newImages);

//     // إرسال الملفات إلى Cloudinary
//     const formData = new FormData();
//     selectedFiles.forEach((file) => {
//       formData.append('file', file);
//     });
//     formData.append('upload_preset', 'SmartWorld');

//     axios
//       .post(
//         'https://api.cloudinary.com/v1_1/dzq0odp1k/image/upload',
//         formData
//       )
//       .then((res) => {
//         console.log('Upload successful:', res.data);
//         // يمكنك هنا التعامل مع بيانات الرد إذا لزم الأمر
//       })
//       .catch((error) => {
//         if (error.response) {
//           const validationErrors = {};
//           validationErrors.messageBackend = error.response.data.message;
//           setErrorMessage(validationErrors);
//         } else {
//           console.log('An unexpected error occurred:', error.message);
//           setErrorMessage({
//             messageBackend: 'An unexpected error occurred.',
//           });
//         }
//       });
//   };
// عند اختيار الصور
// ,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,
// const [selectedFiles, setSelectedFiles] = React.useState([]);


// const handleImageChange = (event) => {
//   const files = Array.from(event.target?.files);
//   if (files.length > 5) {
//     alert('يرجى اختيار 5 صور أو أقل.');
//     setFileInputKey(Date.now());
//     setImages([]);
//     setSelectedFiles([]); // تفريغ الملفات المختارة
//     return;
//   }
//   setSelectedFiles(files);
//   const newImages = files.map((file) => URL.createObjectURL(file));
//   setImages(newImages);
// };
// const uploadImages = (files) => {
//   if (!files || !Array.isArray(files)) {
//     console.error('الملفات غير صحيحة أو غير موجودة');
//     return Promise.reject('Invalid files');
//   }

//   const uploadPromises = files.map((file) => {
//   const formData = new FormData();
//   formData.append('file', file);
//   formData.append('upload_preset', 'SmartWorld');
//   console.log(formData)
//   return axiosInstance
//     .post(
//       'https://api.cloudinary.com/v1_1/dzq0odp1k/image/upload',
//       formData
//     )
//     .then((res) => {
//       console.log('Upload successful:', res.data);
//       const public_id = res.data.public_id;
//       console.log(public_id);
      
//       return public_id; // هنا نعيد public_id
//     })
//     .catch((error) => {
//       if (error.response) {
//         const validationErrors = {};
//         validationErrors.messageBackend = error.response.data.message;
//         setErrorMessage(validationErrors);
//       } else {
//         console.log('An unexpected error occurred:', error.message);
//         setErrorMessage({
//           messageBackend: 'حدث خطأ غير متوقع.',
//         });
//       }

//       throw error;
//     });
// });


// return Promise.all(uploadPromises)
//   .then((publicIds) => {
//     console.log('All public IDs:', publicIds);
//     return publicIds; // إرجاع مصفوفة من جميع public_id
//   });

// };

// ,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,
  // const upload = (e) => {
  //   console.log('up')
  //   const formData = new FormData();
  //   formData.append('files', images);
  //   formData.append('upload_preset', 'SmartWorld');
  //   axiosInstance
  //     .post('https://api.cloudinary.com/v1_1/dzq0odp1k//image/upload', formData)
  //     .then((res) => console.log(res))
  //     .catch((error) => {
  //       if (error.response) {
  //         const validationErrors = {};
  //         validationErrors.messageBackend = error.response.data.message;
  //         setErrorMessage(validationErrors);
  //       } else {
  //         console.log('An unexpected error occurred:', error.message);
  //         setErrorMessage({
  //           messageBackend: 'An unexpected error occurred.',
  //         });
  //       }
  //     });
  // };
  // const removeImage = (index , event) => {
  //   const file = event.target.files[0];
  //   setImages((prevImages) => prevImages.filter((_, i) => i !== index));
  //   setSelectedFiles((prevImages) => prevImages.filter(() => i !== index));
  // };
const removeImage = (index,event) => {
   event.preventDefault();
  setImages((prevImages) => prevImages.filter((_, i) => i !== index));
  setSelectedFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
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
       setSelectedFiles((prevImages) => {
        const updatedImages = [...prevImages];
       updatedImages[index] = file;
        return updatedImages;
      });
    }
  };
  //الفيديو
  const [fileInputKey1, setFileInputKey1] = useState(Date.now());
const [selectedFiles1, setSelectedFiles1] = useState([]);
  const handleDeleteVideo = (event) => {
       event.preventDefault();
    setVideoSrc(null);
    setSelectedFiles1(null);
  };
  const [videoSrc, setVideoSrc] = useState(null);
  const handleVideoChange = (event) => {
    const file = event.target.files[0];
    if (file) {
        setSelectedFiles1(file);
      setVideoSrc(null);
      const vid1 = URL.createObjectURL(file);
      setTimeout(() => {
        setVideoSrc(vid1);
      }, 0);
    }
  };
  // المجموعة
  const [keyList, setKeyList] = useState([]);
  const [len, setLen] = useState(0);
  const [border, setBorder] = useState('');
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
  // ;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
  const [url1,setUrl1]=useState(null)
const uploadVideo = (files) => {
  if (!files || !Array.isArray(files)) {
    console.error("الملفات غير صحيحة أو غير موجودة");
    return Promise.reject("Invalid files");
  }

  const formData = new FormData();
  files.forEach((file) => {
    formData.append("files", file); // 🔑 same key "files" for all files
  });

  return axiosInstance
    .post("/api/v1/cloudinary/upload-multiple", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
         'Accept-Language': 'ar',
            credentials: 'include',
            Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => {
      console.log("Upload successful:",res.data);
      const url1=res.data.data.urls
    
  return url1
  
    })
    .catch((error) => {
      if (error.response) {
        setErrorMessage({
          messageBackend: error.response.data.message,
        });
      } else {
        console.log("An unexpected error occurred:", error.message);
        setErrorMessage({
          messageBackend: "حدث خطأ غير متوقع.",
        });
      }
      throw error;
    });
};

//  444444444444444444444444444
  const [images, setImages] = useState([]);
const [fileInputKey, setFileInputKey] = useState(Date.now());
const [selectedFiles, setSelectedFiles] = useState([]);
console.log(selectedFiles1)
const handleImageChange = (event) => {
  const files = Array.from(event.target?.files);
  if (files.length > 5) {
    alert("يرجى اختيار 5 صور أو أقل.");
    setFileInputKey(Date.now());
    setImages([]);
    setSelectedFiles([]);
    return;
  }
  setSelectedFiles(files);
  const newImages = files.map((file) => URL.createObjectURL(file));
  setImages(newImages);
};
const [url,setUrl]=useState(null)
const uploadImages = (files) => {
  if (!files || !Array.isArray(files)) {
    console.error("الملفات غير صحيحة أو غير موجودة");
    return Promise.reject("Invalid files");
  }

  const formData = new FormData();
  files.forEach((file) => {
    formData.append("files", file); // 🔑 same key "files" for all files
  });

  return axiosInstance
    .post("/api/v1/cloudinary/upload-multiple", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
         'Accept-Language': 'ar',
            credentials: 'include',
            Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => {
      console.log("Upload successful:",res.data);
      const urls=res.data.data.urls
    
  return urls
  
    })
    .catch((error) => {
      if (error.response) {
        setErrorMessage({
          messageBackend: error.response.data.message,
        });
      } else {
        console.log("An unexpected error occurred:", error.message);
        setErrorMessage({
          messageBackend: "حدث خطأ غير متوقع.",
        });
      }
      throw error;
    });
};


  let pic;
  let video;
console.log(selectedFiles);
const handleSubmit = async (e) => {
  e.preventDefault();
  console.log('cha');
  console.log(selectedFiles);
  setHoverAuction('spinner-Auction');

  try {
    // رفع الصور ورجوع الروابط
    const pic = await uploadImages(selectedFiles);
    console.log("Returned URLs:", pic);

    // خزّن بالرابط أول صورة (أو كل الصور حسب حاجتك)
    const imageUrl = pic;

    // حدّث الـ state (اختياري للعرض)
    setFormData1((prevState) => ({
      ...prevState,
      item: { ...prevState.item, photo: imageUrl },
    }));

    // ابعث البيانات مباشرة مع الرابط
    let payload1 = {
      ...formData1,
      item: { ...formData1.item, photo: imageUrl }, // ✅ هون بنضيف الرابط بشكل أكيد
    };

    // الآن نرفع الفيديو
    // const video = await uploadVideo(selectedFiles1);
    // console.log("Returned URLs:", video);

    // خزّن بالرابط أول فيديو (أو كل الفيديوهات حسب حاجتك)
    // const vid1Url = video;

    // حدّث الـ state (اختياري للعرض)
    // setFormData1((prevState) => ({
    //   ...prevState,
    //   item: { ...prevState.item, video: vid1Url },
    // }));

    // ابعث البيانات مباشرة مع الرابط
    // const payload = {
    //   ...payload1, // استخدم payload1 هنا
    //   item: { ...payload1.item, video: vid1Url }, // ✅ هون بنضيف الرابط بشكل أكيد
    // };

    console.log("ll", pic);
    // console.log("pp", video);

    // باقي منطق التحقق من البيانات...
    setHoverAuction('spinner-Auction');
    const valditionErrerorsAuction = { item: {}, auction: {} };

    // استكمال التحقق من صحة البيانات هنا (كما في الكود السابق)
    // ...

    if (
      Object.keys(valditionErrerorsAuction.auction).length === 0 &&
      Object.keys(valditionErrerorsAuction.item).length === 0
    ) {
      const token = localStorage.getItem('jwt');
      setHoverAuction('spinner-Auction');

      axiosInstance
        .post('/api/v1/auctions', JSON.stringify(payload1), {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
            'Accept-Language': 'ar',
            credentials: 'include',
            Authorization:` Bearer ${token}`, // تأكد من استخدام القيم الصحيحة هنا
          },
        })
        .then((res) => {
          setHoverAuction('spinner');
          console.log(res);
          navegate('/createAuctions');
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
  } catch (uploadError) {
    // معالجة أخطاء رفع الصور إذا كانت هناك حاجة
    console.error('خطأ أثناء رفع الصور:', uploadError);
    setHoverAuction('spinner');
    return;
  }
};

  const handleChange1 = (e) => {
    const { name, value } = e.target;
    setFormData1((prevData) => ({
      ...prevData,
      [name.includes('auction') ? 'auction' : 'item']: {
        ...prevData[name.includes('auction') ? 'auction' : 'item'],
        [name.includes('auction') ? name.split('.')[1] : name]: value.trim(),
      },
    }));
  };
  const [inputs, setInputs] = useState([]);
  // const [updatedInputs, setUpdatedInputs] = useState([]);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const handleChange2 = (k) => (e) => {
    const { value } = e.target;

    if (formData1.item.properties.some((item) => item.key === k)) {
      setFormData1((prevData) => ({
        ...prevData,
        item: {
          ...prevData.item,
          properties: prevData.item.properties.map((item1) =>
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

      setInputs((prevInputs) => {
        const newInputs = [...prevInputs, newObject];

        setFormData1((prevData) => ({
          ...prevData,
          item: {
            ...prevData.item,
            properties: [...prevData.item.properties, newObject],
          },
        }));

        return newInputs;
      });
    }
  };

  return (
    <div className="create-auction-button">
      <Navbar wordBlod={'auctions'} />
      <p className="createp">إنشاء مزاد</p>
      <button className="	fas fa-chevron-left" onClick={goback}></button>
      <form >
        <div className="create-auction-data">
          <div className="create-auction-data1">
            <div className="create-auction-form">
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
                <div className="product-name">
                  <label className="product-name-label">عدد المنتجات</label>
                  <input
                    type="number"
                    name="auction.numberOfItems"
                    value={formData1.auction.numberOfItems}
                    onChange={handleChange1}
                    autoComplete="off"
                  />
                  {errorMessageAuc.auction?.numberOfItems && (
                    <span className="error0 error-name">
                      {' '}
                      <span className="fa fa-warning"></span>
                      {errorMessageAuc.auction.numberOfItems}
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
                  <label className="product-name-label">حالة المنتج: </label>
                  <div className="status">
                    <div>
                      <label>مستعمل </label>
                      <input
                        type="radio"
                        name="status"
                        value="مستعمل"
                        onChange={handleChange1}
                      />
                    </div>
                    <div>
                      <label>جديد </label>
                      <input
                        type="radio"
                        name="status"
                        value="جديد"
                        onChange={handleChange1}
                      />
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
                    name="auction.auctionTitle"
                    value={formData1.auction.auctionTitle}
                    onChange={handleChange1}
                    autoComplete="off"
                  />
                  {errorMessageAuc.auction?.auctionTitle && (
                    <span className="error0 error-title">
                      {' '}
                      <span className="fa fa-warning"></span>
                      {errorMessageAuc.auction.auctionTitle}
                    </span>
                  )}
                </div>
                <label
                  className="group-label"
                  title="بعد اختيار المجموعة ستظهر معلومات أخرى تحتاج إلى ملأها"
                >
                  حدد المجموعة
                </label>
                {errorMessageAuc.item?.category && (
                  <span className="error0 error-category">
                    {' '}
                    <span className="fa fa-warning"></span>
                  </span>
                )}
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
                  autoComplete="off"
                  title="بعد اختيار المجموعة ستظهر معلومات أخرى تحتاج إلى ملأها"
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
                  <label className="product-name-label">الموقع</label>
                  <input
                    type="text"
                    name="auction.city"
                    value={formData1.auction.city}
                    onChange={handleChange1}
                    autoComplete="off"
                  />
                  {errorMessageAuc.auction?.city && (
                    <span className="error0 error-title">
                      {' '}
                      <span className="fa fa-warning"></span>
                      {errorMessageAuc.auction.city}
                    </span>
                  )}
                </div>
                <div className="product-name">
                  <label className="product-name-label"> تاريخ البدء</label>
                  <input
                    type="date"
                    onKeyDown={handleKeyDown}
                    name="auction.startTime"
                    value={formData1.auction.startTime}
                    onChange={handleChange1}
                    autoComplete="off"
                  />
                  {errorMessageAuc.auction?.startTime && (
                    <span className="error0 error-start-time">
                      {' '}
                      <span className="fa fa-warning"></span>
                      {errorMessageAuc.auction.startTime}
                    </span>
                  )}
                </div>
                <div className="product-name">
                  <label className="product-name-label"> تاريخ الانتهاء</label>
                  <input
                    type="date"
                    onKeyDown={handleKeyDown}
                    name="auction.endTime"
                    value={formData1.auction.endTime}
                    onChange={handleChange1}
                    autoComplete="off"
                  />
                  {errorMessageAuc.auction?.endTime && (
                    <span className="error0 error-end-time">
                      {' '}
                      <span className="fa fa-warning"></span>
                      {errorMessageAuc.auction.endTime}
                    </span>
                  )}
                </div>

                <div className="product-name">
                  <label className="product-name-label">سعر الافتتاح </label>
                  <input
                    type="number"
                    name="auction.startingPrice"
                    value={formData1.auction.startingPrice}
                    onChange={handleChange1}
                    autoComplete="off"
                  />
                  {errorMessageAuc.auction?.startingPrice && (
                    <span className="error0 error-starting-price">
                      {' '}
                      <span className="fa fa-warning"></span>
                      {errorMessageAuc.auction.startingPrice}
                    </span>
                  )}
                </div>
                <div className="product-name">
                  <label className="product-name-label"> مقدار الزيادة </label>
                  <input
                    type="number"
                    name="auction.minimumIncrement"
                    value={formData1.auction.minimumIncrement}
                    onChange={handleChange1}
                    autoComplete="off"
                  />
                  {errorMessageAuc.auction?.minimumIncrement && (
                    <span className="error0 error-minimumIncrement">
                      {' '}
                      <span className="fa fa-warning"></span>
                      {errorMessageAuc.auction.minimumIncrement}
                    </span>
                  )}
                </div>

                <button
                  disabled={isButtonDisabled}
                  onClick={handleSubmit}
                  className={`send-auction ${
                    hoverAuc.includes('no') ? 'hidden-send' : ''
                  } ${
                    hoverAuction.includes('spinner-Auction')
                      ? 'hidden-send'
                      : ''
                  } ${
                    isButtonDisabled == true ? 'send-auction1' : 'send-auction'
                  }`}
                >
                  إرسال
                </button>
                <div
                  className={`spinn-Auc ${
                    hoverAuction.includes('spinner-Auction')
                      ? 'spinner-click'
                      : 'spinner'
                  }`}
                >
                  {' '}
                  <div className="spinner-border " role="status"></div>
                </div>
              </div>
            </div>
          </div>
          <div className="create-auction-data2">
            <div className="list-data">
              <div
                onClick={() => handleHover('بيانات')}
                className={`de ${hover == 'بيانات' ? 'back' : ''}`}
              >
                البيانات
              </div>
              <div
                onClick={() => handleHover('الصور')}
                className={`de ${hover == 'الصور' ? 'back' : ''}`}
              >
                الصور
              </div>
              <div
                onClick={() => handleHover('الفيديو')}
                className={`de ${hover == 'الفيديو' ? 'back' : ''}`}
              >
                الفيديو
              </div>
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
                         onClick={(event) => removeImage(index, event)}
                        >
                          x
                        </button>
                        <label htmlFor={`replace-${index}`}>
                          <i className="rep fa fa-exchange-alt"></i>
                        </label>
                        <input
                          type="file"
                          accept="image/*"
                          id={`replace-${index}`}
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
      {/* ================================ */}
    </div>
  );
}
