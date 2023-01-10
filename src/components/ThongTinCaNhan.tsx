import { useFormik,FormikProps } from 'formik';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
// import { history } from '..';
import { RootState } from '../redux/configStore';
import { updateUserApi } from '../redux/reducers/userReducer';
// import { ACCESS_TOKEN, getStore } from '../utils/setting';
import * as Yup from 'yup'
import { AppDispatch } from '../redux/configStore'
import { UserModel } from '../redux/reducers/userReducer'
// import { values } from 'lodash';

type Props = {}

interface FormValues{
  taiKhoan: string,
  matKhau: string,
  hoTen: string,
  soDT: string,
  email: string,
  maLoaiNguoiDung:string,
  maNhom:string,
}

export default function ThongTinCaNhan({}: Props) {
  const {userLogin} = useSelector((state:RootState)=>state.userReducer)
  const dispatch:AppDispatch = useDispatch()
  // useEffect(()=>{
  //   if (!getStore(ACCESS_TOKEN)) {
  //     alert("Bắt buộc phải đăng nhập trước khi vào trang này");
  //     history.push('/login')
  //   }
  //   if(getStore(ACCESS_TOKEN)){
  //     getProfileApi()
  //   }
  // },[])
  const frm : FormikProps<FormValues> = useFormik<FormValues>({
    initialValues:{
      taiKhoan: userLogin?.taiKhoan,
      matKhau: userLogin?.matKhau,
      hoTen: userLogin?.hoTen,
      soDT: userLogin?.soDT,
      email: userLogin?.email,
      maLoaiNguoiDung:userLogin?.maLoaiNguoiDung,
      maNhom:userLogin?.maNhom,
    },
    onSubmit :(values:UserModel):void=>{
      alert('Cập nhật thành công!')
      dispatch(updateUserApi(values))
    },
    validationSchema:Yup.object().shape({
      taiKhoan:Yup.string(),
      matKhau:Yup.string().min(6,"Mật khẩu có độ dài từ 6 đến 32 ký tự").max(32,"Mật khẩu có độ dài từ 6 đến 32 ký tự"),
      hoTen:Yup.string().matches(/^[AÀẢÃÁẠĂẰẲẴẮẶÂẦẨẪẤẬBCDĐEÈẺẼÉẸÊỀỂỄẾỆFGHIÌỈĨÍỊJKLMNOÒỎÕÓỌÔỒỔỖỐỘƠỜỞỠỚỢPQRSTUÙỦŨÚỤƯỪỬỮỨỰVWXYỲỶỸÝỴZ][aàảãáạăằẳẵắặâầẩẫấậbcdđeèẻẽéẹêềểễếệfghiìỉĩíịjklmnoòỏõóọôồổỗốộơờởỡớợpqrstuùủũúụưừửữứựvwxyỳỷỹýỵz]+ [AÀẢÃÁẠĂẰẲẴẮẶÂẦẨẪẤẬBCDĐEÈẺẼÉẸÊỀỂỄẾỆFGHIÌỈĨÍỊJKLMNOÒỎÕÓỌÔỒỔỖỐỘƠỜỞỠỚỢPQRSTUÙỦŨÚỤƯỪỬỮỨỰVWXYỲỶỸÝỴZ][aàảãáạăằẳẵắặâầẩẫấậbcdđeèẻẽéẹêềểễếệfghiìỉĩíịjklmnoòỏõóọôồổỗốộơờởỡớợpqrstuùủũúụưừửữứựvwxyỳỷỹýỵz]+(?: [AÀẢÃÁẠĂẰẲẴẮẶÂẦẨẪẤẬBCDĐEÈẺẼÉẸÊỀỂỄẾỆFGHIÌỈĨÍỊJKLMNOÒỎÕÓỌÔỒỔỖỐỘƠỜỞỠỚỢPQRSTUÙỦŨÚỤƯỪỬỮỨỰVWXYỲỶỸÝỴZ][aàảãáạăằẳẵắặâầẩẫấậbcdđeèẻẽéẹêềểễếệfghiìỉĩíịjklmnoòỏõóọôồổỗốộơờởỡớợpqrstuùủũúụưừửữứựvwxyỳỷỹýỵz]*)*/,'Tên không đúng định dạng'),
      soDT:Yup.string().matches(/^(0?)(3[2-9]|5[6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])[0-9]{7}$/,'Số điện thoại không đúng định dạng(09...)').max(10,'Số điện thoại tối đa 10 số'),
      email:Yup.string().email('Email sai định dạng. Xin hãy thử lại!'),
    })
  })
  return (
    <div className='ttcn mb-5'>
      <div className="container">
        <form className='row mt-4' onSubmit={frm.handleSubmit}>
          <div className="col-6">
            <div className="form-group">
              <p>Email</p>
              <input type="email" name="email" className='form-control mb-2' placeholder={userLogin?.email} onChange={frm.handleChange} onBlur={frm.handleBlur}/>
              {frm.errors.email?<span className='text-danger fw-bold'>{frm.errors.email}</span>:''}
              <p>Họ tên</p>
              <input type="text" name="hoTen" className='form-control mb-2' placeholder={userLogin?.hoTen} onChange={frm.handleChange} onBlur={frm.handleBlur}/>
              {frm.errors.hoTen?<span className='text-danger fw-bold'>{frm.errors.hoTen}</span>:''}
              <p>Số điện thoại</p>
              <input type="text" name="soDT" className='form-control' placeholder={userLogin?.soDT} onChange={frm.handleChange} onBlur={frm.handleBlur}/>
              {frm.errors.soDT?<span className='text-danger fw-bold'>{frm.errors.soDT}</span>:''}
            </div>
          </div>
          <div className="col-6">
            <div className="form-group">
              <p>Tài khoản</p>
              <input type="text" name="taiKhoan" className='form-control mb-2' disabled placeholder={userLogin?.taiKhoan}/>
              <p>Mật khẩu</p>
              <input type="password" name="matKhau" className='form-control' onChange={frm.handleChange} onBlur={frm.handleBlur}/>
              {frm.errors.matKhau?<span className='text-danger fw-bold'>{frm.errors.matKhau}</span>:''}
            </div>
            <button className='btn btn-primary mt-5' type='submit'>Cập nhật</button>
          </div>
        </form>
      </div>
    </div>
  )
}