import React from 'react';
import {Modal } from 'react-bootstrap'
import $ from 'jquery';


export default class Register extends React.Component {
    constructor(props, context) {
      super(props, context);
  
      this.handleShow = this.handleShow.bind(this);
      this.handleClose = this.handleClose.bind(this);
  
      this.state = {
        show: false,
        name:'',
        email:'',
        password1:'',
        password:'',
        phone:'',
        country:'',
        facebook:'',
        instagram:'',
        website:'',
        nameError: false,
        emailError:false,
        phoneError:false,
        countryError:false,
        facebookError:false,
        instagramError:false,
        websiteError:false,
        passwordError:false,
        emailRegistredError:false,
        registerDisable:false,
        passwordPatError:false,
        emailInvalidError:false
      };
    }

    componentDidMount(){
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

    signup() {
      var isEverythingCorrect = 7;
      if(!this.state.name){
        
        this.setState({
          nameError:true
        })
      }else{
        isEverythingCorrect--;
      }

      

      if(!this.state.email){
        this.setState({
          emailError:true,
          emailInvalidError:false
        })
      }else{

        if(!(/^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/.test(this.state.email))){
          this.setState({
            emailInvalidError:true
          })
        }else{
          isEverythingCorrect--;
        }


        isEverythingCorrect--;
      }

      

      if(!this.state.phone){
        this.setState({
          phoneError:true
        })
      }else{
        isEverythingCorrect--;
      }
      if(!this.state.country){
        this.setState({
          countryError:true
        })
      }else{
        isEverythingCorrect--;
      }
      // if(!this.state.facebook){
      //   this.setState({
      //     facebookError:true
      //   })
      // }else{
      //   isEverythingCorrect--;
      // }
      // if(!this.state.instagram){
      //   this.setState({
      //     instagramError:true
      //   })
      // }else{
      //   isEverythingCorrect--;
      // }
      // if(!this.state.website){
      //   this.setState({
      //     websiteError:true
      //   })
      // }else{
      //   isEverythingCorrect--;
      // }
      console.log(!this.state.password1, !(this.state.password === this.state.password1))
      if(!(this.state.password === this.state.password1)){
        this.setState({
          passwordError:true
        })
      }
      else{
        isEverythingCorrect--;
        if(!(this.state.password.match(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,15}$/))){
          this.setState({
            passwordPatError:true,
            passwordError:false
          })
        }else{
          isEverythingCorrect--;
        }
      }

      

      if(isEverythingCorrect === 0){
        this.setState({
          registerDisable:true
        })
        const url = '/server/user/signup.php';
        const data = {
          name:this.state.name,
          email:this.state.email,
          password:this.state.password,
          phone:this.state.phone,
          country:this.state.country,
          facebook:this.state.facebook,
          instagram:this.state.instagram,
          website:this.state.website
        };
        console.log(data)
        $.post(url,
          data,
          (data,status) => {
            this.setState({
              registerDisable:false
            })
            console.log(data)
            if(data.message === 'email already exists!'){
              this.setState({
                emailRegistredError:true
              })
            }
            else{
              // window.localStorage.setItem("token",data.token);
              // window.localStorage.setItem("name",data.name);
              // window.localStorage.setItem("email",data.email);
              // window.localStorage.setItem("loggedIn",true);
              // this.props.loginHandler(data.token, data.name, data.email)
              this.handleClose();
              this.props.registerConfirmShowHandler()
            }
            
          });
      }
      
    }


    inputHandler = (e) => {
      console.log(e.target.getAttribute("name"))
      var key = e.target.getAttribute("name");
      this.setState({
        [key]: e.target.value,
        [key+"Error"]:false,
        emailRegistredError:false,
        passwordPatError:false,
        [key+"InvalidError"]:false,
      })
    }
    inputBlurHander = (e) => {
      console.log(e.target.getAttribute("name") + "Blured")
      this.setState({
        [e.target.getAttribute("name") + "Blured"]: true
      })
    }
  
