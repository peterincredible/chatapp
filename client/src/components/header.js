import React from "react";
import {NavLink} from "react-router-dom";

class Header extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            isUser:false
        }
    }
componentDidMount(){
    if(localStorage["user"]){
        this.setState({isUser:true});
    }
}


render(){
    return(
        <div className="col-sm-12 rm-padding-lr">
           <div className="mk-flex flex-nav">
               <div className="nav-left">
                    {this.state.isUser && <NavLink to="/chatroom" className="nav-links" activeClassName="active-nav-links">Chat room</NavLink>}
                   <NavLink to="/signin" className="nav-links" activeClassName="active-nav-links">Sign in</NavLink>
                   <NavLink to="/signup" className="nav-links" activeClassName="active-nav-links">Sign up</NavLink>
               </div>
               <div className="nav-right">
                  
               </div>
           </div>
        </div>
    )
}
}

export default Header;