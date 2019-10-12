import React from "react";
import {  Route, Router, withRouter, Switch, BrowserRouter, HashRouter } from "react-router-dom";
import Homepage from "../Homepage/Homepage";
import Payment from "../Payment/Payment";
import Activate from '../Auth/Activate/Activate';
import About from './About';
import Prize from './Prize';
import TnC from './TnC'
// import { TransitionGroup, CSSTransition  from "react-transition-group";

class Container extends React.Component{
    componentDidUpdate(prevProps) {
      }


    componentDidMount(){
        
    }

    render(){
        return(
    <Router history={HashRouter}>
            <section className="route-section">
                
            </section>
            </Router>

        )
    }
}


export default withRouter(Container);