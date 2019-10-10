import React, { Component } from 'react'
import Tiles from './Tiles';
import ErrorAlert from './../utils/ErrorAlert';
import ImageUpload from './../Imageupload/ImageUpload'
import $ from 'jquery';

export default class Homepage extends Component {
    state = {
        images:[],
        tilesLoadingError: "",
        errorLogin:"",
        ImageUploadShow:false,
        currentId:''
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
            this.setState({
                ImageUploadShow:true,
                currentId:idn
            })
        }
        else{
            this.setState({
                errorLogin:"Login to upload images"
            })
            setTimeout(() => {
                this.setState({
                    errorLogin:"",
                    
                })
            }, 3000)
        }
    }

    ImageUploadShowHandler(){
        this.setState({
            ImageUploadShow:true
        })
      }

      ImageUploadCloseHandler(){
        this.setState({
            ImageUploadShow:false
        })
      }

    componentDidMount(){
        const url = 'http://localhost:8888/Self/Project/world%20artography/code/react-app/server/images/getimages.php';
        $.get(url,
          (data) => {
            if(data.status){
                this.setState({
                    images:data.data,
                    tilesLoadingError:""
                })
            }
            else{
              this.setState({
                images:[],
                tilesLoadingError:"Unable to load Tiles"
              })
            }
            
          });
    }
    render() {
        console.log(this.state.images)
        return (
            <div id="content">
                <br/><br/><br/>
                <h1 className="h3 mb-4 text-gray-800"></h1>
                <div id="grid-wrapper" className="clearfix">
                    <Tiles tileClickHandler = { (i) => this.tileClickHandler(i)} imagesData = {this.state.images}/>
                </div>
                    <ErrorAlert msg = {this.state.errorLogin}/>
                    {this.state.ImageUploadShow ?
                        <ImageUpload currentId = {this.state.currentId} ImageUploadCloseHandler = {() => this.ImageUploadCloseHandler()} show={this.state.ImageUploadShow} loginHandler = {this.loginHandler} closeHandler = {() => this.closeHandler()} />
                        :
                        null
                    }
                </div>
                
        )
    }
}

        
