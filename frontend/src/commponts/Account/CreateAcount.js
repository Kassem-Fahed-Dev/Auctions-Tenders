import "./CreateAcount.css";
import { useState } from "react";
import imag from "../../image/logo.png";
import { useNavigate } from "react-router-dom";
import axios from 'axios'
export default function CreateAcount() {
	
	const navegate=useNavigate();
	const [namePass, setNamePase] = useState([]);
	const hoverItems1 = (items) => {
		if (namePass.includes(items) == false) {
			setNamePase([...namePass, items]);
		}
	};
	const [location, setLocation] = useState(" ");
	const hoverItems2 = (items) => {
		setLocation(items);
		if (namePass.includes("list1")) {
			setNamePase(namePass.filter((i) => i !== "list1"));
		}
	};

	const [formData, setFormData] = useState({
		username: "",
		password: "",
		confirmPassword: "",
		email: "",
		tel: "",
	});
	const [formCheck, setFormCheck] = useState({
		check1:false,
		check2:false
	});
	const [errorMessage,setErrorMessage]=useState({})
    const handleChange=(e)=>{
		const {name,value}=e.target;
		setFormData({...formData,[name]:value})

	}
	const handleChange1=(e)=>{
		const {name,checked}=e.target;
		setFormCheck({...formCheck,[name]:checked})
	}
	const handleSubmit=(e)=>{
		e.preventDefault()
		const valditionErrerors={}
		if(!formData.username.trim()){
			valditionErrerors.username="هذا الحقل مطلوب."
		}else if(!/^[A-Za-zأ-ي]{6,}$/.test(formData.username)){
			valditionErrerors.username="الاسم يجب أن يتكون من ستة محارف على الأقل(أحرف عربية و إنجيليزية فقط)."
		}
		if(!formData.password.trim()){
			valditionErrerors.password="هذا الحقل مطلوب."
		}else if(!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{9,}$/.test(formData.password)){
			valditionErrerors.password="كلمة المرور يجب أن تتكون من تسعة محارف على الأقل و يبن أن تكون معقدة(أي تحتوي على : أحرف كبيرة-أحرف صغيرة-رموز-أرقام)."}
		if(!formData.email.trim()){
			valditionErrerors.email="هذا الحقل مطلوب."
		}else if(!/^[a-zA-Z0-9._%+-]+@gmail.com$/.test(formData.email)){
			valditionErrerors.email="الأيميل غير صالح."
		}
		if(!formData.tel.trim()){
			valditionErrerors.tel="هذا الحقل مطلوب."
		}else if(!/^\d{10}$/.test(formData.tel)){
			valditionErrerors.tel="الرقم يجب أن يتكون من عشرة أرقام."
		}
		if(!formData.confirmPassword.trim()){
			valditionErrerors.confirmPassword="هذا الحقل مطلوب."
		}
		else if(formData.confirmPassword!==formData.password){
			valditionErrerors.confirmPassword="لا يوجد تطابق مع كلمة المرور."
		}
		if(!formCheck.check1){
			valditionErrerors.check1=".هذا الحقل مطلوب"
		}
		if(!formCheck.check2){
			valditionErrerors.check2=".هذا الحقل مطلوب"
		}
		if(!location.trim()){
		valditionErrerors.location="خطأ"
		}
		setErrorMessage(valditionErrerors)
		if(Object.keys(valditionErrerors).length===0){
			navegate('/confirm')
		}
	}
	// ----------------------
	return (
		<div className="account1">
			<div class="flip-card">
				<div
					className={`sing-in ${namePass.includes("rou") ? "sing-in2" : ""}`}
				>
					<div className="sing-in1">
						<div>
							<div>
								<form>
									<div>
										<p className="in">دخول</p>
									</div>
									<div className="name" onClick={() => hoverItems1("name1")}>
										<i
											className={`fas fa-user email1 ${
												namePass.includes("name1") ? "name2 " : ""
											}`}
										></i>
										<input type="text" required />
										<label
											className={` ${
												namePass.includes("name1") ? "name1 " : ""
											}`}
										>
											اسم المستخدم <span>*</span>
										</label>
									</div>
									<div className="pass" onClick={() => hoverItems1("pass5")}>
										<i
											className={`fas fa-lock email1 ${
												namePass.includes("pass5") ? "pass2 " : ""
											}`}
										></i>
										<input type="password" required />
										<label
											className={` ${
												namePass.includes("pass5") ? "pass1 " : ""
											}`}
										>
											كلمة المرور <span>*</span>
										</label>
									</div>
									<div className="button-sing-in0">
										<button className="button-sing-in">تسجيل الدخول</button>
									</div>
								</form>
								<div className="create-account0">
									<button onClick={() => hoverItems1("rou")}>
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
				{/* /----------------/ */}

				<div
					className={`creat-account-back ${
						namePass.includes("rou") ? "creat-account-back1" : ""
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
						<form onSubmit={handleSubmit} >
							<div className="name" onClick={() => hoverItems1("name")}>
								<i
									className={`fas fa-user email1 ${
										namePass.includes("name") ? "name2 " : ""
									}`}
								></i>
								<input type="text"  value={formData.username} id="username" name="username"  onChange={handleChange} />
								{errorMessage.username&&<span className="error0 error"><span className="fa fa-warning"></span>{errorMessage.username}</span>}
							
								<label
									className={` ${namePass.includes("name") ? "name1 " : ""}`}
								>
									اسم المستخدم <span>*</span>
								</label>
							</div>
							<div className="pass" onClick={() => hoverItems1("pass")}>
								<i
									className={`fas fa-lock email1 ${
										namePass.includes("pass") ? "pass2 " : ""
									}`}
								></i>
								<input type="password" value={formData.password} id="password" name="password" onChange={handleChange}  />
								{errorMessage.password&&<span className="error0 error1"><span className="fa fa-warning"></span>{errorMessage.password}</span>}
								<label
									className={` ${namePass.includes("pass") ? "pass1 " : ""}`}
								>
									كلمة المرور <span>*</span>
								</label>
							</div>
							<div className="pass" onClick={() => hoverItems1("pass1")}>
								<i
									className={`fas fa-lock email1 ${
										namePass.includes("pass1") ? "pass2 " : ""
									}`}
								></i>
								<input type="password" value={formData.confirmPassword} id="confirmPassword" name="confirmPassword" onChange={handleChange}/>
								{errorMessage.confirmPassword&&<span className="error0 error2"><span className="fa fa-warning"></span>{errorMessage.confirmPassword}</span>}
								<label
									className={`password1 ${
										namePass.includes("pass1") ? "pass1 " : ""
									}`}
								>
									تأكيد كلمة المرور <span>*</span>
								</label>
							</div>
							<div className="pass" onClick={() => hoverItems1("email")}>
								<i
									className={`fas fa-envelope email1 ${
										namePass.includes("email") ? "pass2 " : ""
									}`}
								></i>
								<input type="text" value={formData.email} id="email" name="email" onChange={handleChange}  />
								{errorMessage.email&&<span className="error0 error3"><span className="fa fa-warning"></span>{errorMessage.email}</span>}
								<label
									className={`password1  ${
										namePass.includes("email") ? "pass1 " : ""
									}`}
								>
									البريد الإلكتروني <span>*</span>
								</label>
							</div>
							<div className="pass" onClick={() => hoverItems1("number")}>
								<i
									className={`fas fa-phone email1 ${
										namePass.includes("number") ? "pass2 " : ""
									}`}
								></i>
								<input type="tel" value={formData.tel} id="tel" name="tel" onChange={handleChange}  />
								{errorMessage.tel&&<span className="error0 error4"><span className="fa fa-warning"></span>{errorMessage.tel}</span>}
								<label
									className={` ${namePass.includes("number") ? "pass1 " : ""}`}
								>
									رقم الهاتف <span>*</span>
								</label>
							</div>
							<div className="location">
								<label className="location1">الموقع</label>
								<div
									className={`triangle  ${
										location.includes("دمشق") ||
										location.includes("حمص") ||
										location.includes("حلب")
											? "triangle1"
											: ""
									} `}
									onClick={() => hoverItems1("list1")}
								>
									<div className="tri tri1"></div>
									<div className="tri tri2"></div>
								</div>

								<input className="location2" type="text" id="location" name="location" value={location} />
								{errorMessage.location&&<span className="error0 error7"><span className="fa fa-warning"></span></span>}
								<div
									    className={`list  ${
										namePass.includes("list1") ? "list1 " : ""
									}`}
								>
									<p onClick={() => hoverItems2("دمشق")}>دمشق</p>
									<div></div>
									<p onClick={() => hoverItems2("حمص")}>حمص</p>
									<div></div>
									<p onClick={() => hoverItems2("حلب")}>حلب</p>
								</div>
								<div className="check">
									<label className="labal-check">
										<span>*</span>أوافق على الشروط و الأحكام
									</label>
									{errorMessage.check1&&<span className="error0 error5">{errorMessage.check1}<span className="fa fa-warning"></span></span>}
									<i className="fas fa-check"></i>
									<input type="checkbox"  id="check1"name="check1" checked={formCheck.check1} onChange={handleChange1} />
								</div>
								<div className="check1">
									<label className="labal-check1">
										<span>*</span>السماح باستخدام خدمات المركز الوطني للمعلومات
										للتحقق من الهاتف
									</label>
									{errorMessage.check2&&<span className="error0 error6">{errorMessage.check2}<span className="fa fa-warning"></span></span>}
									<i className="fas fa-check "></i>
									<input type="checkbox" id="check2" name="check2" checked={formCheck.check2} onChange={handleChange1} />
									
								</div>
								<div>
									<button className="creat" >إنشاء حساب جديد</button>
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
