import React from 'react';
import {Modal} from 'react-bootstrap'
import $ from 'jquery';

export default class ImageUpload extends React.Component {
    constructor(props, context) {
      super(props, context);
  
      this.handleShow = this.handleShow.bind(this);
      this.handleClose = this.handleClose.bind(this);
  
      this.state = {
        show: false,
        email:'',
        password:'',
        passwordError: false,
        emailError:false,
        imgData:'',
        category:'',
        title:'',
        camera:'',
        lens:'',
        aperture:'',
        shutter:'',
        iso:'',
        other:'',
        imgDataError:false,
        categoryError:false,
        titleError:false,
        cameraError:false,
        lensError:false,
        apertureError:false,
        shutterError:false,
        isoError:false,
        otherError:false,
        imageSizeError:false,
        errorText:'This field is mandatory',
        imageName:'',
        currentId:this.props.currentId,
        email:window.localStorage.getItem("email"),
        name:window.localStorage.getItem("name"),
        images:[]
      };
    }

    componentDidMount(){
      console.log(this.props.show)
      this.setState({
        show:this.props.show
      })
    }
  
    handleClose() {
      this.setState({ show: false });
      this.props.ImageUploadCloseHandler();
    }
  
    handleShow() {
      this.setState({ show: true });
    }

    uploadImage = () => { 
      var isEverythingCorrect = 9;
      if(!this.state.imgData){
        this.setState({
            imgDataError:true
        })
      }else{
        isEverythingCorrect--;
      }
      if(this.state.imageSizeError){
        this.setState({
            imageSizeError:true
        })
      }else{
        isEverythingCorrect--;
      }

      if(!this.state.category){
        this.setState({
            categoryError:true
        })
      }else{
        isEverythingCorrect--;
      }

      if(!this.state.title){
        this.setState({
            titleError:true
        })
      }else{
        isEverythingCorrect--;
      }

      if(!this.state.camera){
        this.setState({
            cameraError:true
        })
      }else{
        isEverythingCorrect--;
      }

      if(!this.state.lens){
        this.setState({
            lensError:true
        })
      }else{
        isEverythingCorrect--;
      }

      if(!this.state.aperture){
        this.setState({
            apertureError:true
        })
      }else{
        isEverythingCorrect--;
      }

      if(!this.state.shutter){
        this.setState({
            shutterError:true
        })
      }else{
        isEverythingCorrect--;
      }

      if(!this.state.iso){
        this.setState({
            isoError:true
        })
      }else{
        isEverythingCorrect--;
      }

      if(isEverythingCorrect === 0){
        // const url = 'http://localhost:8888/Self/Project/world%20artography/code/react-app/server/images/uploadData.php';
        // console.log(url)
        const data = {
          id:this.state.currentId,
          email:this.state.email,
          name:this.state.name,
          category:this.state.category,
          title:this.state.title,
          camera:this.state.camera,
          lens:this.state.lens,
          aperture: this.state.aperture,
          shutter:this.state.shutter,
          iso:this.state.iso,
          other:this.state.other,
          imgData:this.state.imgData
        };

        console.log(data)
        var imagesCopy = [...this.state.images]
        imagesCopy.push(data)
        console.log(imagesCopy)
        this.setState({
            images:imagesCopy
        })
        console.log(this.state.images)
        window.localStorage.setItem("images", JSON.stringify(this.state.images))
        // $.post(url,
        //     data,
        //     (data,status) => {
        //       console.log(data,status )
        //     //   window.localStorage.setItem("token",data.token);
        //     //   window.localStorage.setItem("name",data.name);
        //     //   window.localStorage.setItem("email",data.email);
        //     //   window.localStorage.setItem("loggedIn",true);
        //     //   this.props.loginHandler(data.token, data.name, data.email)
        //     //   this.handleClose();
        //     });
      }

    }


    getDataUri(url, callback) {
        var image = new Image();
    
        image.onload = function () {
            var canvas = document.createElement('canvas');
            canvas.width = this.naturalWidth; // or 'width' if you want a special/scaled size
            canvas.height = this.naturalHeight; // or 'height' if you want a special/scaled size
    
            canvas.getContext('2d').drawImage(this, 0, 0);
    
            // Get raw image data
            callback(canvas.toDataURL('image/png').replace(/^data:image\/(png|jpg);base64,/, ''));
    
            // ... or get as Data URI
            callback(canvas.toDataURL('image/png'));
        };
    
        image.src = url;
    }

    imgFileChangeHandler = (e) => {
        e.persist()
        var file, img;
        var this2 = this;
        var _URL = window.URL || window.webkitURL;
        if ((file = e.target.files[0])) {
            img = new Image();
            img.onload = function() {
                console.log(this.width, this.height)
                if((this.width === 1000 && this.height === 667) || (this.width === 667 && this.height === 1000)){
                    this2.setState({
                        imageSizeError:false
                    })  
                }
                else{
                    this2.setState({
                        imageSizeError:true
                    })
                }
                
            };
            img.onerror = function() {
                alert( "not a valid file: " + file.type);
            };
            img.src = _URL.createObjectURL(file);
        }
        this.getDataUri(URL.createObjectURL(e.target.files[0]), (dataUri) => {
            this.setState({
                imageName:e.target.files[0].name,
                imgData:dataUri
            })
        });
    }



    inputHandler = (e) => {

      console.log(e.target.getAttribute("name"))
      var key = e.target.getAttribute("name");
      this.setState({
        errorPass:"",
        [key]: e.target.value,
        [key+"Error"]:false
      })
    }
  
