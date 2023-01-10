import React from "react";
import { NavLink } from "react-router-dom";
import { useFormik, FormikProps } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../redux/configStore";
import * as Yup from "yup";
import {
  registerApi,
  UserModel,
  AddUser,
  addUserApi,
  getAllUserApi 
} from "../../../redux/reducers/userReducer";
import ConfirmList from "./ConfirmList";
import JoinList from "./JoinList";

type Props = {};
interface addUserValue {
  taiKhoan: string;
  matKhau: string;
  hoTen: string;
  soDT: string;
  maLoaiNguoiDung?: string;
  maNhom?: string;
  email: string;
}

export default function UserManagement({}: Props) {
  const dispatch: AppDispatch = useDispatch();
  const {allUsers} = useSelector((state: RootState) => state.userReducer);
  const getAllUser = () => {
    dispatch(getAllUserApi())
  }
  React.useEffect(() => {
    getAllUser()
  })

  const frm: FormikProps<addUserValue> = useFormik<addUserValue>({
    initialValues: {
      taiKhoan: "",
      matKhau: "",
      hoTen: "",
      soDT: "",
      maLoaiNguoiDung: "HV",
      maNhom: "GP01",
      email: "",
    },
    onSubmit: (values: AddUser): void => {
      dispatch(addUserApi(values));
    },
    validationSchema: Yup.object().shape({
      taiKhoan: Yup.string().required("Tài khoản không được để trống!"),
      matKhau: Yup.string()
        .required("Mật khẩu không được để trống!")
        .min(6, "Mật khẩu có độ dài từ 6 đến 32 ký tự")
        .max(32, "Mật khẩu có độ dài từ 6 đến 32 ký tự"),
      hoTen: Yup.string()
        .required("Yêu cầu họ tên!")
        .matches(
          /^[AÀẢÃÁẠĂẰẲẴẮẶÂẦẨẪẤẬBCDĐEÈẺẼÉẸÊỀỂỄẾỆFGHIÌỈĨÍỊJKLMNOÒỎÕÓỌÔỒỔỖỐỘƠỜỞỠỚỢPQRSTUÙỦŨÚỤƯỪỬỮỨỰVWXYỲỶỸÝỴZ][aàảãáạăằẳẵắặâầẩẫấậbcdđeèẻẽéẹêềểễếệfghiìỉĩíịjklmnoòỏõóọôồổỗốộơờởỡớợpqrstuùủũúụưừửữứựvwxyỳỷỹýỵz]+ [AÀẢÃÁẠĂẰẲẴẮẶÂẦẨẪẤẬBCDĐEÈẺẼÉẸÊỀỂỄẾỆFGHIÌỈĨÍỊJKLMNOÒỎÕÓỌÔỒỔỖỐỘƠỜỞỠỚỢPQRSTUÙỦŨÚỤƯỪỬỮỨỰVWXYỲỶỸÝỴZ][aàảãáạăằẳẵắặâầẩẫấậbcdđeèẻẽéẹêềểễếệfghiìỉĩíịjklmnoòỏõóọôồổỗốộơờởỡớợpqrstuùủũúụưừửữứựvwxyỳỷỹýỵz]+(?: [AÀẢÃÁẠĂẰẲẴẮẶÂẦẨẪẤẬBCDĐEÈẺẼÉẸÊỀỂỄẾỆFGHIÌỈĨÍỊJKLMNOÒỎÕÓỌÔỒỔỖỐỘƠỜỞỠỚỢPQRSTUÙỦŨÚỤƯỪỬỮỨỰVWXYỲỶỸÝỴZ][aàảãáạăằẳẵắặâầẩẫấậbcdđeèẻẽéẹêềểễếệfghiìỉĩíịjklmnoòỏõóọôồổỗốộơờởỡớợpqrstuùủũúụưừửữứựvwxyỳỷỹýỵz]*)*/,
          "Tên không đúng định dạng"
        ),
      soDT: Yup.string()
        .required("Phải có số điện thoại!")
        .matches(
          /^(0?)(3[2-9]|5[6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])[0-9]{7}$/,
          "Số điện thoại không đúng định dạng(09...)"
        )
        .max(10, "Số điện thoại tối đa 10 số"),
      email: Yup.string()
        .required("Email không được để trống!")
        .email("Email sai định dạng. Xin hãy thử lại!"),
    }),
  });

  const renderUserBeenAdd = React.useCallback(() => {
    return allUsers.map((item: addUserValue, index: number) => {
      return (
        <tr key={index}>
          <td>{index + 1}</td>
          <td>{item.taiKhoan}</td>
          <td>{item.matKhau}*</td>
          <td>{item.hoTen}</td>
          <td>{item.email}</td>
          <td>{item.soDT}</td>
          <td>
            <button
              data-bs-toggle="modal"
              data-bs-target="#modalId"
              className="btn btn-success m-2"
            >
              Ghi danh
            </button>
            <button className="btn btn-warning m-2">Cập nhật</button>
            <button className="btn btn-danger m-2">X</button>
          </td>
        </tr>
      );
    });
  },[allUsers]);
  return (
    <div className="user-management">
      <div className="userContainer mt-5">
        <div
          className="modal fade"
          id="modalId1"
          tabIndex={-1}
          data-bs-backdrop="static"
          data-bs-keyboard="false"
          role="dialog"
          aria-labelledby="modalTitleId"
          aria-hidden="true"
        >
          <div
            className="modal-dialog modal-dialog-scrollable modal-dialog-centered modal-xl"
            role="document"
          >
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="modalTitleId">
                  Them nguoi dung
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                />
              </div>
              <div className="modal-body">
                <form className="row g-3" onSubmit={frm.handleSubmit}>
                  <div className="col-md-6 form-floating mb-4">
                    <input
                      type="text"
                      name="taiKhoan"
                      className="form-control"
                      onChange={frm.handleChange}
                      onBlur={frm.handleBlur}
                    />
                    <label className="fw-normal fs-6" htmlFor="floatingInput">
                      Account
                    </label>
                    {frm.errors.taiKhoan ? (
                      <span className="text-danger fw-bold">
                        {frm.errors.taiKhoan}
                      </span>
                    ) : (
                      ""
                    )}
                  </div>
                  <div className="col-md-6 form-floating mb-4">
                    <input
                      type="password"
                      name="matKhau"
                      className="form-control"
                      onChange={frm.handleChange}
                      onBlur={frm.handleBlur}
                    />
                    <label
                      className="fw-normal fs-6"
                      htmlFor="floatingPassword"
                    >
                      Password
                    </label>
                    {frm.errors.matKhau ? (
                      <span className="text-danger fw-bold">
                        {frm.errors.matKhau}
                      </span>
                    ) : (
                      ""
                    )}
                  </div>
                  <div className="col-md-6 form-floating mb-4">
                    <input
                      type="text"
                      name="hoTen"
                      className="form-control"
                      onChange={frm.handleChange}
                      onBlur={frm.handleBlur}
                    />
                    <label
                      className="fw-normal fs-6"
                      htmlFor="floatingConfirmPassword"
                    >
                      Full name
                    </label>
                    {frm.errors.hoTen ? (
                      <span className="text-danger fw-bold">
                        {frm.errors.hoTen}
                      </span>
                    ) : (
                      ""
                    )}
                  </div>
                  <div className="col-md-6 form-floating mb-4">
                    <input
                      type="email"
                      name="email"
                      className="form-control"
                      onChange={frm.handleChange}
                      onBlur={frm.handleBlur}
                    />
                    <label className="fw-normal fs-6" htmlFor="name">
                      Email
                    </label>
                    {frm.errors.email ? (
                      <span className="text-danger fw-bold">
                        {frm.errors.email}
                      </span>
                    ) : (
                      ""
                    )}
                  </div>
                  <div className="col-md-6 form-floating mb-4">
                    <input
                      type="text"
                      name="soDT"
                      className="form-control"
                      onChange={frm.handleChange}
                      onBlur={frm.handleBlur}
                    />
                    <label className="fw-normal fs-6" htmlFor="phone">
                      Phone
                    </label>
                    {frm.errors.soDT ? (
                      <span className="text-danger fw-bold">
                        {frm.errors.soDT}
                      </span>
                    ) : (
                      ""
                    )}
                  </div>
                  <div className="col-md-6 form-floating mb-4">
                    <fieldset className="row">
                      <legend className="col-form-label col-sm-2 pt-0 ps-3">
                        Type of User
                      </legend>
                      <div className="col-sm-2">
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="gender"
                            id="gender1"
                            value="Hoc Vien"
                            defaultChecked
                          />
                          <label className="form-check-label" htmlFor="gender1">
                            Hoc Vien
                          </label>
                        </div>
                      </div>
                      <div className="col-sm-2">
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="gender"
                            id="gender2"
                            value="Giao Vu"
                            defaultChecked
                          />
                          <label className="form-check-label" htmlFor="gender2">
                            Giao Vu
                          </label>
                        </div>
                      </div>
                    </fieldset>
                  </div>
                  <div className="d-grid mt-4 mb-4">
                    <button className="btn btn-dark" type="submit">
                      Submit
                    </button>
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
                <button type="button" className="btn btn-primary">
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className="modal fade"
        id="modalId"
        tabIndex={-1}
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        role="dialog"
      >
        <div
          className="modal-dialog modal-lg modal-dialog-scrollable modal-dialog-centered"
          role="document"
        >
          <div className="modal-content">
            <div className="modal-header">
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
              />
            </div>
            <div className="modal-body">
              <div className="content-1">
                <h4>Chọn người dùng</h4>
                <div className="form">
                  <div className="form-group">
                    <div className="row">
                      <div className="col-10">
                        <input
                          className="form-control"
                          type="text"
                          placeholder="Tên người dùng"
                        />
                      </div>
                      <div className="col-2">
                        <button className="btn btn-light">Ghi danh</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="content-2">
                <ConfirmList />
              </div>

              <div className="content-3">
                <JoinList />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="course-title text-center">
        <h3>Quản lý người dùng</h3>
      </div>
      <form className="mt-5">
        <div className="form-group">
          <input
            className="form-control mb-2"
            type="search"
            placeholder="Nhập vào tại khoản hoặc tên người dùng"
          />
          <button className="btn btn-dark btn-sm">Tìm kiếm</button>
          <button
            type="button"
            className="btn btn-secondary btn-sm ms-2"
            data-bs-toggle="modal"
            data-bs-target="#modalId1"
          >
            Thêm người dùng
          </button>
        </div>
      </form>
      <div className="d-flex mt-5">
        <div className="table-responsive border border-dark">
          <table className="table table-striped align-middle text-center">
            <thead>
              <tr>
                <th>STT</th>
                <th>Tài Khoản</th>
                <th>Mật Khẩu</th>
                <th>Họ Tên</th>
                <th>Email</th>
                <th>Số điện thoại</th>
                <th>Thao Tác</th>
              </tr>
            </thead>
            <tbody>
              {renderUserBeenAdd()}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
