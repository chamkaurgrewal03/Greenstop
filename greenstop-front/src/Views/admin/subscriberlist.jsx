import React, { Component } from 'react';
import {connect} from 'react-redux';
import Header from'../../components/Header/';
import Sidebar from '../../components/Sidebar';
import {dosubscriberlistReq} from "../../redux/actions/subscriberlist.js";
import moment from 'moment'


class SubscribersList extends Component {
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
  console.log("token result",token);

  this.props.getsubscriber(token);
}

  render() {
    
    if (this.props.Users.subscriberlistReducer.result.length > 0 ){
      
        var subscribedUser=this.props.Users.subscriberlistReducer.result.map(function(user,index){
if (user.time){
var dateString = user.time;
var dateObj = new Date(dateString);
var momentObj = moment(dateObj);
var momentString = momentObj.format('MMMM Do YYYY, h:mm:ss a'); // 2016-07-15
}
else{
  var momentString="";
}
        return (<tr key={index}><td>{user.email}</td><td>{momentString}</td></tr>);
      })
    }
    else {
      subscribedUser=(<tr><td colSpan="2"> there is no data to display</td> </tr>);
    }
  	return (
             <div className="app">

        <Header />
        <div className="app-body">
          <Sidebar {...this.props}/>
          <main className="main container-fluid">
          <div>
          <div className="row">
          <div className="col-12 col-lg-6">
          <div className="card">
<div className="card-header"> 
Subscribed users list 
</div>         
       <div className="card-body card-block">
  <div className="table table-striped table-sm table-bordered table-hover">
    <table className="table">
      <thead>
        <tr>
          <th>email ID</th>
          <th>Date and time  subscription</th>
          
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
getsubscriber:(token)=>{

  dispatch(dosubscriberlistReq(token));
}
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(SubscribersList);

