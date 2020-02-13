import React from "react"
import Header from "./header";
import {connect} from 'react-redux';
import {addmessage} from '../client_helpers/action_helpers'


class Home extends React.Component{
 constructor(props){
     super(props)
 }
async componentDidMount(){
     if(localStorage.user){
        this.props.history.push('/chatroom')
     }else{
         this.props.history.push("/signin")
     }
}

 render(){
     return(
         <div className="row full-height flex-container rm-margin-lr">
            <div className="col-sm-12 flex-header rm-padding-lr">
                 <Header/>
            </div>
            <div className="col-sm-12 flex-body">
                  <h1>this is home body</h1>
            </div>
         </div>
     )
 }
}

export default connect(null,{addmessage})(Home);