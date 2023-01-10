import React from "react";

export default function Carousel() {
  return (
    <div className="carousel">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-8 col-md-6 col-0"></div>
          <div className="col-lg-4 col-md-6 col-12 content">
            <div className="title">
              <h1>Khởi đầu sự nghiệp của bạn</h1>
            </div>
            <div className="description">
              <p>Trở thành lập trình chuyên nghiệp tại CyberSoft</p>
            </div>
            <div className="button-area">
              <div className="row">
                <div className="col-6">
                  <button className="btn btn-success">Xem khóa học</button>
                </div>
                <div className="col-6">
                  <button className="btn btn-primary">Tư vấn học</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
