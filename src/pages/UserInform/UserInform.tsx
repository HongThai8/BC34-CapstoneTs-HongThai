import React, { useEffect } from 'react'
import { history } from '../..';
import KhoaHocCuaToi from '../../components/KhoaHocCuaToi';
import ThongTinCaNhan from '../../components/ThongTinCaNhan';
import { getProfileApi } from '../../redux/reducers/userReducer';
import { ACCESS_TOKEN, getStore } from '../../utils/setting';

type Props = {}

export default function UserInform({}: Props) {
  useEffect(()=>{
    if (!getStore(ACCESS_TOKEN)) {
      alert("Bắt buộc phải đăng nhập trước khi vào trang này");
      history.push('/login')
    }
    if(getStore(ACCESS_TOKEN)){
      getProfileApi()
    }
  },[])
  return (
    <div className="user-inform">
      <div className="carousel mb-4">
        <div className="container">
          <div className="title text-center">
            <div className="text-center">
            <h3>Trang thông tin cá nhân</h3>
            <p>Nơi chắp cánh cho ước mơ lập trình</p>
            </div>
          </div>
        </div>
      </div>
      <div className="main-content">
        <div className="container">
          <ul className="nav nav-tabs" id="myTab" role="tablist">
            <li className="nav-item" role="presentation">
              <button
                className="nav-link active"
                id="home-tab"
                data-bs-toggle="tab"
                data-bs-target="#profile"
                type="button"
                role="tab"
              >
                Thông tin cá nhân
              </button>
            </li>
            <li className="nav-item" role="presentation">
              <button
                className="nav-link"
                id="profile-tab"
                data-bs-toggle="tab"
                data-bs-target="#course"
                type="button"
                role="tab"
              >
                Khóa học đã ghi danh
              </button>
            </li>
          </ul>
          <div className="tab-content" id="myTabContent">
            <div
              className="tab-pane fade show active"
              id="profile"
              role="tabpanel"
            >
              <ThongTinCaNhan />
            </div>
            <div className="tab-pane fade" id="course" role="tabpanel">
              <KhoaHocCuaToi />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}