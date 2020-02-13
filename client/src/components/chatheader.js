import React,{Component} from "react";



class ChatHeader extends Component{
    constructor(props){
        super(props)

    }
render(){
    let {to,online,istyping,sidebarclick} = this.props
    return(
        <div className="col-sm-12 mk-flex mk-background mk-flex-bt">
            <div style={{color:"white"}}>
            <a href="#"  className="nav-links" onClick={sidebarclick}>MENU</a>
            <span style={{display:"inline-block",marginTop:"10px"}}>
                {to}
            </span>
                 {
                     to !="community"  && istyping[to] &&
                    <b style={{paddingLeft:"5px"}}>typing...</b>
                }
           

            </div>
        </div>
    )
}
}

export default ChatHeader;

