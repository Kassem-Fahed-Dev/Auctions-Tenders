export default function Search({page}){
    return(
        <>
         <div className="smart-serach ">
          <form>
            <div className="serach-container">
              <i className={`fas fa-search icon ${page=="all"?"position":page=="group"?"position1":page=="participped"?"position3":page=='alluser'?"alluser":"position2"} `}></i>
              <input type="serach" className={`${page=="all"?"position":page=="group"?"position1":page=="participped"?"position3":page=='alluser'?"alluser":"position2"}`}/>
            </div>
          </form>
        </div>
        </>
    )
}