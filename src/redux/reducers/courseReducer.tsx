import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppDispatch } from "../configStore";
import { http } from "../../utils/setting";
import { getProfileApi } from "./userReducer";
export interface CourseModel {
  maKhoaHoc: string;
  biDanh: string;
  tenKhoaHoc: string;
  moTa: string;
  luotXem: number;
  hinhAnh: string;
  maNhom: string;
  ngayTao: string;
  soLuongHocVien: number;
  nguoiTao: NguoiTao;
  danhMucKhoaHoc: DanhMucKhoaHoc;
}
export interface CourseModel2{
  maKhoaHoc: string;
  biDanh?: string;
  tenKhoaHoc: string;
  moTa: string;
  luotXem: 0;
  danhGia: 0;
  hinhAnh: string;
  maNhom?: string;
  ngayTao: string;
  maDanhMucKhoaHoc: string;
  taiKhoanNguoiTao: string;
}
export interface MaKh {
  maKhoaHoc: string;
}
export interface DanhMucKhoaHoc {
  maDanhMuc: string;
  tenDanhMuc: string;
}

export interface NguoiTao {
  taiKhoan: string;
  hoTen: string;
  maLoaiNguoiDung: string;
  tenLoaiNguoiDung: string;
}
export interface DangKyKhoaHoc {
  maKhoaHoc:string,
  taiKhoan:string,
}
const initialState: any = {
  arrCourse: [],
  courseDetail: {},
  searchCourses: [],
  courseCategory: [],
  courseByCategory:[]
};

const courseReducer = createSlice({
  name: "courseReducer",
  initialState,
  reducers: {
    getAllCourseAction: (state, action: PayloadAction<CourseModel[]>) => {
      state.arrCourse = action.payload;
    },
    getSearchCourseAction: (state, action: PayloadAction<CourseModel[]>) => {
      state.searchCourses = action.payload;
    },
    getCourseCategoryAction: (
      state,
      action: PayloadAction<DanhMucKhoaHoc[]>
    ) => {
      state.courseCategory = action.payload;
    },
    getCourseDetailAction:(state,action:PayloadAction<CourseModel>)=>{
      state.courseDetail = action.payload
    },
    getCourseByCategoryAction:(state,action:PayloadAction<CourseModel[]>) => {
      state.courseByCategory = action.payload
    }
  },
});

export const {
  getAllCourseAction,
  getSearchCourseAction,
  getCourseCategoryAction,
  getCourseDetailAction,
  getCourseByCategoryAction
} = courseReducer.actions;

export default courseReducer.reducer;

//------------------action api
//lay toan bo khoa hoc
export const getAllCourseApi = () => {
  return async (dispatch: AppDispatch) => {
    try {
      let result = await http.get(
        "/QuanLyKhoaHoc/LayDanhSachKhoaHoc?MaNhom=GP01"
      );
      let arrSubject: CourseModel[] = result.data;

      const action = getAllCourseAction(arrSubject);
      dispatch(action);
    } catch (error:any) {
      console.log(error);
    }
  };
};
//lay khoa hoc theo ten
export const getCourseByName = (khoahoc: any) => {
  return async (dispatch: AppDispatch) => {
    try {
      let result = await http.get(
        `/QuanLyKhoaHoc/LayDanhSachKhoaHoc?tenKhoaHoc=${khoahoc}&MaNhom=GP01`
      );
      if(result){
        let searchArr: CourseModel[] = result.data;
        const action = getSearchCourseAction(searchArr);
        dispatch(action);
      }
      
    } catch (error:any) {
      console.log(error);
      
    }
  };
};
//lay danh muc khoa hoc
export const getCourseCategory = () => {
  return async (dispatch: AppDispatch) => {
    try {
      let result = await http.get("/QuanLyKhoaHoc/LayDanhMucKhoaHoc");
      let arrCate = result.data;
      // console.log(result);
      const action = getCourseCategoryAction(arrCate);
      dispatch(action);
    } catch (error:any) {
      console.log(error);
    }
  };
};
//lay thong tin chi tiet khoa hoc
export const getCourseDetailApi = (id:any) =>{
  return async (dispatch: AppDispatch)=>{
    try {
      let result = await http.get(`/QuanLyKhoaHoc/LayThongTinKhoaHoc?maKhoaHoc=${id}`)
      // console.log(result.data);

      let courseDetail = result.data
      const action = getCourseDetailAction(courseDetail)
      dispatch(action)
    } catch (error:any) {
      console.log(error)
    }
  }
}
//lay khoa hoc theo danh muc
export const getCourseByCategoryApi = (maDanhMuc:string) => {
  return async (dispatch : AppDispatch) => {
    try{
      let result = await http.get(`/QuanLyKhoaHoc/LayKhoaHocTheoDanhMuc?maDanhMuc=${maDanhMuc}&MaNhom=GP01`)
      let courseByCategory = result.data
      const action = getCourseByCategoryAction(courseByCategory)
      dispatch(action)
    }catch (err) {
      console.log(err)
    }
  }
}
// dang ky khoa hoc
export const registerCourseApi = (values:DangKyKhoaHoc)=>{
  return async (dispatch:AppDispatch)=>{
    try {
      let result = await http.post('/QuanLyKhoaHoc/DangKyKhoaHoc',values)
      const action = getProfileApi()
      dispatch(action)
    } catch (error:any) {
      console.log(error);
      
    }
  }
}
//ghi danh khoa hoc
export const ghiDanhApi = (values:DangKyKhoaHoc) =>{
  return async (dispatch:AppDispatch)=>{
    try {
      let result = await http.post('/QuanLyKhoaHoc/GhiDanhKhoaHoc',values)
      // console.log(result);
      
      if(result){
        dispatch(getAllCourseApi())
      }
    } catch (error) {
      console.log(error);
      
    }
  }
}
//huy dang ky khoa hoc
export const cancelRegisterCourseApi = (values:DangKyKhoaHoc)=>{
  return async (dispatch:AppDispatch)=>{
    try {
      let result = await http.post('/QuanLyKhoaHoc/HuyGhiDanh',values)
      
      const action = getProfileApi()
      dispatch(action)
      // dispatch(getAllCourseApi())
    } catch (error:any) {
      console.log(error);
    }
  }
}
//them khoa hoc
export const themKhoaHocApi = (values:CourseModel2) =>{
  return async(dispatch:AppDispatch)=>{
    try {
      const result = await http.post('/QuanLyKhoaHoc/ThemKhoaHoc',values)

      console.log(result.data);
      
    } catch (error) {
      console.log(error);
      
    }
  }
}
//cap nhat khoa hoc
export const capNhatKhoaHocApi = (values:CourseModel2) =>{
  return async(dispatch:AppDispatch)=>{
    try {
      const result = await http.put('/QuanLyKhoaHoc/CapNhatKhoaHoc',values)
      console.log(result.data);
    } catch (error) {
      console.log(error);
      
    }
  }
}