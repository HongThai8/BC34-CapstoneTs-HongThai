import React, { useEffect } from "react";
import { FormikProps, useFormik } from "formik";
import { useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../redux/configStore";
import { loginApi, LoginModel } from "../../redux/reducers/userReducer";
import * as Yup from "yup";
import { NavLink } from "react-router-dom";
import axios from "axios";
type Props = {};

interface FormValues {
  taiKhoan: string;
  matKhau: string;
}

export default function Login({}: Props) {
  const dispatch: AppDispatch = useDispatch();
  const frm: FormikProps<FormValues> = useFormik<FormValues>({
    initialValues: {
      taiKhoan: "",
      matKhau: "",
    },
    validationSchema: Yup.object().shape({
      taiKhoan: Yup.string().required("Tai khoan không được bỏ trống"),
      matKhau: Yup.string()
        .required("Mật khẩu không được bỏ trống")
        .min(6, "Password có độ dài từ 6 đến 32 ký tự")
        .max(32, "Password có độ dài từ 6 đến 32 ký tự"),
    }),
    onSubmit: (values: LoginModel) => {
      dispatch(loginApi(values));
    },
  });

  return (
    <div className="container">
      <div className="form-signin w-100 m-auto">
        <form className="mt-5 mb-5" onSubmit={frm.handleSubmit}>
          <h2 className=" mb-5 fw-semibold text-center">-Please Sign In-</h2>
          <div className="form-floating">
            <input
              type="text"
              className="form-control"
              id="taiKhoan"
              onChange={frm.handleChange}
              onBlur={frm.handleBlur}
            />
            <label htmlFor="floatingtaiKhoan">Tai Khoan</label>
            {frm.errors.taiKhoan ? (
              <span className="text-danger fs-6 fw-lighter fst-italic ms-1 text-capitalize">
                {frm.errors.taiKhoan}
              </span>
            ) : (
              ""
            )}
          </div>
          <div className="form-floating">
            <input
              type="password"
              className="form-control"
              id="matKhau"
              onChange={frm.handleChange}
              onBlur={frm.handleBlur}
            />
            <label htmlFor="floatingmatKhau">Mat Khau</label>
            {frm.errors.matKhau ? (
              <span className="text-danger fs-6 fw-lighter fst-italic ms-1 text-capitalize">
                {frm.errors.matKhau}
              </span>
            ) : (
              ""
            )}
          </div>
          <div className="checkbox mt-4 mb-4">
            <label>
              <input type="checkbox" defaultValue="remember-me" /> Remember me
            </label>
          </div>
          <button className="w-100 btn btn-lg btn-dark mt-3 mb-3" type="submit">
            Sign in
          </button>
          <p className="mt-5 mb-5 text-muted text-center">
            Not a Member?
            <NavLink to="/register" className="text-muted ms-1">
              Join Us
            </NavLink>
          </p>
        </form>
      </div>
    </div>
  );
}
