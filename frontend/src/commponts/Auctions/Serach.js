import { useState } from "react";
import { Link } from "react-router-dom";
export default function Search({page,type}){
    const handleChange1 = (e) => {
    const { name, value } = e.target;
    setReesult({  [name]: value });
    console.log(result)
  };
  const [result, setReesult] = useState({
        serach:''
      });
    return(
        <>
         <div className="smart-serach ">
          <form>
            <div className="serach-container">
              <Link to="/result" state={{data:result?.serach,type:type}} className={`fas fa-search icon ${page=="all"?"position":page=="group"?"position1":page=="participped"?"position3":page=='alluser'?"alluser":"position2"} `}></Link>
              <input  type="serach" autoComplete="off" value={result?.serach} name={'serach'} onChange={(e)=>{handleChange1(e)}} className={`${page=="all"?"position":page=="group"?"position1":page=="participped"?"position3":page=='alluser'?"alluser":"position2"}`}/>
            </div>
          </form>
        </div>
        </>
    )
}