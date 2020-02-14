import React from "react";
import {adduser,addmessage,modifymessage} from "../client_helpers/action_helpers";
import axios from "../client_helpers/axios";
import {connect} from "react-redux";
import io from "socket.io-client";
import ChatNav from "./chatnav";
import ChatHeader from "./chatheader";
import ChatView from "./chatview";
import ChatInput from "./chatinput";
import jwt_decode from "jwt-decode";
import  event from "../client_helpers/client_event";





class ChatRoom extends React.Component{
    constructor(props){
        super(props)
        this.myref = React.createRef();
        this.state= {
            sidebar_toggle:false,//to toggle the side bar expecially on mobile phones 
            socket:null,// for the socket
            user:null,
            online:[],//no of people online
            allusers:[], //all users registered in the web chat
            chatroom:"community",
            to:"community",
            istyping:null,
            typing:false
        }
        this.setChat = this.setChat.bind(this);
        this.sidebar = this.sidebar.bind(this);
    }
    async componentDidMount(){
            
          //let socket = io('http://localhost:4000');
          let socket = io();
          
          socket.on(event.socket_connect,()=>{
              console.log('client socket connected baby');
              socket.emit(event.login,this.state.user.username,(data)=>{this.props.addmessage(data)});
          })
          socket.on(event.new_message,(data)=>{
               console.log("data",data.chatroom);
               console.log("state chatroom",this.state.chatroom);
              this.props.addmessage([data]);
             
          })
          socket.on(event.online_now,data=>{
              console.log("users online",data.online)
               this.setState({online:data.online,istyping:data.istyping,allusers:data.allusers});
               console.log("allusers",this.state.allusers);
               console.log("online",this.state.online);
          });
          socket.on(event.user_typing,data=>{
              console.log(data);
                let temptyping = this.state.istyping;
                temptyping[data.from] = data.istyping
               this.setState({istyping:temptyping});
          });
          socket.on(event.user_end_typing,data=>{
            let temptyping = this.state.istyping;
            temptyping[data.from] = data.istyping
           this.setState({istyping:temptyping});
          })
          socket.on("read_sucessfull",data=>{
              this.props.modifymessage(data);
          })

          if(localStorage["user"]){
              this.props.adduser(jwt_decode(localStorage["user"]))
              this.setState({socket})
          }      
    }
    async componentWillReceiveProps({user}){
            this.setState({user});
    }

    async componentWillUnmount(){
          this.state.socket.disconnect();
    }
    async componentDidUpdate(){
        this.myref.current.scrollTop = this.myref.current.scrollHeight;
    }
  async setChat(chatroom,to){
       this.setState({
           to,
           chatroom
       })
      // this.clear_notification(to);
      // console.log(this.state.chat_notification);
  }
  sidebar(e){
    e.preventDefault();
        //$("#wrapper").toggleClass("toggled");
        if(this.state.sidebar_toggle){
            this.setState({sidebar_toggle:false})
        }else{
            this.setState({sidebar_toggle:true})
        }
  }
    
  

    render(){
        return(
            <div id="wrapper" className={this.state.sidebar_toggle ?"toggled full-height":"full-height"} >

            <div id="sidebar-wrapper">
                        <ChatNav setChat = {this.setChat} 
                            online={this.state.online} 
                            user = {this.state.user}
                            allusers={this.state.allusers} 
                            sidebar={()=>{
                                if(this.state.sidebar_toggle){
                                    this.setState({sidebar_toggle:false})
                                }else{
                                    this.setState({sidebar_toggle:true})
                                }
                            }}
                            />
                
            </div>
            <div id="page-content-wrapper" className="rm-padding-lr rm-padding-tb" style={{height:"100%"}}>
                <div className="container-fluid full-height rm-padding-lr mk-flex mk-flex-col" >
                    <div className="row chat-header rm-margin-lr ">
                            <ChatHeader to={this.state.to} online={this.state.online} istyping={this.state.istyping} sidebarclick={this.sidebar}/>
                    </div>
                    <div className="row chat-body rm-margin-lr chatview-overflow " ref={this.myref}>
                        <ChatView chatroom={this.state.chatroom}
                                    user={this.state.user}
                                    messages={this.props.messages}
                                    socket={this.state.socket}
                        />
                    </div>
                    <div className="row chat-footer rm-margin-lr ">
                        <ChatInput socket={this.state.socket} 
                                user={this.state.user} 
                                to={this.state.to} 
                                chatroom={this.state.chatroom} 
                                typing ={this.state.typing}
                                />
                    </div>
                </div>
            </div>
    
        </div>
       
        )
    }
}

let mapsStateToProps = state =>{
    return {user:state.user,messages:state.messages}
};

export default connect(mapsStateToProps,{adduser,addmessage,modifymessage})(ChatRoom);
 