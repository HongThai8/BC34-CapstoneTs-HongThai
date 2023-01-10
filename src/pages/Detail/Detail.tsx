import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { history } from '../..';
import { AppDispatch, RootState } from '../../redux/configStore';
import { getCourseDetailApi, registerCourseApi } from '../../redux/reducers/courseReducer';
import { getProfileApi } from '../../redux/reducers/userReducer';
import { ACCESS_TOKEN, getStore } from '../../utils/setting';


type Props = {}
type CourseParams = {
  id:any,
}
type Values = {
  maKhoaHoc:string,
  taiKhoan:string,
}
export default function Detail({}: Props) {
  const {courseDetail} = useSelector((state:RootState)=>state.courseReducer)
  const {userLogin} = useSelector((state:RootState)=>state.userReducer)
  const {chiTietKhoaHocGhiDanh} = userLogin?userLogin:[]
  const dispatch:AppDispatch = useDispatch()
  const params = useParams<CourseParams>()
  const getCourseDetail = async() => {
    let {id} = params
    const action = getCourseDetailApi(id) 
    dispatch(action)
  }
  useEffect(()=>{
    getCourseDetail()
  },[params?.id])
  useEffect(()=>{
    if(getStore(ACCESS_TOKEN)){
      getProfileApi()
    }
  },[])
  const dangKyKhoaHoc = (values:Values) =>{
    dispatch(registerCourseApi(values))
  }
  const renderNutDangKy = () =>{
    if(chiTietKhoaHocGhiDanh){
      for(let crs of chiTietKhoaHocGhiDanh){
        if(crs.maKhoaHoc === courseDetail?.maKhoaHoc){
          return <button className='btn btn-success' disabled>Đã đăng ký</button>
        }
      }
    }
    return <button className="btn btn-success" onClick={()=>{
      if(userLogin){
            if(window.confirm('Bạn muốn đăng ký khóa học này?')){
              let values:Values = {maKhoaHoc:courseDetail.maKhoaHoc,taiKhoan:userLogin.taiKhoan}
              alert('Đăng ký thành công!')
              dangKyKhoaHoc(values)
            }
      }else{
        if(window.confirm('Bạn có muốn đăng nhập để đăng ký khóa học không?')){
          history.push('/login')
        }
      }
    }}>Đăng ký</button>
  }
  return (
    <div className="detail">
      <div className="carousel">
        <div className="container">
          <div className="row">
            <div className="col-6 left-side">
              <h2>{courseDetail?.danhMucKhoaHoc?.tenDanhMucKhoaHoc}</h2>
              <p>Giáo viên: {courseDetail?.nguoiTao?.hoTen}</p>
              {renderNutDangKy()}
            </div>  
            <div className="col-4 right-side">
              <img src={courseDetail?.hinhAnh} alt={courseDetail?.tenKhoaHoc} />
            </div>
          </div>
        </div>
      </div>
      <div className="course-info">
        <div className="container py-4">
          <h3 className='text-center mt-3 mb-5'>Mô tả Khóa học</h3>
          <p className='course-name'>Tên khóa học: <span className='fw-bold'>{courseDetail?.tenKhoaHoc} - {courseDetail?.maKhoaHoc}</span> </p>
          <p className='create-date'>Ngày tạo: {courseDetail?.ngayTao}</p>
          <p className='description'>
            {courseDetail?.moTa}
          </p>
          <p className='view text-end'>Lượt xem: {courseDetail?.luotXem}</p>
        </div>
      </div>
    </div>
  );
}