import React, { Component } from 'react'
import Tiles from './Tiles'

export default class Homepage extends Component {
    state = {
        images:[
            {
                titleNo:0,
                url:"images/contest/1.jpg"
            },
            {
                titleNo:1,
                url:"images/contest/2.jpg"
            },
            {
                titleNo:2,
                url:"images/contest/3.jpg"
            },
            {
                titleNo:3,
                url:"images/contest/4.jpg"
            },
            {
                titleNo:4,
                url:"images/contest/5.jpg",
            },
            {
                titleNo:5,
                url:"images/contest/6.jpg"
            },
            {
                titleNo:6,
                url:"images/contest/7.jpg"
            }
        ],
    }
    render() {
        
        return (
            <div id="content">
                <br/><br/><br/>
                <h1 className="h3 mb-4 text-gray-800"></h1>
                <div id="grid-wrapper" className="clearfix">
                    <Tiles imagesData = {this.state.images} handleLoginOpen = {this.props.handleLoginOpen}/>
                </div>
                </div>
        )
    }
}

        
