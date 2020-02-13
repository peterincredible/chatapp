import React,{Component,Fragment} from "react";
import Message_view from "./message_view";

class ChatView extends Component{
    constructor(props){
        super(props)
    }
    render(){
        let{chatroom,user,messages,socket,myref} = this.props;
        return(
            <div className="col-sm-12">
                <div className="row">
                      {
                          messages.filter(data=>data.chatroom == chatroom)
                          .map(data=><Message_view message={data} key={data._id} socket={socket} user={user} />)
                      }
                </div>
            </div>
        )
    }
}

export default ChatView;