import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "../../../redux/configStore"
import { cancelRegisterCourseApi, DangKyKhoaHoc, MaKh } from "../../../redux/reducers/courseReducer"
import { UserModel, waitingUserListApi } from "../../../redux/reducers/userReducer"

type Props = {
  maKh?:any,
}
export default function JoinList({maKh}: Props) {
  const {waitingUsers} = useSelector((state:RootState)=>state.userReducer)
  const dispatch:AppDispatch = useDispatch()
  const mKh:MaKh={
    maKhoaHoc : maKh
  }
  const waitingList = (maKh:MaKh):void =>{
    const action = waitingUserListApi(maKh)
    dispatch(action)
  }
  const renderWaiting = () =>{
    if(waitingUsers?.length === 0){
      return <tr>
        <td colSpan={4} className='fw-bold'>Chưa có học viên được xét duyệt</td>
      </tr>
    }
    return waitingUsers.map((user:UserModel,index:number)=>{
      return <tr className="text-center" key={index}>
      <td>{index+1}</td>
      <td>{user.taiKhoan}</td>
      <td>{user.hoTen}</td>
      <td>
        <button className="btn btn-danger" onClick={async()=>{
          let value:DangKyKhoaHoc = {
            taiKhoan : user.taiKhoan,
            maKhoaHoc : maKh,
          }
          if(window.confirm('Bạn có muốn hủy học viên này?')){
            await dispatch(cancelRegisterCourseApi(value))
            waitingList(mKh)
          }
        }}>Hủy</button>
      </td>
    </tr>
    })
  }
  return (
    <div className="joined-list">
      <div className="d-flex justify-content-between">
        <p>Học viên đã tham gia</p>
        <input style={{width:'225px'}} className="form-control" type="text" placeholder="tài khoản hoặc sđt"/>
      </div>
        
        <table className="table table-light table-striped mt-2">
          <thead>
            <tr className="text-center">
              <th>STT</th>
              <th>Tài Khoản</th>
              <th>Họ Tên</th>
              <th>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {renderWaiting()}
            {/* <tr className="text-center">
              <td>2</td>
              <td>Hello</td>
              <td>Bruh D</td>
              <td>
                <button className="btn btn-danger">Hủy</button>
              </td>
            </tr> */}
          </tbody>
        </table>
    </div>
  )
}