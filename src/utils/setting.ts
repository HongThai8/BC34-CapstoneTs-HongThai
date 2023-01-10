import axios from "axios";
export const config = {
    setCookie:(name:string,value:string,days:number)=>{
        var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days*24*60*60*1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "")  + expires + "; path=/";
    },
    getCookie:(name:string)=>{
        var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)===' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
    },
    getStore:(name:string)=>{
        if(localStorage.getItem(name)){
            return localStorage.getItem(name)
        }
        return null
    },
    setStore:(name:string,value:any)=>{
        localStorage.setItem(name,value)
    },
    setStoreJson:(name:string,value:any)=>{
        let json = JSON.stringify(value);
        localStorage.setItem(name,json)
    },
    getStoreJson:(name:any)=>{
        if(localStorage.getItem(name)){
            let result:any = localStorage.getItem(name)
            return JSON.parse(result)
        }
        return null
    },
    deleteStore:(name:any)=>{
        if(localStorage.getItem(name)){
            localStorage.removeItem(name)
        }
    },
    ACCESS_TOKEN: 'accessToken',
    USER_LOGIN:'userLogin',
}

export const {setCookie,getCookie,getStore,getStoreJson,setStore,setStoreJson,deleteStore,ACCESS_TOKEN,USER_LOGIN} = config

/*Cau hinh request cho tat ca api- response cho tat ca kq tra ve tu api*/
/* Cau hinh domain gui di */
const DOMAIN = 'https://elearningnew.cybersoft.edu.vn/api'
const TOKEN_CYBERSOFT = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCAzNCIsIkhldEhhblN0cmluZyI6IjI4LzA0LzIwMjMiLCJIZXRIYW5UaW1lIjoiMTY4MjY0MDAwMDAwMCIsIm5iZiI6MTY1MzU4NDQwMCwiZXhwIjoxNjgyNzg3NjAwfQ.G8iD6xMe_vpUPqae0-KeRwiYiBEoJOouW3WHO2HaNe4'
export const http = axios.create({
    baseURL:DOMAIN,
    timeout:30000
})
/*Cau hinh request header*/
http.interceptors.request.use(
    config => {
      const token = getStore(ACCESS_TOKEN)
      config.headers = {
        ...config.headers,
        ['Authorization']: `Bearer ${token}`,
        ['TokenCybersoft']:TOKEN_CYBERSOFT,
      }
      // config.headers['Content-Type'] = 'application/json';
      return config
    },(error) => {
      Promise.reject(error)
    }
  )
/*Cau hinh response*/
// http.interceptors.response.use((response)=>{
//     return response
// },err=>{
//     if(err.response.status === '400' || err.response.status === '404'){
//         history.push('/')
//         return Promise.reject(err)
//     }
//     if(err.response.status === '401' || err.response.status === '403'){
//         alert('Token không hợp lệ! Vui lòng đăng nhập lại')
//         history.push('/login')
//         return Promise.reject(err)
//     }
// })

export const randomCourse = (arr:Array<[]>, quantity: number) => {
    let newArr : any = [];
    for (let i = 0; i < arr.length; i++) {
      let k = Math.floor(Math.random() * arr.length);
      if (!newArr.includes(arr[k]) && newArr.length < quantity) {
        newArr.push(arr[k]);
      }
      if (newArr.length === quantity) {
        break;
      }
    }
    return newArr;
  };
/*
    status code:
    400: tham so gui len ko hop le => kq ko tim dc (bad request)
    404: tham so gui len hop le nhung ko thay => co the bi xoa (not found)
    401: khong co quyen truy cap vao api (unauthorized - token ko hop le hoac admin bi chan)
    403: chua du quyen truy cap vao api (forbidden - token hop le nhung khong du quyen truy cap)
    200: thanh cong, ok
    201: da dc tao thanh cong => (da tao ra roi, gui request se tra tiep)(created) 
    500: loi xay ra tai server (nguyen nhan: fe: gui dl khong hop le => be: trong qua trinh xu ly code xay ra loi hoac be: code loi)(error in server)
*/