import React from 'react';
import {Modal} from 'react-bootstrap'
import $ from 'jquery';

export default class Login extends React.Component {
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
        loginDisabled: false
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
      this.props.closeHandler();
    }
  
    handleShow() {
      this.setState({ show: true });
    }

    signin = () => { 
      var isEverythingCorrect = 2;
      if(!this.state.email){
        this.setState({
          emailError:true
        })
      }else{
        isEverythingCorrect--;
      }

      if(!this.state.password){
        this.setState({
          passwordError:true
        })
      }else{
        isEverythingCorrect--;
      }

      if(isEverythingCorrect === 0){
        const url = '/server/user/login.php?email='+this.state.email+'&password='+this.state.password;
        console.log(url)
        this.setState({
          loginDisabled:true
        })
        const data = {
          email:this.state.email,
          password:this.state.password,
        };
        console.log(data)
        $.get(url,
          (data,status) => {
            console.log(data)
            if(data.status){
            window.localStorage.setItem("token",data.token);
            window.localStorage.setItem("name",data.name);
            window.localStorage.setItem("email",data.email);
            window.localStorage.setItem("loggedIn",true);
            this.props.loginHandler(data.token, data.name, data.email)
            this.setState({
              loginDisabled:false
            })
            const url = '/server/images/countimages.php?email='+ data.email;
            $.get(url,
              (data1) => {
                if(data1.status){
                    console.log(data1.data)
                    window.localStorage.setItem("totalImages",data1.data)
                    this.handleClose();
                    window.location.reload();
                }
                
              });

            
            }
            else{
              this.setState({
                errorPass:"Invalid Email ID or Password!",
                loginDisabled:false
              })
            }
            
          });



      }

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
        <div className="azhar">
          
  
          <Modal show={this.state.show} onHide={this.handleClose} className="home-modal">
          
          <div className="close-modal" data-dismiss="modal" onClick={() => this.handleClose()}></div>
          <div className="col-md-6 col register-text">
            <div className="cont text-center">
              <h3>World Artography<br/>
                Photography Contest</h3>
              <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s</p>
              <a href="#" className="btn btn-default" onClick={() => this.props.registerOpenHandler()} data-dismiss="modal" data-toggle="modal" data-target="#register">Register Now</a>
            </div>
          </div>
          <div className="col-md-6 col login-form">
              <div className="cont">
              <h3>Login</h3>
              <form autoComplete="off">
                  <div className="form-group">
                      <input type="text" id="email" name="email" className="form-control" onChange= {this.inputHandler} required/>
                      <label className="form-control-placeholder" htmlFor="email">Email</label>
                      {this.state.emailError ? 
                        <span className="error">Please enter your Email ID</span>
                        :
                        null
                      }
                  </div>
                  <div className="form-group">
                      <input type="password" id="password" name="password" className="form-control" required onChange= {this.inputHandler}/>
                      <label className="form-control-placeholder" htmlFor="password">Password</label>
                      {this.state.passwordError ? 
                        <span className="error">Please enter your password</span>
                        :
                        null
                      }
                  </div>
                  <div className="form-group">
                      <a className={this.state.loginDisabled ? 'btn btn-primary btn-block disabled' : 'btn btn-primary btn-block'} onClick = {() => this.signin()}>Login</a>
                      {
                        this.state.errorPass ? <p className="errorpass">{this.state.errorPass}</p>
                        :
                        null
                      }
                      
                  </div>
                  <div className="form-group text-center">

                      <a href="#" className="ForgetPwd" value="Login">Forget Password?</a>
                  </div>
              </form>
              </div>
          </div>
          </Modal>
        </div>
      );
    }
  }