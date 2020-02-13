import React from "react";
import axios from "../client_helpers/axios";
import v from "../client_helpers/validator";
import Myspinner from "./spinner";
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import {adduser} from "../client_helpers/action_helpers";
import jwt_decode from "jwt-decode";


class SigninForm extends React.Component{
    constructor(props){
        super(props);
        this.state ={
            errors:{},//this error will be checked using the validator from the client side
            e_error:"",//this will hold any error from the server
            loading:false

        }
        this.submit = this.submit.bind(this);
    }
    
    submit= async (e)=>{
        e.preventDefault();
        try{
                let username = e.target.username.value;
                let password = e.target.password.value;
                let {validate,error} = v.signin_validator(username,password);
                this.setState({
                    error,
                    loading:true
                })
                 if(validate){
                    let data = await axios.post('/api/signin',{username,password});
                    this.props.adduser(jwt_decode(data.data.user))
                    this.setState({loading:false});
                    localStorage.user = data.data.user;
                    axios.setdefault(data.data.user);
                    console.log("after",this.state.loading)
                    this.props.history.push("/chatroom");
                 }else{
                
                    console.log("there was an error validating");
                    this.setState({loading:false});

                    console.log("there was an error validating 222");
            
                }
                
        }catch(err){
              console.log(err.response.data)
              this.setState({loading:false})
              this.setState({e_error:err.response.data.message});
        }
    }
    render(){
        return(
            <form className="form mk-relative" onSubmit={this.submit}>
                {this.state.loading && <Myspinner/>}
                {this.state.e_error &&  <span className="text-danger">{this.state.e_error}</span>}
                <div className="form-group">
                        <label className="control-label"> Username</label>
                        <input type="text" name="username" className="form-control"/>
                        {this.state.error && this.state.error.username &&<span className="text-center text-danger">{this.state.error.username}</span>}
                </div>
                <div className="form-group">
                        <label className="control-label"> Password</label>
                        <input type="password" name="password" className="form-control"/>
                        {this.state.error && this.state.error.password && <span className="text-center text-danger">{this.state.error.password}</span> }
                </div>
                <div className='form-group'>
                    <button className="btn submit-btn">Sign in</button>
                </div>
                
            </form>
        )
    }
}

export default connect(null,{adduser})(withRouter(SigninForm));