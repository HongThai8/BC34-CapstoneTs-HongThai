import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { AppDispatch, RootState } from "../../redux/configStore";
import {
  CourseModel,
  getAllCourseApi,
} from "../../redux/reducers/courseReducer";
import { randomCourse } from "../../utils/setting";
import Carousel from "../../components/Carousel";
type Props = {};

export default function Home({}: Props) {
  const dispatch: AppDispatch = useDispatch();
  const arrCourse = useSelector(
    (rootState: RootState) => rootState?.courseReducer?.arrCourse
  );
  React.useEffect(() => {
    const action = getAllCourseApi();
    dispatch(action);
  }, []);
  const renderCourse = () => {
    let newArrCourse = randomCourse(arrCourse, 8);
    return newArrCourse.map((crs: CourseModel, index: number) => {
      return (
        <div className="col-lg-3 col-md-6 col-12 mt-2" key={index}>
          <div className="card shadow p-3 mb-4 bg-body rounded border-white">
            <img height="200" src={crs.hinhAnh} alt={crs.tenKhoaHoc} />
            <div className="card-body">
              <div className="d-flex flex-column">
                <div style={{height: '50px'}}>
                  <p className="fw-semibold">{crs.tenKhoaHoc}</p>
                </div>
                <NavLink
                  className="btn btn-dark"
                  to={`/detail/${crs.maKhoaHoc}`}
                >
                  Đăng Ký
                </NavLink>
              </div>
            </div>
          </div>
        </div>
      );
    });
  };
  return (
    <div className="home">
      <Carousel />
      <div className="container mt-5">
        <h2>Danh sách khóa học</h2>
        <div className="row mt-5">{renderCourse()}</div>
      </div>
    </div>
  );
}