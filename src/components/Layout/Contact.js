import React from 'react';
import $ from 'jquery';
import ErrorAlert from './../utils/ErrorAlert';
class Contact extends React.Component{

  state = {
    name:'',
    email:'',
    contact:'',
    subject:'',
    message:'',
    nameError:false,
    emailError:false,
    contactError:false,
    subjectError:false,
    messageError: false,
    emailInvalidError:false,
    contactSubmit:false,
    errorPop: ''
  }


  inputHandler = (e) => {
    console.log(e.target.getAttribute("name"))
    var key = e.target.getAttribute("name");
    this.setState({
      [key]: e.target.value,
      [key+"Error"]:false,
      emailInvalidError:false
    })
  }


  contactSubmit = () => {
    var isEverythingCorrect = 6;
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


    if(!this.state.contact){
      this.setState({
        contactError:true
      })
    }else{
      isEverythingCorrect--;
    }
    if(!this.state.subject){
      this.setState({
        subjectError:true
      })
    }else{
      isEverythingCorrect--;
    }

    if(!this.state.message){
      this.setState({
        messageError:true
      })
    }else{
      isEverythingCorrect--;
    }

    
    console.log(isEverythingCorrect)
    if(isEverythingCorrect === 0){
      this.setState({
        contactSubmit:true
      })
      const url = '/server/user/contact.php';
      const data = {
        name:this.state.name,
        email:this.state.email,
        contact:this.state.contact,
        subject:this.state.subject,
        message:this.state.message,
      };
      console.log(data);
      $.post(url,
        data,
        (data,status) => {
          console.log(data)
          this.setState({
            contactSubmit:false
          })
          this.setState({
            errorPop:"Thank you for contacting us."
          })
          setTimeout(() => {
              this.setState({
                errorPop:"",
              })
          }, 5000)
          $("#contactForm")[0].reset()
        });
    }
  }

  

  render(){
    return(
      <React.Fragment>
      <div className="container-fluid inner-pages" style={{minHeight: "70vh"}}>
        <h1 className="h3 mb-4 text-gray-800">Contact us</h1>
        
  
        <div className="row">
  <div className="col-md-9">
  <form action="" id="contactForm" className="style1">
  <div className="row">
      <div className="col-md-4">
          <div className="form-group">
              <label htmlFor="name">Name:</label>
              <input type="text" className="form-control" onChange={this.inputHandler} name="name" id="name"/>
              {this.state.nameError ? 
                <span className="error">This field is mandatory</span>
                :
                null
              }
          </div>
      </div>
      <div className="col-md-4">
          <div className="form-group">
              <label htmlFor="email">Email address:</label>
              <input type="text" className="form-control" onChange={this.inputHandler} name="email" id="email"/>
              {this.state.emailError ? 
                <span className="error">This field is mandatory</span>
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
      <div className="col-md-4">
          <div className="form-group">
              <label htmlFor="contact">Contact Number:</label>
              <input type="text" className="form-control" onChange={this.inputHandler} name="contact" id="mobile"/>
              {this.state.contactError ? 
                <span className="error">This field is mandatory</span>
                :
                null
              }
          </div>
      </div>
  </div>
  <div className="row">
      <div className="col-md-12">
          <div className="form-group">
              <label htmlFor="subject">Subject:</label>
              <input type="text" className="form-control" onChange={this.inputHandler} name="subject" id="subject"/>
              {this.state.subjectError ? 
                <span className="error">This field is mandatory</span>
                :
                null
              }
          </div>
      </div>
  </div>
  <div className="row">
      <div className="col-md-12">
          <div className="form-group">
              <label htmlFor="message">Message:</label>
              <textarea className="form-control" rows="3" onChange={this.inputHandler} name="message"></textarea>
              {this.state.messageError ? 
                <span className="error">This field is mandatory</span>
                :
                null
              }
          </div>
      </div>
  </div>
  <div className="row">
      <div className="col-md-12">
          <a type="text" className={this.state.contactSubmit ? 'btn btn-default disabled' : 'btn btn-default'} onClick={() => this.contactSubmit()}>Submit</a>
      </div>
  </div>
  </form>
  <p><strong>For any assistance or query please drop a mail on "<a href="mailto:support@worldartography.com">support@worldartography.com</a>"</strong></p>
  </div>
  </div>
        
      </div>
      <ErrorAlert msg = {this.state.errorPop}/>
      </React.Fragment>
  )
  }
  
}

export default Contact;