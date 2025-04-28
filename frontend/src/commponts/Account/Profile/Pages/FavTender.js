import Pic from "../pic.jpg";

import "../profile.css";
// import "../../Auc-Folder/Auc.css";
import Side from "../componants/Side";
// import Card from "../../Auc-Folder/Card";
export default function FavTender() {
  function handel_Fav(e) {
    let hh = e.target;
    if (hh.style.color === "red") {
      hh.style.cssText = "color: none;";
    } else {
      hh.style.cssText = "color: red;";
    }
  }
  return (
    <div className="con-flex">
      <Side />
      <div className="nn">
        <h3>
          {" "}
          <img
            className="img-icon"
            src={Pic}
            alt="Error"
            width={"50px"}
            height={"40px"}
          />
          المناقصات المفضلة
        </h3>
        <div className="container-card">
          {/* <Card width={"220px"} center={"34px"} font={"12px"}>
            <div className="con-div-card">
              <p className="state">جاري</p>
              <button
                onClick={(e) => {
                  handel_Fav(e);
                }}
                className="fas fa-heart"
              ></button>
            </div>
          </Card>
          <Card width={"220px"} center={"34px"} font={"12px"}>
            <div className="con-div-card">
              <p className="state">جاري</p>
              <button
                onClick={(e) => {
                  handel_Fav(e);
                }}
                className="fas fa-heart"
              ></button>
            </div>
          </Card>
          <Card width={"220px"} center={"34px"} font={"12px"}>
            <div className="con-div-card">
              <p className="state">جاري</p>
              <button
                onClick={(e) => {
                  handel_Fav(e);
                }}
                className="fas fa-heart"
              ></button>
            </div>
          </Card> */}
        </div>
      </div>
    </div>
  );
}
