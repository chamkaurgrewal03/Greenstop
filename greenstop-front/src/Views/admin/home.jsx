import React, { Component } from 'react';
import {connect} from 'react-redux';
import Header from'../../components/Header/';
import Sidebar from '../../components/Sidebar';
import {Redirect} from 'react-router-dom'


class Login extends Component {
  constructor(props) {
    super(props);
this.state={username:"",password:""}
this.changeHandle=this.changeHandle.bind(this);

this.clickSubmit=this.clickSubmit.bind(this);
  }
changeHandle(e){
	var name=e.target.name;
this.setState({[name]:e.target.value})

}
clickSubmit(){
this.props.login(JSON.stringify(this.state));

debugger;
}

  render() {
 console.log(this.props);
if (sessionStorage.getItem("token")){
  	return (
  		 <div className="app">
        <Header />
        <div className="app-body">
          <Sidebar {...this.props}/>
          <main className="main container-fluid">
           Welcome 
          </main>
		  
      </div>
      </div>
  	);
    }
    else
    {
      return(<div><Redirect to="/" push="true"  />  </div>)
    }
  }
}
function mapStateToProps(state) {
  const Users = state;
 
  return {Users};
}


function mapDispatchToProps(dispatch) {
  return {

  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);

