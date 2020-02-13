import React from "react";
import axios from "../client_helpers/axios";
import v from "../client_helpers/validator";
import Myspinner from "./spinner";
import {withRouter} from "react-router-dom"
import {adduser} from "../client_helpers/action_helpers";
import {connect} from "react-redux";
import jwt_decode from "jwt-decode";


class SignupForm extends React.Component{
constructor(props){
    super(props);
    this.submit = this.submit.bind(this);
    this.state={
        loading:false,//state changes when making a submit and then makes all input filed disabled if there is an error it enables them again
         error:{},//this error is when the user leave the input field empty and tries to submit
         respError:{}//initialze the response error to
                            // false so that it turns only true when sever sends and error 
                                    //during registration
    }
}
//the submit buttons submit the user details to the server to save or reject if there was an error
 async submit(e){
     try{
        //prevent the form to act the normal way and just suspend it and use axios to send to the server
            e.preventDefault();
            //get all the values from the input field and pass it to the validator 
            let name = e.target.name.value;
            let surname = e.target.surname.value;
            let username = e.target.username.value;
            let email = e.target.email.value;
            let password = e.target.passwd.value;
            let confirmpassword = e.target.cpasswd.value;
             //destructure the result from the validator and then update the error state and use the validator to either submit or anything like that
            let {error,validate} = v.signup_validator(name,surname,username,email,password,confirmpassword)
            this.setState({
                error,
                loading:true
            })
                if(validate){
                   
                    let data = await axios.post("/api/signup",{name,username,password,email,surname});
                    console.log(data);
                    this.props.adduser(jwt_decode(data.data.user))
                    //
                    localStorage.user = data.data.user;
                   // console.log("still cool");
                    this.setState({loading:false});
                    //console.log("still cool");
                    axios.setdefault(data.data.user);
                    console.log("still cool");
                    this.props.history.push("/chatroom");
                 }else{
                     console.log("there was an error validating")
                    this.setState({loading:false})
                 }
           
     }catch(err){
         this.setState({loading:false});
         if(err.respose){
            this.setState({respError:err.response.data});
            console.log(err.response.data.message)
         }
        
     }
}

render(){

    return (
        <form className="form mk-relative" onSubmit={this.submit}>
            {this.state.loading&&<Myspinner/>}
            {this.state.respError.message && <p className="text-danger text-center">{this.state.respError.message}</p>}
            <div className="form-group">
                <label className="control-label">Name</label>
                <input className="form-control" name="name" type="text" />
                {this.state.error.name &&<span className='text-danger'>{this.state.error.name}</span>}
            </div>
            <div className="form-group">
                <label className="control-label">Surame</label>
                <input className="form-control" name="surname" type="text" />
                {this.state.error.surname &&<span className='text-danger'>{this.state.error.surname}</span>}
            </div>
            <div className="form-group">
                <label className="control-label">Username</label>
                <input className="form-control" name="username" type="text" />
                {this.state.error.username &&<span className='text-danger'>{this.state.error.username}</span>}
            </div>
            <div className="form-group">
                <label className="control-label">Email</label>
                <input className="form-control" name="email" type="email" />
                {this.state.error.email &&<span className='text-danger'>{this.state.error.email}</span>}
            </div>
            <div className="form-group">
                <label className="control-label">Password</label>
                <input className="form-control" name="passwd" type="password" />
            </div>
            <div className="form-group">
                <label className="control-label">Confirm Password</label>
                <input className="form-control" name="cpasswd" type="password" />
                {this.state.error.password &&<span className='text-danger'>{this.state.error.password}</span>}
            </div>
            <div className="form-group">
                <button className="btn submit-btn">Create Account</button> 
            </div>
            
        </form>
    )
}

}

export default connect(null,{adduser})(withRouter(SignupForm));