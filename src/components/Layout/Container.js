import React from "react";
import {  Route, withRouter } from "react-router-dom";
import Homepage from "../Homepage/Homepage";
// import { TransitionGroup, CSSTransition } from "react-transition-group";
import Login from './../Auth/Login/Login'

class Container extends React.Component{
    componentDidUpdate(prevProps) {
      }


    componentDidMount(){
        
    }

    render(){
        return(

            <section className="route-section">
                <Route path="/" exact component={Homepage}/>
                <Route path="/login" exact component={Homepage}/>
                <Route path="/register" exact component={Homepage}/>
            </section>

        )
    }
}


export default withRouter(Container);