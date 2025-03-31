import { useNavigate } from 'react-router-dom';
import Navbar from '../Home/Navbar';
import { useState } from 'react';
export default function CreateAuction() {
  const [formData, setFormData] = useState('');
  const [namePass, setNamePase] = useState([]);
  const navegaet=useNavigate()
  function goback() {
    // window.history.go(-1);
    navegaet('/auctions')
  }
  
  //   تطبيق الحركة على مربع الادخال
  const hoverItems1 = (items) => {
    if (namePass.includes(items) == false) {
      setNamePase([...namePass, items]);
    }
  };
  //   اختيار الموقع

  const hoverItems2 = (items) => {
    setFormData( items );
    if (namePass.includes('list1')) {
      setNamePase(namePass.filter((i) => i !== 'list1'));
    }
  };
  const handleChange = (e) => {
    const {  value } = e.target;
    setFormData(value);
  };
  const handleKeyDown=(e)=>{
    e.preventDefault()
  }
  return (
    <div className="create-auction-button">
      <Navbar wordBlod={'auctions'} />
      <p className="createp">إنشاء مزاد</p>
      <button className="	fas fa-chevron-left" onClick={goback}></button>
      <div className="create-auction-data">
        <div className="create-auction-data1">
          <form className="create-auction-form">
            <div className='group1'>
              {/* <div>حدد المجموعة</div> */}
              <label className="group-label">حدد المجموعة</label>
                <div
                  className={`triangle tri3  ${
                    formData==='سيارات' ||
                    formData==='عقارات'||
                    formData==='إلكترونيات'||
                    formData==='أثاث'||
                    formData==='إكسسوار'||
                    formData==='ملابس'||
                    formData==='أخرى'
                      ? 'triangle1'
                      : ''
                  } `}
                  onClick={() => hoverItems1('list1')}
                >
                  <div className="tri tri1"></div>
                  <div className="tri tri2"></div>
                </div>

                <input
                  className="group2"
                  type="text"
                  name="group"
                  value={formData}
                  onChange={handleChange}
                />
                <div
                  className={`list-group-m  ${
                    namePass=='list1' ? 'list-group1 ' : ''
                  }`}
                >
                  <p
                    className="group-hover p1"
                    onClick={() => hoverItems2('سيارات')}
                  >
                     سيارات
                  </p>
                  <div></div>
                  <p
                    className="group-hover p2"
                    onClick={() => hoverItems2('عقارات')}
                  >
                     عقارات
                  </p>
                  <div></div>
                  <p
                    className="group-hover p2"
                    onClick={() => hoverItems2('إلكترونيات')}
                  >
                    إلكترونيات
                  </p>
                  <div></div>
                  <p
                    className="group-hover p2"
                    onClick={() => hoverItems2('أثاث')}
                  >
                     أثاث
                  </p>
                  <div></div>
                  <p
                    className="group-hover p2"
                    onClick={() => hoverItems2('إكسسوار')}
                  >
                     إكسسوار
                  </p>
                  <div></div>
                  <p
                    className="group-hover p2"
                    onClick={() => hoverItems2('ملابس')}
                  >
                     ملابس
                  </p>
                  <div></div>
                  <p
                    className="group-hover p3"
                    onClick={() => hoverItems2('أخرى')}
                  >
                     أخرى
                  </p>
                </div>
                
            <div className='product-name'>
              <label className='product-name-label'>اسم المنتج</label>
              <input type='text'/>
            </div>
            <div className='product-name'>
              <label className='product-name-label'>اسم المنتج</label>
              <input type='text'/>
            </div>
            <div className='auction3'>
            <label className='product-name-label'>حالة المنتج:  </label>
            <div className='status'>
            <div  >
              <label >مستعمل </label>
              <input type='radio' name='status'/>
            </div>
            <div >
              <label >جديد </label>
              <input type="radio" name='status'/>
            </div>
            </div>
            </div>
            </div>
            {/* ------ */}
            <div className='auction2'>
            <div className='product-name'>
              <label className='product-name-label'>اسم المزاد</label>
              <input type='text' />
            </div>
        
            <div className='product-name'>
            <label className='product-name-label'> تاريخ البدء</label>
            <input type='date' placeholder='kkkk' onKeyDown={handleKeyDown}/>
            </div>
            <div className='product-name'>
            <label className='product-name-label'> تاريخ الانتهاء</label>
            <input type='date' placeholder='' onKeyDown={handleKeyDown}/>
            </div>
          
            <div className='product-name'>
            <label className='product-name-label'>سعر الافتتاح </label>
            <input type='text'/>
            </div>
            <div className='product-name'>
            <label className='product-name-label'> مقدار الزيادة </label>
            <input type='text'/>
            </div>
            <button className='send-auction'>إرسال</button>
            </div>
            
            
          </form>
        </div>
        <div className="create-auction-data2">
          <div className='list-data'>
            <button>البيانات</button>
            <button>الصور</button>
            <button>الفيديو</button>
            
          </div>
        </div>
      </div>
    </div>
  );
}
