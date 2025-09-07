import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import imag from '../../image/logo.png';
import React from 'react';
import axiosInstance from '../AxiosInterceptors';
export default function AddGroup() {
  const [showDiv, setShowDiv] = useState(null);
  const [cover, setCover] = useState(null);
   const [num, setNum] = useState('');
      const token = localStorage.getItem('jwt');
  const [formData1, setFormData1] = useState({
     type:'',
      name:'' ,
      properties: [],
      image:'', 
  });
   const [photo, setPhoto] = useState({
    files: []
  });
  // const [selectedFiles, setSelectedFiles] = React.useState([]);
  // const [cover, setCover] = useState(null); // إذا كنت ترغب في تخزين رابط الصورة
// const formData=new FormData()
//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//      setSelectedFiles(file);
//     if (file) {
//       formData.append("files",selectedFiles)
//         console.log('ss',formData);
      // تحديث حالة الصورة بشكل صحيح
      // setPhoto(prevPhoto => ({
      //   ...prevPhoto,
      //   files: [...prevPhoto.files, file] // إضافة الملف الجديد إلى القائمة
      // }));
  //     setCover(URL.createObjectURL(file)); // إنشاء رابط للصورة
  //   }
  //   console.log(selectedFiles);
  // };
//    const [images, setImages] = useState([]);
//     const [fileInputKey, setFileInputKey] = useState(Date.now());
//   const [selectedFiles, setSelectedFiles] = useState([]);
//   const handleImageChange = (event) => {
//   const files = Array.from(event.target?.files);
//   if (files.length > 5) {
//     alert('يرجى اختيار 5 صور أو أقل.');
//     setFileInputKey(Date.now());
//     setImages([]);
//     setSelectedFiles([]); 
//     return;
//   }
//   setSelectedFiles(files);
//   const newImages = files.map((file) => URL.createObjectURL(file));
//   setImages(newImages);
// };

  // const handleImageChange = (e) => {
  //   const files = Array.from(e.target.files); // تحويل الملفات إلى مصفوفة
  //   setSelectedFiles(files); // تحديث الحالة بالملفات المحددة

  //   if (files.length > 0) {
  //     const file = files[0]; // الحصول على أول ملف
  //     const formData = new FormData();
  //     formData.append("files", file); // إضافة الملف إلى FormData

  //     console.log('FormData:', formData);

  //     // إذا كنت ترغب في إنشاء رابط للصورة
  //     setCover(URL.createObjectURL(file)); 
  //   }
  // };

  // const uploadPromises = async () => {
  //   const formData = new FormData();
  //   selectedFiles.forEach(file => {
  //     formData.append("files", file); // إضافة جميع الملفات إلى FormData
  //   });

  //   try {
  //     const response = await axiosInstance.post('/api/v1/cloudinary/upload-multiple', formData, {
  //       headers: {
  //         'Content-Type': 'multipart/form-data',
  //       },
  //     });
  //     console.log('Upload successful:', response.data);
  //   } catch (error) {
  //     console.error('Error uploading files:', error);
  //   }
  // };
//  const uploadImages = (files) => {
//   if (!files || !Array.isArray(files)) {
//     console.error('الملفات غير صحيحة أو غير موجودة');
//     return Promise.reject('Invalid files');
//   }

//   const uploadPromises = files.map((file) => {
//   const formData = new FormData();
//   formData.append('files', file);

//   console.log(formData)
//   return axiosInstance
//     .post(
//       '/api/v1/cloudinary/upload-multiple',
//       formData,{
//           withCredentials: true,
//           headers: {
//             'Content-Type': 'application/json',
//             'Accept-Language': 'ar',
//             credentials: 'include',
//             Authorization: `Bearer ${token}`,
//           },
//         }
//     )
//     .then((res) => {
//       console.log('Upload successful:', res.data);
//       const public_id = res.data.public_id;
//       console.log(public_id);
//       return public_id; 
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

// استخدام Promise.all لانتظار جميع عمليات الرفع وإرجاع مصفوفة من public_id
// return Promise.all(uploadPromises)
//   .then((publicIds) => {
//     console.log('All public IDs:', publicIds);
//     return publicIds; // إرجاع مصفوفة من جميع public_id
//   });

// };

  const goBack = () => {
    window.history.back();
  };
  const [formCheck, setFormCheck] = useState({
    check1: false,
    check2: false,
  });
  const handleChange1 = (e) => {
    const { name, value } = e.target;
    setFormData1({ ...formData1, [name]: value });
    console.log(formData1)
  };
    const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData1({ ...formData1, [name]: value.trim() });
    console.log(formData1)
  };
 const rows = [];
//  let count=1;
//  console.log(num)
// while(count==1){
//   for (let index = 0; index < num; index++) {
// setFormData1({
//     ...formData1,
//     properties: [
//         ...formData1.properties,
//         { key: "", dataType: "", required: "true" }
//     ]
// });

