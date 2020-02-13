import React from "react";
import {withRouter,Route,Redirect} from "react-router-dom";
import axios from "../client_helpers/axios";
import {connect} from "react-redux";
import {adduser} from "../client_helpers/action_helpers"
import jwt_decode from 'jwt-decode';



function Privateroute({component:Component,adduser,...rest}){
    let user;
      if(localStorage.user){
         user = localStorage.user;
         axios.setdefault(user);
         adduser(jwt_decode(user));

      }
     return(
           <Route {...rest} render={()=>(user? <Component {...rest} />: <Redirect to="/signin" {...rest}/>)}/>
     )
}

export default connect(null,{adduser})(withRouter(Privateroute));