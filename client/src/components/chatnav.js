import React,{Fragment} from "react";
import Online_icon from "./online_icon";
import {connect} from "react-redux";
import {remove} from "../client_helpers/action_helpers";
import {withRouter} from "react-router-dom";



class ChatNav extends React.Component{
    constructor(props){
        super(props)
       this.createroom = this.createroom.bind(this);
       this.myclick = this.myclick.bind(this);
       this.unread_mn = this.unread_mn.bind(this);
       this.unreadCommunity = this.unreadCommunity.bind(this);
       this.logout = this.logout.bind(this);
    }
    createroom(username){
        let {user} = this.props;
        let temp = username + user.username
       return [...temp].sort().join("");
    }

    myclick(e){
          if(e.target.nodeName == "A"){
                let {setChat,sidebar} = this.props
                let chatroom = e.target.dataset["chatroom"];
                let username = e.target.dataset["username"]; 
                if(window.innerWidth < 500){
                    sidebar();
                }
                console.log(chatroom,username);
                setChat(chatroom,username)
          }
      
    }
    //this functions count all the unread messages of a username and return the no of it
    unread_mn(username){
            
        let no = this.props.messages.filter(data=>{
                if(data.status =="unread" && data.from == username && data.to != "community"){
                    return true;
                }
                return false;
        });
       
        return no.length;
    }
    //this function helps to count the  number of the unread community group message
    unreadCommunity(username){
          //first thing is to get all the messages
           //2 then i get all the messages which is sent to community 
          // console.log(this.props.user.username,"username unreadcommun");
            console.log(username,'from user');
            let no = this.props.messages.filter(data=>{
            if(data.to == "community"){
                return true;
                }
                return false;
                });

         return no.filter(data=>!data.group_read.includes(username)).length//get all the unread message sent to community by the user
  }
  //the longout function
  logout(){
      delete localStorage.user;
      this.props.remove();
  }
    render(){
        
        let {online,user,allusers} = this.props
        return(
            <ul className="sidebar-nav full-height">
                <li className="sidebar-brand">
                   <a href="#" style={{color:"white"}}>
                        Chat
                    </a>
                </li>
                <li>
                    <a
                         style={{color:"white"}}
                         data-chatroom={"community"}
                         key={"community"}
                         data-username={"community"}
                         onClick={this.myclick}>
                        Commuinity
                        {
                         user && this.unreadCommunity(user.username) > 0 && 
                         <span className="span-ntf">{this.unreadCommunity(user.username)} </span>
                         }
                      
                        </a>
                </li>
                {online.filter(data=> data != user.username)
                        .map(data=> <li key={data} >
                                     <a  style={{color:"white"}}
                                            data-username={data}
                                         data-chatroom={this.createroom(data)}
                                         onClick={this.myclick}
                                     >
                                         {data}
                                         {
                                         <span style={{paddingLeft:"4px"}}><Online_icon/></span>
                                        }

                                        {
                                            this.unread_mn(data) > 0 && <span className="span-ntf">{this.unread_mn(data)} </span>
                                            }
                                     </a>
                                    </li>
                            )
                }
                {allusers.filter(data=>!online.includes(data))
                          .map(
                            data=> <li key={data}>
                            <a  data-username={data}
                                data-chatroom={this.createroom(data)}
                                onClick={this.myclick}
                            >
                                {data}

                                {
                                    this.unread_mn(data) > 0 && <span>{this.unread_mn(data)} </span>
                                }
                            </a>
                           </li>
                          )

                }
                            <li className=""style={{marginTop:"auto"}}>
                                <a href="#" className="logout-btn" onClick={this.logout}>Logout</a>
                            </li>

                 

            </ul>
        )
    }
}
let mapstatetoprops =({messages})=>{
    return{messages}
}

export default connect(mapstatetoprops,{remove})(withRouter(ChatNav));


