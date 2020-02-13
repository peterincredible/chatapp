import React,{Component,Fragment} from "react";
import event from "../client_helpers/client_event";

class ChatInput extends Component{
    constructor(props){
        super(props)
        this.submit = this.submit.bind(this);
        this.keyup = this.keyup.bind(this);
        this.timeoutfunction = this.timeoutfunction.bind(this);
        this.timeout = undefined;
        this.state={
            istyping:false
        }
    }
    async submit(e){
        let {socket,user,chatroom,to} = this.props;
        e.preventDefault();
        let message = e.target.input_text.value;
        if(message == ""){
            return;
        }
        e.target.input_text.value = "";
        console.log(user.username,"from");
        console.log(to,"to");
        console.log(chatroom,"chatroom")
        if (to == "community"){
            socket.emit(event.send_message,{message,from:user.username,to,chatroom,group_read:[user.username]});
            return;
        }
        socket.emit(event.send_message,{message,from:user.username,to,chatroom});
        
    }

    timeoutfunction(){
        let{user,to} = this.props;
        let {socket} = this.props;
        this.setState({istyping:false});
        socket.emit(event.end_typing,{from:user.username,istyping:false,to})  
    }

    async keyup(e){
        let{user,to} = this.props;
        if(this.state.istyping == false  && e.keyCode != 13){
         
            let {socket} = this.props;
            socket.emit(event.typing,{from:user.username,istyping:true,to});
            this.timeout = setTimeout(this.timeoutfunction,3000);

        }else{
             clearTimeout(this.timeout);
             this.timeout = setTimeout(this.timeoutfunction,3000);
        }

    }
    render(){
        return(
           <Fragment>
               <form className="form mk-flex-row mk-flex" onSubmit={this.submit}>
                                        <textarea  name ="input_text"
                                          style={{resize:"none",flexGrow:1,overflowY:"auto"}}
                                         onKeyUp={this.keyup} className=""
                                         />
                                    <input type="submit" value="submit" className="btn submit-btn"/>
               </form>
           </Fragment>
        )
    }
}

export default ChatInput;