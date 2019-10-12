import React, { Component } from 'react'
import {Link} from "react-router-dom";

const PaymentCalculation = (props) => {
    var numOfImages = props.noOfImages;
    var pricePerImage = 6700;
    return(
        <div id="payment-bar">
            <p>Uploaded Images ({numOfImages}X₹6700) = ₹{numOfImages * pricePerImage}</p>
            <a onClick={() => props.imageUploadHandler()} className="btn btn-primary">Pay Now</a>
        </div>
    )
}   

        
export default PaymentCalculation;