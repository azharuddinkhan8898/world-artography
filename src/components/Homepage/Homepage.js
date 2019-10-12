import React, { Component } from 'react'
import Tiles from './Tiles';
import ErrorAlert from './../utils/ErrorAlert';
import ImageUpload from './../Imageupload/ImageUpload';
import PaymentCalculation from './PaymentCalculation'
import $ from 'jquery';
import MaxImagePopup from './MaxImagePopup';
import PaymentConfirmation from './PaymentConfirmation'

export default class Homepage extends Component {
    state = {
        images:[],
        tilesLoadingError: "",
        errorLogin:"",
        ImageUploadShow:false,
        currentId:'',
        localImages:[],
        totalImages: 0,
        alreadyUploadedImages:0,
        MaxImagePopupShow:false,
        editingTileId:'',
        PaymentConfirmationShow:false
    }

    tileClickHandler = (id) => {
        var idn = id.target.id;
        this.setState({
            editingTileId:''
        })
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

        if(window.localStorage.getItem("totalImages") < 5){
            if(window.localStorage.getItem("loggedIn") === 'true' || window.localStorage.getItem("loggedIn") === true){
                console.log(idn)
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
        else{
            console.log("skjdhwsfhjk")
            this.setState({
                MaxImagePopupShow:true
            })
            // setTimeout(() => {
            //     this.setState({
            //         errorLogin:"",
                    
            //     })
            // }, 3000)
        }

        
    }

    MaxImagePopupHideHandler(){
        this.setState({
            MaxImagePopupShow:false
        })
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

      PaymentCalculationClickHandler() {
          this.setState({
            PaymentConfirmationShow:true
          })
      }

      PaymentCalculationClickHandlerClose(){
        this.setState({
            PaymentConfirmationShow:false
          })
      }





      editTileHandler = (e) => {

        this.setState({
            ImageUploadShow:true,
            editingTileId:e.target.id
        })




            

      }

      removeTileHandler = (e) => {
        e.preventDefault();
        console.log(e.target.id)
        var imagesCopy = [...this.state.images];
        imagesCopy[(parseInt(e.target.id) - 1)].email = null;
        var copyLocalImages = JSON.parse(window.localStorage.getItem("images"));
        var copycopyLocalImages;
        console.log(copyLocalImages)
        if(copyLocalImages.length > 1){
            copycopyLocalImages = copyLocalImages.filter((el) => {
                return !(el.id == e.target.id)
            })
        }else{
            copycopyLocalImages = [];
        }
        
        this.setState({
            images:imagesCopy,
            localImages:copycopyLocalImages,
            totalImages: this.state.totalImages - 1
        })
        console.log(copycopyLocalImages, this.state.totalImages - 1)
        window.localStorage.setItem('totalImages',parseInt(window.localStorage.getItem('totalImages')) - 1)
        window.localStorage.setItem("images", JSON.stringify(copycopyLocalImages))
      }



      storeImagesHandler = (images1) => {
        console.log(images1)
        var imagesCopy = [...this.state.images];
        var copyLocalImages = [...this.state.localImages]
        console.log(imagesCopy, images1[images1.length -1].id)
        imagesCopy[(parseInt(images1[images1.length -1].id) - 1)] = images1[images1.length -1];
        copyLocalImages.push(images1[images1.length -1])
        this.setState({
            images:imagesCopy,
            localImages:copyLocalImages,
            totalImages: this.state.totalImages + 1
        })
        window.localStorage.setItem('totalImages',parseInt(window.localStorage.getItem('totalImages')) + 1)
      }

    //   imagesUploaded = 0;

    //     imageUploadHandler = () => {
    //         console.log(this.state.localImages)
    //         const url = 'http://localhost:8888/Self/Project/world%20artography/code/react-app/server/images/uploadData.php';
    //         var data = this.state.localImages;
    //         if(this.imagesUploaded <data.length){
    //             console.log(this.imagesUploaded)
    //             getDataUri(data[this.imagesUploaded].url, (dataUri) => {
                    
    //                 if(dataUri.search("data:image") !== -1){
    //                     //console.log(dataUri)
    //                     if(dataUri.search("data:image") !== -1){
    //                         //console.log(dataUri)
    //                         var datanew = data[this.imagesUploaded];
    //                         datanew.url = dataUri;
    //                         console.log(datanew)
    //                         $.post(url,
    //                             datanew,
    //                         (data,status) => {
    //                             console.log(data,status )
    //                             if(status){
    //                                 this.imagesUploaded = this.imagesUploaded + 1;
    //                                 this.imageUploadHandler();
    //                             }
    //                         });
                            
    //                     }
    //                 }
    //                 else{
    //                     console.log("all images are aploaded.")
    //                 }
                    
    //             })
                
    //         }
            
    //     }

    componentDidMount(){
        console.log("homepage did mounted")
        var localImages = JSON.parse(window.localStorage.getItem("images"));
        if(localImages != null){
            window.localStorage.setItem("images", null)
        }
        const url = '/server/images/getimages.php';
        $.get(url,
          (data) => {
            if(data.status){
                var imagesCopy = data.data;
                this.setState({
                    images:imagesCopy,
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


          if(window.localStorage.getItem("email") !== null && window.localStorage.getItem("email") !== ""){
              console.log(window.localStorage.getItem("email"))
            const url = '/server/images/countimages.php?email='+ window.localStorage.getItem("email");
            $.get(url,
              (data) => {
                if(data.status){
                    console.log(data.data)
                    window.localStorage.setItem("totalImages",data.data)
                    this.setState({
                        totalImages:data.data
                    })
    
                }
                
              });
          }
          else{
            this.setState({
                totalImages:0
            })
            window.localStorage.setItem("totalImages",0)
          }

    }
    render() {
        console.log(this.state.totalImages)
        return (
            <React.Fragment>
            <div id="content">
                <br/><div>
                <div className="col-sm-12 text-center" style={{color: '#f4d90f', 'textTransform': 'uppercase', fontWeight: 600}}>
                {window.localStorage.getItem("totalImages") == 0 ? 'Click on Pixels to Upload Image ' : 'Total images Uploaded: ' +window.localStorage.getItem("totalImages")}
                  
                  
                </div>
                <br/>
              </div>
                <h1 className="h3 mb-4 text-gray-800"></h1>
                <div id="grid-wrapper" className="clearfix  text-center">
                    <Tiles removeTileHandler = {(e) => this.removeTileHandler(e)}  tileClickHandler = { (i) => this.tileClickHandler(i)} imagesData = {this.state.images}/>
                </div>
                    <ErrorAlert msg = {this.state.errorLogin}/>
                    {this.state.localImages.length ? 
                        <PaymentCalculation PaymentCalculationClickHandler = {() => this.PaymentCalculationClickHandler()}  noOfImages={this.state.localImages.length}/>
                    :
                        null
                    }
                    
                    {this.state.ImageUploadShow ?
                        <ImageUpload editingTileId = {this.state.editingTileId} storeImagesHandler = {this.storeImagesHandler} currentId = {this.state.currentId} ImageUploadCloseHandler = {() => this.ImageUploadCloseHandler()} show={this.state.ImageUploadShow} loginHandler = {this.loginHandler} closeHandler = {() => this.closeHandler()} />
                        :
                        null
                    }

                    { this.state.MaxImagePopupShow ? 
                        <MaxImagePopup MaxImagePopupHideHandler = {() => this.MaxImagePopupHideHandler()} show = {this.state.MaxImagePopupShow}/>
                        :
                        null
                    }

                    { this.state.PaymentConfirmationShow ? 
                        <PaymentConfirmation noOfImages={this.state.localImages.length} show={this.state.PaymentConfirmationShow} PaymentCalculationClickHandlerClose = {() => this.PaymentCalculationClickHandlerClose()}/>
                        :
                        null
                    }

                </div>

                <div className="client">
                    <ul className="client-list">
                        <li><img src="https://www.worldartography.com/wp-content/uploads/2019/09/sony.png" alt=""/></li>
                        <li><img src="https://www.worldartography.com/wp-content/uploads/2019/09/guiness.png" alt=""/></li>
                        <li><img src="https://www.worldartography.com/wp-content/uploads/2019/09/natgeo.png" alt=""/></li>
                        <li><img src="https://www.worldartography.com/wp-content/uploads/2019/09/canon.png" alt=""/></li>
                        <li><img src="https://www.worldartography.com/wp-content/uploads/2019/09/polaroid.png" alt=""/></li>
                        <li><img src="https://www.worldartography.com/wp-content/uploads/2019/09/phillips.png" alt=""/></li>
                        <li><img src="https://www.worldartography.com/wp-content/uploads/2019/09/pantex.png" alt=""/></li>
                        <li><img src="https://www.worldartography.com/wp-content/uploads/2019/09/panasonic.png" alt=""/></li>
                        <li><img src="https://www.worldartography.com/wp-content/uploads/2019/09/olympus.png" alt=""/></li>
                        <li><img src="https://www.worldartography.com/wp-content/uploads/2019/09/nikon.png" alt=""/></li>
                        <li><img src="https://www.worldartography.com/wp-content/uploads/2019/09/kodak.png" alt=""/></li>
                        <li><img src="https://www.worldartography.com/wp-content/uploads/2019/09/fuji.png" alt=""/></li>
                        <li><img src="https://www.worldartography.com/wp-content/uploads/2019/09/casio.png" alt=""/></li>
                        <li><img src="https://www.worldartography.com/wp-content/uploads/2019/09/sharp.png" alt=""/></li>
                        <li><img src="https://www.worldartography.com/wp-content/uploads/2019/09/samsung.png" alt=""/></li>
                        <li><img src="https://www.worldartography.com/wp-content/uploads/2019/09/Qatar_Airways_Logo.png" alt=""/></li>
                        <li><img src="https://www.worldartography.com/wp-content/uploads/2019/09/emirates-logo.png" alt=""/></li>
                        <li><img src="https://www.worldartography.com/wp-content/uploads/2019/09/world-art-dubai.png" alt=""/></li>
                        <li><img src="https://www.worldartography.com/wp-content/uploads/2019/09/dcp.png" alt=""/></li>
                    </ul>
                </div>

                </React.Fragment>
                
        )
    }
}

        
