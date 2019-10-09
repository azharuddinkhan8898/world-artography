import React from "react";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import Container from "./Container";

import {BrowserRouter} from "react-router-dom";

import ScrollToTop from 'react-router-scroll-top';


export default class Layout extends React.Component{

    state = {
        loginOpen: false
    }

    handleLoginOpen(){
        console.log("szkjghdfkk")
        this.setState({
            loginOpen:true
        })
        
    }

    render(){
        return(

            
            <BrowserRouter>
            <React.Fragment>
                
                <Header loginOpen = {this.state.loginOpen}/>
                
                <Container handleLoginOpen = {() => this.handleLoginOpen()}/>
                
                <Footer/>
                <ScrollToTop/>
            </React.Fragment>
            </BrowserRouter>
            
            
    
    )
    }
    
} 