    render() {
  
      return (
        <div>
          
  
          <Modal show={this.state.show} onHide={this.handleClose} className="home-modal">
          
          <div className="close-modal" data-dismiss="modal" onClick={() => this.handleClose()}></div>
          
            <div className="col-md-3 col register-creative">
              <div className="cont text-center">
                <h3>Register Now</h3>
                <a href="#" data-dismiss="modal" onClick={() => this.props.loginClickHandler()} data-toggle="modal" data-target="#login" style={{color:"#5bfffa",textDecoration:"underline"}}>Already have account? Login</a>
              </div>
            </div>
              <div className="col-md-9 col register-form">
                <h3>Register</h3>
            <form>
              <div className="row clearfix">
              <div className="col-md-4 col-sm-6 col-xs-12">
                <div className="form-group">
                  
                  <input type="text" id="name" name="name" className="form-control" required onChange= {this.inputHandler}/>
                  <label className="form-control-placeholder" htmlFor="name">Name</label>
                  {this.state.nameError ? 
                    <span className="error">Please enter your name</span>
                    :
                    null
                  }
                  
                </div>
              </div>
              <div className="col-md-4 col-sm-6 col-xs-12">
                <div className="form-group">
                  
                  <input type="text" id="email" name="email" className="form-control" required onChange= {this.inputHandler}/>
                  <label className="form-control-placeholder" htmlFor="email">Email</label>
                  {this.state.emailError ? 
                  <span className="error">Please enter your Email ID</span>
                  :
                  null
                  }
                  {this.state.emailRegistredError ? 
                  <span className="error">This Email ID is already registered</span>
                  :
                  null
                  }
                  {this.state.emailInvalidError ? 
                  <span className="error">This Email ID is Not valid</span>
                  :
                  null
                  }
                </div>
              </div>
              <div className="col-md-4 col-sm-6 col-xs-12">
                <div className="form-group">
                  
                  <input type="text" id="phone" name="phone" className="form-control" required onChange= {this.inputHandler}/>
                  <label className="form-control-placeholder" htmlFor="phone">Phone</label>
                  {this.state.phoneError ? 
                  <span className="error">Please enter your Phone</span>
                  :
                  null}
                </div>
              </div>
              <div className="col-md-4 col-sm-6 col-xs-12">
                <div className="form-group">
                
                  <select required="" name="country" className="form-control" onChange= {this.inputHandler}>
                    
                      <option value="">- Select Country -</option>
                      <option value="AF">Afghanistan</option>
                      <option value="AL">Albania</option>
                      <option value="DZ">Algeria</option>
                      <option value="AS">American Samoa</option>
                      <option value="AD">Andorra</option>
                      <option value="AO">Angola</option>
                      <option value="AI">Anguilla</option>
                      <option value="AQ">Antarctica</option>
                      <option value="AG">Antigua And Barbuda</option>
                      <option value="AR">Argentina</option>
                      <option value="AM">Armenia</option>
                      <option value="AW">Aruba</option>
                      <option value="AU">Australia</option>
                      <option value="AT">Austria</option>
                      <option value="AZ">Azerbaijan</option>
                      <option value="BS">Bahamas</option>
                      <option value="BH">Bahrain</option>
                      <option value="BD">Bangladesh</option>
                      <option value="BB">Barbados</option>
                      <option value="BY">Belarus</option>
                      <option value="BE">Belgium</option>
                      <option value="BZ">Belize</option>
                      <option value="BJ">Benin</option>
                      <option value="BM">Bermuda</option>
                      <option value="BT">Bhutan</option>
                      <option value="BO">Bolivia</option>
                      <option value="BA">Bosnia And Herzegowina</option>
                      <option value="BW">Botswana</option>
                      <option value="BV">Bouvet Island</option>
                      <option value="BR">Brazil</option>
                      <option value="IO">British Indian Ocean Territory</option>
                      <option value="BN">Brunei Darussalam</option>
                      <option value="BG">Bulgaria</option>
                      <option value="BF">Burkina Faso</option>
                      <option value="BI">Burundi</option>
                      <option value="KH">Cambodia</option>
                      <option value="CM">Cameroon</option>
                      <option value="CA">Canada</option>
                      <option value="CV">Cape Verde</option>
                      <option value="KY">Cayman Islands</option>
                      <option value="CF">Central African Republic</option>
                      <option value="TD">Chad</option>
                      <option value="CL">Chile</option>
                      <option value="CN">China</option>
                      <option value="CX">Christmas Island</option>
                      <option value="CC">Cocos (Keeling) Islands</option>
                      <option value="CO">Colombia</option>
                      <option value="KM">Comoros</option>
                      <option value="CG">Congo</option>
                      <option value="CD">Congo, The Democratic Republic Of The</option>
                      <option value="CK">Cook Islands</option>
                      <option value="CR">Costa Rica</option>
                      <option value="CI">Cote D'Ivoire</option>
                      <option value="HR">Croatia (Local Name: Hrvatska)</option>
                      <option value="CU">Cuba</option>
                      <option value="CY">Cyprus</option>
                      <option value="CZ">Czech Republic</option>
                      <option value="DK">Denmark</option>
                      <option value="DJ">Djibouti</option>
                      <option value="DM">Dominica</option>
                      <option value="DO">Dominican Republic</option>
                      <option value="EC">Ecuador</option>
                      <option value="EG">Egypt</option>
                      <option value="SV">El Salvador</option>
                      <option value="GQ">Equatorial Guinea</option>
                      <option value="ER">Eritrea</option>
                      <option value="EE">Estonia</option>
                      <option value="ET">Ethiopia</option>
                      <option value="FK">Falkland Islands (Malvinas)</option>
                      <option value="FO">Faroe Islands</option>
                      <option value="FJ">Fiji</option>
                      <option value="FI">Finland</option>
                      <option value="FR">France</option>
                      <option value="FX">France, Metropolitan</option>
                      <option value="GF">French Guiana</option>
                      <option value="PF">French Polynesia</option>
                      <option value="TF">French Southern Territories</option>
                      <option value="GA">Gabon</option>
                      <option value="GM">Gambia</option>
                      <option value="GE">Georgia</option>
                      <option value="DE">Germany</option>
                      <option value="GH">Ghana</option>
                      <option value="GI">Gibraltar</option>
                      <option value="GR">Greece</option>
                      <option value="GL">Greenland</option>
                      <option value="GD">Grenada</option>
                      <option value="GP">Guadeloupe</option>
                      <option value="GU">Guam</option>
                      <option value="GT">Guatemala</option>
                      <option value="GN">Guinea</option>
                      <option value="GW">Guinea-Bissau</option>
                      <option value="GY">Guyana</option>
                      <option value="HT">Haiti</option>
                      <option value="HM">Heard And Mc Donald Islands</option>
                      <option value="VA">Holy See (Vatican City State)</option>
                      <option value="HN">Honduras</option>
                      <option value="HK">Hong Kong</option>
                      <option value="HU">Hungary</option>
                      <option value="IS">Iceland</option>
                      <option value="IN">India</option>
                      <option value="ID">Indonesia</option>
                      <option value="IR">Iran (Islamic Republic Of)</option>
                      <option value="IQ">Iraq</option>
                      <option value="IE">Ireland</option>
                      <option value="IL">Israel</option>
                      <option value="IT">Italy</option>
                      <option value="JM">Jamaica</option>
                      <option value="JP">Japan</option>
                      <option value="JO">Jordan</option>
                      <option value="KZ">Kazakhstan</option>
                      <option value="KE">Kenya</option>
                      <option value="KI">Kiribati</option>
                      <option value="KP">Korea, Democratic People's Republic Of</option>
                      <option value="KR">Korea, Republic Of</option>
                      <option value="KW">Kuwait</option>
                      <option value="KG">Kyrgyzstan</option>
                      <option value="LA">Lao People's Democratic Republic</option>
                      <option value="LV">Latvia</option>
                      <option value="LB">Lebanon</option>
                      <option value="LS">Lesotho</option>
                      <option value="LR">Liberia</option>
                      <option value="LY">Libyan Arab Jamahiriya</option>
                      <option value="LI">Liechtenstein</option>
                      <option value="LT">Lithuania</option>
                      <option value="LU">Luxembourg</option>
                      <option value="MO">Macau</option>
                      <option value="MK">Macedonia, Former Yugoslav Republic Of</option>
                      <option value="MG">Madagascar</option>
                      <option value="MW">Malawi</option>
                      <option value="MY">Malaysia</option>
                      <option value="MV">Maldives</option>
                      <option value="ML">Mali</option>
                      <option value="MT">Malta</option>
                      <option value="MH">Marshall Islands</option>
                      <option value="MQ">Martinique</option>
                      <option value="MR">Mauritania</option>
                      <option value="MU">Mauritius</option>
                      <option value="YT">Mayotte</option>
                      <option value="MX">Mexico</option>
                      <option value="FM">Micronesia, Federated States Of</option>
                      <option value="MD">Moldova, Republic Of</option>
                      <option value="MC">Monaco</option>
                      <option value="MN">Mongolia</option>
                      <option value="ME">Montenegro</option>
                      <option value="MS">Montserrat</option>
                      <option value="MA">Morocco</option>
                      <option value="MZ">Mozambique</option>
                      <option value="MM">Myanmar</option>
                      <option value="NA">Namibia</option>
                      <option value="NR">Nauru</option>
                      <option value="NP">Nepal</option>
                      <option value="NL">Netherlands</option>
                      <option value="AN">Netherlands Antilles</option>
                      <option value="NC">New Caledonia</option>
                      <option value="NZ">New Zealand</option>
                      <option value="NI">Nicaragua</option>
                      <option value="NE">Niger</option>
                      <option value="NG">Nigeria</option>
                      <option value="NU">Niue</option>
                      <option value="NF">Norfolk Island</option>
                      <option value="MP">Northern Mariana Islands</option>
                      <option value="NO">Norway</option>
                      <option value="OM">Oman</option>
                      <option value="PK">Pakistan</option>
                      <option value="PW">Palau</option>
                      <option value="PA">Panama</option>
                      <option value="PG">Papua New Guinea</option>
                      <option value="PY">Paraguay</option>
                      <option value="PE">Peru</option>
                      <option value="PH">Philippines</option>
                      <option value="PN">Pitcairn</option>
                      <option value="PL">Poland</option>
                      <option value="PT">Portugal</option>
                      <option value="PR">Puerto Rico</option>
                      <option value="QA">Qatar</option>
                      <option value="RE">Reunion</option>
                      <option value="RO">Romania</option>
                      <option value="RU">Russian Federation</option>
                      <option value="RW">Rwanda</option>
                      <option value="KN">Saint Kitts And Nevis</option>
                      <option value="LC">Saint Lucia</option>
                      <option value="VC">Saint Vincent And The Grenadines</option>
                      <option value="WS">Samoa</option>
                      <option value="SM">San Marino</option>
                      <option value="ST">Sao Tome And Principe</option>
                      <option value="SA">Saudi Arabia</option>
                      <option value="SN">Senegal</option>
                      <option value="RS">Serbia</option>
                      <option value="SC">Seychelles</option>
                      <option value="SL">Sierra Leone</option>
                      <option value="SG">Singapore</option>
                      <option value="SK">Slovakia (Slovak Republic)</option>
                      <option value="SI">Slovenia</option>
                      <option value="SB">Solomon Islands</option>
                      <option value="SO">Somalia</option>
                      <option value="ZA">South Africa</option>
                      <option value="GS">South Georgia, South Sandwich Islands</option>
                      <option value="ES">Spain</option>
                      <option value="LK">Sri Lanka</option>
                      <option value="SH">St. Helena</option>
                      <option value="PM">St. Pierre And Miquelon</option>
                      <option value="SD">Sudan</option>
                      <option value="SR">Suriname</option>
                      <option value="SJ">Svalbard And Jan Mayen Islands</option>
                      <option value="SZ">Swaziland</option>
                      <option value="SE">Sweden</option>
                      <option value="CH">Switzerland</option>
                      <option value="SY">Syrian Arab Republic</option>
                      <option value="TW">Taiwan</option>
                      <option value="TJ">Tajikistan</option>
                      <option value="TZ">Tanzania, United Republic Of</option>
                      <option value="TH">Thailand</option>
                      <option value="TL">Timor-Leste (East Timor)</option>
                      <option value="TG">Togo</option>
                      <option value="TK">Tokelau</option>
                      <option value="TO">Tonga</option>
                      <option value="TT">Trinidad And Tobago</option>
                      <option value="TN">Tunisia</option>
                      <option value="TR">Turkey</option>
                      <option value="TM">Turkmenistan</option>
                      <option value="TC">Turks And Caicos Islands</option>
                      <option value="TV">Tuvalu</option>
                      <option value="UG">Uganda</option>
                      <option value="UA">Ukraine</option>
                      <option value="AE">United Arab Emirates</option>
                      <option value="GB">United Kingdom</option>
                      <option value="US" defaultValue>United States</option>
                      <option value="UM">United States Minor Outlying Islands</option>
                      <option value="UY">Uruguay</option>
                      <option value="UZ">Uzbekistan</option>
                      <option value="VU">Vanuatu</option>
                      <option value="VE">Venezuela</option>
                      <option value="VN">Viet Nam</option>
                      <option value="VG">Virgin Islands (British)</option>
                      <option value="VI">Virgin Islands (U.S.)</option>
                      <option value="WF">Wallis And Futuna Islands</option>
                      <option value="EH">Western Sahara</option>
                      <option value="YE">Yemen</option>
                      <option value="YU">Yugoslavia</option>
                      <option value="ZM">Zambia</option>
                      <option value="ZW">Zimbabwe</option>
                   </select>
                   {this.state.countryError ? 
                   <span className="error">Please select your Country</span>
                   :
                   null}
                </div>
              </div>
                  <div className="col-md-4 col-sm-6 col-xs-12">
                      <div className="form-group">
                        
                        <input type="text" name="instagram" id="instagram" className="form-control" required onChange= {this.inputHandler}/>
                        <label className="form-control-placeholder" htmlFor="instagram">Instagam Profile</label>
                        {this.state.instagramError ? 
                        <span className="error">Please enter your Instagam Profile</span>
                        :
                        null}
                      </div>
                    </div>
                    <div className="col-md-4 col-sm-6 col-xs-12">
                      <div className="form-group">
                        <input type="text" id="facebook" name="facebook" className="form-control" required onChange= {this.inputHandler}/>
                        <label className="form-control-placeholder" htmlFor="facebook">Facebook Profile</label>
                        {this.state.facebookError ? 
                        <span className="error">Please enter your Facebook Profile</span>
                        :
                        null
                        }
                      </div>
                    </div>
                    <div className="col-md-4 col-sm-6 col-xs-12">
                      <div className="form-group">
                        
                        <input type="text" id="website" name="website" className="form-control" required onChange= {this.inputHandler}/>
                        <label className="form-control-placeholder" htmlFor="website">Website URL</label>
                        {this.state.websiteError ?
                        <span className="error">Please enter your Website URL</span>
                        :
                        null}
                      </div>
                    </div>

                    <div className="col-md-4 col-sm-6 col-xs-12">
                      <div className="form-group">
                    
                        <input type="password" id="create-password" name="password1" className="form-control" required onChange= {this.inputHandler}/>
                        <label className="form-control-placeholder" htmlFor="create-password">Password</label>
                      </div>
                    </div>

                    <div className="col-md-4 col-sm-6 col-xs-12">
                      <div className="form-group">
                    
                        <input type="password" id="confirm-password" name="password" className="form-control" required onChange= {this.inputHandler}/>
                        <label className="form-control-placeholder" htmlFor="confirm-password">Confirm Password</label>
                        {this.state.passwordError ?
                        <span className="error">This should match to Password</span>
                        :
                        null
                        }
                        {this.state.passwordPatError ? 
                        <span className="error">Password should be atleast 7 letters long and contain at least one numeric digit and a special character </span>
                        :
                        null
                        }
                      </div>
                    </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-default" data-dismiss="modal" onClick={ () => this.handleClose()}>Close</button>
                <button type="button" className= {this.state.registerDisable ? 'btn btn-primary disabled' : 'btn btn-primary' }  onClick={() => this.signup()}>Register</button>
              </div>
              
            </form>
            </div>
          </Modal>
        </div>
      );
    }
  }