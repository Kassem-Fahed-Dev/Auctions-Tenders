import Navbar from "../Home/Navbar";
import AuctionsNavbar from "./AuctionsNavbar";
import './allauction.css';
import Footer from "../privacy policy/Footer";
import Auction from "./Auction";
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import axiosInstance from "../AxiosInterceptors";
export default function AllAuctions(){
    const [value,setValue]=useState('فرز حسب');
    const [value1,setValue1]=useState('فرز حسب');
    const [value2,setValue2]=useState('');
    const [test,setTest]=useState('')
    const [all,setAll]=useState([])
    const [hover,setHover]=useState(false)
     const [errorMessage, setErrorMessage] = useState({});
    const navegate=useNavigate()
    useEffect(()=>{
      axiosInstance.get('/api/v1/auctions', {
        headers: {
          'Content-Type': 'application/json',
          'Accept-Language': 'ar',
  
        },
      }).then((res)=>{setAll(res.data.data.data);console.log(all)}).catch((error) => {
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
    })
    const handleClick=()=>{
        if(value2=='فرز حسب'&&value=='فرز حسب'){
        setTest(' ')
        setValue2('')
        
        }
        else if(value=='فرز حسب'&&test=='فرز حسب'){
            setTest(' ')
            setValue1('فرز حسب')
            setValue(value1)
          }
        else if(value2=='فرز حسب'){
          setValue1('فرز حسب')
           setTest(value1)
          setValue(value1)
       }
       else{
          setTest(value1)
          setValue(value1)
       }
    }
    const handleClick2=(item)=>{
        setValue(item)
        setTest(item)
        if(item==' جاري'||item==' منتهي'||item==' قادم')
        {
            setValue1(' الوقت')
            setValue2('فرز حسب')
        
        }
        if(value==' الوقت'||value==' مجموعات'){
            setValue2('فرز حسب')
         
        }
        if(item==' عقارات'||item==' إلكترونيات'||item==' سيارات'||item==' أثاث'||item==' إكسسوار'||item==' ملابس'||item==' أخرى'){
            setValue1(' مجموعات')
            setValue2('فرز حسب')
            
        }
    }
    return(
        <div className="allauctions">
            <Navbar wordBlod={'auctions'}/>
            <AuctionsNavbar wordBlod={'all'}/>
            <button className="createauction" onClick={()=>{navegate('/CreateAuction')}}>
             <p>إنشاء مزاد</p>
             <i className="fas fa-plus"></i>
            </button>
           
          <button className="sort" type="text" onMouseEnter={()=>{setHover(true)}} onMouseLeave={()=>{setHover(false)}} onClick={handleClick} value={value} >
            <div>{value}</div>
          <i  className={`fas fa-chevron-left fas1 ${hover==true?'white':'black'} ${value.includes(' مجموعات')||value.includes(' الوقت')||value.includes('فرز حسب')?'sort1':'sort2'}`} onclick={handleClick} ></i>
          </button>
          
          <div className={`listSort  ${test.includes('فرز حسب')?'visable':''}`}>
            <div className="buttonSort" >
                <button className="button1" onClick={()=>{handleClick2(' مجموعات')}}>المجموعة</button>
                <button className="button2" onClick={()=>{handleClick2(' الوقت')}}>الوقت</button>
               
            </div>
            </div>
            <div className={`listSort  ${test.includes(' مجموعات')?'visable':''}`}>
            <div  className="buttonSort" >
                <button className="button1" onClick={()=>{handleClick2(' سيارات')}}>سيارات</button>
                <button onClick={()=>{handleClick2(' عقارات')}}>عقارات</button>
                <button onClick={()=>{handleClick2(' إلكترونيات')}} >إلكترونيات</button>
                <button onClick={()=>{handleClick2(' أثاث')}}>أثاث</button>
                <button onClick={()=>{handleClick2(' إكسسوار')}}>إكسسوار</button>
                <button onClick={()=>{handleClick2(' ملابس')}}>ملابس</button>
                <button className="button2" onClick={()=>{handleClick2(' أخرى')}}>أخرى</button>
            </div>
          </div>
          <div className={`listSort  ${test.includes(' الوقت')?'visable':''}`}>
            <div  className="buttonSort" >
                <button className="button1" onClick={()=>{handleClick2(' جاري')}}>جاري</button>
                <button onClick={()=>{handleClick2(' قادم')}}>قادم</button>
                <button className="button2" onClick={()=>{handleClick2(' منتهي')}}>منتهي</button>
            </div>
          </div>
         
            <div className="alotofAuction">
              {
               all.map((auc)=>(<Auction data={auc}/>))
              }
            {/* <Auction/>
            <Auction/>
            <Auction/>
            <Auction/>
            <Auction/>
            <Auction/>
            <Auction/>
            <Auction/>
       
            <Auction/>
            <Auction/>
            <Auction/>
            <Auction/> */}
            </div>
            <Footer/>
        </div>
    )
}