import React, { Component } from 'react';
import {connect} from 'react-redux';
import {dologinReq} from '../../redux/actions/login.js';
import {Redirect } from 'react-router-dom';
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
clickSubmit(e){
this.props.login(JSON.stringify(this.state));

}

  render() {

	if (this.props.Users.loginReducer.result.success === true){
		console.log(this.props.Users.loginReducer.result);
		sessionStorage.setItem("token",this.props.Users.loginReducer.result.token)
		return (<div><Redirect to="/home" push="true"  /></div>);

	}
	else{
		return (<div className="login-page">
		  <div className="form">
		    <form className="login-form">
		      <input type="text" placeholder="username" name="username" value={this.state.username} onChange={this.changeHandle}/>
		      <input type="password" placeholder="password" name="password" value={this.state.password} onChange={this.changeHandle}/>
		      <button type="button" onClick={this.clickSubmit}>login</button>
		    </form>
		  </div>
		</div>);

}
}
}
function mapStateToProps(state) {
  const Users = state;
 
  return {Users};
}


function mapDispatchToProps(dispatch) {
  return {
    login: (data) => {
      dispatch(dologinReq(data));
    }

  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);