// }
// count=0
// }


for (let index = 0; index < num; index++) {

  rows.push(
 <>
   <div className="second_name_Admin">
                    <p>اسم الحقل </p>
                    <input type="text" name='key' value={formData1.properties[index].key} className="name_in" id={index} onChange={(e)=>{handelFild(e,'key')}}/>
                  </div>
                  <div className="con_radios2">
                    <p>النمط :</p>
                    <div>
                      <label className="rad2">نص</label>
                      <input type="radio" value="string" checked={formData1.properties[index].dataType==='string'} name={`dataType${index}`} className="r2" id={index} onChange={(e)=>{handelFild(e,'dataType')}}/>
                    </div>
                    <div>
                      <label className="rad2">رقم</label>
                      <input type="radio" value="number" checked={formData1.properties[index].dataType==='number'} name={`dataType${index}`} className="r2" id={index} onChange={(e)=>{handelFild(e,'dataType')}}/>
                    </div>
                  </div></>
  );
}
// =============
const [repet,setRepet]=useState('1')
 const handleChange3 = (event) => {
        const newNum = event.target.value;
        setNum(newNum);
        setRepet('1');

        // إعادة تعيين properties إلى مصفوفة فارغة عند تغيير num
        const newProperties = [];
        for (let i = 0; i < newNum; i++) {
            newProperties.push({ key: "", dataType: "", required: "true" });
        }

        // تحديث formData1
        setFormData1(prevFormData => ({
            ...prevFormData,
            properties: newProperties // تعيين newProperties الجديدة
        }));
    };

const handelFild = (e,x) => {
    const { name, value, id } = e.target;

    setFormData1(prevFormData => {
        const updatedProperties = prevFormData.properties.map((property, index) => {
            // تحقق مما إذا كان هذا هو الكائن الذي نريد تحديثه
            if (index === parseInt(id)) {
                return {
                    ...property,
                    [x]: value // تحديث القيمة بناءً على الاسم
                };
            }
            return property; // إرجاع الكائن كما هو إذا لم يكن هو الكائن المستهدف
        });

        return {
            ...prevFormData,
            properties: updatedProperties // تحديث الخصائص بالمصفوفة الجديدة
        };
    });
    console.log(formData1)
};

 
    console.log(formData1.properties)
  const [errorMessage, setErrorMessage] = useState({});
      const [hoverAuction, setHoverAuction] = useState('spinner');

    const [errorMessageAuc, setErrorMessageAuc] = useState({});
      // console.log(selectedFiles);
  // ================
  const [images, setImages] = useState([]);
