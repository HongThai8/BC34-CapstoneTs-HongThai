type Props = {}
export default function JoinList({}: Props) {
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
            <tr className="text-center">
              <td>1</td>
              <td>Hello</td>
              <td>Bruh C</td>
              <td>
                <button className="btn btn-danger">Hủy</button>
              </td>
            </tr>
            <tr className="text-center">
              <td>2</td>
              <td>Hello</td>
              <td>Bruh D</td>
              <td>
                <button className="btn btn-danger">Hủy</button>
              </td>
            </tr>
          </tbody>
        </table>
    </div>
  )
}