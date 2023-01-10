import React from "react";
import {NavLink} from "react-router-dom"

export default function AdminHeader() {
  return (
      <div
      className="d-inline-flex flex-column flex-shrink-0 p-3 text-bg-dark"
      style={{ width: 280, height: "100%" }}
    >
      <a
        href="/"
        className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none"
      >
        <svg className="bi pe-none me-2" width={40} height={32}>
          <use xlinkHref="#bootstrap" />
        </svg>
        <span className="fs-4">Home page</span>
      </a>
      <hr />
      <ul className="nav nav-pills flex-column mb-auto">
        {/* <li className="nav-item">
          <a href="#" className="nav-link active" aria-current="page">
            <svg className="bi pe-none me-2" width={13} height={16}>
              <use xlinkHref="#home" />
            </svg>
            Home
          </a>
        </li> */}
        <li className="nav-item">
          <div>
            <button
              className="btn btn-toggle d-inline-flex align-items-center rounded border-0 collapsed text-white"
              data-bs-toggle="collapse"
              data-bs-target="#dashboard-collapse"
              aria-expanded="false"
            >
              <svg className="bi pe-none me-2" width={16} height={16}>
                <use xlinkHref="#speedometer2" />
              </svg>
              Dashboard
            </button>
            <div className="collapse" id="dashboard-collapse">
              <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                <li>
                  <NavLink
                    to={"/admin/usermanagement"}
                    className="link-white d-inline-flex text-decoration-none rounded text-white pb-2 pt-2 ms-5"
                  >
                    Quản lý Người dùng
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to={"/admin/coursemanagement"}
                    className="link-white d-inline-flex text-decoration-none rounded text-white pb-2 pt-2 ms-5"
                  >
                    Quản lý Khóa học
                  </NavLink>
                </li>
              </ul>
            </div>
          </div>
        </li>
      </ul>
    </div>
  );
}
