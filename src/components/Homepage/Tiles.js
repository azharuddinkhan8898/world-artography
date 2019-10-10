import React, { Component } from 'react'

export default class Homepage extends Component {
    state = {
        
    }

    tileClickHandler = (id) => {
        var idn = id.target.id;
        // const url = 'http://localhost:8888/Self/Project/world%20artography/code/react-app/server/images/getimages.php?id='+ idn;
        // $.get(url,
        //   (data) => {
        //     if(data.status){
        //         this.setState({
        //             images:data.data,
        //             tilesLoadingError:""
        //         })
        //     }
        //     else{
        //       this.setState({
        //         images:[],
        //         tilesLoadingError:"Unable to load Tiles"
        //       })
        //     }
            
        //   });
        if(window.localStorage.getItem("loggedIn") === 'true' || window.localStorage.getItem("loggedIn") === true){

        }
        else{
            this.setState({
                errorLogin:"error"
            })
        }
    }

    
    render() {
        var images = [];
        if(this.props.imagesData.length > 0){
            console.log(this.props.imagesData)
            for(var i=1; i<=5000; i++){
                if(this.props.imagesData[i - 1].email != null){
                    images.push(
                    <a key={i - 1} className="img-thumb" id={this.props.imagesData[i - 1].id} href={'http://localhost:8888/Self/Project/world%20artography/code/react-app/server/images/'+this.props.imagesData[i - 1].url} data-fancybox="gallery" style={{background:`url(${'http://localhost:8888/Self/Project/world%20artography/code/react-app/server/images/'+this.props.imagesData[i - 1].url}) center center no-repeat`,backgroundSize:`cover`}}>
                    <figcaption>
                        <div id={this.props.imagesData[i - 1].id} className="like">Like <i className="fas fa-heart"></i></div>
                        <h6>{this.props.imagesData[i - 1].title}</h6>
                        <p>Photo by {this.props.imagesData[i - 1].name}</p>
                    
                    </figcaption>
                    </a>
                    )
                }
                else{
                    var bp = -i*53+"px 0"
                    images.push(<div key={i - 1}  onClick={(i) => this.props.tileClickHandler(i)} className="img-thumb loginpop" id={i} style={{backgroundPosition:bp}}></div>)
                }
            }
        }
        
        return (
            <div>
                {images}
            </div>
            
        )
    }
}