const [fileInputKey, setFileInputKey] = useState(Date.now());
const [selectedFiles, setSelectedFiles] = useState([]);

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
      const urls=res.data.data.urls[0]
    
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


  // ===================
  const handleSubmit = async (e) => {
  e.preventDefault();

  const valditionErrerorsAuction = {};
  let pic;

  try {
    // رفع الصور ورجوع الروابط
    pic = await uploadImages(selectedFiles);
    console.log("Returned URLs:", pic);

    // خزّن بالرابط أول صورة (أو كل الصور حسب حاجتك)
    const imageUrl = pic;

    // حدّث الـ state (اختياري للعرض)
    setFormData1((prevState) => ({
      ...prevState,
      image: imageUrl,
    }));

    // ابعث البيانات مباشرة مع الرابط
    const payload = {
      ...formData1,
      image: imageUrl, // ✅ هون بنضيف الرابط بشكل أكيد
    };

    setHoverAuction("spinner-Auction");

    await axiosInstance.post("/api/v1/categories/", JSON.stringify(payload), {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
        "Accept-Language": "ar",
        credentials: "include",
        Authorization: `Bearer ${token}`,
      },
    });

    setHoverAuction("spinner");
    console.log("تم إنشاء التصنيف بنجاح ✅");
  } catch (error) {
    setHoverAuction("spinner");
    console.error("خطأ أثناء العملية:", error);

    if (error.response) {
      valditionErrerorsAuction.messageBackend = error.response.data.message;
      setErrorMessageAuc(valditionErrerorsAuction);
    } else {
      setErrorMessageAuc({
        messageBackend: "An unexpected error occurred.",
      });
    }
  }
};

  return (
    <>
      <div className="con-admin">
        <div className="con_sides">
          <div className="sideAdmin">
            <img className="logAdmin" src={imag} alt="logo" />
            <h1 className="side_Admin_h1">منصة Smart World</h1>
            <h6 className="side_Admin_h6">
              منصة تفاعلية رائدة في تقديم المزادات والمناقصات الإلكترونية
            </h6>
            <div className="linksAdmin">
              <Link to="/con">
                <span>
                  <i class="fa-solid fa-house"></i>{' '}
                </span>
                لوحة التحكم{' '}
              </Link>
              <Link to="/use">
                <span>
                  <i class="fa-solid fa-user-large"></i>
                </span>
                مدير المستخدمين{' '}
              </Link>
              <Link to="/Auc">
                <span>
                  <i class="fa-solid fa-gavel"></i>{' '}
                </span>
                مدير المزادات{' '}
              </Link>
              <Link to="/Ten">
                <span>
                  <i class="far fa-handshake"></i>{' '}
                </span>
                مدير المناقصات{' '}
              </Link>
              <Link to="/Gr">
                <span>
                  <i class="fa-solid fa-users"></i>{' '}
                </span>
                مدير المجموعات{' '}
              </Link>
              {/* <Link to="/Pay">
                <span>
                  <i class="fa-solid fa-sack-dollar"></i>{' '}
                </span>{' '}
                الدفع{' '}
              </Link> */}
              <Link to="/Wal">
                <span>
                  <i class="fa-solid fa-wallet"></i>{' '}
                </span>
                مدير المحفظة{' '}
              </Link>
            </div>
          </div>
          <div className="side2">
            <h1 className="h1tit">
              {' '}
              <i className="fa-solid fa-people-group"></i>مدير المجموعات{' '}
            </h1>
            {/* </div>
          </div> */}
            <div className="con_AddGroup1">
              <h3 className="h3inconGroup">
                <i className="fa-solid fa-pen-to-square"></i>
                اضافة مجموعة{' '}
              </h3>
              <div className="con_flextowside">
                <div className="rightsidegroup">
                  <div>
                    <div className="name_input">
                      <p>اسم المجموعة</p>
                      <input type="text" name={'name'}  autoComplete='off' value={formData1.name} onChange={(e)=>{handleChange(e)}}/>
                    </div>
                    <div className="name_input">
                      <p>نوع المجموعة:</p>

                      {/* <div > */}
                      {/* <label >
                    مزاد
                  </label> */}
                      {/* <i className="fas fa-check"></i> */}
                      {/* <input
                    type="checkbox"
                 
                    name="check1"
                    value={'auction'}
                    checked={formCheck.check1}
                    onChange={handleChange1}
                  />
                </div>
                <div >
                  <label >
                    مناقصة
                  </label> */}
                      {/* <i className="fas fa-check "></i> */}
                      {/* <input
                    type="checkbox"
                  
                    name="check2"
                    checked={formCheck.check2}
                    onChange={handleChange1}
                  />
                </div> */}
                      {/* <input type="text" /> */}
                    </div>
                    <div>
                      <label className="aulabel">مزاد</label>
                      <input
                      onChange={(e)=>{handleChange1(e)}}
                        type="radio"
                        value={'auction'}
                        name="type"
                        className="auinput"
                      />
                    </div>
                    <div>
                      <label className="telabel">مناقصة</label>
                      <input
                      onChange={(e)=>{handleChange1(e)}}
                        type="radio"
                        value={'tender'}
                        name="type"
                        className="teinput"
                      />
                    </div>

                    <div className="name_input">
                      <p>صورة غلاف المجموعة</p>

                      <input
                        type="file"
                        id="coverUpload"
                        accept="image/*"
                        style={{ display: 'none' }}
                        onChange={handleImageChange}
                      />
                      {!cover ? (
                        <label htmlFor="coverUpload" className="uploadBtn">
                          <i className="upload fa fa-upload"></i>
                          <span>تحميل صورة من جهازك </span>
                        </label>
                      ) : (
                        <img
                          src={cover}
                          alt="cover"
                          className="coverImagePreview"
                        />
                      )}
                    </div>
                    <div className="leftsideGroup" style={{ backgroundImage: images.length!=0?`url(${images})`:'?',zIndex:'3', backgroundSize: 'cover', backgroundPosition: 'center', padding: '0px', color: 'white' }}>
                      <div className="buttom_side">
                        <p className="qustion1">{formData1?.name==''?'?':formData1?.name}</p>
                      </div>
                      <div className="circlediv" style={{backgroundColor:images.length!=0?'transparent':'rgb(177, 177, 177)'}}>
                        
                        <p className="qustion" style={{color:images.length!=0?'transparent':'#cccccc'}}>?</p>
                      </div>
                    </div>
                    <div className="ptn_group2">
                      <button onClick={(e)=>{handleSubmit(e)}}>حفظ</button>
                      <button
                        className="reject"
                        onClick={() => {
                          goBack();
                        }}
                      >
                        تراجع
                      </button>
                    </div>
                  </div>
                </div>
                <div className="fixdisplay">
                  <div className="second_name_Admin">
                    <p>عدد الحقول الاضافية </p>
                    <input type="number" className="name_in" value={num} onChange={(e)=>{handleChange3(e)}}/>
                  </div>
                {rows}
                </div>
                {/* <div className="leftsideGroup">
                  <div className="buttom_side">
                    <p className="qustion1">?</p>
                  </div>
                  <div className="circlediv">
                    <p className="qustion">?</p>
                  </div>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
