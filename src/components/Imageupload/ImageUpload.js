import React from 'react';
import {Modal} from 'react-bootstrap'
import {getDataUri} from './../utils/codeSnippet'
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
        url:'',
        category:'',
        title:'',
        camera:'',
        lens:'',
        aperture:'',
        shutter:'',
        iso:'',
        other:'',
        urlError:false,
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
      console.log(this.props.editingTileId)
      if(this.props.editingTileId !== ''){
        
      }
      this.setState({
        show:this.props.show
      })
    }
  
    handleClose(sub) {
      console.log(sub)
      this.setState({ show: false });
      this.props.ImageUploadCloseHandler();
      if(sub !== 'submit'){
        const url = '/server/images/removeActiveImage.php';
        const data = {
            id:this.state.currentId
        }
        $.post(url, data, (data,status) => {
            console.log(data,status )
            if(data.status){
            }
        });
      }
      
    }
  
    handleShow() {
      this.setState({ show: true });
    }

    uploadImage = () => {
      var isEverythingCorrect = 4;
      if(!this.state.url){
        this.setState({
            urlError:true
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

      /*if(!this.state.camera){
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
      }*/

      if(isEverythingCorrect === 0){
        // const url = 'http://10.140.160.53:8888/Self/Project/world%20artography/code/react-app/server/images/uploadData.php';
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
          url:this.state.url
        };

        var imagesCopy = [...this.state.images]
        imagesCopy.push(data)
        //console.log(imagesCopy)
        this.setState({
            images:imagesCopy
        })
        this.props.storeImagesHandler(imagesCopy)
        console.log(imagesCopy)
        
        var localImages = JSON.parse(window.localStorage.getItem("images"));
        if(localImages && localImages.length){
            localImages.push(imagesCopy[0])
            window.localStorage.setItem("images", JSON.stringify(localImages))
        }
        else{
            window.localStorage.setItem("images", JSON.stringify(imagesCopy))
        }

        this.handleClose('submit');
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
            //console.log(img.src)
        }
        // console.log(URL.createObjectURL(e.target.files[0]))
        // getDataUri(URL.createObjectURL(e.target.files[0]), (dataUri) => {
        //   console.log(dataUri)
        // })
        this.setState({
            imageName:e.target.files[0].name,
            url:URL.createObjectURL(e.target.files[0])
        })
        //});
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
          
  
          <Modal show={this.state.show} onHide={this.handleClose} className="home-modal">
          
          <div className="close-modal" data-dismiss="modal" onClick={() => this.handleClose()}></div>
          <div className="col-md-3 col register-creative">
                <div className="cont text-center">
                  <h3>Image Upload</h3>

                </div>
              </div>
                <div className="col-md-9 col register-form white-bg">
                  <h3>Image Upload</h3>
                  <p style={{    marginTop: '-6px', marginBottom: '25px',    color: "#ff4d4d",
    fontSize: "12px"}}>1000 pixels longer side &amp; 667 pixel on shorter side</p>
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
                          <input type="file" accept="image/png, image/jpeg, image/gif" name="input-file-preview" name="url" onChange = {this.imgFileChangeHandler} />
                        </div>
                      </span>
                    </div>
                    {
                          this.state.urlError ? 
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
                          <option>Select Category</option>
                          <option>Wildlife &amp; Nature</option>
                          <option>Landscape</option>
                          <option>Travel &amp; Street</option>
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
                      
                          <input type="text" id="remark" className="form-control" onChange={this.inputHandler} name="other" required/>
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