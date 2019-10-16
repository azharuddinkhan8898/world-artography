import React, { Component } from 'react';

class ForgotPassword extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            password1:'',
            password2:'',
            password1Error:false,
            password2Error:false,
            passwordEqualError:false,
            passwordPatError:false,
         }
    }

    forgotPass = (e) => {
        var isEverythingCorrect = 4;
        if(!this.state.password1){
            this.setState({
                password1Error:true
            })
        }else{
            isEverythingCorrect--;
        }

        if(!this.state.password2){
            this.setState({
                password2Error:true
            })
        }else{
            isEverythingCorrect--;
        }
        if(this.state.password1 && this.state.password2){
            if(this.state.password1 != this.state.password2){
                this.setState({
                    passwordEqualError:true
                })
            }
            else{
                isEverythingCorrect--;
                if(!(this.state.password2.match(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,15}$/))){
                this.setState({
                    passwordPatError:true
                })
                }else{
                isEverythingCorrect--;
                }
            }
        }
        if(isEverythingCorrect == 0){
            console.log("submit")
        }
    }

    inputHandler = (e) => {

        console.log(e.target.getAttribute("name"))
        var key = e.target.getAttribute("name");
        this.setState({
            passwordPatError:false,
          [key]: e.target.value,
          [key+"Error"]:false,
          passwordEqualError:false
        })
      }


    render() { 
        return ( 
            <div className="container-fluid inner-pages">
            <div style={{maxWidth:"420px",width:"100%",margin:"0 auto",padding:"50px 25px"}}>
            <h1>Reset Password</h1>
            <form className="style1">
                <div className="row">
                    <div className="col-md-12">
                        <div className="form-group">
                            <label htmlFor="new-password">New Password:</label>
                            <input type="password" onChange={this.inputHandler} name="password1" className="form-control" id="new-password"/>
                            {this.state.password1Error ? 
                                <span className="error">This field is required</span>
                                :
                                null
                            }
                        </div>
                    </div>
                    <div className="col-md-12">
                        <div className="form-group">
                            <label htmlFor="c-new-password">Confirm Password:</label>
                            <input type="password" name="password2" onChange={this.inputHandler} className="form-control" id="c-new-password"/>
                            {this.state.password2Error ? 
                                <span className="error">This field is required</span>
                                :
                                null
                            }
                            {this.state.passwordEqualError ? 
                                <span className="error">Both password should be same</span>
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
                    <div className="col-md-12">
                        <div className="form-group">
                            <a type="text" onClick={() => this.forgotPass()} className="btn btn-default btn-block">Submit</a>
                        </div>
                    </div>
                </div>
            </form>
        </div>
            </div>
         );
    }
}
 
export default ForgotPassword;