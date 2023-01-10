type Props = {};
export default function ConfirmList({}: Props) {
  return (
    <div className="confirm-list">
      <div className="d-flex justify-content-between">
        <p>Học viên chờ xác thực</p>
        <input
          style={{ width: "225px" }}
          className="form-control"
          type="text"
          placeholder="tài khoản hoặc sđt"
        />
      </div>

      <table className="table table-light table-striped mt-2">
        <thead>
          <tr className="text-center">
            <th>STT</th>
            <th>Tên Khóa học</th>
            <th>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          <tr className="text-center">
            <td>1</td>
            <td>Hello</td>
            <td>
              <button className="btn btn-success mx-2">Xác thực</button>
              <button className="btn btn-danger mx-2">Hủy</button>
            </td>
          </tr>
          <tr className="text-center">
            <td>2</td>
            <td>Hello</td>
            <td>
              <button className="btn btn-success mx-2">Xác thực</button>
              <button className="btn btn-danger mx-2">Hủy</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
