import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { RootState, AppDispatch } from "../../redux/configStore";
import {
  getCourseByCategoryApi,
  CourseModel,
} from "../../redux/reducers/courseReducer";
import {NavLink} from "react-router-dom"
type Props = {};

type courseCategoryParam = {
  maDanhMuc: any;
};

export default function Category({}: Props) {
  const courseByCategory = useSelector(
    (state: RootState) => state?.courseReducer?.courseByCategory
  );
  const dispatch: AppDispatch = useDispatch();
  const params = useParams<courseCategoryParam>();
  const getCourseByCategory = async () => {
    let { maDanhMuc } = params;
    const action = getCourseByCategoryApi(maDanhMuc);
    dispatch(action);
  };
  React.useEffect(() => {
    getCourseByCategory();
  }, [params?.maDanhMuc]);

  const renderCourseByCategory = () => {
    return courseByCategory?.map((crs: CourseModel, index: number) => {
      return (
        <div className="col-lg-3 col-md-6 col-12 mt-2" key={index}>
          <div className="card shadow p-3 mb-4 bg-body rounded border-white">
            <img height="200" src={crs.hinhAnh} alt={crs.tenKhoaHoc} />
            <div className="card-body">
              <div className="d-flex flex-column">
                <div style={{ height: "50px" }}>
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
    <div className="container">
      <h2 className="mt-3 mb-4">Các khóa học phổ biến</h2>
      <div className="row">
        {renderCourseByCategory()}
      </div>
    </div>
  );
}
