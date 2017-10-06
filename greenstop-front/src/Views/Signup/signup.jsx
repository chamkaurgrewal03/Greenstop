import React, { Component } from 'react';
import {connect} from 'react-redux';
import {dosubscriberReq} from '../../redux/actions/subscribers.js';
import {docontactReq} from '../../redux/actions/contacts.js'; 
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import moment from 'moment'

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state={

      mail:{email:"",time:"" },
      contact:{name:"",company:"",phone:"",email:"",subject:"",message:""},
      validation:"",
      valid:false,
      modal: false,
      contactValidation:{ common:"",phone:"" },
      validationerror:true,
      error:"email already exist in the datbase",
      counter:1
    }
    this.btnClickHandle=this.btnClickHandle.bind(this);
    this.changeHandle=this.changeHandle.bind(this);
    this.toggle = this.toggle.bind(this);
    this.contactchangeHandle =this.contactchangeHandle.bind(this);
    this.submitContactform=this.submitContactform.bind(this);
    this.OK=this.OK.bind(this);
   
  }
  OK(){
    window.location.reload();
  }
  submitContactform(){
    var c=this.state.contact;
    if ( c.name && c.company  && c.email && c.message && c.phone && c.subject ){
   if (this.state.validationerror)
        {
          this.props.contact(JSON.stringify(this.state.contact));
        }
        else {
          this.setState({contactValidation:{common :" Please fix the error  "}})         
        }
    }
    else{ 
      
 
      this.setState({contactValidation:{common :" Please fillup the required field(s) "}})

    }

  }
contactchangeHandle(e){
  var name=e.target.name;

  var value=e.target.value;
  var validate;
  if (name === "phone"){
    validate=/^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/.test(value);
    if (validate === false){
     this.setState({contactValidation:{phone :" Invalid phone number "}}); 
    }
    else {
     this.setState({contactValidation:{phone :" "}}); 
    }
  }
  if (name === "email"){
    validate=/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value);
    if (validate === false){
     this.setState({contactValidation:{email :" Invalid email address "}}); 
    }
    else {
     this.setState({contactValidation:{email :" "}}); 
    }
  }
  console.log(validate);
  this.setState({contact:{...this.state.contact,[e.target.name]:e.target.value},validationerror:true})
  
}
toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }
  btnClickHandle(){
    var currTime=moment().toDate();
    console.log();
     this.setState({counter:1,mail:{...this.state.mail,time:currTime}},()=>{
      if (this.state.valid){
    this.props.subscriber(JSON.stringify(this.state.mail));
  }
     });
    

  }
  
  changeHandle(e){
  this.setState({mail:{[e.target.name]:e.target.value},counter:2})
  var a=/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(e.target.value);
  this.setState({"valid":a});
if (a){
  this.setState({"validation":" "});
}
else{
  this.setState({"validation":"Please enter valid email address "});
}
  }
  render() {
    var newerror=" ";
      if (this.props.Users.subscriberReducer){
    if (this.props.Users.subscriberReducer.result.message === "subscriber Added")
    {
        alert("You are subscribed to greenstop.\nThanks will update to ASAP"); 
        window.location.reload();
          
    }
    else if (this.props.Users.subscriberReducer.result.message === "email already existed" && this.state.counter===1)
    {
      newerror=this.state.error;
    }
   
    }
    var modalBody=(<form className="Input-section">
      <p className="error">{this.state.contactValidation.common}</p>
    <div className="form-group">
      <input type="text" className="form-control" placeholder="Name" name="name" value={this.state.contact.name} onChange={this.contactchangeHandle}  required/>
      
    </div>
    <div className="form-group">
      <input type="text" className="form-control" placeholder="Company" name="company" value={this.state.contact.company} onChange={this.contactchangeHandle} required/>
    </div>
     <div className="form-group">
      <input type="number" className="form-control" placeholder="Phone" name="phone" value={this.state.contact.phone} onChange={this.contactchangeHandle} required />
      <p className="error">{this.state.contactValidation.phone}</p>
    </div>
     <div className="form-group">
     <input type="email" className="form-control" placeholder="Email"  name="email" value={this.state.contact.email} onChange={this.contactchangeHandle} required />
     <p className="error">{this.state.contactValidation.email}</p>
    </div>
     <div className="form-group">
      <input type="text" className="form-control" placeholder="Subject" name="subject" value={this.state.contact.subjec}t onChange={this.contactchangeHandle} required />
    </div>

       <div className="form-group">
         <textarea className="form-control" rows="3" placeholder="Message" name="message" value={this.state.contact.message}  onChange={this.contactchangeHandle} required ></textarea> 
        </div>
</form> )
    var footerButton=(<div><Button className="btn btn-secondary myBtn1" onClick={this.submitContactform}>Send</Button>
            <Button className="mybtn mt-0" onClick={this.toggle}>Cancel</Button></div>);
    if (this.props.Users.contactReducer){
    if (this.props.Users.contactReducer.result.message === "user contactus Added")
    {
     modalBody=(<p>  Thanks for showing intrest in us <br /> we will contact you shortly </p>);
footerButton=<Button className="btn btn-secondary myBtn1" onClick={this.OK}>OK</Button>
     
  }}
    

    return (
  
      <div className="signup">
    <div className="container position-container">
      <div className="logo-header text-center">
        <a href="index.html"><img src="images/gslogo_full.png" alt="logo" /> </a>
        <p>Transcending the legal cannabis<br />industry, through automation.</p>
      </div>
      <div className="row sing-up-section">  
        <div className="pl-6 col-md-7"> 
          <h2>Coming soon.</h2>
          <p>Sign up to stay tuned!</p>
          <div className="input-group">
            <input type="text" name="email" className="form-control" value={this.state.mail.email} onChange={this.changeHandle} placeholder="email address" />

            <span className="input-group-btn">
              <button className="btn btn-secondary" onClick={this.btnClickHandle} type="button">subscribe</button>
            </span>
          </div>
            <br />
            <p className="error">{this.state.validation } {newerror}</p>
        </div>
        <div className="pr-6 col-md-5 text-right"> 
          <img src="images/123.png" alt="+" />
          <div className="btnAbsolute">
            <button className="btn btn-secondary mybtn" onClick={this.toggle} type="button">Contact us</button>
          </div>
        </div>
      </div>
      <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
        <ModalHeader toggle={this.toggle}>Contact us</ModalHeader>
        <ModalBody className="text-center">
             {modalBody}
        </ModalBody>
        <ModalFooter>
          {footerButton}
        </ModalFooter>
      </Modal>
    </div>
    </div>
  

    );
  }
}
function mapStateToProps(state) {
  const Users = state;
 
  return {Users};
}


function mapDispatchToProps(dispatch) {
  return {
    subscriber: (data) => {
      dispatch(dosubscriberReq(data));
    },
    contact: (data) => {
      dispatch(docontactReq(data));
    }

  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
