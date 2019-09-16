import React from 'react'
import './App.css'
import Login from './component/auth/Login'
import Grid from './component/auth/Grid'
import Messenger from './component/conversation/Messenger'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import SignUp from './component/auth/SignUp'
import Biuld from './component/auth/Biuld'
import Profile from './component/conversation/Profile'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import Conversation from './reducer/Conversation'
import logger from 'redux-logger'
const store = createStore(Conversation, applyMiddleware(logger))
export default class App extends React.Component {
  render () {
    return (
      <Provider store={store}>
        <Router>
        <Route path='/Biuld' exact component={Biuld} />
          <Route path='/' exact component={Login} />
          <Route path='/Grid' exact component={Grid} />
          <Route path='/Profile' component={Profile} />
          <Route path='/signup/' exact component={SignUp} />
          <Route path='/messenger/' component={Messenger} />
        </Router>
      </Provider>
    )
  }
}
