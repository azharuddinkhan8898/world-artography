import React from "react";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import Container from "./Container";
import Homepage from "../Homepage/Homepage";
import Payment from "../Payment/Payment";
import Activate from '../Auth/Activate/Activate';
import About from './About';
import Prize from './Prize';
import TnC from './TnC'
import {BrowserRouter, Route, Switch, HashRouter} from "react-router-dom";

import ScrollToTop from 'react-router-scroll-top';


export default class Layout extends React.Component{

    state = {
        loginOpen: false
    }

    // handleLoginOpen(){
    //     console.log("szkjghdfkk")
    //     this.setState({
    //         loginOpen:true
    //     })
        
    // }
    

    render(){
        return(

            
            <HashRouter>
            <React.Fragment>
                
                <Header loginOpen = {this.state.loginOpen}/>
                
                {/* <Container handleLoginOpen = {() => this.handleLoginOpen()}/> */}
                
                <Switch>
                <Route path='/' exact component={Homepage}/>
                <Route path='/login' exact component={Homepage}/>
                <Route path='/register' exact component={Homepage}/>
                <Route path='/payment' exact component={Payment}/>
                <Route path='/about' exact component={About}/>

                <Route path='/prizes' exact component={Prize}/>
                <Route path='/TnC' exact component={TnC}/>


                <Route path='/activate/:token' component={Activate}/>
                </Switch>
                <Footer/>
                <ScrollToTop/>
            </React.Fragment>
            </HashRouter>
            
            
    
    )
    }
    
} 


