import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppDispatch, RootState } from "../configStore";
import {
  setCookie,
  getStore,
  getStoreJson,
  ACCESS_TOKEN,
  http,
  setStore,
  setStoreJson,
  USER_LOGIN,
} from "../../utils/setting";
import { history } from "../../index";
// import { isBuffer, values } from "lodash";
import { MaKh } from "./courseReducer";

export interface LoginModel {
  taiKhoan: string;
  matKhau: string;
}
export interface UserModel {
  taiKhoan: string;
  matKhau: string;
  hoTen: string;
  soDT: string;
  maNhom?: string;
  email: string;
  confirmMatKhau?: string;
  maLoaiNguoiDung?: string;
}
export interface AddUser {
  taiKhoan: string;
  matKhau: string;
  hoTen: string;
  soDT: string;
  maLoaiNguoiDung?: string;
  maNhom?: string;
  email: string;
}

const initialState: any = {
  userLogin: getStoreJson(USER_LOGIN),
  registeredUsers: [],
  waitingUsers: [],
  allUsers: [],
  userBeenAdd: []
};

const userReducer = createSlice({
  name: "userReducer",
  initialState,
  reducers: {
    getProfileAction: (state, action: PayloadAction<UserModel[]>) => {
      state.userLogin = action.payload;
    },
    registeredUserListAction: (state, action: PayloadAction<UserModel[]>) => {
      state.registeredUsers = action.payload;
    },
    waitingUserListAction: (state, action: PayloadAction<UserModel[]>) => {
      state.waitingUsers = action.payload;
    },
    addUserAction: (state, action: PayloadAction<AddUser[]>) => {
      state.userBeenAdd = [...state.allUsers];
      state.allUsers = state.userBeenAdd;
    },
    getAllUserAction: (state, action: PayloadAction<UserModel[]>) => {
      state.allUsers = action.payload;
    },
  },
});

export const {
  getProfileAction,
  registeredUserListAction,
  waitingUserListAction,
  getAllUserAction,
  addUserAction,
} = userReducer.actions;

export default userReducer.reducer;
//----------------------action api
//lay thong tin
export const getProfileApi = () => {
  return async (dispatch: AppDispatch) => {
    try {
      const result = await http.post("/QuanLyNguoiDung/ThongTinTaiKhoan");
      setStoreJson(USER_LOGIN, result.data);
      const action = getProfileAction(result.data);
      dispatch(action);
    } catch (error: any) {
      console.log(error);
    }
  };
};
//lay toan bo nguoi dung
export const getAllUserApi = () => {
  return async (dispatch: AppDispatch) => {
    try {
      const result = await http.get(
        "/QuanLyNguoiDung/TimKiemNguoiDung?MaNhom=GP01"
      );
      const action = getAllUserAction(result.data);
      dispatch(action);
    } catch (error) {
      console.log(error);
    }
  };
};
//dang nhap
export const loginApi = (userLogin: LoginModel) => {
  return async (dispatch: AppDispatch) => {
    try {
      const result = await http.post("/QuanLyNguoiDung/DangNhap", userLogin);
      if (result) {
        setCookie(ACCESS_TOKEN, result.data.accessToken, 30);
        setStore(ACCESS_TOKEN, result.data.accessToken);
        alert("Đăng nhập thành công");
        // console.log(result.data.maLoaiNguoiDung);
        if (result.data.maLoaiNguoiDung === "HV") {
          history.push("/home");
        } else {
          history.push("/admin");
        }

        const action = getProfileApi();
        dispatch(action);
      }
    } catch (error: any) {
      let statusCode: number = error?.response?.status;
      let data: string = error?.response?.data;
      if (statusCode === 500) {
        alert(data);
      }
    }
  };
};
//dang ky
export const registerApi = (values: UserModel) => {
  return async (dispatch: AppDispatch) => {
    try {
      const result = await http.post("/QuanLyNguoiDung/DangKy", values);
      alert("Đăng ký thành công!");
      history.push("/login");
      const action = getProfileApi();
      dispatch(action);
    } catch (error: any) {
      let statusCode: number = error?.response?.status;
      let data: string = error?.response?.data;
      if (statusCode === 500) {
        alert(data);
      }
    }
  };
};
//cap nhat nguoi dung
export const updateUserApi = (values: UserModel) => {
  return async (dispatch: AppDispatch) => {
    try {
      const result = await http.put(
        "/QuanLyNguoiDung/CapNhatThongTinNguoiDung",
        values
      );
      // console.log(result);
      const action = getProfileApi();
      dispatch(action);
    } catch (error: any) {
      console.log(error);
    }
  };
};
//lay danh sach ng dung da ghi danh khoa hoc
export const registeredUserListApi = (makh: MaKh) => {
  return async (dispatch: AppDispatch) => {
    try {
      const result = await http.post(
        "/QuanLyNguoiDung/LayDanhSachHocVienKhoaHoc",
        makh
      );
      const action = registeredUserListAction(result.data);

      dispatch(action);
    } catch (error) {
      console.log(error);
    }
  };
};
//lay danh sach ng dung cho xet duyet
export const waitingUserListApi = (makh: MaKh) => {
  return async (dispatch: AppDispatch) => {
    try {
      const result = await http.post(
        "/QuanLyNguoiDung/LayDanhSachHocVienChoXetDuyet",
        makh
      );
      const action = waitingUserListAction(result.data);

      dispatch(action);
    } catch (error) {
      console.log(error);
    }
  };
};

export const addUserApi = (values: AddUser) => {
  return async (dispatch: AppDispatch) => {
    try {
      const result = await http.post("/QuanLyNguoiDung/ThemNguoiDung", values);
      const action = addUserAction(result.data);
      dispatch(action);
      history.push("/admin/usermanagement");
    } catch (error) {
      console.log(error);
    }
  };
};

export const updateUserByAdmiAPI = (values: AddUser) => {
  return async (dispatch: AppDispatch) => {
    try {
      const result = await http.put(
        "/QuanLyNguoiDung/CapNhatThongTinNguoiDung",
        values
      );
      
    } catch (err) {
      console.log(err);
    }
  };
};
