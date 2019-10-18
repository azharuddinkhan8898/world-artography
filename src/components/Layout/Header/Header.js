import React from "react";
import { NavLink } from "react-router-dom";
import Login from './../../Auth/Login/Login';
import Register from './../../Auth/Register/Register';
import RegisterConfirm from './../../Auth/Register/RegisterConfirm';
import $ from 'jquery'

export default class Header extends React.Component {
  state = {
    loginShow: false,
    registerShow: false,
    loggedIn: false,
    name: '',
    token: '',
    email: '',
    RegisterConfirmShow: false,
    showMobileMenu: true,
    showMobileMenuButton: false,
    imageCounter: 0
  }
  loginClickHandler() {
    this.setState({
      loginShow: true,
      registerShow: false
    })
  }
  closeHandler() {
    this.setState({
      loginShow: false
    })
  }
  registerOpenHandler() {
    this.setState({
      registerShow: true,
      loginShow: false
    })
  }
  registerCloseHandler() {
    this.setState({
      registerShow: false
    })
  }

  registerConfirmShowHandler() {
    console.log("open")
    this.setState({
      RegisterConfirmShow: true
    })
  }



  registerConfirmCloseHandler() {
    console.log("closed")
    this.setState({
      RegisterConfirmShow: false
    })
  }

  loginHandler = (token, name, email) => {
    console.log(token, name, email)
    this.setState({
      loggedIn: true,
      name: name,
      email: email,
      token: token
    })
  }



  logoutHandler = () => {
    window.localStorage.setItem('loggedIn', false);
    window.localStorage.setItem("name", '');
    window.localStorage.setItem("email", '');
    window.localStorage.setItem("token", '');
    this.setState({
      loggedIn: false,
      name: '',
      email: '',
      token: ''
    })
    window.localStorage.setItem("totalImages", 0);
    window.location.reload();
  }

  showMobileMenuHandler() {
    this.setState({
      showMobileMenu: true
    })
  }
  HideMobileMenuHandler() {
    this.setState({
      showMobileMenu: false
    })
  }
  componentDidMount() {


    const url = '/server/images/getimages.php';
    $.get(url,
      (data) => {
        if (data.status) {
          var imagesCopy = data.data;
          var newArr = imagesCopy.filter((el) => {
            return el.email === null
          })
          this.setState({
            imageCounter: newArr.length
          })
          //$(".imageCounter").empty().append(newArr.length)

        }
        else {
          this.setState({
            images: [],
            tilesLoadingError: "Unable to load Tiles"
          })
        }

      });




    var loggedIn = window.localStorage.getItem("loggedIn");
    var name = window.localStorage.getItem("name");
    var email = window.localStorage.getItem("email");
    var token = window.localStorage.getItem("token");
    if (window.innerWidth <= 1024) {
      this.setState({
        showMobileMenu: false,
        showMobileMenuButton: true
      })
      $(".linkClick").click(() => {
        this.setState({
          showMobileMenu: false
        })
      })
    }
    if (loggedIn && loggedIn === 'true') {

      this.setState({
        loggedIn: true,
        name: name,
        email: email,
        token: token
      })
    }
  }
  render() {
    return (
      <React.Fragment>


        <header>
          <nav className="navbar info-color">

            <NavLink className="navbar-brand" to="/">
              <img src={"/images/logo.svg"} width="320px" />
            </NavLink>



            {this.state.showMobileMenuButton ?
              <div className="mob-btn" onClick={() => this.showMobileMenuHandler()}><i className="fas fa-bars"></i></div>
              :
              null
            }

            <div className="mob-menu pull-right" style={{ display: this.state.showMobileMenu ? 'block' : 'none' }}>
              <div className="clearfix mob-hide color-white">

                <div className="pull-right"><img src={"/images/payment-icons.png"} width="150px" /></div>
                <div className="pull-right" style={{ margin: "11px 5px 0", border: "1px solid #fff", padding: "8px 20px", textTransform: "uppercase", fontSize: "12px", letterSpacing: "1px" }}><span className="imageCounter">{this.state.imageCounter}</span> Remaining</div>
                <div className="pull-right"><p style={{
                  margin: "16px 25px 0px 0"



                }}><strong>10,000,000 Pixels&nbsp;&nbsp;&nbsp;₹ 1 Per Pixel&nbsp;&nbsp;&nbsp;The World's Best Photographers</strong></p></div>

              </div>
              <div className="close-ico" onClick={() => this.HideMobileMenuHandler()}></div>
              <ul className="navbar-nav ml-auto main-nav pull-right" id="">
                <li><NavLink className="linkClick" to="/">Homepage</NavLink></li>
                <li><NavLink className="linkClick" to="/about">About</NavLink></li>
                <li><NavLink className="linkClick" to="/how-to-buy-pixels">How to Buy Pixels</NavLink></li>
                <li><NavLink className="linkClick" to="prizes">Prizes</NavLink></li>
                <li><NavLink className="linkClick" to="contact">Contact</NavLink></li>
                {this.state.loggedIn ?
                  <li><a onClick={() => this.logoutHandler()}>{this.state.name} (Logout)</a></li>
                  :
                  <li><a onClick={() => this.loginClickHandler()}>Login/Registration</a></li>
                }

              </ul>

              <div className="clearfix"></div>

              <div style={{ textTransform: "uppercase", fontSize: "13px", letterSpacing: ".5px" }} className="color-white mob-hide"><strong>3 Easy Steps: </strong><i style={{
                color: "#ff321d"
              }}>1.Click the empty mutli pixel box to upload your image(s)</i><i style={{
                color: "#fff224"
              }}>- 2.Login/Registration</i>
                <i style={{ color: "#307eff" }}>-3.Checkout</i>
              </div>


            </div>


          </nav>
        </header>
        {this.state.loginShow ?
          <Login show={this.state.loginShow} loginHandler={this.loginHandler} closeHandler={() => this.closeHandler()} registerOpenHandler={() => this.registerOpenHandler()} />
          :
          null
        }
        {this.state.registerShow ?
          <Register show={this.state.registerShow} registerConfirmShowHandler={() => this.registerConfirmShowHandler()} loginHandler={this.loginHandler} closeHandler={() => this.registerCloseHandler()} loginClickHandler={() => this.loginClickHandler()} />
          :
          null
        }

        {this.state.RegisterConfirmShow ?
          <RegisterConfirm registerConfirmCloseHandler={() => this.registerConfirmCloseHandler()} show={this.state.RegisterConfirmShow} />
          :
          null
        }

      </React.Fragment>
    )
  }
}