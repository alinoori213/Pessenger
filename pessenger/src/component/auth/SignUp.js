import React from 'react'
import logo from '../../logo.svg'
//import validate from '../../validation/ValidateFunction'
import { Link } from "react-router-dom"
import EmailOutlinedIcon from '@material-ui/icons/EmailOutlined';
import LockIcon from '@material-ui/icons/Lock';
import Input from './Input'
import axios from 'axios'
export default class Login extends React.Component {
    constructor (props) {
        super(props)
    
        this.state = {
          email: '',
          password: '',
          retypePassword: ''
        }
    
        this.ParentHandler = this.ParentHandler.bind(this)
      }
    
      ParentHandler (name, value) {
        console.log('ParentHandler', name, value)
        this.setState({ [name]: value })
      }
    
      hanleRequest () {
        if (this.state.password === this.state.retypePassword) {
          axios.post('https://api.paywith.click/auth/signup/', {
            email: this.state.email,
            password: this.state.password
          })
            .then(function (response) {
              console.log('data:', response.data)
              window.localStorage.setItem('token', response.data.token)
              window.localStorage.setItem('id', response.data.id)
            })
            .catch(function (error) {
              console.log(error)
            })
        } else {
          this.setState({ error: 'invalid password' })
        }
      }
    render() {
        return ( 
        < div className = 'container' >
            <div className = 'loginpage' >
            <h2 > Pessenger </h2>  
            <div className = 'email'>
            <EmailOutlinedIcon className='iconE'/>
            <Input placeholder='email' name='email' PH={this.ParentHandler} />
            </div> 
            <div className = 'passWord' >
            <LockIcon className='iconE'/>
            <Input type='password' placeholder='password' name='password' PH={this.ParentHandler} />
            </div> 
            <div className = 'passWord' >
            <LockIcon className='iconE'/>
            <Input type='password' placeholder='password' name='retypePassword' PH={this.ParentHandler} />
            </div> 
            <div className = 'loginbutton' >
            <button onClick={() => this.hanleRequest()} className='but' >
            Sign Up
          </button> 
            </div > 
            <div className='forgot'><a href='/Login'>Already have an account?</a></div>
            </div> 
            </div>
        )
    }

}