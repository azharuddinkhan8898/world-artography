import React, { Component } from 'react'

export default class Homepage extends Component {
    state = {
        
    }
    render() {
        console.log(this.props.imagesData)
        var images = [];
        for(var i=0; i<5000; i++){
            if(this.props.imagesData[i]){
                images.push(
                <div key={i} className="img-thumb" id={i} style={{background:`url(${this.props.imagesData[i].url}) center center no-repeat`,backgroundSize:`cover`}}>
                    <a href={this.props.imagesData[i].url} data-fancybox="gallery"></a>
                </div>
                )
            }
            else{
                var bp = -i*53+"px 0"
                images.push(<div key={i} className="img-thumb loginpop" id={i} style={{backgroundPosition:bp}}></div>)
            }
        }
        return (
            <div>
                {images}
            </div>
            
        )
    }
}

        
