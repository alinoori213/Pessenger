import React from 'react'
import { sendNewMessage} from '../../action/conversation'
import axios from 'axios'
import SendIcon from '@material-ui/icons/Send';



class Footer extends React.Component {
  constructor() {
    super()
    this.state = {
      newMessage : '',
      token: window.localStorage.getItem('token'),
    }
    this.sendNewMessage = this.sendNewMessage.bind(this)
  }
  onChangeText(e) {
    this.setState({newMessage: e.target.value})
  }

  sendNewMessage() {
    console.log('convID:::',this.props.conversationId)
    this.props.dispatch(sendNewMessage(this.state.newMessage))
    let fdata = new FormData()
    fdata.append('token', this.state.token)
    fdata.append('conversation_id', this.props.conversationId)
    fdata.append('text', this.state.newMessage )
    
    axios.post('https://api.paywith.click/conversation/create/', fdata)
    
    .then((response) => {
      
      console.log('sendNewMessage::',response);
      this.setState({newMessage:''})
      })
    .catch((error) => {
      console.log('error::::',error);
      });
  }

  render () {
    console.log('gg',this.props.conversationId)
    return (
      <div className='footer' >
        

        <input
        className='writeMessage'
          type='text'
          placeholder='write...'
          name='newMessage'
          value={this.state.newMessage}
          onChange = {(e) => this.onChangeText(e)} 
        />
        <SendIcon 
        onClick = {(newMessage) => this.sendNewMessage(newMessage)}
        className='newicon'
        />
        
      </div>
    )
  }
}

export default Footer
