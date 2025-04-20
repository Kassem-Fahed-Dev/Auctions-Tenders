import { useDispatch, useSelector } from "react-redux";
import {
  exitShow,
  setInput,
  submit,
  error_msg,
  updateFullName,
  updatePhone,
  updateEmail,
  updateLocation,
  updatepass,
  thisPass,
  setInput_confirm,
} from "../store/Redux";
export default function Alert({ test }) {
  const user = useSelector((state) => state.ptn_edit);
  const dispatch = useDispatch();
  const inputCount = user.label === "  كلمة المرور الحالية " ? 3 : 1;
  const alertHeight = inputCount > 1 ? 230 : 150;
  if (test) {
    return (
      <div style={{ height: `${alertHeight}px` }} className="alert1">
        <div className="alert12">
          <svg
            id="ert"
            className="svg2"
            width="500"
            height="300"
            viewBox="0 0 850 600"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M 700 99 L 396 99 C 400 201 679 124 700 399 L 700 99 "
              fill="#003366"
              stroke="none"
              stroke-width="2"
            ></path>
          </svg>
          <form>
            <button className="exit" onClick={() => dispatch(exitShow())}>
              X
            </button>
            <div className="cn">
              {user.label === "  كلمة المرور الحالية " ? (
                <>
                  <div className="cn">
                    <label className="lap-newpass" for="ff">
                      <span id="sstar">*</span>

                      {user.label}
                    </label>
                    <input
                      required
                      value={user.oldpass}
                      onChange={(e) => {
                        dispatch(thisPass(e.target.value));
                      }}
                      id="ff"
                      className="inp-newpass"
                      type="text"
                    />
                    <label className="lab2-new" htmlFor="ff">
                      كلمة المرور الجديدة
                      <span id="sstar">*</span>
                    </label>
                    <input
                      required
                      value={user.userInput}
                      onChange={(e) => {
                        dispatch(setInput(e.target.value));
                      }}
                      id="ff"
                      className="inp2-new"
                      type="password"
                    />
                    <label className="lab3-new" htmlFor="gg">
                      تأكيد كلمة المرور الجديدة<span id="sstar2">*</span>
                    </label>
                    <input
                      required
                      value={user.Input_confirm}
                      onChange={(e) => {
                        dispatch(setInput_confirm(e.target.value));
                      }}
                      id="gg"
                      className="inp3-new"
                      type="password"
                    />
                    <p className="error_message-pass">{user.error}</p>
                  </div>
                </>
              ) : (
                <>
                  {" "}
                  <label className="lab-new" for="ff">
                    <span id="sstar">*</span>

                    {user.label}
                  </label>
                  <input
                    required
                    value={user.userInput}
                    onChange={(e) => {
                      dispatch(setInput(e.target.value));
                    }}
                    id="ff"
                    className="inp-new"
                    type="text"
                  />
                  <p className="error_message">{user.error}</p>
                </>
              )}
            </div>

            <button
              className="ptn-submit2"
              onClick={(e) => {
                e.preventDefault();
                const userInput = user.userInput.trim();
                const Empty = userInput === "";
                const inputlength = userInput.length >= 6;
                const hasChars = /[!#$%^&*(),?":{}|<>]/.test(userInput);
                const isNum = /^\d+$/.test(userInput);
                const phonlength = userInput.length === 10;
                const containgmail = userInput.includes("@gmail.com");
                const StrongPass = /^(?=.*\d)(?=.*[@#$%^&+=]).{8,}$/.test(
                  userInput
                );
                if (Empty) {
                  dispatch(error_msg("لا يمكن ترك الحقل فارغًا"));
                } else if (
                  (user.label == "اسم المستخدم" && hasChars) ||
                  (user.label == "الاسم الكامل" && hasChars)
                ) {
                  dispatch(error_msg("النص يحتوي على رموز غير مسموحة"));
                } else if (!inputlength) {
                  dispatch(
                    error_msg("النص يجب أن يحتوي على 6 محارف على الأقل")
                  );
                } else if (!inputlength) {
                  dispatch(
                    error_msg("النص يجب أن يحتوي على 6 محارف على الأقل")
                  );
                } else if (
                  user.label === "رقم الهاتف" &&
                  (!isNum || !phonlength)
                ) {
                  dispatch(
                    error_msg("رقم الهاتف  يجب أن يحتوي على  10 أرقام فقط ")
                  );
                } else if (
                  user.label === "البريد الإلكتروني" &&
                  !containgmail
                ) {
                  dispatch(error_msg("يجب أن يحوي الايميل على gmail.com@"));
                } else if (
                  user.label === "  كلمة المرور الحالية " &&
                  user.userInput !== user.Input_confirm
                ) {
                  dispatch(
                    error_msg(
                      "لا يوجد تطابق بين كلمة المرور والتأكيد اعد المحاولة"
                    )
                  );
                } else if (
                  user.label === "  كلمة المرور الحالية " &&
                  !StrongPass
                ) {
                  dispatch(
                    error_msg(" ادخل كلمة مرور قوية تحوي رموز وأرقام   ")
                  );
                } else {
                  dispatch(error_msg(""));
                  if (user.label === "اسم المستخدم") {
                    dispatch(submit());
                  } else if (user.label === "الاسم الكامل") {
                    dispatch(updateFullName());
                  } else if (user.label === "البريد الإلكتروني") {
                    dispatch(updateEmail());
                  } else if (user.label === "رقم الهاتف") {
                    dispatch(updatePhone());
                  } else if (user.label === "الموقع الجديد") {
                    dispatch(updateLocation());
                  } else if (user.label === "  كلمة المرور الحالية ") {
                    dispatch(updatepass());
                  }
                  dispatch(setInput(""));
                  dispatch(exitShow());
                }
              }}
            >
              تحديث
            </button>
          </form>
        </div>
      </div>
    );
  } else {
    return <></>;
  }
}
