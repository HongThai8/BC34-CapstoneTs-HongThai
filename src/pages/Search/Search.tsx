import React, { useEffect, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { CourseModel } from '../../redux/reducers/courseReducer'
import ReactPaginate from 'react-paginate'
type Props = {
  
}

export default function Search({}: Props) {
  const location = useLocation()
  const arrSearch:[] = location.state
  const [pageNum,setPageNum] = useState(1)
  const resultsPerPage:number = 3
  const resultsFetched:number = pageNum * resultsPerPage
  const pageCount:number = Math.ceil(arrSearch?.length / resultsPerPage)
  useEffect(() => {
    renderSearch()
  }, [arrSearch?.length])
  
  const renderSearch = () =>{
    return arrSearch?.slice(arrSearch.length>=3?resultsFetched:0,resultsFetched+resultsPerPage).map((item:CourseModel,index:number)=>{
      return (
        <NavLink to={`/detail/${item.maKhoaHoc}`} className="col-12 item" key={index}>
          <div className="result">
            <div className="row">
              <div className="col-2">
                <img src={item.hinhAnh} alt={item.biDanh} />
              </div>
              <div className="col-10">
                <h4 className="title">{item.tenKhoaHoc}</h4>
                <p className="description">
                  {item.moTa.length>250?item.moTa.substring(0,250)+"...":item.moTa}
                </p>
              </div>
            </div>
          </div>
        </NavLink>
      );
    })
  }
  const changePage = ({selected}:any) =>{
    setPageNum(selected)
  }
  const renderPaginate = () =>{
    if(arrSearch){
      return <ReactPaginate 
      previousLabel={"Prev"}
      nextLabel={"Next"}
      pageCount={pageCount}
      onPageChange={changePage}
      containerClassName={'paginationBtn'}
      previousLinkClassName={'prevBtn'}
      nextLinkClassName={'nextBtn'}
      activeClassName={'activePagBtn'}
      />
    }
  }
  return (
    <div className='search'>
      <div className="container mt-4">
        <h2>Tìm thấy {arrSearch!==null?arrSearch.length:0} khóa học liên quan đến từ khóa bạn tìm</h2>
        <div className="search-results mt-4">
          <div className="row">
            {renderSearch()}
          </div>
          {renderPaginate()}
        </div>
      </div>
    </div>
  )
}