import React from "react";
import TnC from './../TnC'
import $ from 'jquery';
export default class Footer extends React.Component{
    state = {
        tncPopupShow:false
    }
    tncCloseHandler(){
        this.setState({
            tncPopupShow:false,
            location:''
        })
    }
    componentDidMount(){
        var oldURL = "";
        var this2 = this;
        var currentURL = window.location.href;
        function checkURLchange(currentURL){
            if(currentURL != oldURL){
                //console.log(window.location.pathname)
                this2.setState({
                    location: window.location.pathname
                })
                oldURL = currentURL;
            }

            oldURL = window.location.href;
            setInterval(function() {
                checkURLchange(window.location.href);
            }, 1000);
        }

        checkURLchange();
    }
    tncOpenHandler(){
        this.setState({
            tncPopupShow:true
        })
    }
    render(){
        return(
            <React.Fragment>
                <footer className="sticky-footer">
                    <div className="container my-auto">
                        <div className="copyright text-center my-auto">
                            <span>World Artography &copy; 2019. All Rights Reserved. We are not responsible for the content of external sites. <br/>World Artography is NOT responsible for Images featured on homepage are copyright of their respective owners.<br/><br/>
                            {this.state.location == '/' ? 
                            <React.Fragment>
                            <a style={{cursor:'pointer'}} onClick = {() => this.tncOpenHandler()}>Terms and conditions</a><br/><br/>
                            </React.Fragment>
                            :
                            null
                            }
                            
                            
                            <br/></span>
                        </div>
                    </div>
                </footer>
                { this.state.tncPopupShow ? 
                    <TnC tncCloseHandler = {() => this.tncCloseHandler()} show = {this.state.tncPopupShow}/>
                    :
                    null
                }
                
            </React.Fragment>
        )
    }
}