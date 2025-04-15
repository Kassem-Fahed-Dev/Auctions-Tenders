// import './CreateAcount.css';
// import imag from '../../image/logo.png';
// import { useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// export default function Modify(){
//   const navegate = useNavigate();
//     function goback() {
//         // window.history.go(-1);
//         navegate('/acount')
//       }
//       const [hover,setHover]=useState('spinner')
//       const [hover1,setHover1]=useState('')
//       const [value,setValue]=useState('إرسال')
//         const [errorMessage, setErrorMessage] = useState({});
//         const [formData, setFormData] = useState({
//             email: '',
//           });
//           const handleChange = (e) => {
//             const { name, value } = e.target;
//             setFormData({[name]: value });
//           };
//       const handleSubmit=(e)=>{
//         e.preventDefault();
//         setHover('spinner-click')
//     const valditionErrerors = {};
//     if (!formData.email.trim()) {
//         valditionErrerors.email = 'هذا الحقل مطلوب.';
//         console.log('uuuuu')
//       } else if (!/^[a-zA-Z0-9._%+-]+@gmail.com$/.test(formData.email)) {
//         valditionErrerors.email = 'الأيميل غير صالح.';
//       }
//       setErrorMessage(valditionErrerors);
//       if (Object.keys(valditionErrerors).length === 0) {
//         //navegate('/confirm');
//         axios
//           .post(
//             'https://testapi-gibt.onrender.com/api/v1/users/forgotPassword',
//           JSON.stringify(formData),
//             {
//               headers: {
//                 'Content-Type': 'application/json',
//                 'Accept-Language':'ar',
//               },
//             }
//           )
//           .then((res) => {
//           setHover('spinner')
//           setFormData({...formData,email:''})
//           setHover1('green')
//           setValue('تم إرسال')
//           })
//           .catch((error) => {
//             console.log(error.response.data.message)
//             valditionErrerors.messageBackend=error.response.data.message
//             setErrorMessage(valditionErrerors);
//           });
//       }
//       }
//     return(
//         <div className='Modify'>
//           <div className='Modify1'>
           
//           <p className='forget'>هل نسيت كلمة المرور؟</p>
//           <div className='forget'>
//             <p className='forget1'>لا تقلق على حسابك اتبع الخطوات لاستعادته</p>
//             <p>أدخل عنوان البريد الخاص بك سوف نقوم بإرسال رسالة إليك تحوي على رابط يمكنك من تغير كلمة المرور القديمة</p>
//             {errorMessage.email && (
//                   <span className="error0 error3 error-forget">
//                     <span className="fa fa-warning"></span>
//                     {errorMessage.email}
//                   </span>
//                 )}
//             <input   type="text"
//                   value={formData.email}
//                   id="email"
//                   name="email"
//                   onChange={handleChange} className='forget' placeholder='أدخل عنوانك البريد هنا'/>
//             <div className='forget-button'>
//                 <button onClick={handleSubmit} className={`${hover1.includes('green')?'green':''} ${hover.includes('spinner-click')?'hidden-send':''}`} >{value}<i className={`fas fa-check ${hover1.includes('green')?'block1':''}`}></i></button>
//                 <div className={hover.includes('spinner-click')?'spinner-click':'spinner'}> <div className='spinner-border ' role='status'></div></div>
//                 <button className='button2' onClick={goback}>تراجع</button>
//             </div>
//           </div>
//           </div>
//              <div className="side-right">
//                     <div>
//                       <img className="footer-logo" src={imag} alt="error" />
//                     </div>
//                     <h1 className="side-right-h1">smart world منصة</h1>
//                     <h6 className="side-right-h6">
//                       منصة تفاعلية رائدة في تقديم المزادات والمناقصات الالكترونية
//                     </h6>
//                   </div>
//         </div>
//     )
// }