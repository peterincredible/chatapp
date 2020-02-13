import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserCircle} from '@fortawesome/free-solid-svg-icons'


function Online_icon(props){

    return(
        <span>
                <FontAwesomeIcon icon={faUserCircle} spin/>
        </span>
    )
}

export default Online_icon;