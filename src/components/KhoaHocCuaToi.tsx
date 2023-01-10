import React, { useEffect, useState } from 'react'
import ReactPaginate from 'react-paginate'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { history } from '..'
import { AppDispatch, RootState } from '../redux/configStore'
import { cancelRegisterCourseApi, CourseModel } from '../redux/reducers/courseReducer'
import { getProfileApi } from '../redux/reducers/userReducer'

type Props = {}
type Values = {
  maKhoaHoc:string,
  taiKhoan:string,
}
export default function KhoaHocCuaToi({}: Props) {
  const {userLogin} = useSelector((state:RootState)=>state.userReducer)
  const {chiTietKhoaHocGhiDanh} = userLogin?userLogin:[]
  const dispatch:AppDispatch = useDispatch()
  const [pageNum,setPageNum] = useState(1)
  useEffect(()=>{
    getProfileApi()
  },[chiTietKhoaHocGhiDanh?.length])
  const resultPerPage:number = 3
  const resultFetch:number = pageNum * resultPerPage
  const pageCount:number = Math.ceil(chiTietKhoaHocGhiDanh?.length / resultPerPage)
  const changePage = ({selected}:any)=>{
    setPageNum(selected)
  }
  const renderPaginate = () =>{
    if(chiTietKhoaHocGhiDanh){
      return <ReactPaginate
      previousLabel = {"Prev"}
      nextLabel = {"Next"}
      pageCount = {pageCount}
      onPageChange = {changePage}
      containerClassName={'paginationBtn'}
      previousLinkClassName={'prevBtn'}
      nextLinkClassName={'nextBtn'}
      activeClassName={'activePagBtn'}
      />
    }
  }
  // useEffect(()=>{
  //   if (!getStore(ACCESS_TOKEN)) {
  //     alert("Bắt buộc phải đăng nhập trước khi vào trang này");
  //     history.push('/login')
  //   }
  //   if(getStore(ACCESS_TOKEN)){
  //     getProfileApi()
  //   }
  // },[])
  
  const renderKhoaHoc = () =>{
    if(chiTietKhoaHocGhiDanh?.length !== 0 ){
      return chiTietKhoaHocGhiDanh?.slice(resultFetch,resultFetch+resultPerPage).map((course:CourseModel,index:number)=>{
        return (
          <NavLink to={`/detail/${course.maKhoaHoc}`} className="col-12" key={index}>
            <div className="item">
              <div className="row">
                <div className="col-2">
                  <img src={course?.hinhAnh} alt={course?.tenKhoaHoc} />
                </div>
                <div className="col-10 position-relative">
                  <h3 className="title">{course?.tenKhoaHoc}</h3>
                  <p>{course?.moTa.length>250?course?.moTa.substring(0,250)+'...':course?.moTa}</p>
                  <button className="btn btn-danger position-absolute end-0" onClick={async()=>{
                    let values:Values = {
                      maKhoaHoc:course.maKhoaHoc,
                      taiKhoan:userLogin.taiKhoan
                    }
                    if(window.confirm('Bạn muốn hủy đăng ký khóa học này?')){
                      alert('Hủy đăng ký thành công')
                      await dispatch(cancelRegisterCourseApi(values))
                      history.push('/profile')
                    }
                  }}>
                    Hủy khóa học
                  </button>
                </div>
              </div>
            </div>
          </NavLink>
        );
      })
    }else{
      return <span className='text-dark fw-bold alert'>Bạn chưa đăng ký khóa học nào</span>
    }
  }
  return (
    <div className='my-course mb-4'>
      <div className="container">
        <h3 className='mt-4 main-title'>Các khóa học đã tham gia</h3>
        <div className="courses">
          <div className="row">
            {renderKhoaHoc()}
          </div>
          {renderPaginate()}
        </div>
      </div>
    </div>
  )
}