import React from "react";
import { NavLink } from "react-router-dom";
import { useFormik, FormikProps } from "formik";
import * as Yup from "yup";
import { values } from "lodash";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/configStore";
import { registerApi, UserModel } from "../../redux/reducers/userReducer";
type Props = {};

interface FormValues {
  taiKhoan: string;
  matKhau: string;
  hoTen: string;
  soDT: string;
  maNhom: string;
  email: string;
  confirmMatKhau: string;
}

export default function Register({}: Props) {
  const dispatch: AppDispatch = useDispatch();
  const frm: FormikProps<FormValues> = useFormik<FormValues>({
    initialValues: {
      taiKhoan: "",
      matKhau: "",
      hoTen: "",
      soDT: "",
      maNhom: "GP01",
      email: "",
      confirmMatKhau: "",
    },
    onSubmit: (values: UserModel): void => {
      dispatch(registerApi(values));
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
          "Tên không đúng định dạng , mỗi chữ cái đầu phải viết hoa"
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
      confirmMatKhau: Yup.string()
        .required("Mật khẩu xác nhận không được để trống")
        .min(6, "Mật khẩu xác nhận có độ dài từ 6 đến 32 ký tự")
        .max(32, "Mật khẩu xác nhận có độ dài từ 6 đến 32 ký tự")
        .when("matKhau", {
          is: (pass: string) => (pass && pass.length > 0 ? true : false),
          then: Yup.string().oneOf(
            [Yup.ref("matKhau")],
            "Mật khẩu không khớp, xin vui lòng kiểm tra lại"
          ),
        }),
    }),
  });
  return (
    <div className="register mb-4">
      <div className="container">
        <div className="row">
          <div className="col-md-6 col-0"></div>
          <div className="col-md-6 col-12">
            <div className="title mt-5">
              <h3 className="text-center fw-bold">-- Đăng ký --</h3>
            </div>
            <div className="form-area mt-4">
              <form onSubmit={frm.handleSubmit}>
                <div className="form-group">
                  <p>Tài khoản</p>
                  <input
                    type="text"
                    name="taiKhoan"
                    className="form-control"
                    onChange={frm.handleChange}
                    onBlur={frm.handleBlur}
                  />
                  {frm.errors.taiKhoan ? (
                    <span className="text-danger fw-bold">
                      {frm.errors.taiKhoan}
                    </span>
                  ) : (
                    ""
                  )}
                </div>
                <div className="form-group">
                  <p>Mật khẩu</p>
                  <input
                    type="password"
                    name="matKhau"
                    className="form-control"
                    onChange={frm.handleChange}
                    onBlur={frm.handleBlur}
                  />
                  {frm.errors.matKhau ? (
                    <span className="text-danger fw-bold">
                      {frm.errors.matKhau}
                    </span>
                  ) : (
                    ""
                  )}
                </div>
                <div className="form-group">
                  <p>Nhập lại mật khẩu</p>
                  <input
                    type="password"
                    name="confirmMatKhau"
                    className="form-control"
                    onChange={frm.handleChange}
                    onBlur={frm.handleBlur}
                  />
                  {frm.errors.confirmMatKhau ? (
                    <span className="text-danger fw-bold">
                      {frm.errors.confirmMatKhau}
                    </span>
                  ) : (
                    ""
                  )}
                </div>
                <div className="form-group">
                  <p>Họ Tên</p>
                  <input
                    type="text"
                    name="hoTen"
                    className="form-control"
                    onChange={frm.handleChange}
                    onBlur={frm.handleBlur}
                  />
                  {frm.errors.hoTen ? (
                    <span className="text-danger fw-bold">
                      {frm.errors.hoTen}
                    </span>
                  ) : (
                    ""
                  )}
                </div>
                <div className="form-group">
                  <p>Email</p>
                  <input
                    type="email"
                    name="email"
                    className="form-control"
                    onChange={frm.handleChange}
                    onBlur={frm.handleBlur}
                  />
                  {frm.errors.email ? (
                    <span className="text-danger fw-bold">
                      {frm.errors.email}
                    </span>
                  ) : (
                    ""
                  )}
                </div>
                <div className="form-group">
                  <p>Số điện thoại</p>
                  <input
                    type="text"
                    name="soDT"
                    className="form-control"
                    onChange={frm.handleChange}
                    onBlur={frm.handleBlur}
                  />
                  {frm.errors.soDT ? (
                    <span className="text-danger fw-bold">
                      {frm.errors.soDT}
                    </span>
                  ) : (
                    ""
                  )}
                </div>
                <div className="row mt-4">
                  <div className="col-6">
                    <button className="btn btn-warning" type="submit">
                      Đăng ký
                    </button>
                  </div>
                  <div className="col-6">
                    <NavLink to={"/login"} className="btn btn-secondary">
                      Đăng nhập
                    </NavLink>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
