import { useEffect, useState, Fragment } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
// import styles from "./styles.module.css";

const ResetPassword = () => {
 const [validUrl, setValidUrl] = useState(false);
 const [password, setPassword] = useState("");
 const [msg, setMsg] = useState("");
 const [error, setError] = useState("");
 const param = useParams();
 const url =`http://testapi-gibt.onrender.com/api/v1/users/resetPassword/${param.token}`;

 useEffect(() => {
  const verifyUrl = async () => {
   try {
    await axios.get(url);
    setValidUrl(true);
   } catch (error) {
    setValidUrl(false);
   }
  };
  verifyUrl();
 }, [param, url]);

 const handleSubmit = async (e) => {
  e.preventDefault();
  try {
   const { data } = await axios.post(url, { password });
   setMsg(data.message);
   setError("");
   window.location = "/login";
  } catch (error) {
   if (
    error.response &&
    error.response.status >= 400 &&
    error.response.status <= 500
   ) {
    setError(error.response.data.message);
    setMsg("");
   }
  }
 };

 return (
  <Fragment>
   {validUrl ? (
    <div className='container'>
     <form className='form_container' onSubmit={handleSubmit}>
      <h1>Add New Password</h1>
      <input
       type="password"
       placeholder="Password"
       name="password"
       onChange={(e) => setPassword(e.target.value)}
       value={password}
       required
       className='input'
      />
      {error && <div className='error_msg'>{error}</div>}
      {msg && <div className='success_msg'>{msg}</div>}
      <button type="submit" className='green_btn'>
       Submit
      </button>
     </form>
    </div>
   ) : (
    <h1>404 Not Found</h1>
   )}
  </Fragment>
 );
};

export default ResetPassword;