    render() {
  
      return (
        <div>
          
  
          <Modal show={this.state.show} onHide={this.handleClose}>
          
          <div className="close-modal" data-dismiss="modal" onClick={() => this.handleClose()}></div>
          <div className="col-md-3 col register-creative">
                <div className="cont text-center">
                  <h3>Image Upload</h3>
                    <p>Text</p>
                </div>
              </div>
                <div className="col-md-9 col register-form white-bg">
                  <h3>Image Upload</h3>
              <form>
                <div className="row clearfix">
                  <div className="col-md-4 col-sm-6 col-xs-12">
                    <label>Image Upload</label>
                    <div className="input-group image-preview">
                      <input type="text" className="form-control image-preview-filename" disabled="disabled" value={this.state.imageName} />
                      
                      <span className="input-group-btn">
                        {/* <button type="button" className="btn btn-default image-preview-clear" style={{display:'none'}}>
                          <span className="glyphicon glyphicon-remove"></span>
                        </button> */}
                        <div className="btn btn-default image-preview-input">
                          <span className="glyphicon glyphicon-folder-open"></span>
                          <span className="image-preview-input-title">Browse</span>
                          <input type="file" accept="image/png, image/jpeg, image/gif" name="input-file-preview" name="imgData" onChange = {this.imgFileChangeHandler} />
                        </div>
                      </span>
                    </div>
                    {
                          this.state.imgDataError ? 
                          <span className="error">{this.state.errorText}</span>
                          :
                          null
                      }
                      {
                          this.state.imageSizeError ? 
                          <span className="error">Not correct size</span>
                          :
                          null
                      }
                  </div>
                  
                <div className="col-md-4 col-sm-6 col-xs-12">
                    <div className="form-group">
                        <select className="form-control" name="category" onChange={this.inputHandler}>
                          <option>Wildlife & Nature</option>
                          <option>Landscape</option>
                          <option>Travel & Street</option>
                          <option>Portraits</option>
                          <option>Astro / Aerial Photography</option>
                        </select>
                        {
                            this.state.categoryError ? 
                            <span className="error">{this.state.errorText}</span>
                            :
                            null
                        }
                    </div>
                  </div>
                <div className="col-md-4 col-sm-6 col-xs-12">
                  <div className="form-group">
                    <input type="text" id="imgtitle" className="form-control" name="title" onChange={this.inputHandler} required/>
                    <label className="form-control-placeholder" htmlFor="imgtitle">Image Title</label>
                    {
                            this.state.titleError ? 
                            <span className="error">{this.state.errorText}</span>
                            :
                            null
                        }
                    
                  </div>
                </div>
                <div className="col-md-4 col-sm-6 col-xs-12">
                  <div className="form-group">
                    <input type="text" id="camera" className="form-control" name="camera" onChange={this.inputHandler} required/>
                    <label className="form-control-placeholder" htmlFor="camera">Camera</label>
                    {
                            this.state.cameraError ? 
                            <span className="error">{this.state.errorText}</span>
                            :
                            null
                        }
                  </div>
                </div>
                <div className="col-md-4 col-sm-6 col-xs-12">
                  <div className="form-group">
                    
                    <input type="text" id="lens" className="form-control" name="lens" onChange={this.inputHandler} required/>
                    <label className="form-control-placeholder" htmlFor="lens">Lens</label>
                    {
                            this.state.lensError ? 
                            <span className="error">{this.state.errorText}</span>
                            :
                            null
                        }
                  </div>
                </div>
                    <div className="col-md-4 col-sm-6 col-xs-12">
                        <div className="form-group">
                          
                          <input type="text" id="aperture" className="form-control" onChange={this.inputHandler} name="aperture" required/>
                          <label className="form-control-placeholder" htmlFor="aperture">Aperture</label>
                          {
                            this.state.apertureError ? 
                            <span className="error">{this.state.errorText}</span>
                            :
                            null
                        }
                        </div>
                      </div>
                      <div className="col-md-4 col-sm-6 col-xs-12">
                        <div className="form-group">
                          <input type="text" id="shutter" className="form-control" onChange={this.inputHandler} name="shutter" required/>
                          <label className="form-control-placeholder" htmlFor="shutter">Shutter Speed</label>
                          {
                            this.state.shutterError ? 
                            <span className="error">{this.state.errorText}</span>
                            :
                            null
                        }
                        </div>
                      </div>
                      <div className="col-md-4 col-sm-6 col-xs-12">
                        <div className="form-group">
                          
                          <input type="text" id="iso" className="form-control" onChange={this.inputHandler} name="iso" required/>
                          <label className="form-control-placeholder" htmlFor="iso">ISO</label>
                          {
                            this.state.isoError ? 
                            <span className="error">{this.state.errorText}</span>
                            :
                            null
                        }
                        </div>
                      </div>
  
                      <div className="col-md-4 col-sm-6 col-xs-12">
                        <div className="form-group">
                      
                          <input type="password" id="remark" className="form-control" onChange={this.inputHandler} name="other" required/>
                          <label className="form-control-placeholder" htmlFor="remark">Other remarks:</label>
                          {
                            this.state.otherError ? 
                            <span className="error">{this.state.errorText}</span>
                            :
                            null
                        }
                        </div>
                      </div>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-default" data-dismiss="modal" onClick={() => this.handleClose()}>Close</button>
                  <button type="button" onClick={() => this.uploadImage()} className="btn btn-primary">Submit</button>
                </div>
                
              </form>
            </div>
          </Modal>
        </div>
      );
    }
  }