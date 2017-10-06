import React, { Component } from 'react';
import {connect} from 'react-redux';
import Header from'../../components/Header/';
import Sidebar from '../../components/Sidebar';
import {domessageslistReq} from "../../redux/actions/messagesList.js";
import moment from 'moment'


class MessagesList extends Component {
  constructor(props) {
    super(props);
  }
componentWillMount() {
  var token;
  if (this.props.Users.loginReducer.result.token){
token=this.props.Users.loginReducer.result.token
  }else{
    token=sessionStorage.getItem("token");
  }
  this.props.getmessages(token);
}

  render() {
    var subscribedUser;
    if (this.props.Users.messageslistReducer.result.length > 0 ){

    if (this.props.Users.messageslistReducer){
      console.log(this.props.Users.messageslistReducer.result);
      subscribedUser=this.props.Users.messageslistReducer.result.map(function(user,index){
      
        return (<tr key={index}><td>{user.company}</td><td>{user.phone}</td><td>{user.email}</td><td>{user.subject}</td><td>{user.message}</td></tr>);
      })
    }
    }
else 
{
  subscribedUser=(<tr><td colSpan="5">There is no data to display</td></tr>)
  
}
  	return (
             <div className="app">

        <Header />
        <div className="app-body">
          <Sidebar {...this.props}/>
          <main className="main container-fluid">
          <div>
          <div className="row">
          <div className="col-12 col-lg-12">
          <div className="card">
<div className="card-header"> 
Contact us Messages List
</div>         
       <div className="card-body card-block">
  <div className="table table-striped table-sm table-bordered table-hover">
    <table className="table">
      <thead>
        <tr>
          <th>Company</th>
          <th>Phone no</th>
          <th>Email ID</th>
          <th>Subject</th>
          <th>Message</th>
          
        </tr>
      </thead>
      <tbody>
       {subscribedUser}
      </tbody>
    </table>
  </div> </div> </div>

</div>
      </div></div>
      </main>
      </div></div>

  	);
  }
}
function mapStateToProps(state) {
  const Users = state;
 
  return {Users};
}


function mapDispatchToProps(dispatch) {
  return {
getmessages:(token)=>{
  dispatch(domessageslistReq(token));
}
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(MessagesList);

