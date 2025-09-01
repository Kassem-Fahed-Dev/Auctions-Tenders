import Profile from './Profile';
export default function Wallet() {
  return (
    <>
      <Profile />
      <div className="walletCon">
        <div className="titleWallet">
          <i class="fa-solid fa-minus minus"></i>
          <span className="span">محفطتك الالكترونية</span>
        </div>
        <div>
          <p className="titleWallet">
            <i
              className="fas fa-sack-dollar"
              style={{ fontSize: '33px', color: 'rgba(221, 105, 10, 0.93)' }}
            ></i>
            <span className="span">الرصيد في المحفظة </span>
          </p>
          <div className="aval">
            المتوفر :<span>500ل س</span>
          </div>
          <div className="aval">
            المحجوز :<span>500ل س</span>{' '}
          </div>
        </div>
        <div className="con_ed_sa">
          <div className="con_ed">
            <p className="tit_ed">
              <div className="ico">
                <i class="fa fa-plus "></i>
              </div>
              <span className="span">ايداع مبلغ</span>
            </p>
            <p className="det_ed">أدخل المبلغ الذي تريد ايداعه</p>
            <input className="inp_ed" />
            <button className="ptn_ed "> ايداع</button>
          </div>
          <div className="con_sa">
            <p className="tit_sa">
              <div className="ico">
                <i class="fa-solid fa-minus minus"></i>
              </div>
              <span className="span">سحب مبلغ</span>
            </p>
            <p className="det_sa">أدخل المبلغ الذي تريد سحبه</p>
            <input className="inp_ed" />
            <button className="ptn_ed ">سحب</button>
          </div>
        </div>
        <div>
          <p className="titleWallet">
            <i class="fa-solid fa-minus minus"></i>
            <span className="span">نشاط المحفظة</span>
          </p>

          <table className="table1">
            <thead>
              <tr>
                <th>النوع</th>
                <th>المبلغ</th>
                <th>التاريخ</th>
                <th>الحالة</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>إيداع</td>
                <td>500 ل.س</td>
                <td>
                  2025/07/15
                  <br />
                  10:06 مساءً
                </td>

                <td>
                  <span class="status done">مكتمل ✅</span>
                </td>
              </tr>

              <tr>
                <td>سحب</td>
                <td>500 ل.س</td>
                <td>
                  2025/07/15
                  <br />
                  10:06 مساءً
                </td>
                <td>
                  <span class="status fail">فشل ❌</span>
                </td>
              </tr>
              <tr>
                <td>دفع مزاد</td>
                <td>500 ل.س</td>
                <td>
                  2025/07/15
                  <br />
                  10:06 مساءً
                </td>
                <td>
                  <span class="status done">مكتمل ✅</span>
                </td>
              </tr>
              <tr>
                <td>سحب</td>
                <td>500 ل.س</td>
                <td>
                  2025/07/15
                  <br />
                  10:06 مساءً
                </td>
                <td>
                  <span class="status wait">انتظار ⏳</span>
                </td>
              </tr>
              <tr>
                <td>دفع مناقصة</td>
                <td>500 ل.س</td>
                <td>
                  2025/07/15
                  <br />
                  10:06 مساءً
                </td>
                <td>
                  <span class="status done">مكتمل ✅</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
