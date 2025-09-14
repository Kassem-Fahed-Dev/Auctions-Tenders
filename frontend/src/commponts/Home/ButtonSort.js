import { useState } from 'react';
import axiosInstance from '../AxiosInterceptors'
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
export default function ButtonSort({test2,position,onSortChange}) {
   const [value,setValue]=useState('فرز حسب');
    const [value1,setValue1]=useState('فرز حسب');
    const [value2,setValue2]=useState('');
    const [test,setTest]=useState('')
      const [errorMessage, setErrorMessage] = useState({});
      const token = localStorage.getItem('jwt');
    const [test1,setTest1]=useState('')
    const [hover,setHover]=useState(false)
     let sort;
     let st;
     const [allAuction, setALLAuction] = useState([]);
   useEffect(() => {
    axiosInstance
      .get(`/api/v1/categories?type=auction`, {
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
  setALLAuction(names);
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
     sort=localStorage.getItem('status')
     
     st='status'
   } else if(test2=='fav'){
      sort=localStorage.getItem('status1')
      st='status1'
   }else if(test2=='favh'){
      sort=localStorage.getItem('status1h')
      st='status1h'
   }
   else if(test2=='favp'){
      sort=localStorage.getItem('status1p')
      st='status1p'
   }else if(test2=="create"){
        sort=localStorage.getItem('status2')
      st='status2'
   }else if(test2=="createp"){
        sort=localStorage.getItem('status2p')
      st='status2p'
   }
   else if(test2=="share"){
        sort=localStorage.getItem('status3')
      st='status3'
   } else if(test2=="sharep"){
        sort=localStorage.getItem('status3p')
      st='status3p'
   }else if(test2=="alluserAuFav"){
        sort=localStorage.getItem('statusallAu')
      st='statusallAu'
   }

    const handleClick=()=>{
        
        if(value2=='فرز حسب'&&value=='فرز حسب'){
        setTest(' ')
        setValue2('')
        onSortChange(value2)
         localStorage.setItem(st,value2)
        console.log(value2)
        console.log('11110')
        }
        else if(value=='فرز حسب'&&test=='فرز حسب'){
            setTest(' ')
            setValue1('فرز حسب')
             localStorage.setItem(st,value)
           onSortChange(value2)
            setValue(value1)
              console.log('10')
          }
        else if(value2=='فرز حسب'){
          setValue1('فرز حسب')
           setTest(value1)
           console.log(value1)
          setValue(value1)
             onSortChange(value1)
           localStorage.setItem(st,value1)
          console.log('110')
          
       }
       
       else{
          setTest(value1)
            onSortChange(value1)
              localStorage.setItem(st,value1)
          setValue(value1)
            console.log('1110')
           
       }
    }
    
console.log(sort)
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
        if(allAuction.includes(item)){
            setValue1(' مجموعات')
            setValue2('فرز حسب')
               console.log('0000')
             setTest1(item)
             localStorage.setItem(st,item)      
        }
         onSortChange(item)
    }
    // ======
    const rows=[]
for(let i=1;i<allAuction?.length-2;i++){
  rows.push( <>
  <div></div>
                    <button  className={`${position=="profile"&&test2=='sharep'?"buttonpos6cre":position=="profile"?`buttonpos5`:position=="profile1"?"buttonpos1cre":""}`}onClick={()=>{handleClick2(allAuction[i])}}>{allAuction[i]}</button>
                <div></div>  </>)
}
    return(
        <>
         <div className="test-con">
                       <button className={`sort ${position=="profile"?"pos":position=="profile1"?"poscre":""}`} type="text" onMouseEnter={()=>{setHover(true)}} onMouseLeave={()=>{setHover(false)}} onClick={handleClick} value={sort} >
            <div>{sort}</div>
          <i  className={`fas fa-chevron-left fas1 ${hover==true?'white':'black'} ${value.includes(' مجموعات')||value.includes(' الوقت')||value.includes('فرز حسب')?'sort1':'sort2'}`} onclick={handleClick} ></i>
          </button>
        
                         
          <div className={`listSort  ${test.includes('فرز حسب')&&position=="profile"?'visable1':test.includes('فرز حسب')?'visable':""}`}>
            <div className="buttonSort" >
                <button className={`button1 ${position=="profile"?"buttonpos1":position=="profile1"?"buttonpos1cre":""}`} onClick={()=>{handleClick2(' مجموعات')}}>المجموعة</button>
                <button className={`button2 ${position=="profile"?"buttonpos2":position=="profile1"?"buttonpos1cre":""}`} onClick={()=>{handleClick2(' الوقت')}}>الوقت</button>
               
            </div>
            </div>
            <div className={`listSort  ${test.includes(' مجموعات')&&position=="profile"?'visable2':test.includes(' مجموعات')?'visable':""}`}>
            <div  className="buttonSort" >
                <button className={`button1 ${position=="profile"?"buttonpos1":position=="profile1"?"buttonpos1cre":""}`} onClick={()=>{handleClick2(allAuction && allAuction?.length > 0 ? allAuction[0] : '')}}>  {allAuction && allAuction?.length > 0 ? allAuction[0] : 'لا توجد مجموعات'}</button>
                {/* <button  className={`${position=="profile"?"buttonpos3":position=="profile1"?"buttonpos1cre":""}`}onClick={()=>{handleClick2(' عقارات')}}>عقارات</button>
                <button  className={`${position=="profile"?"buttonpos4":position=="profile1"?"buttonpos1cre":""}`}onClick={()=>{handleClick2(' إلكترونيات')}} >إلكترونيات</button>
                <button className={`${position=="profile"?"buttonpos5":position=="profile1"?"buttonpos1cre":""}`}onClick={()=>{handleClick2(' أثاث')}}>أثاث</button>
                <button className={`${position=="profile"?"buttonpos6":position=="profile1"?"buttonpos1cre":""}`}onClick={()=>{handleClick2(' إكسسوار')}}>إكسسوار</button>
                <button className={`${position=="profile"?"buttonpos7":position=="profile1"?"buttonpos1cre":""}`}onClick={()=>{handleClick2(' ملابس')}}>ملابس</button> */}
                {rows}
                <button className={`button2 ${position=="profile"&&test2=='sharep'?"buttonpos6cre":position=="profile"?`buttonpos5`:position=="profile1"?"buttonpos1cre":""}`} onClick={()=>{handleClick2(allAuction && allAuction?.length > 0 ? allAuction[allAuction?.length-1] : '')}}> {allAuction && allAuction?.length > 0 ? allAuction[allAuction?.length-1] : ''}</button>
            </div>
          </div>
          <div className={`listSort  ${test.includes(' الوقت')&&position=="profile"?'visable3':test.includes(' الوقت')?'visable':""}`}>
            <div  className="buttonSort" >
                <button className={`button1 ${position=="profile"&&test2=='sharep'?"buttonpos9cre":position=="profile"?"buttonpos4":position=="profile1"?"buttonpos1cre":""}`} onClick={()=>{handleClick2(' جاري')}}>جاري</button>
                <button  className={`${position=="profile"&&test2=='sharep'?"buttonpos9cre":position=="profile"?"buttonpos4":position=="profile1"?"buttonpos1cre":""}`} onClick={()=>{handleClick2(' قادم')}}>قادم</button>
                <button className={`button2 ${position=="profile"&&test2=='sharep'?"buttonpos9cre":position=="profile"?"buttonpos4":position=="profile1"?"buttonpos1cre":""}`} onClick={()=>{handleClick2(' منتهي')}}>منتهي</button>
            </div>
          </div>
                      </div>
        </>
    )
}
