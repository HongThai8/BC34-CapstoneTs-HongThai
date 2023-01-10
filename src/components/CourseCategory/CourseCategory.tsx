import React from 'react'

type Props = {
    cate:any,
}

export default function CourseCategory({cate}: Props) {
  return (
    <tr>
       <td>{cate.maDanhMuc}</td>
       <td>{cate.tenDanhMuc}</td> 
    </tr>
  )
}