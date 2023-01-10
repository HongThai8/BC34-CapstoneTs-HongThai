import { NavLink } from "react-router-dom"
import { history } from "../.."
import { ACCESS_TOKEN, deleteStore, USER_LOGIN } from "../../utils/setting"

type Props = {}
export default function AdminNavbar({}: Props) {
    const signOut = () => {
      const accessToken = ACCESS_TOKEN;
      const userLogin = USER_LOGIN;
      deleteStore(accessToken);
      deleteStore(userLogin);
      history.push("/home");
      window.location.reload();
    }; 
    const styleLogin = {
        transform: "translateX(100px)",
        right:"150px"
    }
  return (
    <div className='position-relative admin-navbar'>

      <div className="flex-shrink-0 dropdown position-absolute" style={styleLogin}>
        <a
          href="#"
          className="d-block link-dark text-decoration-none dropdown-toggle"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          <img
            src="https://picsum.photos/200"
            alt="mdo"
            width={32}
            height={32}
            className="rounded-circle"
          />
        </a>
        <ul className="dropdown-menu text-small shadow">
          <li>
            <a
              className="dropdown-item"
              href="#"
              onClick={() => {
                if (window.confirm("Bạn muốn đăng xuất?")) {
                  alert("Đăng xuất thành công");
                  signOut();
                }
              }}
            >
              Đăng xuất
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}