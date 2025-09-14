import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import axiosInstance from '../AxiosInterceptors';
import { all } from 'axios';
export default function ButtonSortTen({test2,position,onSortChange}) {
   const [value,setValue]=useState('فرز حسب');
    const [value1,setValue1]=useState('فرز حسب');
    const [value2,setValue2]=useState('');
    const [test,setTest]=useState('')
    const [test1,setTest1]=useState('')
    const [hover,setHover]=useState(false)
     const [errorMessage, setErrorMessage] = useState({});
      const token = localStorage.getItem('jwt');
     let sort;
     let st;
          const [allTender, setALLTender] = useState([]);
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
       setALLTender(names);
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
     console.log(test2)
    const navegate=useNavigate()
   if(test2=='all'){
     sort=localStorage.getItem('statustn') 
     st='statustn'
   } else if(test2=='fav'){
      sort=localStorage.getItem('status1tn')
      st='status1tn'
   }else if(test2=='favh'){
      sort=localStorage.getItem('status1tnh')
      st='status1tnh'
   }else if(test2=='favp'){
      sort=localStorage.getItem('status1tnp')
      st='status1tnp'
   }else if(test2=="create"){
        sort=localStorage.getItem('status2tn')
      st='status2tn'
   }
   else if(test2=="share"){
        sort=localStorage.getItem('status3tn')
      st='status3tn'
   }
     else if(test2=="sharep"){
        sort=localStorage.getItem('status3tnp')
      st='status3tnp'
   }
   
    const handleClick=()=>{
      
        if(value2=='فرز حسب'&&value=='فرز حسب'){
        setTest(' ')
        setValue2('')
         onSortChange(value2)
         localStorage.setItem(st,value2)
        console.log(value2)
        
        }
        else if(value=='فرز حسب'&&test=='فرز حسب'){
            setTest(' ')
            setValue1('فرز حسب')
             localStorage.setItem(st,value)
          onSortChange(value2)
            setValue(value1)
          }
        else if(value2=='فرز حسب'){
          setValue1('فرز حسب')
           setTest(value1)
           console.log(value1)
          setValue(value1)
            onSortChange(value1)
           localStorage.setItem(st,value1)
        
          
       }
       else{
          setTest(value1)
              localStorage.setItem(st,value1)
          setValue(value1)
             onSortChange(value1)
       }
    }
    const handleClick2=(item)=>{
        setValue(item)
        setTest(item)
      
        if(item==' جاري'||item==' منتهي'||item==' قادم')
        {
          setTest1(item)
          localStorage.setItem(st,item)
            setValue1(' الوقت')
            setValue2('فرز حسب')
            console.log('0')
        
        }
        if(value==' الوقت'||value==' مجموعات'){
            setValue2('فرز حسب') 
            console.log('00')
             
        }
        if(item==' الوقت'||item==' مجموعات'){
            localStorage.setItem(st,item)
               console.log('000') 

        }
        if( allTender.includes(item) 
      //     item === 'بناء و إعمار'||
      // item === 'خدمات لأماكن عامة' ||
      // item === 'خدمات منوعة' ||
      // item === 'مركبات و اليات' ||
      // item === 'أخرى' 
    ){
            setValue1(' مجموعات')
            setValue2('فرز حسب')
               console.log('0000')
             setTest1(item)
             localStorage.setItem(st,item)      
        }
         onSortChange(item)
    }
        const rows=[]
for(let i=1;i<allTender?.length-2;i++){
  rows.push( <>
  <div></div>
                                   <button  className={`${position=="profile"&&test2=='sharep'?"buttonpos7cre":position=="profile"?`buttonpos6`:position=="profile1"?"buttonpos1cre":position=="profile2"?"buttonpos3cre":""}`} onClick={()=>{handleClick2(allTender[i])}}> {allTender[i]}</button>

                <div></div>  </>)
}
    return(
        <>
         <div className="test-con">
                       <button className={`sort ${position=="profile"?"pos":position=="profile1"?"poscre":""}`} type="text" onMouseEnter={()=>{setHover(true)}} onMouseLeave={()=>{setHover(false)}} onClick={handleClick} value={sort} >
            <div>{sort}</div>
          <i  className={`fas fa-chevron-left fas1 ${hover==true?'white':'black'} ${value.includes(' مجموعات')||value.includes(' الوقت')||value.includes('فرز حسب')?'sort1':'sort2'}`} onclick={handleClick} ></i>
          </button>
        
                         
          <div className={`listSort   ${test.includes('فرز حسب')&&position=="profile"?'visable1':test.includes('فرز حسب')?'visable':""}`}>
            <div className="buttonSort" >
                <button className={`button1 ${position=="profile"?"buttonpos1":position=="profile1"?"buttonpos1cre":position=="profile2"?"buttonpos3cre":""}`} onClick={()=>{handleClick2(' مجموعات')}}>المجموعة</button>
                <button className={`button2 ${position=="profile"?"buttonpos2":position=="profile1"?"buttonpos1cre":position=="profile2"?"buttonpos3cre":""}`}  onClick={()=>{handleClick2(' الوقت')}}>الوقت</button>
               
            </div>
            </div>
            <div className={`listSort   ${test.includes(' مجموعات')&&position=="profile"?'visable4':test.includes(' مجموعات')?'visable':""}`}>
            <div  className="buttonSort" >
                <button className={`button1 ${position=="profile"?"buttonpos1":position=="profile1"?"buttonpos1cre":position=="profile2"?"buttonpos3cre":""}`} onClick={()=>{handleClick2(allTender && allTender?.length > 0 ? allTender[0] : '')}}> {allTender && allTender?.length > 0 ? allTender[0] : 'لا توجد مجموعات'} </button>
                {/* <button  className={`${position=="profile"?"buttonpos3":position=="profile1"?"buttonpos1cre":position=="profile2"?"buttonpos3cre":""}`} onClick={()=>{handleClick2('خدمات لأماكن عامة')}}> خدمات لأماكن عامة </button>
                <button  className={`${position=="profile"?"buttonpos4":position=="profile1"?"buttonpos1cre":position=="profile2"?"buttonpos3cre":""}`} onClick={()=>{handleClick2('خدمات منوعة')}} > خدمات منوعة</button>
                <button  className={`${position=="profile"?"buttonpos5":position=="profile1"?"buttonpos1cre":position=="profile2"?"buttonpos3cre":""}`} onClick={()=>{handleClick2('مركبات و اليات')}}> مركبات و آليات</button> */}
                {rows}
                <button  className={`button2 ${position=="profile"&&test2=='sharep'?"buttonpos7cre":position=="profile"?"buttonpos6":position=="profile1"?"buttonpos1cre":position=="profile2"?"buttonpos3cre":""}`} onClick={()=>{handleClick2(allTender && allTender?.length > 0 ? allTender[allTender?.length-1] : '')}}>{allTender && allTender?.length > 0 ? allTender[allTender?.length-1] : ''}</button>
            </div>
          </div>
          <div className={`listSort ${test.includes(' الوقت')&&position=="profile"?'visable3':test.includes(' الوقت')?'visable':""}`}>
            <div  className="buttonSort" >
                <button className={`button1 ${position=="profile"&&test2=='sharep'?"buttonpos8cre":position=="profile"?"buttonpos7":position=="profile1"?"buttonpos1cre":position=="profile2"?"buttonpos3cre":""}`} onClick={()=>{handleClick2(' جاري')}}>جاري</button>
                <button  className={`${position=="profile"&&test2=='sharep'?"buttonpos8cre":position=="profile"?"buttonpos7":position=="profile1"?"buttonpos1cre":position=="profile2"?"buttonpos3cre":""}`} onClick={()=>{handleClick2(' قادم')}}>قادم</button>
                <button className={`button2 ${position=="profile"&&test2=='sharep'?"buttonpos8cre":position=="profile"?"buttonpos7":position=="profile1"?"buttonpos1cre":position=="profile2"?"buttonpos3cre":""}`} onClick={()=>{handleClick2(' منتهي')}}>منتهي</button>
            </div>
          </div>
                      </div>
        </>
    )
}
