import React, { Component } from 'react'
import $ from "jquery";
import "@fancyapps/fancybox/dist/jquery.fancybox.min.css";
import {getCookie} from './../utils/codeSnippet';
window.jQuery = $;
require("@fancyapps/fancybox/dist/jquery.fancybox.js");



export default class Tiles extends Component {
    state = {
        likedImages: []
    }

    componentDidMount = () => {
        $('[data-fancybox]').fancybox({
            caption: function (instance, item) {
                return $(this).find('figcaption').html();
            },
            buttons: ["slideShow", "share", "zoom", "fullScreen", "close"],
            thumbs: {
                autoStart: true
            },
            share:  {
                url: function (instance, item) {
                    
                
                    return window.location.href ;
            }
        }
        });
        var array = document.location.hash.split("-");
        var selector = array[0].replace("#", "");
        var number = 0;
        if (array.length > 1) {
            var number = parseInt(array[array.length - 1]);
        }
        console.log(selector, number);
        $("[data-fancybox='" + selector + "']").eq(parseInt(number - 1)).trigger("click");
        var id = $("[data-fancybox='" + selector + "']").eq(parseInt(number - 1)).attr("id");
        getCookie("liked", (liked) => {
            if(liked.split(" ").indexOf(id) !== -1){
              $(".fancybox-caption__body").find(".like#"+ id).addClass('active')
              $(".fancybox-caption__body").find(".like#"+ id).addClass('disabled')
            }
          })
        // $.fancybox.open(
        //     $("[data-fancybox='" + selector + "']").eq(parseInt(number - 1)),
        //     {
        //         caption: function (instance, item) {
        //             return $(this).find('figcaption').html();
        //         },
        //         buttons: ["slideShow", "share", "zoom", "fullScreen", "close"],
        //         thumbs: {
        //             autoStart: true
        //         },
        //         share:  {
        //             url: function (instance, item) {
        //             return window.location.href;
        //         }
        //     }
        //     }
        // );

        getCookie('liked', (e) => {
            console.log(e)
            this.setState({
                likedImages: e.split(" ")
            })
            console.log(e.split(" "))
        })


        // $(".fancybox-caption__body").click(function(){
        //     console.log("vjksg")
        // })

    }

    likeClickHandler(){
        console.log("sfs")
    }



    tileClickHandler = (id) => {
        var idn = id.target.id;
        const url = '/server/images/getActiveImage.php?id='+ idn;
        $.get(url,
          (data) => {
            if(data.status){
                console.log(data)
                // this.setState({
                //     images:data.data,
                //     tilesLoadingError:""
                // })
            }
            else{
            //   this.setState({
            //     images:[],
            //     tilesLoadingError:"Unable to load Tiles"
            //   })
            }
            
          });
        if(window.localStorage.getItem("loggedIn") === 'true' || window.localStorage.getItem("loggedIn") === true){

        }
        else{
            this.setState({
                errorLogin:"error"
            })
        }
    }

    
    render() {
        var images = [];
        if(this.props.imagesData.length > 0){
            console.log(this.props.imagesData)
            for(var i=1; i<=5000; i++){
                
                if(this.props.imagesData[i - 1].email != null){
                    var capHtml = "<div class='like'>Like <i class='fas fa-heart' aria-hidden='true'></i></div><h6>"+this.props.imagesData[i - 1].title+"</h6><p>Image by "+this.props.imagesData[i - 1].name+"</p>";

                    if(this.props.imagesData[i - 1].url.search('blob') !== -1){
                        images.push(<div key={i - 1}  className="img-thumb" id={i}  style={{background:`url(${ this.props.imagesData[i - 1].url}) center center no-repeat`,backgroundSize:`cover`}}><div onClick={(e) => this.props.removeTileHandler(e)} id={this.props.imagesData[i - 1].id} className="btn-remove">X</div></div>)
                    }
                    else{
                        if(this.props.imagesData[i - 1].approved === 'true' || this.props.imagesData[i - 1].approved === true){
                            images.push(
                                <a key={i - 1} className="img-thumb" id={this.props.imagesData[i - 1].id} rel={this.props.imagesData[i - 1].email} href={ this.props.imagesData[i - 1].url.search('blob') == -1 ? "/server/images/"+this.props.imagesData[i - 1].url : this.props.imagesData[i - 1].url} title="title" data-fancybox={this.props.imagesData[i - 1].email} style={{background:`url(${ this.props.imagesData[i - 1].url.search('blob') == -1 ? "/server/images/"+this.props.imagesData[i - 1].url : this.props.imagesData[i - 1].url}) center center no-repeat`,backgroundSize:`cover`}}>
                                
                                <figcaption>
                                    <div id={this.props.imagesData[i - 1].id} className={this.state.likedImages.indexOf(this.props.imagesData[i - 1].id) !== -1 ? 'like active disabled' : 'like'}>Vote</div><h6>{this.props.imagesData[i - 1].title}</h6><p>Image by {this.props.imagesData[i - 1].name}</p>
                                </figcaption>
                                </a>
                            )
                        }
                        else{
                           images.push(<div key={i - 1} className="img-thumb" id={i} style={{background:`url(${ this.props.imagesData[i - 1].url.search('blob') == -1 ? "/server/images/"+this.props.imagesData[i - 1].url : this.props.imagesData[i - 1].url}) center center no-repeat`,backgroundSize:`cover`}}></div>)
                        }
                        
                    }
                    
                }
                else{
                    var bp = -i*53+"px 0"
                    images.push(<div key={i - 1}  onClick={(i) => this.props.tileClickHandler(i)} className="img-thumb loginpop" id={i} style={{backgroundPosition:bp}}></div>)
                }
            }
        }
        
        return (
            <div>
                {images}
            </div>
            
        )
    }
}