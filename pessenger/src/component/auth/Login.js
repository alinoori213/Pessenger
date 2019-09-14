import React from 'react'
import validate from '../../validation/ValidateFunction'
import axios from 'axios'
import EmailOutlinedIcon from '@material-ui/icons/EmailOutlined';
import LockIcon from '@material-ui/icons/Lock';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

export default class Login extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            fields: {
                email: '',
                password: ''
            },
            errors: {
                email: '',
                password: ''
            }
        }

        // this.handleChange = this.handleChange.bind(this)
    }

    handleChange(event) {
        let name = event.target.name
        let changeFields = this.state.fields
        changeFields[name] = event.target.value
        this.setState({ fields: changeFields })
            // console.log('eee', event.target.value)
            // this.setState({ [name]: event.target.value }, () => console.log('CALLBACK', this.state.email))
            // console.log('email', this.state.email)
            // let error = validate('email', event.target.value)
            // console.log('errorrr:', error)
    }

    handleError() {
        let errors = {
            email: validate('email', this.state.fields.email),
            password: validate('password', this.state.fields.password)
        }
        console.log('errorrr', errors)
        this.setState({ errors })
    }

    handleRequest() {
        axios.post('https://api.paywith.click/auth/signin/', {
                email: this.state.fields.email,
                password: this.state.fields.password
            })
            .then((response) => {
                window.localStorage.setItem('token', response.data.data.token)
                window.localStorage.setItem('id', response.data.data.profile.id)

                this.props.history.push('/messenger/')
            })
            .catch(function(error) {
                console.log(error)
            })
    }

    handleEmail(e) {
        this.setState({...this.state, fields: {...this.state.fields, email: e.target.value } })
    }


    render() {
        return (
             <div className = 'container' >
            <div className = 'loginpage' >
            <h2 > Pessenger </h2>   
             <div className = 'email' >
            <EmailOutlinedIcon className = 'iconE'/>
            <input 
            className='lsinput'
            type = 'text'
            placeholder = 'email'
            name = 'email'
            
            onChange = {
                (e) => this.handleEmail(e)
            }
            onBlur = {() => console.log('blur')}
            /> {this.state.errors.email !== null && <
            span className = 'error' > { this.state.errors.email } </span>}  
            </div>   
            <div className = 'passWord' >
            <LockIcon className = 'iconE'/>
            <input type = 'password'
            className='lsinput'
            name = 'password'
            onChange = {
                (event) => this.handleChange(event) }
            placeholder = 'password'/> {
                this.state.errors.password !== null &&
                <span className = 'error' > { this.state.errors.password } </span>
            } <span className = 'error' > { this.state.errors.password } </span> 
             </div>  
              <div className = 'loginbutton' >
            <button onClick = {
                () => this.handleRequest()
            }className = 'but' > Login </button> 
            </div > 
            <Router >
            <div className = 'forgot' > < a href = '/SignUp' > Create account </a></div>
            <div className = 'forgot' > < a href = '/Biuld' > forgot password ? </a></div>
            </Router>  
            </div >  
            </div>

        )
    }
}