import React, { Component } from 'react'
import Tiles from './Tiles';
import ErrorAlert from './../utils/ErrorAlert';
import ImageUpload from './../Imageupload/ImageUpload';
import PaymentCalculation from './PaymentCalculation'
import $ from 'jquery';
import MaxImagePopup from './MaxImagePopup';
import PaymentConfirmation from './PaymentConfirmation'
import Login from './../Auth/Login/Login';
import Register from './../Auth/Register/Register';
import RegisterConfirm from './../Auth/Register/RegisterConfirm';

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
        PaymentConfirmationShow:false,
        imagesLoaded:false,
        loginShow:false,
        registerShow:false,
        RegisterConfirmShow:false
    }


    loginClickHandler(){
        this.setState({
          loginShow:true,
          registerShow:false
        })
      }
      logincloseHandler(){
        this.setState({
          loginShow:false
        })
      }
      registerOpenHandler(){
        this.setState({
          registerShow:true,
          loginShow:false
        })
      }
      registerCloseHandler(){
        this.setState({
          registerShow:false
        })
      }
    
      registerConfirmShowHandler(){
        console.log("open")
        this.setState({
          RegisterConfirmShow:true
        })
      }
    
     
    
      registerConfirmCloseHandler(){
        console.log("closed")
        this.setState({
          RegisterConfirmShow:false
        })
      }
    
      loginHandler = (token, name, email) => {
        console.log(token, name, email)
        this.setState({
          loggedIn:true,
          name:name,
          email:email,
          token:token
        })
      }



    tileClickHandler = (id) => {
        var idn = id.target.id;

        //var idn = id.target.id;
        


        this.setState({
            editingTileId:''
        })
        // const url = 'http://10.140.160.53:8888/Self/Project/world%20artography/code/react-app/server/images/getimages.php?id='+ idn;
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

                const url = '/server/images/getActiveImage.php?id='+ idn;
                console.log(url)
                $.get(url,
                (data) => {
                    console.log(data)
                    if(data.status){
                    if(data.message <= 30){
                        this.setState({
                            errorLogin:"This tile is been used by someone, please another tile."
                        })
                        setTimeout(() => {
                            this.setState({
                                errorLogin:"",
                                
                            })
                        }, 3000)
                    }
                    else{
                        const url = '/server/images/activeImage.php';
                        const data = {
                            id:idn
                        }
                        $.post(url, data, (data,status) => {
                            console.log(data,status )
                            if(data.status){
                                this.setState({
                                    ImageUploadShow:true,
                                    currentId:idn
                                })
                            }
                        });
                    }
                    
                        
                    }
                    else{

                        const url = '/server/images/activeImage.php';
                        const data = {
                            id:idn
                        }
                        $.post(url, data, (data,status) => {
                            console.log(data,status )
                            if(data.status){
                                this.setState({
                                    ImageUploadShow:true,
                                    currentId:idn
                                })
                            }
                        });
                        
                    }
                    
                });


                
            }
            else{
                this.loginClickHandler()
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
        const url = '/server/images/removeActiveImage.php';
        const data = {
            id:e.target.id
        }
        $.post(url, data, (data,status) => {
            console.log(data,status )
            if(data.status){
            }
        });
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
    //         const url = 'http://10.140.160.53:8888/Self/Project/world%20artography/code/react-app/server/images/uploadData.php';
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
                    tilesLoadingError:"",
                    imagesLoaded:true
                })
                // var newArr = imagesCopy.filter((el) => {
                //     return el.email === null
                // })
                // $(".imageCounter").empty().append(newArr.length)

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
                <div>
                { (window.localStorage.getItem("loggedIn") == 'true' || window.localStorage.getItem("loggedIn") == true) ? 
                <div className="text-center" style={{color: '#f4d90f', 'textTransform': 'uppercase', fontWeight: 600, marginTop:"10px"}}>
                {window.localStorage.getItem("totalImages") == 0 ? '' : 'Total images Uploaded: ' +window.localStorage.getItem("totalImages")}
                </div>
                
                :
                null

                }
                
                
              </div>
                <h1 className="h3 mb-4 text-gray-800"></h1>
                <div id="grid-wrapper" className="clearfix  text-center">
                    {this.state.imagesLoaded ? 
                        <Tiles removeTileHandler = {(e) => this.removeTileHandler(e)}  tileClickHandler = { (i) => this.tileClickHandler(i)} imagesData = {this.state.images}/>
                        :
                        <div className="imagesLoader text-center" style={{textAlign:"center", margin:"10px 0px 30px 0px",fontSize:"16px",color:"#fff"}}>
                            <img className="pixel-loader" src="/images/loader.png" alt=""/>
                            <p>Loading Pixel Grid...</p>
                        </div>
                    }
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



                    {this.state.loginShow ?
                        <Login show={this.state.loginShow} loginHandler = {this.loginHandler} closeHandler = {() => this.logincloseHandler()} registerOpenHandler = {() => this.registerOpenHandler()} />
                        :
                        null
                    }
                    {this.state.registerShow ? 
                        <Register show={this.state.registerShow} registerConfirmShowHandler = {() => this.registerConfirmShowHandler()}  loginHandler = {this.loginHandler} closeHandler = {() => this.registerCloseHandler()} loginClickHandler={() => this.loginClickHandler()}/>
                        :
                        null
                    }

                    {this.state.RegisterConfirmShow ? 
                        <RegisterConfirm registerConfirmCloseHandler = {() => this.registerConfirmCloseHandler()} show={this.state.RegisterConfirmShow} />
                        :
                        null
                    }

                

                </div>

                <div className="client">
                    <ul className="client-list">
                        <li><img src="/images/partners/sony.png" alt=""/></li>
                        <li><img src="/images/partners/guiness.png" alt=""/></li>
                        <li><img src="/images/partners/natgeo.png" alt=""/></li>
                        <li><img src="/images/partners/canon.png" alt=""/></li>
                        <li><img src="/images/partners/polaroid.png" alt=""/></li>
                        <li><img src="/images/partners/phillips.png" alt=""/></li>
                        <li><img src="/images/partners/pantex.png" alt=""/></li>
                        <li><img src="/images/partners/panasonic.png" alt=""/></li>
                        <li><img src="/images/partners/olympus.png" alt=""/></li>
                        <li><img src="/images/partners/nikon.png" alt=""/></li>
                        <li><img src="/images/partners/kodak.png" alt=""/></li>
                        <li><img src="/images/partners/fuji.png" alt=""/></li>
                        <li><img src="/images/partners/casio.png" alt=""/></li>
                        <li><img src="/images/partners/sharp.png" alt=""/></li>
                        <li><img src="/images/partners/samsung.png" alt=""/></li>
                        <li><img src="/images/partners/Qatar_Airways_Logo.png" alt=""/></li>
                        <li><img src="/images/partners/emirates-logo.png" alt=""/></li>
                        <li><img src="/images/partners/world-art-dubai.png" alt=""/></li>
                        {/* <li><img src="/images/partners/dcp.png" alt=""/></li> */}
                    </ul>
                </div>

                </React.Fragment>
                
        )
    }
}

        
