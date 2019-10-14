import React, { Component } from 'react';
import { PayPalButton } from "react-paypal-button-v2";
import  { Redirect } from 'react-router-dom';
import $ from 'jquery';
import {getDataUri} from './../utils/codeSnippet';
import PaymentSuccessPopup from './PaymentSuccessPopup';
import PaymentFailedPopup from  './PaymentFailedPopup';

export default class Homepage extends Component {
    state = {
        noOfimagess:0,
        pricePerImage: 0,
        totalPrice: 0,
        redirect:false,
        dcpValue:'',
        submitDisabled:false,
        paymentSucsessShow:false,
        PaymentFailedPopupShow:false,
        tncCheckbox:false
    }

    componentDidMount(){
        console.log(this.props.location.state)
        if(this.props.location.state != undefined){
            this.setState({
                noOfimagess:this.props.location.state.noOfImages,
                pricePerImage:this.props.location.state.priceImage,
                totalPrice:this.props.location.state.noOfImages * this.props.location.state.priceImage
            })
            
        }
        else{
            this.redirectHandler()
        }
    }

    redirectHandler(){
        console.log("redirect")
        return <Redirect to='/'/>
    }

    dcpChangeHndler = (e) => {
        this.setState({
            dcpValue:e.target.value
        })
    }

    imagesUploaded = 0;

    paymentSucsess = (id, cp) => {

      this.setState({
        submitDisabled:true
      })

      if(JSON.parse(window.localStorage.getItem("images")) !== null && JSON.parse(window.localStorage.getItem("images")).length !== 0)
      var data = JSON.parse(window.localStorage.getItem("images"))

      const url = '/server/images/uploadData.php';
      if(this.imagesUploaded < data.length){
          console.log(this.imagesUploaded)
          getDataUri(data[this.imagesUploaded].url, (dataUri) => {
              
              if(dataUri.search("data:image") !== -1){
                      var datanew = data[this.imagesUploaded];
                      datanew.url = dataUri;
                      if(cp === 'paypal'){
                        datanew.paypalTranId = id;
                        datanew.approved = true;
                        datanew.dcpcoupon = null;
                      }
                      else{
                        datanew.dcpcoupon = id;
                        datanew.paypalTranId = null;
                        datanew.approved = false;
                      }
                      console.log(datanew)
                      $.post(url,
                          datanew,
                      (data,status) => {
                          console.log(data,status )
                          if(status){
                              this.imagesUploaded = this.imagesUploaded + 1;
                              this.paymentSucsess(id, cp);
                          }
                      });
              }
              
              
          })
          
      }else{
        this.setState({
          submitDisabled:false,
          paymentSucsessShow:true
        })
        
        
    }


      // getDataUri(data[0].url, (dataUri) => {
      //   console.log(dataUri)
      // })
    }

    paymentFailed() {
      this.setState({
        PaymentFailedPopupShow:true
      })
    }

    checkChangeHandler(e){
      if(e.target.checked){
        this.setState({
          tncCheckbox:true
        })
      }else{
        this.setState({
          tncCheckbox:false
        })
      }
      
    }
    render() {
      var panelBodyCSS = {
        padding:"0 15px"
      }
      if(!this.state.tncCheckbox){
        panelBodyCSS.pointerEvents = 'none'
      }
      else{
        panelBodyCSS.pointerEvents = 'all'
      }
      console.log(panelBodyCSS)
        return (
            <React.Fragment>
            <div className="container">
            <br /><br /><br />
            <div id="paypal-container">
            <div className="panel panel-default">
              <div className="panel-heading">
                {/* <h4>Payments</h4> */}
                <label className="checkbox-container"
                  >I Agree to all <a href="/tnc" target="_blank">Terms & Conditions</a>.
                  <input type="checkbox" onChange = {(e) => this.checkChangeHandler(e)} />
                  <span className="checkmark"></span>
                </label>
              </div>
              <div className="panel-body" style={panelBodyCSS}>
                <div className="row clearfix flex">
                  <div
                    className="col-md-4 pad30"
                    id="payment-info"
                    style={{background:"#000000"}}
                  >
                    <h4>Payment Informations</h4>
                    <ul>
                      <li>
                        Images Uploaded ({this.state.noOfimagess}x{this.state.pricePerImage}) <span id="amt">{this.state.totalPrice}</span>
                      </li>
                      {/* <li>GST (18%) <span id="gst-amt">2412</span></li> */}
                      <li>Total Cost <span id="total-amt">{this.state.totalPrice}</span></li>
                    </ul>
                  </div>
                  <div className="col-md-4 pad30">
                    <div id="paypal-button-container">
                    <PayPalButton
                        amount={this.state.totalPrice}

                        onSuccess={(details, data) => {
                        //alert("Transaction completed by " + details.payer.name.given_name);
                        // OPTIONAL: Call your server to save the transaction
                        {/* return fetch("/paypal-transaction-complete", {
                            method: "post",
                            body: JSON.stringify({
                            orderId: data.orderID
                            })
                        }); */}
                        }}
                        onSuccess = {(details, data) => {
                          this.paymentSucsess(data.orderID, 'paypal')
                        }}
                        onError={(error) => {
                            this.paymentFailed()
                        }}
                        onCancel = {(error) => {
                            this.paymentFailed()
                        }}
                        options={{
                        clientId: "AQW5aL-tDu2N-3Pu6ieRl5Tcgvb9wgCgVMx8QxXqGYzl2VnUWMg06ciBOjiDkO6FGBHGLpGZb_1vo0wp",
                        currency:'INR'
                        }}
                    />
                    </div>
                  </div>
                  <div className="col-md-4 pad30 border-left">
                    <p>
                      <a
                        href="https://www.dcpexpeditions.com/package.php"
                        target="_blank"
                        >Click here</a>
                      to buy discounted package from DCP Expeditions
                    </p>
                    <div className="form-group">
                      <label>DCP Coupon Code</label>
                      <input onChange = {this.dcpChangeHndler} type="text" className="form-control" />
                    </div>
                    <React.Fragment>
                    <small style={this.state.dcpValue === '' ? {visibility:'hidden'} : null}
                      >Your entries have been accepted, however will be subject
                      to succesful vaidation of code. Succesful entries will be
                      uploaded within 24 hrs. Email notification will be
                      sent.</small>
                    <br /><br />
                    <button style={this.state.dcpValue === '' ? {visibility:'hidden'} : null} onClick={() => this.paymentSucsess(this.state.dcpValue, 'dcp')} className={!this.state.submitDisabled ? 'btn btn-primary' : 'btn btn-primary disabled'}>Submit</button>
                    </React.Fragment>

                    
                  </div>
                </div>
              </div>
            </div>
          </div>
            </div>
            <div className="push"></div>
            {this.state.paymentSucsessShow ? 
            <PaymentSuccessPopup show = {this.state.paymentSucsessShow}/>
            :
            null
            }

            {this.state.PaymentFailedPopupShow ? 
              <PaymentFailedPopup show = {this.state.PaymentFailedPopupShow}/>
              :
              null
            }
            </React.Fragment>
                
        )
    }
}

        
