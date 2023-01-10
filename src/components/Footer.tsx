import React from 'react'
import { NavLink } from 'react-router-dom';
// import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
// import { faS,faB,faLocationDot,faPhoneAlt } from '@fortawesome/free-solid-svg-icons';
type Props = {}

export default function Footer({}: Props) {
  return (
    <div className='footer pt-5 text-light'>
      <div className="container">
        <div className="row pb-sm-4">
          <div className="col-lg-4 col-md-6 col-12 mt-2 gr-1">
            <div className="p-2">
              <div className="logo">
                <NavLink to={'/'}>
                  <img src="./img/logo-cyber-1.png" alt="logo-cyber" />
                </NavLink>
                
                <p>CyberSoft Academy - Hệ thống đào tạo lập trình chuyên sâu theo dự án thực tế</p>
              </div>
              <div className="advisement mt-5">
                <h5>Nhận tin sự kiện và khuyến mãi</h5>
                <p>CyberSoft sẽ gửi các khóa học trực tuyến & các chương trình CyberLive hoàn toàn MIỄN PHÍ và các chương trình KHUYẾN MÃI hấp dẫn đến các bạn</p>
                <form>
                  <div className="form-group">
                    <div className="row">
                      <div className="col-8">
                        <input type="email" name="emailDK" id="emailDK" className='form-control' placeholder='your.address@gmail.com'/>
                      </div>
                      <div className="col-4">
                        <button className='btn btn-success'>Đăng ký</button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
              <div className="location mt-5">
                <p>
                  {/* <FontAwesomeIcon icon={['fas','location-dot']} />  */}
                  Cơ sở 1: 376 Võ Văn Tần - Quận 3
                </p>
                <p>
                  {/* <FontAwesomeIcon icon={['fas','location-dot']} />  */}
                  Cơ sở 2: 459 Sư Vạn Hạnh - Quận 10
                </p>
                <p>
                  {/* <FontAwesomeIcon icon={['fas','location-dot']} />  */}
                  Cơ sở 3: 82 Ung Văn Khiêm - Bình Thạnh
                </p>
                <p>
                  {/* <FontAwesomeIcon icon={['fas','location-dot']} />  */}
                  Cơ sở 4: Đà Nẵng - Quận Hải Châu
                </p>
                <p>
                  {/* <FontAwesomeIcon icon={['fas','phone-alt']} />  */}
                  096.105.1014 - 098.407.5835
                </p>
              </div>
            </div>
          </div>
          <div className="col-lg-4 col-md-6 col-12 mt-4 gr-2">
            <h5>Đăng ký tư vấn</h5>
            <form>
              <div className="form-group">
                <input type="text" name="hoTen" className='form-control mb-2' placeholder='Họ và Tên *'/>
                <input type="email" name="email" className='form-control mb-2' placeholder='Email liên hệ *'/>
                <input type="text" name="soDT" className='form-control mb-2' placeholder='Số điện thoại liên hệ *'/>
              </div>
              <button className='btn btn-success'>Đăng ký tư vấn</button>
            </form>
            <div className="connect-link mt-4">
              <a href="#">Lập trình FontEnd</a> <a href='#'>Lập trình React JS</a> <a href='#'>Lập trình React Angular</a> <a href='#'>Lập trình tư duy</a> <a href="#">Lập trình Node JS</a> <a href="#">Lập trình Backend</a> <a href="#">Lập trình Java Web</a> <a href="#">Lập trình Java Spring - Java Boot</a> <a href="#">Tôi Đi Code Dạo</a> <a href="#">Học SEO Hà Nội ở Vietnamoz</a> <a href="#">Học lập trình trực tuyến</a>
            </div>
          </div>
          <div className="col-lg-4 d-none d-lg-block mt-4 gr-3">
            <div>
            <iframe src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2Flophocviet%2F&tabs=timeline&width=250&height=300&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true&appId" width={250} height={300} style={{border: 'none', overflow: 'hidden'}} scrolling="no" frameBorder={0} allowFullScreen={true} allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share" />

            </div>
            <div className="connect-link mt-5">
              <a href="#">Anh ngữ giao tiếp</a> - <a href="#">Khởi động Anh ngữ giao tiếp</a> - <a href="#">Lấy đà Anh ngữ giao tiếp</a> - <a href="#">Bật nhảy Anh ngữ giao tiếp</a> - <a href="#">Bay trên không Anh ngữ giao tiếp</a> - <a href="#">Tiếp đất</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}