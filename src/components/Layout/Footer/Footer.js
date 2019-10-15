import React from "react";
import TnC from './../TnC'

export default class Footer extends React.Component{
    state = {
        tncPopupShow:false
    }
    tncCloseHandler(){
        this.setState({
            tncPopupShow:false
        })
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
                            <span>World Artography &copy; 2019. All Rights Reserved. We are not responsible for the content of external sites. <br/>World Artography is NOT responsible for Images featured on homepage are copyright of their respective owners.<br/><br/><a onClick = {() => this.tncOpenHandler()}>Terms and conditions</a><br/><br/><br/></span>
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