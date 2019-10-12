import React, { Component } from 'react'
import {Link} from "react-router-dom";
import $ from 'jquery'

export default class Activate extends Component {
    state = {
        activate: false,
        msg: 'Activating your account, please wait.'
    }


    componentDidMount(){
        const url = '/server/user/activate.php';
        const data = {
            token: this.props.match.params.token
        }
        console.log(data)
        $.post(url,
            data,
        (data,status) => {
            console.log(data,status )
            if(status){
                this.setState({
                    activate:true,
                    msg:'Your account is now activated, please click below link to login.'
                })
            }
        });

    }

    render(){
        console.log(this.props.match.params.token)
        return(
            <div className="container">
                <div className="Activate">
                    <h4>{this.state.msg}</h4>
                    { this.state.activate ?
                        <h3><a href="/">Login Here</a></h3>
                        :
                        null
                    }
                    
                </div>
            </div>
            
        )
    }
}

        