import './CreateAcount.css';
import { useState } from 'react';
import imag from '../../image/logo.png';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
export default function CreateAcount() {
  const navegate = useNavigate();
  //   usestate
  const [namePass, setNamePase] = useState([]);
  const [errorMessage, setErrorMessage] = useState({});
  const [errorMessage1, setErrorMessage1] = useState({});
  const [hover,setHover]=useState('spinner')
  const [hover1,setHover1]=useState('')
  //const [location, setLocation] = useState(' ');
 let messageBackend=""
  // انشاء حساب
  const [formData, setFormData] = useState({
    name: '',
    password: '',
    email: '',
    phone: '',
    passwordConfirm: '',
    country: ''
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

  //   تطبيق الحركة على مربع الادخال
  const hoverItems1 = (items) => {
    if (namePass.includes(items) == false) {
      setNamePase([...namePass, items]);
    }
  };
  //   اختيار الموقع

  const hoverItems2 = (items) => {
    setFormData({ ...formData, country: items });
    if (namePass.includes('list1')) {
      setNamePase(namePass.filter((i) => i !== 'list1'));
    }
  };
  // دالة تنفذ عند onchange لانشاء الحساب
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  //   دالة checked
  const handleChange1 = (e) => {
    const { name, checked } = e.target;
    setFormCheck({ ...formCheck, [name]: checked });
  };
  //   دالة تنفذ عند ال onchange في تسجيل الدخول
  const handleChange2 = (e) => {
    const { name, value } = e.target;
    setFormData1({ ...formData1, [name]: value });
  };
  //   دالة الارسال و اظهار الاخطاء في انشاء الحساب
  const handleSubmit1 = (e) => {
    e.preventDefault();
    const valditionErrerors = {};
    if (!formData.name.trim()) {
      valditionErrerors.name = 'هذا الحقل مطلوب.';
    } else if (!/^[A-Za-zأ-ي]{6,}$/.test(formData.name)) {
      valditionErrerors.name =
        'الاسم يجب أن يتكون من ستة محارف على الأقل(أحرف عربية و إنجيليزية فقط).';
    }
    if (!formData.password.trim()) {
      valditionErrerors.password = 'هذا الحقل مطلوب.';
    } else if (
      !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{9,}$/.test(
        formData.password
      )
    ) {
      valditionErrerors.password =
        'كلمة المرور يجب أن تتكون من تسعة محارف على الأقل و يبن أن تكون معقدة(أي تحتوي على : أحرف كبيرة-أحرف صغيرة-رموز-أرقام).';
    }
    if (!formData.email.trim()) {
      valditionErrerors.email = 'هذا الحقل مطلوب.';
    } else if (!/^[a-zA-Z0-9._%+-]+@gmail.com$/.test(formData.email)) {
      valditionErrerors.email = 'الأيميل غير صالح.';
    }
    if (!formData.phone.trim()) {
      valditionErrerors.phone = 'هذا الحقل مطلوب.';
    } else if (!/^\d{10}$/.test(formData.phone)) {
      valditionErrerors.phone = 'الرقم يجب أن يتكون من عشرة أرقام.';
    }
    if (!formData.passwordConfirm.trim()) {
      valditionErrerors.passwordConfirm = 'هذا الحقل مطلوب.';
    } else if (formData.passwordConfirm !== formData.password) {
      valditionErrerors.passwordConfirm = 'لا يوجد تطابق مع كلمة المرور.';
    }
    if (!formCheck.check1) {
      valditionErrerors.check1 = '.هذا الحقل مطلوب';
    }
    if (!formCheck.check2) {
      valditionErrerors.check2 = '.هذا الحقل مطلوب';
    }
    if (!formData.country.trim()) {
      valditionErrerors.country = 'خطأ';
    }
    setErrorMessage(valditionErrerors);
    if (Object.keys(valditionErrerors).length === 0) {
      setHover('spinner-click-tow')
      //navegate('/confirm');
      axios
        .post(
          'https://testapi-gibt.onrender.com/api/v1/users/signup',
        JSON.stringify(formData),
          {
            headers: {
              'Content-Type': 'application/json',
              'Accept-Language':'ar',
            },
          }
        )
        .then((res) =>{setHover('spinner')
           navegate('/confirm')})
        .catch((error) => {
          setHover('spinner')
          valditionErrerors.messageBackend=error.response.data.message
          setErrorMessage(valditionErrerors);
        });
    }
  };
  //  دالة تسجيل الدخول تجريبية
  const handleSubmit = (e) => {
    e.preventDefault();
   
    const valditionErrerors1 = {};
    if (!formData1.email.trim()) {
      valditionErrerors1.email = 'هذا الحقل مطلوب.';
    
    }
    if (!formData1.password.trim()) {
      valditionErrerors1.password = 'هذا الحقل مطلوب.';
    
    }
    setErrorMessage1(valditionErrerors1);
    if (Object.keys(valditionErrerors1).length === 0) {
      setHover('spinner-click')
    axios
    .post(
      'https://testapi-gibt.onrender.com/api/v1/users/login',
    JSON.stringify(formData1),
      {
        headers: {
          'Content-Type': 'application/json',
          'Accept-Language':'ar',
        },
      }
    )
    .then((res) =>{ setHover('spinner')
    navegate('/confirm1')})
    .catch((error) => {
      setHover('spinner')
      valditionErrerors1.messageBackend=error.response.data.message
      setErrorMessage1(valditionErrerors1);
    });}
  };

  // ----------------------
  return (
    <div className="account1">
      <div class="flip-card">
        {/* تسجيل دخول */}
        <div className={`log-in ${namePass.includes('rou') ? 'log-in2' : ''}`}>
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
                    <button className='forget' onClick={()=>navegate('/Modify')}>هل نسيت كلمة المرور؟</button>
                  <div className="button-log-in0">
                    <button className={`button-log-in ${hover.includes('spinner-click')?'hidden-send':''}`}>تسجيل الدخول</button>
                    <div className={`spinn ${hover.includes('spinner-click')?'spinner-click':'spinner'}`}> <div className='spinner-border ' role='status'></div></div>
                  </div>
                </form>
              
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
        {/* /------انشاء حساب----------/ */}

        <div
          className={`creat-account-back ${
            namePass.includes('rou') ? 'creat-account-back1' : ''
          }`}
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
                <label className="location1">الموقع</label>
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
                </div>
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
               
                  <button className={`creat ${hover.includes('spinner-click-tow')?'hidden-send':''}`}>إنشاء حساب جديد</button>
                  <div className={`spinn1 ${hover.includes('spinner-click-tow')?'spinner-click':'spinner'}`}> <div className='spinner-border ' role='status'></div></div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className="side-right">
        <div>
          <img className="footer-logo" src={imag} alt="error" />
        </div>
        <h1 className="side-right-h1">smart world منصة</h1>
        <h6 className="side-right-h6">
          منصة تفاعلية رائدة في تقديم المزادات والمناقصات الالكترونية
        </h6>
      </div>
    </div>
  );
}
