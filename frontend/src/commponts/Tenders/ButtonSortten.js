import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
export default function ButtonSortTen({test2}) {
   const [value,setValue]=useState('فرز حسب');
    const [value1,setValue1]=useState('فرز حسب');
    const [value2,setValue2]=useState('');
    const [test,setTest]=useState('')
    const [test1,setTest1]=useState('')
    const [hover,setHover]=useState(false)
     let sort;
     let st;
     
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
        
         localStorage.setItem(st,value2)
        console.log(value2)
        
        }
        else if(value=='فرز حسب'&&test=='فرز حسب'){
            setTest(' ')
            setValue1('فرز حسب')
             localStorage.setItem(st,value)
         
            setValue(value1)
          }
        else if(value2=='فرز حسب'){
          setValue1('فرز حسب')
           setTest(value1)
           console.log(value1)
          setValue(value1)
           
           localStorage.setItem(st,value1)
        
          
       }
       else{
          setTest(value1)
              localStorage.setItem(st,value1)
          setValue(value1)
           
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
        if(  item === 'بناء و إعمار'||
      item === 'خدمات لأماكن عامة' ||
      item === 'خدمات منوعة' ||
      item === 'مركبات و اليات' ||
      item === 'أخرى' ){
            setValue1(' مجموعات')
            setValue2('فرز حسب')
               console.log('0000')
             setTest1(item)
             localStorage.setItem(st,item)      
        }
    }
    return(
        <>
         <div className="test-con">
                       <button className="sort" type="text" onMouseEnter={()=>{setHover(true)}} onMouseLeave={()=>{setHover(false)}} onClick={handleClick} value={sort} >
            <div>{sort}</div>
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
                <button className="button1" onClick={()=>{handleClick2('بناء و إعمار')}}>بناء و إعمار</button>
                <button onClick={()=>{handleClick2('خدمات لأماكن عامة')}}> خدمات لأماكن عامة </button>
                <button onClick={()=>{handleClick2('خدمات منوعة')}} > خدمات منوعة</button>
                <button onClick={()=>{handleClick2('مركبات و اليات')}}> مركبات و آليات</button>
                <button className="button2" onClick={()=>{handleClick2('أخرى')}}>أخرى</button>
            </div>
          </div>
          <div className={`listSort  ${test.includes(' الوقت')?'visable':''}`}>
            <div  className="buttonSort" >
                <button className="button1" onClick={()=>{handleClick2(' جاري')}}>جاري</button>
                <button onClick={()=>{handleClick2(' قادم')}}>قادم</button>
                <button className="button2" onClick={()=>{handleClick2(' منتهي')}}>منتهي</button>
            </div>
          </div>
                      </div>
        </>
    )
}
