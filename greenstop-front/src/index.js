import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Route, Switch } from 'react-router-dom'
import { createBrowserHistory } from 'history';
import 'bootstrap/dist/css/bootstrap.css';
import App from './App';
import Signup from './Views/Signup/signup'
import login from './Views/admin/login'
import home from './Views/admin/home'
import { Provider } from 'react-redux'
import todoApp from './redux/reducers'
import { applyMiddleware, createStore, compose } from 'redux';
import thunk from 'redux-thunk';
import SubscribersList from "./Views/admin/subscriberlist.jsx"
import MessagesList from "./Views/admin/messages.jsx"
import registerServiceWorker from './registerServiceWorker';
import './scss/index.styles.css';


const history = createBrowserHistory();

const store = createStore(todoApp,compose(
      applyMiddleware(thunk),
    ))
ReactDOM.render(
	<Provider store={store}>
	<HashRouter history={history}>
			    <Switch>
			     	<Route exact path="/" name="signup" component={Signup}/>
			     	<Route exact path="/admin" name="login" component={login}/>
			     	<Route exact path="/home" name="home" component={home}/>
					<Route path="/home/subscribers" name="subscribers" component={SubscribersList}/>
					<Route path="/home/MessagesList" name="MessagesList" component={MessagesList}/>

			    </Switch>
			    </HashRouter>
		</Provider>
			    , document.getElementById('root'));
registerServiceWorker();
