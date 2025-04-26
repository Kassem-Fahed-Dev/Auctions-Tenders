import axios from 'axios';
// import { logoutUser } from './auth'; // تأكد من تحديث مسار import حسب هيكلة مشروعك

const axiosInstance = axios.create({
  baseURL: 'https://auctions-tenders-38sx.onrender.com', // وضع عنوان API الخاص بك هنا
});

// إضافة interceptor للتعامل مع الأخطاء
axiosInstance.interceptors.response.use(
  response => response,
  error => {
    // افحص الحالة هنا
    console.error('Error encountered:', error)
    if (error.response && error.response.status === 401) {
      // إذا كانت هناك حالة 401، قم بتسجيل الخروج
      console.error('Error encountered:', error)
      localStorage.setItem('jwt',null)
      localStorage.setItem('name','حساب الدخول')
      window.location.href='/'
      alert(error.message)
    }
    return Promise.reject(error); // إعادة الخطأ لكي تتمكن من معالجته في أماكن أخرى إذا لزم الأمر
  }
);

export default axiosInstance;