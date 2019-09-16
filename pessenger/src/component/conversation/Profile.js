import React from 'react'
import Modal from '@material-ui/core/Modal'
import TextField from '@material-ui/core/TextField'
import axios from 'axios'

export default class Modals extends React.Component {
  constructor () {
    super()
    this.state = {
      name: window.localStorage.getItem('name'),
      phoneNumber: '',
      description: '',
      file: '',
      base64: '',
      image: window.localStorage.getItem('image')
    }
  }

  handleChange (event) {
    var name = event.target.name
    this.setState({ [name]: event.target.value })
  }

  saveChanges () {
    this.props.closeModal()
  }
  onChangeHandler (e) {
    e.preventDefault()
    const file = e.target.files[0]
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onloadend = () => {
      var image = document.createElement('img')
      image.src = reader.result
      if (image.height === image.width) {
        this.setState({
          file: file,
          base64: reader.result
        })
      } else {
        alert('The Height and width are not equal!! Please upload another image!')
      }
    }
  }
  saveProfile () {
    const fdata = new FormData()
    fdata.append('token', window.localStorage.getItem('token'))
    fdata.append('description', this.state.description)
    fdata.append('user_type', 'organization')
    fdata.append('phone_number', this.state.phoneNumber)
    fdata.append('avatar', this.state.file)
    fdata.append('location_lat', 43)
    fdata.append('location_long', -79)
    fdata.append('mobile_number', this.state.phoneNumber)
    fdata.append('name', this.state.name)
    fdata.append('website', 'https://trump.gov.ir')
    fdata.append('country_code', 'CA')
    fdata.append('address', '')

    axios.post('https://api.paywith.click/auth/profile/', fdata)
      .then((response) => {
        // this.props.dispatch((getMessageList(response.data.data.messages)))
        this.saveChanges()
        window.localStorage.setItem('name', this.state.name)
        window.localStorage.setItem('image', this.state.base64)
      })
      .catch(function (error) {
        console.log(error)
      })
  }

  render () {
    return (

      
        <div className='container'>
          <div className='loginpage'>
          <div className='email'>
          <TextField
            name='name'
            className='editTextField'
            label='نام'
            onChange={(event) => this.handleChange(event)}
            defaultValue={this.state.name}
          />
          </div>
          <div className='email'>
          <TextField
            name='phoneNumber'
            className='editTextField'
            label='شماره تلفن'
            onChange={(event) => this.handleChange(event)}
          />
          </div>
          <div className='email'>
          <TextField 
          dir='rtl'
            name='description'
            className='editTextField'
            label='بیو'
            onChange={(event) => this.handleChange(event)}
          />
          </div>
          
          <input type='file' className='addPhoto' onChange={(event) => this.onChangeHandler(event)} />
          <div className='loginbutton'>
          <div className='submitbut'>
          <button className='but' onClick={() => this.saveProfile()} > Submit </button>
          </div>
        </div>
        </div>
        </div>
        
     
    )
  }
}
