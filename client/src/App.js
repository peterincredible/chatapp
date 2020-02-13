import React from 'react';
import {Switch,BrowserRouter as Router,Route,Redirect,useLocation} from "react-router-dom";
import Home from "./components/home";
import Signin from "./components/signin";
import Signup from "./components/signup";
import ChatRoom from "./components/chatroom";
import PrivateRoute from "./components/private";
import {useTransition,animated} from "react-spring";
import "./css/main.css";
import "./css/simple_sidebar.css";
function App() {
    const location = useLocation()
    const transitions = useTransition(location, location => location.pathname, {
    from: { position: 'absolute', opacity: 0,transform:"translate3d(200px,0,0)",width:"100%",height:"100%" },
    enter: { opacity: 1,transform:"translate3d(0,0,0)" },
    leave: { opacity: 0,transform:"translate3d(-50px,0,0)"}
    });
  return (
    <div className="container-fluid full-height rm-padding-lr">
         {transitions.map(({ item, props, key }) => (
            <animated.div key={key} style={props}>
                <Switch location={item}>
                <Redirect  exact from="/" to="/home"/>
                <Route path="/home" component={Home}/>
                <Route path="/signin" component={Signin}/>
                <Route path="/signup" component={Signup}/>
                <PrivateRoute path="/chatroom" component={ChatRoom}/>
                {/*<PrivateRoute path="/chatroom" component={Chatroom}/>
                <PrivateRoute path="/settings" component={Settings}/>*/}
              </Switch>
            </animated.div>
         ))
         }
    </div>
  );
}

export default App;
