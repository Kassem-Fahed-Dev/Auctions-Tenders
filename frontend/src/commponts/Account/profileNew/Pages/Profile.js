import "../profile.css";
import "../../Auc-Folder/Auc.css";
import Side from "../componants/Side";
import Alert from "./Alert";
import ll from "../lab.png";
import { useState, useEffect } from "react";
import { toggleShow, labelName } from "../store/Redux";
import { useSelector, useDispatch } from "react-redux";

export default function Account() {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");
  const [isActive, setIsActive] = useState(false);

  const [showXButton, setShowXButton] = useState(false);

  const handleButtonClick = () => {
    setIsActive(!isActive);
    if (!isActive) {
      setTimeout(() => {
        setShowXButton(true);
      }, 200);
    } else {
      setShowXButton(false);
    }
  };
  const nn = useSelector((state) => state.ptn_edit);
  const dispatch = useDispatch();
  useEffect(() => {
    const img = new Image();
    img.src = ll;
    img.onload = () => setImageLoaded(true);
    img.onerror = () => setImageLoaded(false);
  }, []);
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setSelectedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  return (
    <>
      <div id={nn.show === true ? "focus" : ""} className="con-flex">
        <Side />
        <div className="con-prof">
          <div className="con-img-info">
            <div className="con-img-ptn">
              <div className={`img-profile ${isActive ? "active" : ""}`}>
                {selectedImage ? (
                  <img
                    className="picture1"
                    src={selectedImage || ll}
                    alt="Error"
                    style={{
                      width: "100%",
                      height: "100%",
                      borderRadius: "50%",
                    }}
                  />
                ) : (
                  <div>
                    <div className="fas fa-user-tie"></div>
                  </div>
                )}
              </div>
              <div className="container-ptn">
                <button
                  className="ptn-show"
                  onClick={() => handleButtonClick()}
                >
                  عرض
                </button>
                <span>/</span>
                <button
                  className="ptn-show"
                  onClick={() => {
                    document.getElementById("fileInput").click();
                  }}
                >
                  تغيير
                </button>
                <input
                  type="file"
                  id="fileInput"
                  style={{ display: "none" }}
                  onChange={handleFileChange}
                />
              </div>
              {isActive && showXButton && (
                <button
                  className="exit2 animated"
                  onClick={() => handleButtonClick()}
                >
                  X
                </button>
              )}
            </div>

            <div className="con-info2">
              <svg
                className="svg1"
                width="800"
                height="600"
                viewBox="0 0 750 600"
                xmlns="http://www.w3.org/2000/svg"
              >
                {" "}
                <path
                  d="M 51 522 L 50 50 L 649 46 C 618 101 617 324 379 273 C 274 246 82 350 49 610    "
                  fill="#003366"
                  stroke="none"
                  stroke-width="2"
                >
                  {" "}
                </path>
              </svg>
              <div className="welcome">
                <h2>أهلا بك !</h2>
                <p className="data1">بياناتك محمية بكل صدق وشفافية</p>
              </div>
              <h3>فادي-66 </h3>

              <p className="par-info">
                اسم المستخدم :<div className="name">{nn.submit1}</div>{" "}
              </p>
              <button
                className="ptn-1"
                onClick={() => {
                  dispatch(toggleShow());

                  dispatch(labelName("اسم المستخدم"));
                }}
              >
                <span className="	fas fa-pen"></span>
              </button>

              <p className="par-info">
                الاسم الكامل :<div className="full-name">{nn.fullname}</div>{" "}
              </p>
              <button
                className="ptn-2"
                onClick={() => {
                  dispatch(toggleShow());
                  dispatch(labelName("الاسم الكامل"));
                }}
              >
                <span className="	fas fa-pen"></span>
              </button>
              <p className="par-info">
                البريد الالكتروني :<div className="email">{nn.email}</div>
              </p>
              <button
                className="ptn-3"
                onClick={() => {
                  dispatch(toggleShow());
                  dispatch(labelName("البريد الإلكتروني"));
                }}
              >
                <span className="	fas fa-pen"></span>
              </button>
              <p className="par-info">
                رقم الهاتف:
                <div className="number">{nn.number}</div>{" "}
              </p>
              <button
                className="ptn-4"
                onClick={() => {
                  dispatch(toggleShow());
                  dispatch(labelName("رقم الهاتف"));
                }}
              >
                <span className="	fas fa-pen"></span>
              </button>
              <p className="par-info">
                {" "}
                الموقع: <div className="location">{nn.location}</div>
              </p>
              <button
                className="ptn-5"
                onClick={() => {
                  dispatch(toggleShow());
                  dispatch(labelName("الموقع الجديد"));
                }}
              >
                <span className="	fas fa-pen"></span>
              </button>
              <p className="par-info">
                كلمة المرور:
                <div className="pass">{nn.pass.replace(/./g, "●")}</div>
              </p>
              <button
                className="ptn-6"
                onClick={() => {
                  dispatch(toggleShow());
                  dispatch(labelName("  كلمة المرور الحالية "));
                }}
              >
                <span className="	fas fa-pen"></span>
              </button>
              <Alert test={nn.show} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
