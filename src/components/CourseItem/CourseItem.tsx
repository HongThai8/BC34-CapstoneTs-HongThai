import React from 'react'
import { CourseModel } from '../../redux/reducers/courseReducer'

type Props = {
    course:CourseModel,
    index:number
}

export default function CourseItem({course,index}: Props) {
  return (
    <div className='card mb-2 me-3'>
        {/* <img src={course.hinhAnh} alt={course.tenKhoaHoc} className='img-fluid'/> */}
        <div className="card-body p-2">
            <p className='lead'>{course.tenKhoaHoc}</p>
            <p className='lead'>Instructor: {course.nguoiTao.hoTen}</p>
            <p className='lead'>Rating: 5.0</p>
            <div className="row">
              <div className="col-6">
                <button className='btn btn-success'>Go to Detail</button>
              </div>
              <div className="col-6">
                <p className='text-end' style={{fontSize:'20px'}}>no. {index+1}</p>
              </div>
            </div>
            
        </div>
    </div>
  )
}