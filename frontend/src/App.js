import logo from './logo.svg';
import './App.css';
import Home from './commponts/Home/Home';
import { Routes,Route } from 'react-router-dom';
import Privacy from './commponts/privacy policy/Privacy';
import Privacy1 from './commponts/privacy policy/Privacy1';
import CreateAcount from './commponts/Account/CreateAcount';
import Confirm from './commponts/Account/Confirm';

function App() {
  return (
    <div className="App">
        <Routes>
        <Route path='/' element={<Home/>}/>
         <Route path='/privacy' element={<Privacy/>}/>
         <Route path='/privacy1' element={<Privacy1/>}/>
         <Route path='/acount' element={<CreateAcount/>}/>
         <Route path='/confirm' element={<Confirm message={"تم إنشاء حساب بنجاح"}/>}/>
         <Route path='/confirm1' element={<Confirm message={"تم تسجيل الدخول بنجاح"}/>}/>
        </Routes>
        
    </div>
  );
}

export default App;
