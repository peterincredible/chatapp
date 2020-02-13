import axios from "axios";
import jwt_decode from "jwt-decode";

axios.setdefault = function(data){
  axios.defaults.headers.common.authorization = data;
}

export default axios;