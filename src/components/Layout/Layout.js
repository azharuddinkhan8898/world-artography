import React from "react";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import Container from "./Container";

import {BrowserRouter} from "react-router-dom";

import ScrollToTop from 'react-router-scroll-top';


const Layout = (props) => {
    
    return(

            
            <BrowserRouter>
            <React.Fragment>
                
                <Header/>
                
                <Container/>
                
                <Footer/>
                <ScrollToTop/>
            </React.Fragment>
            </BrowserRouter>
            
            

    )
}

export default Layout;