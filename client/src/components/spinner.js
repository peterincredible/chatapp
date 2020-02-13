import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSync} from '@fortawesome/free-solid-svg-icons'


function Myspinner(props){

    return(
        <div className="spin-container">
                <FontAwesomeIcon icon={faSync} spin size="2x"/>
        </div>
    )
}

export default Myspinner;