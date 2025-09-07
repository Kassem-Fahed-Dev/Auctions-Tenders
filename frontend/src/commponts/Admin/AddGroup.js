import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import imag from '../../image/logo.png';
import axiosInstance from '../AxiosInterceptors';
export default function AddGroup() {
  const [showDiv, setShowDiv] = useState(null);
  const [cover, setCover] = useState(null);
   const [num, setNum] = useState('');
  const [formData1, setFormData1] = useState({
     type:'',
      name:'' ,
      properties: [],
      image:null, 
  });
  const handleImageChange = (e) => {
     const file = e.target.files[0];
   if (file) {
            setFormData1(prevFormData => ({
                ...prevFormData,
                image: file // تحديث حالة الصورة
            }));
            setCover(URL.createObjectURL(file)); // إنشاء رابط للصورة
        }
        console.log(formData1)
  };
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
const newProperties = [];

for (let index = 0; index < num; index++) {

  rows.push(
 <>
   <div className="second_name_Admin">
                    <p>اسم الحقل </p>
                    <input type="text" name='key' value={formData1.properties[index]?.key} className="name_in" id={index} onChange={(e)=>{handelFild(e)}}/>
                  </div>
                  <div className="con_radios2">
                    <p>النمط :</p>
                    <div>
                      <label className="rad2">نص</label>
                      <input type="radio" value="string" name="dataType" className="r2" id={index} onChange={(e)=>{handelFild(e)}}/>
                    </div>
                    <div>
                      <label className="rad2">رقم</label>
                      <input type="radio" value="number" name="dataType" className="r2" id={index} onChange={(e)=>{handelFild(e)}}/>
                    </div>
                  </div></>
  );
}
for (let i = 0; i < num; i++) {
    newProperties.push({ key: "", dataType: "", required: "true" });
}

// setFormData1({
//     ...formData1,
//     properties: [
//         ...formData1.properties,
//         ...newProperties
//     ]
// });
const [repet,setRepet]=useState('1')
// useEffect(()=>{
// let   count=1;}
// ,[])
if (repet=='1') {
    setFormData1(prevFormData => ({
        ...prevFormData,
        properties: [
            ...prevFormData.properties,
            ...newProperties
        ]
    }));
   setRepet('0')
  }
// const handelFild=(e)=>{
//   const {name,value,id}=e.target
//   setFormData1(prevFormData => ({
//         ...prevFormData,
//         properties: [
//             ...prevFormData.properties,
//             {...prevFormData.properties[id],[name]:value}
//         ]
//     }));
// }
const handelFild = (e) => {
    const { name, value, id } = e.target;

    setFormData1(prevFormData => {
        const updatedProperties = prevFormData.properties.map((property, index) => {
            // تحقق مما إذا كان هذا هو الكائن الذي نريد تحديثه
            if (index === parseInt(id)) {
                return {
                    ...property,
                    [name]: value // تحديث القيمة بناءً على الاسم
                };
            }
            return property; // إرجاع الكائن كما هو إذا لم يكن هو الكائن المستهدف
        });

        return {
            ...prevFormData,
            properties: updatedProperties // تحديث الخصائص بالمصفوفة الجديدة
        };
    });
};

  const handleChange3 = (event) => {
        setNum(event.target.value);
        setRepet('1')
    };
    console.log(formData1.properties)
  const [errorMessage, setErrorMessage] = useState({});
      const [hoverAuction, setHoverAuction] = useState('spinner');

    const [errorMessageAuc, setErrorMessageAuc] = useState({});
  // ================
   const handleSubmit = async (e) => {
    e.preventDefault();

  
    // باقي منطق التحقق من البيانات...
    setHoverAuction('spinner-Auction');
    // const valditionErrerorsAuction = { item: {}, tender: {} };
  
    // استكمال التحقق من صحة البيانات هنا (كما في الكود السابق)
    // ...
  
    // if (
    //   Object.keys(valditionErrerorsAuction.tender).length === 0 &&
    //   Object.keys(valditionErrerorsAuction.item).length === 0
    // ) {
      const token = localStorage.getItem('jwt');
      setHoverAuction('spinner-Auction');
     const valditionErrerorsAuction={}
      axiosInstance
        .post('/api/v1/categories/', JSON.stringify(formData1), {
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
          // navegate('/createTender');
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
    // }
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
                      <input type="text" name={'name'}   value={formData1.name} onChange={(e)=>{handleChange(e)}}/>
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
                    <div className="leftsideGroup">
                      <div className="buttom_side">
                        <p className="qustion1">{formData1?.name==''?'?':formData1?.name}</p>
                      </div>
                      <div className="circlediv">
                        
                        {/* <p className="qustion"><img  src={cover}
                          alt="?"/></p> */}
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
