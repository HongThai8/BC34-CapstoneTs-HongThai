import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import AdminHeader from "../components/Admin/AdminHeader";
import AdminNavbar from "../components/Admin/AdminNavbar";

type Props = {};

export default function AdminTemplate({}: Props) {
  return (
    <div className="d-flex flex-row" style={{maxWidth: "100vw"}}>
      <div>
        <AdminHeader />
      </div>
      <div style={{width:'100%'}}>
        <AdminNavbar/>
        <Outlet />
      </div>
    </div>
  );
}
