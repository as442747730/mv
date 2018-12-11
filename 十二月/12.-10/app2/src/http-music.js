import axios from "axios";
import qs from "querystring";
let HTTP_MUSIC = axios.create({
    baseURL:"http://m.kugou.com/",
    transformRequest:(res)=>{
        return qs.stringify(res);
    }
});
HTTP_MUSIC.defaults.withCredentials = true;
export default HTTP_MUSIC;
