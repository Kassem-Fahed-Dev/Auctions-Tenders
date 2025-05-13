import './CreateAcount.css';
import { useEffect, useState } from 'react';
import imag from '../../image/logo.png';
import { useNavigate } from 'react-router-dom';
import React, { useRef } from 'react';
import axios from 'axios';
import axiosInstance from '../AxiosInterceptors';
export default function CreateAcount() {
  const navegate = useNavigate();
  const navegate1 = useNavigate();
  const navegate2 = useNavigate();
  //   usestate
  const [namePass, setNamePase] = useState([]);
  const [errorMessage, setErrorMessage] = useState({});
  const [errorMessage1, setErrorMessage1] = useState({});
  const [hover, setHover] = useState('spinner');
  // const [hover1, setHover1] = useState('');
  const [value2, setValue2] = useState('');
  const [hidden3, setHidden3] = useState(false);
  const [hover2, setHover2] = useState('spinner');
  const [hover4, setHover4] = useState('spinner');
  const [hover3, setHover3] = useState('');
  const [hover5, setHover5] = useState('');
  const [value, setValue] = useState('');
  const [errorMessage2, setErrorMessage2] = useState({});
  const [errorMessage4, setErrorMessage4] = useState({});
  const [token, setResetToken] = useState('');
  const [name, setName] = useState('');
  const [message5, setErrorMessage5] = useState('');
  const [hover6, setHover6] = useState('spinner');
  const [hover7, setHover7] = useState('');
  const [value1, setValue1] = useState('');

  // لاعمل فوكس على اول مربع ادخال للكود
  useEffect(() => {
    if (input6Ref.current) input6Ref.current.focus();
  });
  // واجهة كلمة المرور الجديدة
  const [formData4, setFormData4] = useState({
    password: '',
    passwordConfirm: '',
    resetToken: '',
  });
  const dataToSubmit2 = {
    ...formData4,
    resetToken: token,
  };

  // واجهة الايميل
  const [formData2, setFormData2] = useState({
    email: '',
  });
  // واجهة الايميل و الكود
  const [formData3, setFormData3] = useState({
    email: '',
    resetCode: '',
  });
  // انشاء حساب
  const [formData, setFormData] = useState({
    name: '',
    password: '',
    email: '',
    phone: '',
    passwordConfirm: '',
    
  });
  //   تسجيل الدخول
  const [formData1, setFormData1] = useState({
    email: '',
    password: '',
  });
  //   الcheckbox
  const [formCheck, setFormCheck] = useState({
    check1: false,
    check2: false,
  });
  // الانتقال من لوغو
  const goToHome=()=>{
    navegate2('/')
  }
  //   تطبيق الحركة على مربع الادخال
  const hoverItems1 = (items) => {
    if (namePass.includes(items) == false) {
      setNamePase([...namePass, items.trim()]);
    }
  };
    localStorage.setItem('status','فرز حسب');
  //   اختيار الموقع

  // const hoverItems2 = (items) => {
  //   setFormData({ ...formData, country: items });
  //   if (namePass.includes('list1')) {
  //     setNamePase(namePass.filter((i) => i !== 'list1'));
  //   }
  // };
  // دالة تنفذ عند onchange لانشاء الحساب
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value.trim() });
  };
  //   دالة checked
  const handleChange1 = (e) => {
    const { name, checked } = e.target;
    setFormCheck({ ...formCheck, [name]: checked });
  };
  //   دالة تنفذ عند ال onchange في تسجيل الدخول
  const handleChange2 = (e) => {
    const { name, value } = e.target;
    setFormData1({ ...formData1, [name]: value.trim() });
  };
  //   دالة الارسال و اظهار الاخطاء في انشاء الحساب
  
  // console.log(tok)
  const handleSubmit1 = (e) => {
    setHover('spinner-click-tow')
    console.log('rr')
    e.preventDefault();
    const valditionErrerors = {};
    if (!formData.name.trim()) {
      valditionErrerors.name = 'هذا الحقل مطلوب.';
      setHover('spinner');
    } else if (!/^[A-Za-zأ-ي]{6,}$/.test(formData.name)) {
      valditionErrerors.name =
        'الاسم يجب أن يتكون من ستة محارف على الأقل(أحرف عربية و إنجيليزية فقط).';
      setHover('spinner');
    }
    if (!formData.password.trim()) {
      valditionErrerors.password = 'هذا الحقل مطلوب.';
      setHover('spinner');
    } else if (
      !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{9,}$/.test(
        formData.password
      )
    ) {
      valditionErrerors.password =
        'كلمة المرور يجب أن تتكون من تسعة محارف على الأقل و يبن أن تكون معقدة(أي تحتوي على : أحرف كبيرة-أحرف صغيرة-رموز-أرقام).';
      setHover('spinner');
    }
    if (!formData.email.trim()) {
      valditionErrerors.email = 'هذا الحقل مطلوب.';
      setHover('spinner');
    } else if (!/^[a-zA-Z0-9._%+-]+@gmail.com$/.test(formData.email)) {
      valditionErrerors.email = 'الأيميل غير صالح.';
      setHover('spinner');
    }
    if (!formData.phone.trim()) {
      valditionErrerors.phone = 'هذا الحقل مطلوب.';
      setHover('spinner');
    } else if (!/^\d{10}$/.test(formData.phone)) {
      valditionErrerors.phone = 'الرقم يجب أن يتكون من عشرة أرقام.';
      setHover('spinner');
    }
    if (!formData.passwordConfirm.trim()) {
      valditionErrerors.passwordConfirm = 'هذا الحقل مطلوب.';
      setHover('spinner');
    } else if (formData.passwordConfirm !== formData.password) {
      valditionErrerors.passwordConfirm = 'لا يوجد تطابق مع كلمة المرور.';
      setHover('spinner');
    }
    if (!formCheck.check1) {
      valditionErrerors.check1 = '.هذا الحقل مطلوب';
      setHover('spinner');
    }
    if (!formCheck.check2) {
      valditionErrerors.check2 = '.هذا الحقل مطلوب';
      setHover('spinner');
    }
    // if (!formData.country.trim()) {
    //   valditionErrerors.country = 'خطأ';
    //   setHover('spinner');
    // }
    setErrorMessage(valditionErrerors);
    console.log(formData)
    // const tok=''
    if (Object.keys(valditionErrerors).length === 0) {
      setHover('spinner-click-tow');
      console.log(formData)
      axiosInstance .post(
         '/api/v1/users/signup',
          JSON.stringify(formData),
          {
            headers: {
              
              'Content-Type': 'application/json',
              'Accept-Language': 'ar',
                'credentials': 'include',
                //  'Authorization': `Bearer ${tok}`
            },
          }
        )
        .then((res) => {
          setHover('spinner');
          console.log(res)
          localStorage.setItem('name',res.data.data.user.name)
          localStorage.setItem('jwt',res.data.token)
          //  tok = localStorage.getItem('jwt');
          navegate('/confirm');
   
        })
        .catch((error) => {
          console.log('error')
          setHover('spinner');
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
    }
  };
  //  دالة تسجيل الدخول تجريبية
  const handleSubmit = (e) => {
    e.preventDefault();
    const valditionErrerors1 = {};
    if (!formData1.email.trim()) {
      valditionErrerors1.email = 'هذا الحقل مطلوب.';
      setHover('spinner');
    } else if (!/^[a-zA-Z0-9._%+-]+@gmail.com$/.test(formData1.email)) {
      valditionErrerors1.email = 'الأيميل غير صالح.';
      setHover('spinner');
    }
    if (!formData1.password.trim()) {
      valditionErrerors1.password = 'هذا الحقل مطلوب.';
      setHover('spinner');
    } else if (
      !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{9,}$/.test(
        formData1.password
      )
    ) {
      valditionErrerors1.password =
        'كلمة المرور يجب أن تتكون من تسعة محارف على الأقل و يبن أن تكون معقدة(أي تحتوي على : أحرف كبيرة-أحرف صغيرة-رموز-أرقام).';
      setHover('spinner');
    }
    setErrorMessage1(valditionErrerors1);
      // const tok1=''
    if (Object.keys(valditionErrerors1).length === 0) {
      setHover('spinner-click');
      axiosInstance
        .post(
          '/api/v1/users/login',
          JSON.stringify(formData1),
          {
            headers: {
              'Content-Type': 'application/json',
              'Accept-Language': 'ar',
                'credentials': 'include',
                // 'credentials': 'include',
                //  'Authorization': `Bearer ${tok1}`
             
            },
          }
        )
        .then((res) => {
          setHover('spinner');
          console.log(res)
          localStorage.setItem('name',res.data.data.user.name)
          localStorage.setItem('jwt',res.data.token)
          // tok1 = localStorage.getItem('jwt');
          navegate('/confirm1');
        })
        .catch((error) => {
          setHover('spinner');
          if (error.response) {
            const validationErrors1 = {};
            validationErrors1.messageBackend = error.response.data.message;
            setErrorMessage1(validationErrors1);
          } else {
            console.log('An unexpected error occurred:', error.message);
            setErrorMessage1({
              messageBackend: 'An unexpected error occurred.',
            });
          }
        });
    }
  };
  // مشان ادخل الايميل و احفظه  لواجهة يلي بعد
  const handleChange3 = (e) => {
    const { name, value } = e.target;
    setFormData2({ [name]: value.trim() });
    setFormData3({ ...formData3, email: value });
  };
  // واجهة الايميل
  const handleSubmit3 = (e) => {
    e.preventDefault();
    setHover2('spinner-click2');
    const valditionErrerors2 = {};
    if (!formData2.email.trim()) {
      valditionErrerors2.email = 'هذا الحقل مطلوب.';
      setHover2('spinner');
    } else if (!/^[a-zA-Z0-9._%+-]+@gmail.com$/.test(formData2.email)) {
      valditionErrerors2.email = 'الأيميل غير صالح.';
      setHover2('spinner');
    }
    setErrorMessage2(valditionErrerors2);
    if (Object.keys(valditionErrerors2).length === 0) {
      axiosInstance
        .post(
          '/api/v1/users/forgotPassword',
          JSON.stringify(formData2),
          {
            headers: {
              'Content-Type': 'application/json',
              'Accept-Language': 'ar',
            },
          }
        )
        .then((res) => {
          setHover2('spinner');
          setHover3('no');
          setValue('code');
          setValue2('');
        })
        .catch((error) => {
          setHover2('spinner');
          if (error.response) {
            const validationErrors2 = {};
            validationErrors2.messageBackend = error.response.data.message;
            setErrorMessage2(validationErrors2);
          } else {
            console.log('An unexpected error occurred:', error.message);
            setErrorMessage2({
              messageBackend: 'An unexpected error occurred.',
            });
          }
        });
    }
  };
  // اخفاء اول واجهة تبع تسجيل الدخول
  const hidden = () => {
    setHidden3(true);
    setValue2('code');
  };
  // مشان ارجع بزر تراجع
  const goback = () => {
    setHidden3(false);
    setValue2('');
    setHover2('spinner');
    setFormData2({ ...formData2, email: '' });
    setErrorMessage2('');
  };
  // مشان خلي مؤش الكتابة ينتقل لحاله بادخال الكود
  const input1Ref = useRef(null);
  const input2Ref = useRef(null);
  const input3Ref = useRef(null);
  const input4Ref = useRef(null);
  const input5Ref = useRef(null);
  const input6Ref = useRef(null);

  const handleChange5 = (index, event) => {
    const { value } = event.target;
    if (value.length === 1) {
      if (index > 0) {
        const nextRef = [
          input1Ref,
          input2Ref,
          input3Ref,
          input4Ref,
          input5Ref,
          input6Ref,
        ][index - 1];
        nextRef.current.focus();
      }
    }
  };

  // واجهة الكود
  const submitCode = (e) => {
    e.preventDefault();
    setHover4('spinner-click3');
    const inputs = document.querySelectorAll('.input-box');
    let code = '';
    inputs.forEach((input) => {
      code += input.value;
    });
    code = code.split('').reverse().join('');
    const dataToSubmit = {
      ...formData2,
      resetCode: code,
    };
    const valditionErrerors4 = {};
    axiosInstance
      .post(
        '/api/v1/users/checkResetCode',
        JSON.stringify(dataToSubmit),
        {
          headers: {
            'Content-Type': 'application/json',
            'Accept-Language': 'ar',
          },
        }
      )
      .then((res) => {
        setHover4('spinner');
        setHover5('no1');
        setValue('');
        setValue1('code');
        setResetToken(res.data.resetToken);
        setName(res.data.userName);
      })
      .catch((error) => {
        setHover4('spinner');

        if (error.response) {
          console.log(error.response.data.message);
          const validationErrors = {};
          validationErrors.messageBackend = error.response.data.message;
          setErrorMessage4(validationErrors);
        } else {
          console.log('An unexpected error occurred:', error.message);
          setErrorMessage4({ messageBackend: 'An unexpected error occurred.' });
        }
      });
  };
  // كلمة المرور الجديدة
  const handleChange4 = (e) => {
    const { name, value } = e.target;
    setFormData4({ ...formData4, [name]: value });
  };

  // ارسال كلمة المرور الجديدة
  const handleSubmit4 = (e) => {
    e.preventDefault();
    const valditionErrerors4 = {};
    if (!formData4.password.trim()) {
      valditionErrerors4.password = 'هذا الحقل مطلوب.';
    } else if (
      !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{9,}$/.test(
        formData4.password
      )
    ) {
      valditionErrerors4.password =
        'كلمة المرور يجب أن تتكون من تسعة محارف على الأقل و يبن أن تكون معقدة(أي تحتوي على : أحرف كبيرة-أحرف صغيرة-رموز-أرقام).';
    }
    if (!formData4.passwordConfirm.trim()) {
      valditionErrerors4.passwordConfirm = 'هذا الحقل مطلوب.';
      setHover6('spinner');
    } else if (formData4.passwordConfirm !== formData4.password) {
      valditionErrerors4.passwordConfirm = 'لا يوجد تطابق مع كلمة المرور.';
      setHover6('spinner');
    }
    setErrorMessage5(valditionErrerors4);
    if (Object.keys(valditionErrerors4).length === 0) {
      setHover6('spinner-click5');
      axiosInstance
        .patch(
          '/api/v1/users/resetPassword',
          JSON.stringify(dataToSubmit2),
          {
            headers: {
              'Content-Type': 'application/json',
              'Accept-Language': 'ar',
            },
          }
        )
        .then((res) => {
          setHover6('spinner');
          setHover7('no');
          navegate1('/');
        })
        .catch((error) => {
          setHover6('spinner');
          if (error.response) {
            const validationErrors4 = {};
            validationErrors4.messageBackend = error.response.data.message;
            setErrorMessage5(validationErrors4);
          } else {
            console.log('An unexpected error occurred:', error.message);
            setErrorMessage5({
              messageBackend: 'An unexpected error occurred.',
            });
          }
        });
    }
  };
  // =====================
   
  

  return (
    <div className="account1">
      <div className="flip-card">
        {/* تسجيل دخول */}
        <div
          className={`log-in ${namePass.includes('rou') ? 'log-in2' : ''} ${
            hidden3 == true ? 'hidden-forget' : 'visibly-forget'
          }`}
        >
          <div className="log-in1">
            <div>
              <div>
                <form onSubmit={handleSubmit}>
                  <div>
                    <p className="in">دخول</p>
                  </div>
                  <div className="name" onClick={() => hoverItems1('name1')}>
                    <i
                      className={` fas fa-envelope email1 ${
                        namePass.includes('name1') ? 'name2 ' : ''
                      }`}
                    ></i>
                    <input
                      type="text"
                      name="email"
                      value={formData1.email}
                      onChange={handleChange2}
                      autoComplete="off"
                    />
                    {errorMessage1.email && (
                      <span className="error0 error-log-in-name">
                        <span className="fa fa-warning"></span>
                        {errorMessage1.email}
                      </span>
                    )}
                    <label
                      className={` ${
                        namePass.includes('name1') ? 'name1 ' : ''
                      }`}
                    >
                      البريد الإلكتروني <span>*</span>
                    </label>
                  </div>
                  <div className="pass" onClick={() => hoverItems1('pass5')}>
                    <i
                      className={`fas fa-lock email1 ${
                        namePass.includes('pass5') ? 'pass2 ' : ''
                      }`}
                    ></i>
                    <input
                      type="password"
                      name="password"
                      value={formData1.password}
                      onChange={handleChange2}
                      autoComplete="off"
                    />
                    {errorMessage1.password && (
                      <span className="error0 error-log-in-password">
                        <span className="fa fa-warning"></span>
                        {errorMessage1.password}
                      </span>
                    )}
                    <label
                      className={` ${
                        namePass.includes('pass5') ? 'pass1 ' : ''
                      }`}
                    >
                      كلمة المرور <span>*</span>
                    </label>
                  </div>
                  {errorMessage1.messageBackend && (
                    <span className="error0 reject">
                      {errorMessage1.messageBackend}
                      <span className="fa fa-warning"></span>
                    </span>
                  )}

                  <div></div>
                  <div className="button-log-in0">
                    <button
                      className={`button-log-in ${
                        hover.includes('spinner-click') ? 'hidden-send' : ''
                      }`}
                    >
                      تسجيل الدخول
                    </button>
                    <div
                      className={`spinn ${
                        hover.includes('spinner-click')
                          ? 'spinner-click'
                          : 'spinner'
                      }`}
                    >
                      {' '}
                      <div className="spinner-border " role="status"></div>
                    </div>
                  </div>
                </form>
                <button className="forget" onClick={hidden}>
                  هل نسيت كلمة المرور؟
                </button>
                <div className="create-account0">
                  <button onClick={() => hoverItems1('rou')}>
                    إنشاء حساب جديد
                  </button>
                  <p>ليس لديك حساب؟</p>
                </div>
              </div>
            </div>

            <div className="hello">
              <p className="hellop1">أهلاً بك!</p>
              <p className="hellop2">سريع، آمن و موثوق به</p>
            </div>
          </div>
        </div>
        {/* ================================واجهة ارسال الايميل================================== */}
        <div
          className={`Modify ${
            value2.includes('code') ? 'visibly-forget' : 'hidden-forget'
          }`}
        >
          <div className={`Modify1`}>
            <p className="forget">هل نسيت كلمة المرور؟</p>
            <div className="forget">
              <p className="forget1">
                لا تقلق على حسابك اتبع الخطوات لاستعادته
              </p>
              <p>
                أدخل عنوان البريد الخاص بك سوف نقوم بإرسال رسالة إليك تحوي على
                رابط يمكنك من تغير كلمة المرور القديمة
              </p>
              {errorMessage2.email && (
                <span className="error0 error-forget">
                  <span className="fa fa-warning"></span>
                  {errorMessage2.email}
                </span>
              )}
              {errorMessage2.messageBackend && (
                <span className="error0 error-forget">
                  <span className="fa fa-warning"></span>
                  {errorMessage2.messageBackend}
                </span>
              )}
              <input
                type="text"
                value={formData2.email}
                id="email"
                name="email"
                onChange={handleChange3}
                className="forget"
                placeholder="أدخل عنوانك البريد هنا"
                autoComplete="off"
              />
              <div className="forget-button">
                <button
                  onClick={handleSubmit3}
                  className={`${hover3.includes('no') ? 'hidden-send' : ''} ${
                    hover2.includes('spinner-click2') ? 'hidden-send' : ''
                  }`}
                >
                  إرسال
                </button>
                <div
                  className={`${
                    hover2.includes('spinner-click2')
                      ? 'spinner-click'
                      : 'spinner'
                  }`}
                >
                  {' '}
                  <div className="spinner-border " role="status"></div>
                </div>
                <button className="button2" onClick={goback}>
                  تراجع
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* ============================واجهة ادخال الكود================================ */}
        <div
          className={`container ${
            value.includes('code') ? 'visibly-forget' : 'hidden-forget'
          }`}
        >
          <p className="forget">هل نسيت كلمة المرور؟</p>
          <div className="forget">
            <p className="forget1">لا تقلق على حسابك اتبع الخطوات لاستعادته</p>
            <p>
              قم بإدخال الكود المكون من 6 خانات الذي تم إرساله إلى بريدك
              الإلكتروني
            </p>
          </div>
          {errorMessage4.messageBackend && (
            <span className="error0 error-code">
              <span className="fa fa-warning"></span>
              {errorMessage4.messageBackend}
            </span>
          )}

          <div className="codeInput">
            <input
              type="text"
              maxlength="1"
              className="input-box"
              pattern="[0-9]"
              ref={input1Ref}
              onChange={(e) => handleChange5(0, e)}
            />
            <input
              type="text"
              maxlength="1"
              className="input-box"
              pattern="[0-9]"
              ref={input2Ref}
              onChange={(e) => handleChange5(1, e)}
            />
            <input
              type="text"
              maxlength="1"
              className="input-box"
              pattern="[0-9]"
              ref={input3Ref}
              onChange={(e) => handleChange5(2, e)}
            />
            <input
              type="text"
              maxlength="1"
              className="input-box"
              pattern="[0-9]"
              ref={input4Ref}
              onChange={(e) => handleChange5(3, e)}
            />
            <input
              type="text"
              maxlength="1"
              className="input-box"
              pattern="[0-9]"
              ref={input5Ref}
              onChange={(e) => handleChange5(4, e)}
            />
            <input
              type="text"
              maxlength="1"
              className="input-box"
              pattern="[0-9]"
              ref={input6Ref}
              onChange={(e) => handleChange5(5, e)}
            />
          </div>
          <p className="finish">
            تنتهي مدة صلاحية الكود بعد <span>10 دقائق</span>
          </p>
          <p className="finish1">لم تتلقى الكود؟</p>
          <button onClick={handleSubmit3} className={`rebet`}>
            إعادة إرسال الكود
          </button>
          <button
            onClick={submitCode}
            className={`code-confirm ${
              hover5.includes('no1') ? 'hidden-send' : ''
            } ${hover4.includes('spinner-click3') ? 'hidden-send' : ''}`}
          >
            التحقق من الكود
          </button>
          <div
            className={`spinn5 ${
              hover4.includes('spinner-click3') ? 'spinner-click' : 'spinner'
            }`}
          >
            {' '}
            <div className="spinner-border " role="status"></div>
          </div>
        </div>
        {/* ==============================واجهة كلمة مرور الجديدة============================= */}
        <div
          className={`container1 ${
            value1.includes('code') ? 'visibly-forget' : 'hidden-forget'
          }`}
        >
          <div className="reset-password">
            <p className="hi">
              أهلاً بك <span className="name">{name}</span>
            </p>
            <div className="forget">
              <p className="forget1">
                يمكنك الآن تعديل كلمة المرور و كتابة كلمة مرور جديدة
              </p>
            </div>
          </div>
          <form className="reset-password-form" onSubmit={handleSubmit4}>
            <label>كلمة المرور الجديدة</label>
            <input
              type="password"
              placeholder="أدخل كلمة المرور هنا"
              name="password"
              value={formData4.password}
              onChange={handleChange4}
            />
            {message5.password && (
              <span className="error0 error-passwo">
                <span className="fa fa-warning"></span>
                {message5.password}
              </span>
            )}
            <label>تأكيد كلمة المرور الجديدة</label>
            <input
              type="password"
              placeholder="أدخل كلمة المرور هنا"
              name="passwordConfirm"
              value={formData4.passwordConfirm}
              onChange={handleChange4}
            />
            {message5.passwordConfirm && (
              <span className="error0 error-passwocon">
                <span className="fa fa-warning"></span>
                {message5.passwordConfirm}
              </span>
            )}
            <button
              className={`${hover7.includes('no') ? 'hidden-send' : ''} ${
                hover6.includes('spinner-click5') ? 'hidden-send' : ''
              }`}
            >
              موافق
            </button>
            <div
              className={`spinn-pass ${
                hover6.includes('spinner-click5') ? 'spinner-click' : 'spinner'
              }`}
            >
              {' '}
              <div className="spinner-border " role="status"></div>
            </div>
          </form>
        </div>
        {/* /------انشاء حساب----------/ */}

        <div
          className={`creat-account-back ${
            namePass.includes('rou') ? 'creat-account-back1' : ''
          }  ${hidden3 == true ? '.hidden-forget' : 'visibly-forget'}`}
        >
          <div className="hello1">
            <p className="hellop1">أهلاً بك!</p>
            <p className="hellop2">سريع، آمن و موثوق به</p>
          </div>
          <div className="form">
            <div>
              <p className="in1">إنشاء حساب جديد</p>
            </div>
            <form onSubmit={handleSubmit1}>
              <div className="name" onClick={() => hoverItems1('name')}>
                <i
                  className={`fas fa-user email1 ${
                    namePass.includes('name') ? 'name2 ' : ''
                  }`}
                ></i>
                <input
                  type="text"
                  value={formData.name}
                  id="username"
                  name="name"
                  onChange={handleChange}
                  autoComplete="off"
                />
                {errorMessage.name && (
                  <span className="error0 error">
                    <span className="fa fa-warning"></span>
                    {errorMessage.name}
                  </span>
                )}

                <label
                  className={` ${namePass.includes('name') ? 'name1 ' : ''}`}
                >
                  اسم المستخدم <span>*</span>
                </label>
              </div>
              <div className="pass" onClick={() => hoverItems1('pass')}>
                <i
                  className={`fas fa-lock email1 ${
                    namePass.includes('pass') ? 'pass2 ' : ''
                  }`}
                ></i>
                <input
                  type="password"
                  value={formData.password}
                  id="password"
                  name="password"
                  onChange={handleChange}
                  autoComplete="off"
                />
                {errorMessage.password && (
                  <span className="error0 error1">
                    <span className="fa fa-warning"></span>
                    {errorMessage.password}
                  </span>
                )}
                <label
                  className={` ${namePass.includes('pass') ? 'pass1 ' : ''}`}
                >
                  كلمة المرور <span>*</span>
                </label>
              </div>
              <div className="pass" onClick={() => hoverItems1('pass1')}>
                <i
                  className={`fas fa-lock email1 ${
                    namePass.includes('pass1') ? 'pass2 ' : ''
                  }`}
                ></i>
                <input
                  type="password"
                  value={formData.passwordConfirm}
                  id="confirmPassword"
                  name="passwordConfirm"
                  onChange={handleChange}
                  autoComplete="off"
                />
                {errorMessage.passwordConfirm && (
                  <span className="error0 error2">
                    <span className="fa fa-warning"></span>
                    {errorMessage.passwordConfirm}
                  </span>
                )}
                <label
                  className={`password1 ${
                    namePass.includes('pass1') ? 'pass1 ' : ''
                  }`}
                >
                  تأكيد كلمة المرور <span>*</span>
                </label>
              </div>
              <div className="pass" onClick={() => hoverItems1('email')}>
                <i
                  className={`fas fa-envelope email1 ${
                    namePass.includes('email') ? 'pass2 ' : ''
                  }`}
                ></i>
                <input
                  type="text"
                  value={formData.email}
                  id="email"
                  name="email"
                  onChange={handleChange}
                  autoComplete="off"
                />
                {errorMessage.email && (
                  <span className="error0 error3">
                    <span className="fa fa-warning"></span>
                    {errorMessage.email}
                  </span>
                )}
                <label
                  className={`password1  ${
                    namePass.includes('email') ? 'pass1 ' : ''
                  }`}
                >
                  البريد الإلكتروني <span>*</span>
                </label>
              </div>
              <div className="pass" onClick={() => hoverItems1('number')}>
                <i
                  className={`fas fa-phone email1 ${
                    namePass.includes('number') ? 'pass2 ' : ''
                  }`}
                ></i>
                <input
                  type="tel"
                  value={formData.phone}
                  id="tel"
                  name="phone"
                  onChange={handleChange}
                  autoComplete="off"
                />
                {errorMessage.phone && (
                  <span className="error0 error4">
                    <span className="fa fa-warning"></span>
                    {errorMessage.phone}
                  </span>
                )}
                <label
                  className={` ${namePass.includes('number') ? 'pass1 ' : ''}`}
                >
                  رقم الهاتف <span>*</span>
                </label>
              </div>
              <div className="location">
                {/* <label className="location1">الموقع</label>
                <div
                  className={`triangle  ${
                    formData.country.includes('دمشق') ||
                    formData.country.includes('حمص') ||
                    formData.country.includes('حلب')
                      ? 'triangle1'
                      : ''
                  } `}
                  onClick={() => hoverItems1('list1')}
                >
                  <div className="tri tri1"></div>
                  <div className="tri"></div>
                </div>

                <input
                  className="location2"
                  type="text"
                  id="location"
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  autoComplete="off"
                />
                {errorMessage.country && (
                  <span className="error0 error7">
                    <span className="fa fa-warning"></span>
                  </span>
                )}
                <div
                  className={`list  ${
                    namePass.includes('list1') ? 'list1 ' : ''
                  }`}
                >
                  <p
                    className="location-hover p1"
                    onClick={() => hoverItems2('دمشق')}
                  >
                    دمشق
                  </p>
                  <div></div>
                  <p
                    className="location-hover p2"
                    onClick={() => hoverItems2('حمص')}
                  >
                    حمص
                  </p>
                  <div></div>
                  <p
                    className="location-hover p3"
                    onClick={() => hoverItems2('حلب')}
                  >
                    حلب
                  </p>
                </div> */}
                <div className="check">
                  <label className="labal-check">
                    <span>*</span>أوافق على الشروط و الأحكام
                  </label>
                  {errorMessage.check1 && (
                    <span className="error0 error5">
                      <span className="fa fa-warning"></span>
                    </span>
                  )}
                  <i className="fas fa-check"></i>
                  <input
                    type="checkbox"
                    id="check1"
                    name="check1"
                    checked={formCheck.check1}
                    onChange={handleChange1}
                  />
                </div>
                <div className="check1">
                  <label className="labal-check1">
                    <span>*</span>السماح باستخدام خدمات المركز الوطني للمعلومات
                    للتحقق من الهاتف
                  </label>
                  {errorMessage.check2 && (
                    <span className="error0 error6">
                      <span className="fa fa-warning"></span>
                    </span>
                  )}
                  <i className="fas fa-check "></i>
                  <input
                    type="checkbox"
                    id="check2"
                    name="check2"
                    checked={formCheck.check2}
                    onChange={handleChange1}
                  />
                </div>
                {errorMessage.messageBackend && (
                  <span className="error0 errorBackend">
                    {errorMessage.messageBackend}
                    <span className="fa fa-warning"></span>
                  </span>
                )}
                <div>
                  <button
                    className={`creat ${
                      hover.includes('spinner-click-tow') ? 'hidden-send' : ''
                    }`}
                  >
                    إنشاء حساب جديد
                  </button>
                  <div
                    className={`spinn1 ${
                      hover.includes('spinner-click-tow')
                        ? 'spinner-click'
                        : 'spinner'
                    }`}
                  >
                    {' '}
                    <div className="spinner-border " role="status"></div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className="side-right">
        <button onClick={goToHome}>
          <img className="footer-logo" src={imag} alt="error" />
        </button>
        <h1 className="side-right-h1">smart world منصة</h1>
        <h6 className="side-right-h6">
          منصة تفاعلية رائدة في تقديم المزادات والمناقصات الالكترونية
        </h6>
      </div>
    </div>
  );
}
