import React from "react"
import SigninForm from "./signin_form";
import Header from "./header";

class Signin extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <div className="row full-height flex-container rm-margin-lr">
            <div className="col-sm-12 flex-header rm-padding-lr">
                 <Header/>
            </div>
            <div className="col-sm-8 col-sm-offset-2  col-md-4 col-md-offset-4 flex-body" style={{marginTop:"100px"}}>
                 <SigninForm/>
            </div>
         </div>
        )
    }
}

export default Signin;