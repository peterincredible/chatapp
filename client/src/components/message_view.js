import React from "react";


class Message_view extends React.Component{
    constructor(props){
        super(props)
    }
    componentWillMount(){
        let {message,socket,user,myref} = this.props;
        //this covert a message from unread to read
        
        if(message.chatroom !="community" && message.status == 'unread' && message.from != user.username){
            socket.emit("read",message._id);
        }else if( message.chatroom == "community" && message.from != user.username){
            socket.emit("read_community",message._id);
        }
    }
render(){
    let {message,user} = this.props;
    return(
            <div className={message.from == user.username ? "col-sm-12 mk-flex flex-right":"col-sm-12 mk-flex flex-left"}>
                 <p className={message.from == user.username ? "right-message":"left-message"}>{message.message}</p>
            </div>
    )
}
   
}

export default Message_view;