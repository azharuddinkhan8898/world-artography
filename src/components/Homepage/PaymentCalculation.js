import React, { Component } from 'react'


const ErrorAlert = (props) => {
    var numOfImages = props.noOfImages;
    var pricePerImage = 6700;
    var dcpPrice = '';
    if(numOfImages == 1){
        dcpPrice = '₹6,325 + 18% GST'
    }
    else if(numOfImages == 2){
        dcpPrice = '₹12,650 + 18% GST'
    }
    else if(numOfImages == 3){
        dcpPrice = '₹18,974 + 18% GST'
    }
    else if(numOfImages == 4){
        dcpPrice = '₹25,299 + 18% GST'
    }
    else if(numOfImages == 5){
        dcpPrice = '₹24,999 + 18% GST'
    }
    return(
        <div id="payment-bar">
        <span></span>
        <span></span>
            <p>Uploaded Images ({numOfImages}X₹6700) = ₹{numOfImages * pricePerImage} | For DCP {dcpPrice}</p>
            {/* <Link to={{pathname:"/payment", state:{noOfImages:numOfImages, priceImage: pricePerImage}}} className="btn btn-primary">Pay Now</Link> */}
            <button onClick={() => props.PaymentCalculationClickHandler()} className="btn btn-primary">Pay Now</button>
        </div>
    )
}   

        
export default ErrorAlert;